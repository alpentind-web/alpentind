var INQUIRY_ENGINE_STORE_KEY = 'alpentind-inquiry-engine-store';
var INQUIRY_ENGINE_STORE_VERSION = 2;
var LEGACY_INQUIRY_SEED_FINGERPRINTS = {
  'INQ-001': { title: 'Direktbokning – Peter Nilsson', createdAt: '2026-07-15T09:15:00Z' },
  'INQ-002': { title: 'Rekommendationsförfrågan – Anna Andersson', createdAt: '2026-07-14T08:10:00Z' },
  'INQ-003': { title: 'Relation utan bokning – ACME AB', createdAt: '2026-07-12T12:10:00Z' },
  'INQ-004': { title: 'Avslutad utan relation – spontan förfrågan', createdAt: '2026-07-10T15:40:00Z' },
  'INQ-005': { title: 'Ny inkommande – öppen bedömning', createdAt: '2026-07-19T06:25:00Z' },
};
var inquiryEngineState = null;
var inquiryEngineHandlersBound = false;

function inquiryEscapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function inquirySlugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inquiryNowIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function inquiryNowIsoTime() {
  return new Date().toISOString();
}

function inquiryFormatDateTime(value) {
  if (!value) return '–';
  return new Date(value).toLocaleString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function getJourneyRegister() {
  return (mockData && mockData.products) ? mockData.products : [];
}

function getPlanningRegister() {
  return (mockData && mockData.planningProjects) ? mockData.planningProjects : [];
}

function getRelationshipRegister() {
  var dialogues = (mockData && mockData.dialogues) ? mockData.dialogues : [];
  return dialogues
    .filter(function(item) { return item && item.person && item.person.workspaceId; })
    .map(function(item) {
      return {
        id: item.person.workspaceId,
        name: item.person.name,
        email: item.person.email || '',
        phone: item.person.phone || '',
        source: 'Relationship Register',
      };
    });
}

function findRelationshipLookup(inquiry, relationships) {
  if (!inquiry || !inquiry.person) return null;
  var person = inquiry.person;

  if (person.workspaceId) {
    var byId = relationships.find(function(rel) { return rel.id === person.workspaceId; });
    if (byId) return byId;
  }

  if (person.email) {
    var byEmail = relationships.find(function(rel) {
      return rel.email && rel.email.toLowerCase() === person.email.toLowerCase();
    });
    if (byEmail) return byEmail;
  }

  return null;
}

function buildEmptyInquiryStore() {
  return {
    version: INQUIRY_ENGINE_STORE_VERSION,
    activeInquiryId: null,
    relationshipEntries: [],
    inquiries: [],
  };
}

function isLegacySeedInquiry(inquiry) {
  if (!inquiry || !inquiry.id) return false;
  var fingerprint = LEGACY_INQUIRY_SEED_FINGERPRINTS[inquiry.id];
  return !!(
    fingerprint
    && inquiry.title === fingerprint.title
    && inquiry.createdAt === fingerprint.createdAt
  );
}

function normalizeInquiryStore(store) {
  var normalized = Object.assign(buildEmptyInquiryStore(), store || {});
  normalized.version = INQUIRY_ENGINE_STORE_VERSION;
  normalized.relationshipEntries = Array.isArray(normalized.relationshipEntries) ? normalized.relationshipEntries : [];
  normalized.inquiries = Array.isArray(normalized.inquiries)
    ? normalized.inquiries.filter(function(item) { return item && !isLegacySeedInquiry(item); })
    : [];

  if (!normalized.inquiries.some(function(item) { return item.id === normalized.activeInquiryId; })) {
    normalized.activeInquiryId = normalized.inquiries[0] ? normalized.inquiries[0].id : null;
  }

  return normalized;
}

function getNextInquiryId(store) {
  var maxNumber = (store.inquiries || []).reduce(function(max, inquiry) {
    var match = inquiry && inquiry.id ? String(inquiry.id).match(/^INQ-(\d+)$/) : null;
    var current = match ? Number(match[1]) : 0;
    return current > max ? current : max;
  }, 0);

  return 'INQ-' + String(maxNumber + 1).padStart(3, '0');
}

function getInquiryStore() {
  var raw = typeof localStorage !== 'undefined'
    ? localStorage.getItem(INQUIRY_ENGINE_STORE_KEY)
    : null;

  if (raw) {
    try {
      var parsed = JSON.parse(raw);
      var normalized = normalizeInquiryStore(parsed);
      if (JSON.stringify(parsed) !== JSON.stringify(normalized)) saveInquiryStore(normalized);
      return normalized;
    } catch (e) {
      // ignore broken state and rebuild
    }
  }

  var emptyStore = buildEmptyInquiryStore();
  saveInquiryStore(emptyStore);
  return emptyStore;
}

function saveInquiryStore(store) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(INQUIRY_ENGINE_STORE_KEY, JSON.stringify(store));
  }
}

function ensureActiveInquiry(store) {
  if (!store.inquiries || store.inquiries.length === 0) return null;
  var found = store.inquiries.find(function(item) { return item.id === store.activeInquiryId; });
  if (found) return found;
  store.activeInquiryId = store.inquiries[0].id;
  return store.inquiries[0];
}

