/* ========================================
   AlpenTind Platform Preview
   Register Workspace – Reusable Pattern (ESR-008)

   renderRegisterWorkspace(container, config)

   config = {
     situation: {
       icon: string,                      // single-letter abbreviation shown as avatar
       title: string,
       badges: [{ text, variant }],       // badge-success / badge-warning / badge-primary / etc.
       fields: [{ label, value }],        // metadata rows (Region, Typ, Readiness, …)
       purpose: string,                   // short operational purpose statement
     },
     work: {
       heading: string,                   // section label, e.g. "Work"
       items: [{
         id: string,
         label: string,
         priority: 'high' | 'medium' | 'low',
         note: string,                    // optional
       }],
     },
     context: {
       heading: string,                   // section label, e.g. "Context"
       sections: [{
         id: string,
         heading: string,
         items: [{ label, value, href }],
         wide: bool,                      // true → spans full grid width
       }],
     },
     actions_heading: string,             // section label, e.g. "Actions"
     actions: [{
       label: string,
       icon: string,                      // feather icon name
       href: string,
       variant: string,                   // btn-secondary / btn-primary / btn-tertiary
     }],
   }
   ======================================== */

function escapeRegisterHtml(value) {
  if (typeof escapePreviewHtml === 'function') return escapePreviewHtml(value);
  return String(value == null ? '' : value).replace(/[&<>"']/g, function(c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function buildWorkPriorityVariant(priority) {
  if (priority === 'high')   return 'danger';
  if (priority === 'medium') return 'warning';
  return 'info';
}

function buildWorkPriorityLabel(priority) {
  if (priority === 'high')   return 'Hög';
  if (priority === 'medium') return 'Medel';
  return 'Låg';
}

// ----------------------------------------
// Situation
// ----------------------------------------
function buildRegisterWorkspaceSituation(situation) {
  var esc = escapeRegisterHtml;

  var badgesHtml = (situation.badges || []).map(function(badge) {
    return '<span class="badge badge-' + esc(badge.variant || 'primary') + '">' + esc(badge.text) + '</span>';
  }).join('');

  var fieldsHtml = (situation.fields || []).map(function(field) {
    return '<div class="register-situation-field">'
      + '<span class="register-situation-field-label">' + esc(field.label) + '</span>'
      + '<span class="register-situation-field-value">' + esc(field.value) + '</span>'
      + '</div>';
  }).join('');

  var iconHtml = situation.icon
    ? '<div class="workspace-avatar register-workspace-avatar" aria-hidden="true">' + esc(situation.icon) + '</div>'
    : '';

  var purposeHtml = situation.purpose
    ? '<p class="workspace-supporting-text register-situation-purpose">' + esc(situation.purpose) + '</p>'
    : '';

  return '<div class="workspace-header-main">'
    + iconHtml
    + '<div class="workspace-header-content">'
    +   '<div>'
    +     '<h1 class="workspace-title" id="rw-situation-title">' + esc(situation.title) + '</h1>'
    +     '<div class="workspace-header-meta">' + badgesHtml + '</div>'
    +   '</div>'
    +   purposeHtml
    +   (fieldsHtml ? '<div class="register-situation-fields">' + fieldsHtml + '</div>' : '')
    + '</div>'
    + '</div>';
}

// ----------------------------------------
// Work
// ----------------------------------------
function buildRegisterWorkspaceWork(work) {
  var esc = escapeRegisterHtml;
  var items = work.items || [];

  if (items.length === 0) {
    return '<div class="register-work-empty">'
      + '<i data-feather="check-circle" style="width:18px;height:18px;color:var(--color-success)" aria-hidden="true"></i>'
      + '<span>Inga öppna arbetspunkter.</span>'
      + '</div>';
  }

  var itemsHtml = items.map(function(item) {
    var variant = buildWorkPriorityVariant(item.priority);
    var label   = buildWorkPriorityLabel(item.priority);
    var noteHtml = item.note
      ? '<span class="register-work-note">' + esc(item.note) + '</span>'
      : '';
    return '<div class="register-work-item register-work-item--' + esc(variant) + '" role="listitem">'
      + '<span class="register-work-priority-dot register-work-priority-dot--' + esc(variant) + '" aria-label="Prioritet: ' + esc(label) + '" title="' + esc(label) + '"></span>'
      + '<span class="register-work-label">' + esc(item.label) + '</span>'
      + noteHtml
      + '<span class="badge badge-' + esc(variant) + ' register-work-badge">' + esc(label) + '</span>'
      + '</div>';
  }).join('');

  return '<div class="register-work-list" role="list">' + itemsHtml + '</div>';
}

// ----------------------------------------
// Context
// ----------------------------------------
function buildRegisterWorkspaceContext(context) {
  var esc = escapeRegisterHtml;
  var sections = context.sections || [];

  return sections.map(function(section) {
    var itemsHtml = (section.items || []).map(function(item) {
      var valueHtml = item.href
        ? '<a href="' + esc(item.href) + '" class="link">' + esc(item.value) + '</a>'
        : esc(item.value);
      return '<div class="dialog-info-group">'
        + '<p class="dialog-info-label">' + esc(item.label) + '</p>'
        + '<p class="dialog-info-value">' + valueHtml + '</p>'
        + '</div>';
    }).join('');

    var wideClass = section.wide ? ' workspace-block--wide' : '';

    return '<section class="card workspace-block' + wideClass + '" aria-labelledby="rw-ctx-' + esc(section.id) + '">'
      + '<div class="card-header">'
      +   '<h2 id="rw-ctx-' + esc(section.id) + '">' + esc(section.heading) + '</h2>'
      + '</div>'
      + '<div class="card-body">' + itemsHtml + '</div>'
      + '</section>';
  }).join('');
}

// ----------------------------------------
// Actions
// ----------------------------------------
function buildRegisterWorkspaceActions(actions) {
  var esc = escapeRegisterHtml;
  return (actions || []).map(function(action) {
    var variant  = action.variant || 'secondary';
    var iconHtml = action.icon
      ? '<i data-feather="' + esc(action.icon) + '" style="width:16px;height:16px" aria-hidden="true"></i>'
      : '';
    if (action.guidance) {
      var guidanceAttr = JSON.stringify(action.guidance).replace(/"/g, '&quot;');
      return '<button class="btn btn-' + esc(variant) + '" type="button" data-guidance="' + guidanceAttr + '">'
        + iconHtml + esc(action.label) + '</button>';
    }
    if (action.href) {
      return '<a class="btn btn-' + esc(variant) + '" href="' + esc(action.href) + '">' + iconHtml + esc(action.label) + '</a>';
    }
    return '<button class="btn btn-' + esc(variant) + '" type="button">' + iconHtml + esc(action.label) + '</button>';
  }).join('');
}

// ----------------------------------------
// Main entry point
// ----------------------------------------
function renderRegisterWorkspace(container, config) {
  if (!container) return;
  var esc = escapeRegisterHtml;

  var workItemCount = (config.work && config.work.items && config.work.items.length) || 0;
  var workHeading   = esc((config.work && config.work.heading) || 'Work');
  var ctxHeading    = esc((config.context && config.context.heading) || 'Context');
  var actHeading    = esc(config.actions_heading || 'Actions');

  var workBadgeHtml = workItemCount > 0
    ? '<span class="badge badge-warning">' + esc(String(workItemCount)) + (workItemCount === 1 ? ' punkt' : ' punkter') + '</span>'
    : '<span class="badge badge-success">Klar</span>';

  container.innerHTML =
    // Situation
    '<section class="workspace-header register-workspace-situation" aria-labelledby="rw-situation-title">'
    + buildRegisterWorkspaceSituation(config.situation || {})
    + '</section>'

    // Work
    + '<section class="card register-workspace-work" aria-labelledby="rw-work-heading">'
    +   '<div class="card-header">'
    +     '<h2 id="rw-work-heading">' + workHeading + '</h2>'
    +     workBadgeHtml
    +   '</div>'
    +   '<div class="card-body">'
    +     buildRegisterWorkspaceWork(config.work || {})
    +   '</div>'
    + '</section>'

    // Context
    + '<section class="register-workspace-context content-section" aria-labelledby="rw-context-heading">'
    +   '<div class="section-header">'
    +     '<h2 id="rw-context-heading">' + ctxHeading + '</h2>'
    +   '</div>'
    +   '<div class="workspace-grid">'
    +     buildRegisterWorkspaceContext(config.context || {})
    +   '</div>'
    + '</section>'

    // Actions
    + '<section class="register-workspace-actions content-section" aria-labelledby="rw-actions-heading">'
    +   '<div class="section-header">'
    +     '<h2 id="rw-actions-heading">' + actHeading + '</h2>'
    +   '</div>'
    +   '<div class="quick-actions">'
    +     buildRegisterWorkspaceActions(config.actions || [])
    +   '</div>'
    + '</section>';

  if (typeof feather !== 'undefined') feather.replace();

  var guidanceButtons = container.querySelectorAll('[data-guidance]');
  for (var gi = 0; gi < guidanceButtons.length; gi++) {
    (function(btn) {
      btn.addEventListener('click', function() {
        try {
          var guidance = JSON.parse(btn.getAttribute('data-guidance'));
          if (typeof showWorkflowGuidance === 'function') showWorkflowGuidance(guidance);
        } catch (e) {}
      });
    })(guidanceButtons[gi]);
  }
}

// ----------------------------------------
// Accommodation-specific config builder
// ----------------------------------------
function buildAccommodationWorkspaceConfig(region, accommodation, detail) {
  var esc = escapeRegisterHtml;

  var icon = accommodation.name
    ? accommodation.name.split(/\s+/).slice(0, 2).map(function(w) { return w[0]; }).join('').toUpperCase()
    : '?';

  var statusVariant = (detail && detail.status === 'Aktiv') ? 'success' : 'warning';

  var situationBadges = [
    { text: (detail && detail.status) || accommodation.readiness, variant: statusVariant },
    { text: accommodation.type, variant: 'primary' },
  ];

  var situationFields = [
    { label: 'Region', value: region.name },
    { label: 'Plats', value: accommodation.place },
    { label: 'Readiness', value: accommodation.readiness },
  ];

  var workItems = (detail && detail.workItems) || [];

  var contextSections = [];

  if (detail && detail.contact) {
    var c = detail.contact;
    var contactItems = [];
    if (c.name)     contactItems.push({ label: 'Kontaktperson',  value: c.name });
    if (c.phone)    contactItems.push({ label: 'Telefon',        value: c.phone });
    if (c.email)    contactItems.push({ label: 'E-post',         value: c.email });
    if (c.language) contactItems.push({ label: 'Språk',         value: c.language });
    if (contactItems.length > 0) {
      contextSections.push({ id: 'contact', heading: 'Kontakt', items: contactItems });
    }
  }

  if (detail && detail.pricing) {
    var p = detail.pricing;
    var pricingItems = [];
    if (p.halfBoard)     pricingItems.push({ label: 'Halvpension',      value: p.halfBoard });
    if (p.fullBoard)     pricingItems.push({ label: 'Helpension',       value: p.fullBoard });
    if (p.groupDiscount) pricingItems.push({ label: 'Grupprabatt',    value: p.groupDiscount });
    if (p.notes)         pricingItems.push({ label: 'Notering',         value: p.notes });
    if (pricingItems.length > 0) {
      contextSections.push({ id: 'pricing', heading: 'Priser', items: pricingItems });
    }
  }

  if (detail && detail.capacity) {
    var cap = detail.capacity;
    var capacityItems = [];
    if (cap.totalBeds)    capacityItems.push({ label: 'Totalt bäddar',  value: String(cap.totalBeds) });
    if (cap.groupMaximum) capacityItems.push({ label: 'Max gruppstorlek', value: String(cap.groupMaximum) + ' personer' });
    if (cap.roomTypes)    capacityItems.push({ label: 'Rumstyper',       value: cap.roomTypes });
    if (capacityItems.length > 0) {
      contextSections.push({ id: 'capacity', heading: 'Kapacitet', items: capacityItems });
    }
  }

  if (detail && detail.season) {
    var s = detail.season;
    var seasonItems = [];
    if (s.openPeriod) seasonItems.push({ label: 'Öppen',        value: s.openPeriod });
    if (s.peakPeriod) seasonItems.push({ label: 'Högsäsong',    value: s.peakPeriod });
    if (seasonItems.length > 0) {
      contextSections.push({ id: 'season', heading: 'Säsong', items: seasonItems });
    }
  }

  if (detail && detail.documents && detail.documents.length > 0) {
    var docItems = detail.documents.map(function(doc) {
      return { label: doc.label, value: doc.note || '' };
    });
    contextSections.push({ id: 'documents', heading: 'Dokument', items: docItems });
  }

  if (detail && detail.notes) {
    contextSections.push({
      id: 'notes',
      heading: 'Interna noteringar',
      items: [{ label: 'Noteringar', value: detail.notes }],
    });
  }

  if (detail && detail.history && detail.history.length > 0) {
    var historyItems = detail.history.map(function(entry) {
      return { label: entry.date, value: entry.text };
    });
    contextSections.push({ id: 'history', heading: 'Historik', items: historyItems, wide: true });
  }

  var regionSlug = region.slug || '';
  var accommodationId = accommodation.id || '';

  var actions = [
    {
      label: 'Redigera',
      icon: 'edit-2',
      href: 'accommodations-add.html?region=' + encodeURIComponent(regionSlug) + '&accommodation=' + encodeURIComponent(accommodationId) + '&mode=edit',
      variant: 'primary',
    },
    {
      label: 'Öppna kontakt',
      icon: 'user',
      variant: 'secondary',
      guidance: {
        intent: 'You are currently working to continue communication related to this accommodation.',
        capability: 'Here you will be able to open the responsible contact and manage relationship and communication directly in the platform.',
        phase: 'This part of the platform is introduced in a later phase of the Contact Engine. When that phase is active, this workflow continues here.',
      },
    },
    {
      label: 'Öppna dokument',
      icon: 'file-text',
      variant: 'secondary',
      guidance: {
        intent: 'You are currently working to review documentation connected to this accommodation.',
        capability: 'Here you will be able to open documents linked to the accommodation, such as agreements, price lists, and other operational material.',
        phase: 'This part of the platform is introduced in a later phase of the Document Engine. When that phase is active, this workflow continues here.',
      },
    },
    {
      label: 'Visa i planering',
      icon: 'map',
      variant: 'secondary',
      guidance: {
        intent: 'You are currently working to understand where this accommodation is used in planning.',
        capability: 'Here you will be able to view planning projects that reference this accommodation.',
        phase: 'This part of the platform is introduced in a later phase of Planning Usage. When that phase is active, this workflow continues here.',
      },
    },
    {
      label: 'Arkivera',
      icon: 'archive',
      variant: 'tertiary',
      guidance: {
        intent: 'You are currently working to manage the lifecycle of this accommodation.',
        capability: 'Here you will be able to archive the accommodation while preserving historical operational references.',
        phase: 'This part of the platform is introduced in a later phase of Register Lifecycle Management. When that phase is active, this workflow continues here.',
      },
    },
  ];

  return {
    situation: {
      icon:    icon,
      title:   accommodation.name,
      badges:  situationBadges,
      fields:  situationFields,
      purpose: (detail && detail.purpose) || '',
    },
    work: {
      heading: 'Work',
      items:   workItems,
    },
    context: {
      heading:  'Context',
      sections: contextSections,
    },
    actions_heading: 'Actions',
    actions: actions,
  };
}