function updateActiveInquiry(mutator) {
  if (!inquiryEngineState || !inquiryEngineState.store) return;
  var store = inquiryEngineState.store;
  var inquiry = ensureActiveInquiry(store);
  if (!inquiry) return;

  mutator(inquiry, store);
  inquiry.updatedAt = inquiryNowIsoTime();
  saveInquiryStore(store);
  renderInquiryEngine();
}

function addInquiryLifecycleEntry(inquiry, stage, note) {
  inquiry.lifecycle = inquiry.lifecycle || [];
  inquiry.lifecycle.unshift({
    id: 'L-' + Date.now().toString(36),
    stage: stage,
    timestamp: inquiryNowIsoTime(),
    note: note,
  });
}

function getStageLabel(stage) {
  var labels = {
    incoming: 'Incoming Inquiry',
    dialogue: 'Dialogue',
    assessment: 'Operational Assessment',
    recommendation: 'Recommendation',
    decision: 'Decision',
    outcome: 'Outcome',
  };
  return labels[stage] || stage;
}

function getStatusBadge(status) {
  if (status === 'closed') return { label: 'Stängd', cls: 'badge-info' };
  return { label: 'Aktiv', cls: 'badge-primary' };
}

function getAssessmentBadge(assessment) {
  if (!assessment || !assessment.summary) return { label: 'Ej registrerad', cls: 'badge-warning' };
  if (assessment.status === 'maintained') return { label: 'Löpande uppdaterad', cls: 'badge-success' };
  return { label: 'Pågår', cls: 'badge-info' };
}

function getRecommendationLabel(inquiry, journeys) {
  if (!inquiry.recommendation || !inquiry.recommendation.currentJourneyId) return 'Ingen rekommendation registrerad';
  var journey = journeys.find(function(item) { return item.id === inquiry.recommendation.currentJourneyId; });
  return journey ? journey.title : 'Okänd resa';
}

function getPreviousInquiries(store, inquiry) {
  var email = inquiry && inquiry.person ? inquiry.person.email : null;
  if (!email) return [];
  return (store.inquiries || []).filter(function(item) {
    return item.id !== inquiry.id && item.person && item.person.email === email;
  });
}

function renderInquirySelector(inquiries, activeId) {
  var selector = document.getElementById('inquiry-selector');
  if (!selector) return;

  selector.innerHTML = inquiries.map(function(inquiry) {
    var activeClass = inquiry.id === activeId ? ' active' : '';
    var status = getStatusBadge(inquiry.status);
    return ''
      + '<button class="inquiry-selector-item' + activeClass + '" type="button" data-inquiry-select="' + inquiryEscapeHtml(inquiry.id) + '">'
      +   '<span class="inquiry-selector-name">' + inquiryEscapeHtml(inquiry.person.name) + '</span>'
      +   '<span class="badge ' + status.cls + '">' + inquiryEscapeHtml(status.label) + '</span>'
      +   '<span class="inquiry-selector-stage">' + inquiryEscapeHtml(getStageLabel(inquiry.currentStage)) + '</span>'
      + '</button>';
  }).join('');
}

function renderInquiryEmptyState() {
  return ''
    + '<section class="content-section">'
    +   '<div class="card">'
    +     '<div class="empty-state">'
    +       '<i data-feather="inbox" style="width: 48px; height: 48px;" aria-hidden="true"></i>'
    +       '<h3>No active inquiries.</h3>'
    +       '<p>Inquiry Workspace är tom tills en användare skapar en ny inquiry via arbetsflödet.</p>'
    +       '<button class="btn btn-primary mt-lg" type="button" data-inquiry-create="true">Create Inquiry</button>'
    +     '</div>'
    +   '</div>'
    + '</section>';
}

function renderSituation(inquiry, journeys) {
  var status = getStatusBadge(inquiry.status);
  var assessment = getAssessmentBadge(inquiry.assessment);
  var recommendation = getRecommendationLabel(inquiry, journeys);

  return ''
    + '<section class="workspace-header inquiry-situation" aria-labelledby="inquiry-situation-title">'
    +   '<div class="workspace-header-main">'
    +     '<div class="workspace-avatar inquiry-avatar" aria-hidden="true">IN</div>'
    +     '<div class="workspace-header-content">'
    +       '<div>'
    +         '<h2 class="workspace-title" id="inquiry-situation-title">' + inquiryEscapeHtml(inquiry.title) + '</h2>'
    +         '<div class="workspace-header-meta">'
    +           '<span class="badge ' + status.cls + '">' + inquiryEscapeHtml(status.label) + '</span>'
    +           '<span class="badge ' + assessment.cls + '">' + inquiryEscapeHtml(assessment.label) + '</span>'
    +           '<span class="workspace-supporting-text">Steg: ' + inquiryEscapeHtml(getStageLabel(inquiry.currentStage)) + '</span>'
    +         '</div>'
    +       '</div>'
    +       '<p class="workspace-supporting-text">Current Recommendation: ' + inquiryEscapeHtml(recommendation) + '</p>'
    +       '<p class="workspace-supporting-text">Current Objective: ' + inquiryEscapeHtml(inquiry.currentObjective || 'Ingen objective registrerad ännu.') + '</p>'
    +     '</div>'
    +   '</div>'
    + '</section>';
}

function renderDialogueWork(inquiry) {
  var dialogueRows = (inquiry.dialogue || []).slice().sort(function(a, b) {
    return String(b.timestamp).localeCompare(String(a.timestamp));
  }).map(function(item) {
    var icon = item.type === 'inbound' ? 'arrow-down-left' : (item.type === 'outbound' ? 'arrow-up-right' : 'edit-2');
    var typeLabel = item.type === 'inbound' ? 'Inkommande' : (item.type === 'outbound' ? 'Utgående' : 'Anteckning');
    return ''
      + '<li class="dialog-timeline-item" role="listitem">'
      +   '<div class="dialog-timeline-icon" aria-label="' + inquiryEscapeHtml(typeLabel) + '"><i data-feather="' + icon + '" style="width:12px;height:12px"></i></div>'
      +   '<div class="dialog-timeline-content">'
      +     '<p class="dialog-timeline-date">' + inquiryEscapeHtml(inquiryFormatDateTime(item.timestamp)) + ' • ' + inquiryEscapeHtml(typeLabel) + '</p>'
      +     '<p class="dialog-timeline-summary">' + inquiryEscapeHtml(item.message) + '</p>'
      +   '</div>'
      + '</li>';
  }).join('');

  return ''
    + '<section class="card workspace-block" aria-labelledby="inquiry-dialogue-heading">'
    +   '<div class="card-header"><h3 id="inquiry-dialogue-heading">Dialogue</h3></div>'
    +   '<div class="card-body">'
    +     '<ol class="dialog-timeline" aria-label="Dialoghistorik">' + dialogueRows + '</ol>'
    +     '<div class="inquiry-inline-form">'
    +       '<select id="inquiry-dialogue-type" aria-label="Typ av dialoghändelse">'
    +         '<option value="inbound">Inkommande</option>'
    +         '<option value="outbound">Utgående</option>'
    +         '<option value="note">Anteckning</option>'
    +       '</select>'
    +       '<input id="inquiry-dialogue-text" type="text" placeholder="Registrera ny dialoghändelse">'
    +       '<button class="btn btn-secondary btn-sm" type="button" data-inquiry-action="add-dialogue">Lägg till</button>'
    +     '</div>'
    +   '</div>'
    + '</section>';
}

function renderNotesWork(inquiry) {
  var notes = (inquiry.notes || []).map(function(item) {
    return ''
      + '<li class="inquiry-list-item">'
      +   '<span class="inquiry-list-item-time">' + inquiryEscapeHtml(inquiryFormatDateTime(item.timestamp)) + '</span>'
      +   '<span>' + inquiryEscapeHtml(item.text) + '</span>'
      + '</li>';
  }).join('');

  return ''
    + '<section class="card workspace-block" aria-labelledby="inquiry-notes-heading">'
    +   '<div class="card-header"><h3 id="inquiry-notes-heading">Notes</h3></div>'
    +   '<div class="card-body">'
    +     '<ul class="inquiry-list">' + (notes || '<li class="inquiry-empty">Inga anteckningar ännu.</li>') + '</ul>'
    +     '<div class="inquiry-inline-form">'
    +       '<input id="inquiry-note-text" type="text" placeholder="Lägg till operativ anteckning">'
    +       '<button class="btn btn-secondary btn-sm" type="button" data-inquiry-action="add-note">Spara</button>'
    +     '</div>'
    +   '</div>'
    + '</section>';
}

function renderRecommendationWork(inquiry, journeys) {
  var options = ['<option value="">Välj rekommendation</option>'].concat(journeys.map(function(journey) {
    var selected = inquiry.recommendation && inquiry.recommendation.currentJourneyId === journey.id ? ' selected' : '';
    return '<option value="' + inquiryEscapeHtml(journey.id) + '"' + selected + '>' + inquiryEscapeHtml(journey.title) + '</option>';
  })).join('');

  var history = (inquiry.recommendation && inquiry.recommendation.history || []).map(function(entry) {
    var journey = journeys.find(function(item) { return item.id === entry.journeyId; });
    return ''
      + '<li class="inquiry-list-item">'
      +   '<span class="inquiry-list-item-time">' + inquiryEscapeHtml(inquiryFormatDateTime(entry.date)) + '</span>'
      +   '<span>' + inquiryEscapeHtml(journey ? journey.title : 'Okänd resa') + ' – ' + inquiryEscapeHtml(entry.note || '') + '</span>'
      + '</li>';
  }).join('');

  return ''
    + '<section class="card workspace-block workspace-block--wide" aria-labelledby="inquiry-recommendation-heading">'
    +   '<div class="card-header"><h3 id="inquiry-recommendation-heading">Recommendations & Assessment</h3></div>'
    +   '<div class="card-body">'
    +     '<div class="inquiry-inline-form inquiry-inline-form--stack">'
    +       '<label class="inquiry-label" for="inquiry-assessment-summary">Operational Assessment</label>'
    +       '<textarea id="inquiry-assessment-summary" rows="3" placeholder="Beskriv nuvarande operativ bedömning">' + inquiryEscapeHtml((inquiry.assessment && inquiry.assessment.summary) || '') + '</textarea>'
    +       '<label class="inquiry-label" for="inquiry-objective">Current Objective</label>'
    +       '<input id="inquiry-objective" type="text" value="' + inquiryEscapeHtml(inquiry.currentObjective || '') + '" placeholder="Ange current objective">'
    +       '<label class="inquiry-label" for="inquiry-recommendation-select">Current Recommendation</label>'
    +       '<select id="inquiry-recommendation-select">' + options + '</select>'
    +       '<input id="inquiry-recommendation-note" type="text" value="' + inquiryEscapeHtml((inquiry.recommendation && inquiry.recommendation.note) || '') + '" placeholder="Motivering för rekommendation">'
    +       '<button class="btn btn-primary btn-sm" type="button" data-inquiry-action="save-assessment-recommendation">Uppdatera bedömning och rekommendation</button>'
    +     '</div>'
    +     '<div class="inquiry-history-block">'
    +       '<p class="dialog-info-label">Recommendation History</p>'
    +       '<ul class="inquiry-list">' + (history || '<li class="inquiry-empty">Ingen historik ännu.</li>') + '</ul>'
    +     '</div>'
    +   '</div>'
    + '</section>';
}

function renderBookingPreparationWork(inquiry) {
  var prep = inquiry.bookingPreparation || {};
  return ''
    + '<section class="card workspace-block" aria-labelledby="inquiry-booking-heading">'
    +   '<div class="card-header"><h3 id="inquiry-booking-heading">Booking Preparation</h3></div>'
    +   '<div class="card-body">'
    +     '<label class="inquiry-checkbox"><input type="checkbox" data-inquiry-prep="availabilityChecked" ' + (prep.availabilityChecked ? 'checked' : '') + '> Tillgänglighet verifierad i register</label>'
    +     '<label class="inquiry-checkbox"><input type="checkbox" data-inquiry-prep="pricingConfirmed" ' + (prep.pricingConfirmed ? 'checked' : '') + '> Pris verifierat</label>'
    +     '<label class="inquiry-checkbox"><input type="checkbox" data-inquiry-prep="termsReviewed" ' + (prep.termsReviewed ? 'checked' : '') + '> Bokningsvillkor granskade</label>'
    +   '</div>'
    + '</section>';
}

function renderContext(inquiry, store, journeys, planning, relationshipLookup) {
  var selectedJourney = inquiry.recommendation && inquiry.recommendation.currentJourneyId
    ? journeys.find(function(item) { return item.id === inquiry.recommendation.currentJourneyId; })
    : null;

  var journeyInfo = selectedJourney
    ? ''
      + '<div class="dialog-info-group">'
      +   '<p class="dialog-info-label">Journey Information</p>'
      +   '<p class="dialog-info-value">' + inquiryEscapeHtml(selectedJourney.title) + ' • ' + inquiryEscapeHtml(selectedJourney.category) + ' • ' + inquiryEscapeHtml(selectedJourney.duration) + '</p>'
      +   '<p class="dialog-info-value">Pris: ' + inquiryEscapeHtml(String(selectedJourney.price)) + ' ' + inquiryEscapeHtml(selectedJourney.currency) + '</p>'
      + '</div>'
    : '<p class="inquiry-empty">Ingen resa vald ännu.</p>';

  var selectedJourneyKey = selectedJourney && selectedJourney.title
    ? selectedJourney.title.split(' ').filter(Boolean)[0]
    : '';

  var relatedPlanning = planning.filter(function(item) {
    return !!(selectedJourneyKey && item.title && item.title.indexOf(selectedJourneyKey) !== -1);
  });

  var planningInfo = relatedPlanning.length > 0
    ? relatedPlanning.map(function(item) {
        return '<li class="inquiry-list-item"><span>' + inquiryEscapeHtml(item.title) + '</span><span class="badge ' + (item.status === 'ready' ? 'badge-success' : 'badge-warning') + '">' + inquiryEscapeHtml(item.openQuestionsLabel || item.status) + '</span></li>';
      }).join('')
    : '<li class="inquiry-empty">Ingen direkt planning-referens för vald rekommendation.</li>';

  var previous = getPreviousInquiries(store, inquiry);
  var previousInfo = previous.length > 0
    ? previous.map(function(item) {
        return '<li class="inquiry-list-item"><span>' + inquiryEscapeHtml(item.title) + '</span><span class="badge ' + (item.status === 'closed' ? 'badge-info' : 'badge-primary') + '">' + inquiryEscapeHtml(getStageLabel(item.currentStage)) + '</span></li>';
      }).join('')
    : '<li class="inquiry-empty">Inga tidigare förfrågningar för personen.</li>';

  var docs = (inquiry.documents || []).map(function(doc) {
    return '<li class="inquiry-list-item"><span>' + inquiryEscapeHtml(doc.label) + '</span><span>' + inquiryEscapeHtml(doc.value) + '</span></li>';
  }).join('');

  var relationText = 'Ingen befintlig relation hittad.';
  if (relationshipLookup) {
    relationText = ''
      + inquiryEscapeHtml(relationshipLookup.name)
      + ' • '
      + '<a class="link" href="person.html?id=' + encodeURIComponent(relationshipLookup.id) + '">Öppna relation</a>';
  }

  if (inquiry.relationship && inquiry.relationship.linkedRelationshipId) {
    relationText = 'Länkad relation: <a class="link" href="person.html?id=' + encodeURIComponent(inquiry.relationship.linkedRelationshipId) + '">' + inquiryEscapeHtml(inquiry.relationship.linkedRelationshipId) + '</a>';
  }

  if (inquiry.relationship && inquiry.relationship.entryPointId) {
    relationText += '<br><span class="text-muted">Entry point skapad: ' + inquiryEscapeHtml(inquiry.relationship.entryPointId) + '</span>';
  }

  return ''
    + '<section class="content-section" aria-labelledby="inquiry-context-heading">'
    +   '<div class="section-header"><h2 id="inquiry-context-heading">Context</h2></div>'
    +   '<div class="workspace-grid">'
    +     '<section class="card workspace-block">'
    +       '<div class="card-header"><h3>Journey Information</h3></div>'
    +       '<div class="card-body">' + journeyInfo + '</div>'
    +     '</section>'
    +     '<section class="card workspace-block">'
    +       '<div class="card-header"><h3>Existing Relationship</h3></div>'
    +       '<div class="card-body"><p class="dialog-info-value">' + relationText + '</p></div>'
    +     '</section>'
    +     '<section class="card workspace-block">'
    +       '<div class="card-header"><h3>Previous Inquiries</h3></div>'
    +       '<div class="card-body"><ul class="inquiry-list">' + previousInfo + '</ul></div>'
    +     '</section>'
    +     '<section class="card workspace-block">'
    +       '<div class="card-header"><h3>Planning (read-only)</h3></div>'
    +       '<div class="card-body"><ul class="inquiry-list">' + planningInfo + '</ul></div>'
    +     '</section>'
    +     '<section class="card workspace-block workspace-block--wide">'
    +       '<div class="card-header"><h3>Related Documents</h3></div>'
    +       '<div class="card-body"><ul class="inquiry-list">' + (docs || '<li class="inquiry-empty">Inga relaterade dokument.</li>') + '</ul></div>'
    +     '</section>'
    +   '</div>'
    + '</section>';
}

function renderActions(inquiry, relationshipLookup) {
  return ''
    + '<section class="content-section" aria-labelledby="inquiry-actions-heading">'
    +   '<div class="section-header"><h2 id="inquiry-actions-heading">Actions</h2></div>'
    +   '<div class="quick-actions">'
    +     '<input id="inquiry-reply-text" class="inquiry-action-input" type="text" placeholder="Skriv svar att registrera i dialogen">'
    +     '<button class="btn btn-primary" type="button" data-inquiry-action="reply">Registrera svar</button>'
    +     '<button class="btn btn-secondary" type="button" data-inquiry-action="move-to-decision">Flytta till beslut</button>'
    +     '<button class="btn btn-secondary" type="button" data-inquiry-action="register-booking">Registrera bokning</button>'
    +     '<button class="btn btn-secondary" type="button" data-inquiry-action="link-relationship">Länka befintlig relation</button>'
    +     '<button class="btn btn-secondary" type="button" data-inquiry-action="create-relationship-entry">Skapa relation entry point</button>'
    +     '<select id="inquiry-close-reason" aria-label="Orsak vid stängning">'
    +       '<option value="Ingen lämplig resa">Ingen lämplig resa</option>'
    +       '<option value="Personen avvaktar">Personen avvaktar</option>'
    +       '<option value="Övrigt avslut">Övrigt avslut</option>'
    +     '</select>'
    +     '<button class="btn btn-tertiary" type="button" data-inquiry-action="close-inquiry">Stäng förfrågan</button>'
    +     '<button class="btn btn-tertiary" type="button" data-inquiry-action="future-email-guidance">E-postintegration</button>'
    +   '</div>'
    + '</section>';
}

function renderLifecycle(inquiry) {
  var rows = (inquiry.lifecycle || []).map(function(entry) {
    return ''
      + '<li class="inquiry-list-item">'
      +   '<span class="inquiry-list-item-time">' + inquiryEscapeHtml(inquiryFormatDateTime(entry.timestamp)) + '</span>'
      +   '<span>' + inquiryEscapeHtml(getStageLabel(entry.stage)) + ' – ' + inquiryEscapeHtml(entry.note) + '</span>'
      + '</li>';
  }).join('');

  return ''
    + '<section class="card workspace-block workspace-block--wide" aria-labelledby="inquiry-lifecycle-heading">'
    +   '<div class="card-header"><h3 id="inquiry-lifecycle-heading">Inquiry Lifecycle</h3></div>'
    +   '<div class="card-body"><ul class="inquiry-list">' + rows + '</ul></div>'
    + '</section>';
}

function renderInquiryWorkspace(inquiry, store, journeys, planning, relationships) {
  var relationshipLookup = findRelationshipLookup(inquiry, relationships);

  return ''
    + renderSituation(inquiry, journeys)
    + '<section class="content-section" aria-labelledby="inquiry-work-heading">'
    +   '<div class="section-header"><h2 id="inquiry-work-heading">Work</h2></div>'
    +   '<div class="workspace-grid inquiry-work-grid">'
    +     renderDialogueWork(inquiry)
    +     renderNotesWork(inquiry)
    +     renderBookingPreparationWork(inquiry)
    +     renderRecommendationWork(inquiry, journeys)
    +     renderLifecycle(inquiry)
    +   '</div>'
    + '</section>'
    + renderContext(inquiry, store, journeys, planning, relationshipLookup)
    + renderActions(inquiry, relationshipLookup);
}

function handleInquiryAction(actionName) {
  if (!actionName) return;

  if (actionName === 'add-dialogue') {
    var textInput = document.getElementById('inquiry-dialogue-text');
    var typeInput = document.getElementById('inquiry-dialogue-type');
    var text = textInput ? String(textInput.value || '').trim() : '';
    var type = typeInput ? typeInput.value : 'inbound';
    if (!text) {
      if (typeof showWorkflowGuidance === 'function') {
        showWorkflowGuidance({
          intent: 'Du försöker lägga till en dialoghändelse.',
          capability: 'Lägg först in text för att registrera dialog i inquiry-historiken.',
          phase: 'När text är ifylld fortsätter workflow direkt i Dialogue-delen i detta workspace.',
        });
      }
      return;
    }

    updateActiveInquiry(function(inquiry) {
      inquiry.dialogue = inquiry.dialogue || [];
      inquiry.dialogue.unshift({
        id: 'D-' + Date.now().toString(36),
        type: type,
        timestamp: inquiryNowIsoTime(),
        message: text,
      });
      inquiry.currentStage = 'dialogue';
      addInquiryLifecycleEntry(inquiry, 'dialogue', 'Dialogue uppdaterad.');
    });
    return;
  }

  if (actionName === 'add-note') {
    var noteInput = document.getElementById('inquiry-note-text');
    var noteText = noteInput ? String(noteInput.value || '').trim() : '';
    if (!noteText) {
      if (typeof showWorkflowGuidance === 'function') {
        showWorkflowGuidance({
          intent: 'Du försöker spara en operativ anteckning.',
          capability: 'Lägg först in text för att skapa en anteckning som stödjer bedömning och beslut.',
          phase: 'När text är ifylld fortsätter workflow direkt i Notes-delen i detta workspace.',
        });
      }
      return;
    }

    updateActiveInquiry(function(inquiry) {
      inquiry.notes = inquiry.notes || [];
      inquiry.notes.unshift({ id: 'N-' + Date.now().toString(36), timestamp: inquiryNowIsoTime(), text: noteText });
      addInquiryLifecycleEntry(inquiry, 'assessment', 'Operativ anteckning registrerad.');
    });
    return;
  }

  if (actionName === 'save-assessment-recommendation') {
    var assessmentInput = document.getElementById('inquiry-assessment-summary');
    var objectiveInput = document.getElementById('inquiry-objective');
    var recommendationInput = document.getElementById('inquiry-recommendation-select');
    var recommendationNoteInput = document.getElementById('inquiry-recommendation-note');

    var assessmentText = assessmentInput ? String(assessmentInput.value || '').trim() : '';
    var objectiveText = objectiveInput ? String(objectiveInput.value || '').trim() : '';
    var recommendationId = recommendationInput ? recommendationInput.value : '';
    var recommendationNote = recommendationNoteInput ? String(recommendationNoteInput.value || '').trim() : '';

    updateActiveInquiry(function(inquiry) {
      inquiry.assessment = inquiry.assessment || {};
      inquiry.assessment.summary = assessmentText;
      inquiry.assessment.status = assessmentText ? 'maintained' : 'pending';
      inquiry.currentObjective = objectiveText;

      inquiry.recommendation = inquiry.recommendation || { history: [] };
      var previousJourneyId = inquiry.recommendation.currentJourneyId || null;
      inquiry.recommendation.currentJourneyId = recommendationId || null;
      inquiry.recommendation.note = recommendationNote;

      if (recommendationId) {
        inquiry.currentStage = 'recommendation';
        if (previousJourneyId !== recommendationId) {
          inquiry.recommendation.history = inquiry.recommendation.history || [];
          inquiry.recommendation.history.unshift({
            id: 'RECH-' + Date.now().toString(36),
            date: inquiryNowIsoTime(),
            journeyId: recommendationId,
            note: recommendationNote || 'Rekommendation uppdaterad.',
          });
          addInquiryLifecycleEntry(inquiry, 'recommendation', 'Recommendation ändrad eller registrerad.');
        } else {
          addInquiryLifecycleEntry(inquiry, 'assessment', 'Assessment uppdaterad utan byte av recommendation.');
        }
      } else {
        addInquiryLifecycleEntry(inquiry, 'assessment', 'Assessment uppdaterad.');
      }
    });
    return;
  }

  if (actionName === 'reply') {
    var replyInput = document.getElementById('inquiry-reply-text');
    var replyText = replyInput ? String(replyInput.value || '').trim() : '';
    if (!replyText) {
      if (typeof showWorkflowGuidance === 'function') {
        showWorkflowGuidance({
          intent: 'Du försöker registrera ett svar i dialogen.',
          capability: 'Skriv först svaret i fältet för att kunna logga det i inquiry-dialogen.',
          phase: 'När text är ifylld fortsätter workflow direkt i denna action utan att lämna workspace.',
        });
      }
      return;
    }

    updateActiveInquiry(function(inquiry) {
      inquiry.dialogue = inquiry.dialogue || [];
      inquiry.dialogue.unshift({
        id: 'D-' + Date.now().toString(36),
        type: 'outbound',
        timestamp: inquiryNowIsoTime(),
        message: replyText,
      });
      inquiry.currentStage = 'dialogue';
      inquiry.currentObjective = 'Inväntar svar på senaste dialogmeddelande.';
      addInquiryLifecycleEntry(inquiry, 'dialogue', 'Svar registrerat i dialogen.');
    });
    return;
  }

  if (actionName === 'move-to-decision') {
    updateActiveInquiry(function(inquiry) {
      inquiry.currentStage = 'decision';
      inquiry.decision = inquiry.decision || {};
      inquiry.decision.state = 'ready';
      addInquiryLifecycleEntry(inquiry, 'decision', 'Inquiry flyttad till beslutsläge.');
    });
    return;
  }

  if (actionName === 'register-booking') {
    updateActiveInquiry(function(inquiry) {
      inquiry.status = 'closed';
      inquiry.currentStage = 'outcome';
      inquiry.outcome = { state: 'booking', note: 'Bokning registrerad i inquiry workflow.' };
      inquiry.decision = { state: 'accepted', note: 'Rekommendation accepterad.' };
      addInquiryLifecycleEntry(inquiry, 'outcome', 'Outcome: Booking.');
    });
    return;
  }

  if (actionName === 'link-relationship') {
    updateActiveInquiry(function(inquiry) {
      var relationshipLookup = findRelationshipLookup(inquiry, inquiryEngineState.relationships || []);
      if (!relationshipLookup) {
        if (typeof showWorkflowGuidance === 'function') {
          showWorkflowGuidance({
            intent: 'Du vill länka förfrågan till en befintlig relation.',
            capability: 'Systemet hittade ingen matchande relationship i aktuellt registerunderlag.',
            phase: 'Fortsätt med \"Skapa relation entry point\" för att öppna relationship-flödet i nästa steg.',
          });
        }
        return;
      }
      inquiry.relationship = inquiry.relationship || {};
      inquiry.relationship.linkedRelationshipId = relationshipLookup.id;
      inquiry.currentStage = 'outcome';
      inquiry.outcome = { state: 'relationship', note: 'Inquiry länkad till befintlig relationship.' };
      addInquiryLifecycleEntry(inquiry, 'outcome', 'Outcome: Relationship linked.');
    });
    return;
  }

  if (actionName === 'create-relationship-entry') {
    updateActiveInquiry(function(inquiry, store) {
      var entryId = 'REL-ENTRY-' + Date.now().toString(36).toUpperCase();
      var workspaceId = inquiry.person.workspaceId || inquirySlugify(inquiry.person.name);

      store.relationshipEntries = store.relationshipEntries || [];
      store.relationshipEntries.unshift({
        id: entryId,
        workspaceId: workspaceId,
        name: inquiry.person.name,
        fromInquiryId: inquiry.id,
        createdAt: inquiryNowIsoTime(),
      });

      inquiry.person.workspaceId = workspaceId;
      inquiry.relationship = inquiry.relationship || {};
      inquiry.relationship.entryPointId = entryId;
      inquiry.currentStage = 'decision';
      inquiry.currentObjective = 'Relationship entry point skapad. Besluta om uppföljning.';
      addInquiryLifecycleEntry(inquiry, 'decision', 'Relationship creation entry point registrerad.');
    });
    return;
  }

  if (actionName === 'close-inquiry') {
    var closeReasonInput = document.getElementById('inquiry-close-reason');
    var closeReason = closeReasonInput ? closeReasonInput.value : 'Övrigt avslut';

    updateActiveInquiry(function(inquiry) {
      if (inquiry.status === 'closed') {
        if (typeof showWorkflowGuidance === 'function') {
          showWorkflowGuidance({
            intent: 'Du försöker stänga en redan stängd inquiry.',
            capability: 'Inquiry är redan avslutad. Du kan fortsätta med ny inquiry eller uppdatera historikanteckningar.',
            phase: 'Fortsatt workflow sker genom ny inquiry eller relation/booking-arbete beroende på nästa behov.',
          });
        }
        return;
      }
      inquiry.status = 'closed';
      inquiry.currentStage = 'outcome';
      inquiry.outcome = { state: 'closed_without_relationship', note: closeReason };
      inquiry.decision = inquiry.decision || {};
      inquiry.decision.state = 'closed';
      inquiry.decision.note = closeReason;
      addInquiryLifecycleEntry(inquiry, 'outcome', 'Outcome: Closed Inquiry.');
    });
    return;
  }

  if (actionName === 'future-email-guidance') {
    if (typeof showWorkflowGuidance === 'function') {
      showWorkflowGuidance({
        intent: 'Du vill fortsätta inquiry-dialog i e-postkanal.',
        capability: 'Här kommer Inquiry Engine kunna skicka och relatera e-post utan att lämna Workspace.',
        phase: 'E-postintegration är definierad som framtida extension point i ESR-010 och aktiveras i senare fas.',
      });
    }
  }
}

function handleInquirySelectorClick(event) {
  var trigger = event.target.closest('[data-inquiry-select]');
  if (!trigger || !inquiryEngineState || !inquiryEngineState.store) return;

  inquiryEngineState.store.activeInquiryId = trigger.getAttribute('data-inquiry-select');
  saveInquiryStore(inquiryEngineState.store);
  renderInquiryEngine();
}

function handleInquiryWorkspaceClick(event) {
  var createTrigger = event.target.closest('[data-inquiry-create]');
  if (createTrigger) {
    handleInquiryCreateClick();
    return;
  }
  var trigger = event.target.closest('[data-inquiry-action]');
  if (!trigger) return;
  handleInquiryAction(trigger.getAttribute('data-inquiry-action'));
}

function handleInquiryCreateClick() {
  var name = window.prompt('Namn på person eller organisation för ny förfrågan:');
  if (!name) return;
  var cleanedName = String(name).trim();
  if (!cleanedName) return;

  var contact = window.prompt('Kontaktuppgift (e-post):') || '';
  var objective = window.prompt('Current objective för denna inquiry:') || '';

  if (!inquiryEngineState || !inquiryEngineState.store) return;
  var store = inquiryEngineState.store;

  var inquiryId = getNextInquiryId(store);
  var now = inquiryNowIsoTime();

  var inquiry = {
    id: inquiryId,
    title: 'Ny förfrågan – ' + cleanedName,
    person: {
      name: cleanedName,
      email: contact.trim(),
      phone: '',
      workspaceId: null,
      channel: 'Incoming Inquiry',
    },
    createdAt: now,
    updatedAt: now,
    currentStage: 'incoming',
    status: 'active',
    currentObjective: objective.trim(),
    assessment: { status: 'pending', summary: '' },
    recommendation: { currentJourneyId: null, note: '', history: [] },
    decision: { state: 'pending', note: '' },
    outcome: { state: 'open', note: '' },
    bookingPreparation: {
      availabilityChecked: false,
      pricingConfirmed: false,
      termsReviewed: false,
    },
    relationship: {
      linkedRelationshipId: null,
      entryPointId: null,
    },
    dialogue: [],
    notes: [],
    documents: [],
    lifecycle: [
      { id: 'L-' + Date.now().toString(36), stage: 'incoming', timestamp: now, note: 'Incoming inquiry opened.' },
    ],
  };

  store.inquiries.unshift(inquiry);
  store.activeInquiryId = inquiryId;
  saveInquiryStore(store);
  renderInquiryEngine();
}

function bindInquiryHandlers() {
  if (inquiryEngineHandlersBound) return;

  var selector = document.getElementById('inquiry-selector');
  var workspace = document.getElementById('inquiry-workspace');
  var createButton = document.getElementById('inquiry-create-button');

  if (selector) selector.addEventListener('click', handleInquirySelectorClick);
  if (workspace) workspace.addEventListener('click', handleInquiryWorkspaceClick);
  if (workspace) {
    workspace.addEventListener('change', function(event) {
      var checkbox = event.target.closest('[data-inquiry-prep]');
      if (!checkbox) return;
      var field = checkbox.getAttribute('data-inquiry-prep');
      updateActiveInquiry(function(inquiry) {
        inquiry.bookingPreparation = inquiry.bookingPreparation || {};
        inquiry.bookingPreparation[field] = !!checkbox.checked;
        addInquiryLifecycleEntry(inquiry, 'decision', 'Booking preparation uppdaterad: ' + field + '.');
      });
    });
  }
  if (createButton) createButton.addEventListener('click', handleInquiryCreateClick);

  inquiryEngineHandlersBound = true;
}

function renderInquiryEngine() {
  var store = getInquiryStore();
  var activeInquiry = ensureActiveInquiry(store);
  var journeys = cloneValue(getJourneyRegister());
  var planning = cloneValue(getPlanningRegister());
  var relationships = cloneValue(getRelationshipRegister());

  inquiryEngineState = {
    store: store,
    activeInquiry: activeInquiry,
    journeys: journeys,
    planning: planning,
    relationships: relationships,
  };
  renderInquirySelector(store.inquiries || [], store.activeInquiryId);
  bindInquiryHandlers();

  var workspace = document.getElementById('inquiry-workspace');
  if (!workspace) return;

  if (!activeInquiry) {
    workspace.innerHTML = renderInquiryEmptyState();
  } else {
    workspace.innerHTML = renderInquiryWorkspace(activeInquiry, store, journeys, planning, relationships);
  }

  if (typeof feather !== 'undefined') feather.replace();
}
