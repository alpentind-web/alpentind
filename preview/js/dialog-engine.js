var DIALOG_ENGINE_STORE_KEY = 'alpentind-dialog-engine-store';
var DIALOG_ENGINE_VERSION = 2;
var INQUIRY_ENGINE_STORE_KEY = 'alpentind-inquiry-engine-store';

var dialogEngineState = null;
var dialogHandlersBound = false;
var dialogAutoSaveTimeoutId = null;
var dialogSaveErrorVisible = false;
var dialogSaveErrorDialogId = null;
var dialogLastSnapshot = '';
var DIALOG_AUTOSAVE_DEBOUNCE_MS = 700;

function dialogEscapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function dialogNowIsoTime() {
  return new Date().toISOString();
}

function dialogFormatDate(value) {
  if (!value) return '–';
  return new Date(value).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function buildEmptyDialogStore() {
  return {
    version: DIALOG_ENGINE_VERSION,
    activeDialogId: null,
    dialogs: [],
  };
}

function parseLegacyDialogDate(value) {
  var cleanValue = String(value || '').trim().toLowerCase();
  if (!cleanValue) return dialogNowIsoTime();
  var monthMap = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    maj: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    okt: '10',
    nov: '11',
    dec: '12',
  };
  var match = cleanValue.match(/^(\d{1,2})\s+(jan|feb|mar|apr|maj|jun|jul|aug|sep|okt|nov|dec)\s+(\d{4})$/);
  if (!match) return dialogNowIsoTime();
  return match[3] + '-' + monthMap[match[2]] + '-' + String(match[1]).padStart(2, '0') + 'T09:00:00.000Z';
}

function buildInitialDialogEntriesFromContacts() {
  if (typeof CONTACT_MOCK_DATA === 'undefined' || !CONTACT_MOCK_DATA || !Array.isArray(CONTACT_MOCK_DATA.contacts)) {
    return [];
  }

  var dialogs = [];
  CONTACT_MOCK_DATA.contacts.forEach(function(contact) {
    var history = contact && contact.history;
    var historyDialogs = history && Array.isArray(history.dialogs) ? history.dialogs : [];
    historyDialogs.forEach(function(historyDialog) {
      var isoDate = parseLegacyDialogDate(historyDialog.date);
      dialogs.push(createDialogRecord({
        id: 'DIALOG-' + String(dialogs.length + 1).padStart(3, '0'),
        name: contact.name || '',
        email: contact.email || '',
        telephone: contact.telephone || '',
        address: contact.address || '',
        notes: historyDialog.summary || '',
        contactId: contact.id || null,
        contactCategory: contact.category || 'Gäst',
        source: {
          type: 'contact-history-seed',
          legacyDialogId: historyDialog.id || null,
        },
      }));
      dialogs[dialogs.length - 1].createdAt = isoDate;
      dialogs[dialogs.length - 1].updatedAt = isoDate;
    });
  });

  dialogs.sort(function(a, b) {
    return String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
  });
  return dialogs;
}

function normalizeDialogStore(store) {
  var normalized = Object.assign(buildEmptyDialogStore(), store || {});
  normalized.dialogs = Array.isArray(normalized.dialogs)
    ? normalized.dialogs.filter(function(dialog) { return dialog && dialog.id; }).map(function(dialog) {
        return {
          id: dialog.id,
          name: String(dialog.name || ''),
          email: String(dialog.email || ''),
          telephone: String(dialog.telephone || dialog.phone || ''),
          address: String(dialog.address || ''),
          notes: String(dialog.notes || ''),
          topics: Array.isArray(dialog.topics)
            ? dialog.topics.filter(function(topic) { return topic && topic.id; }).map(function(topic) {
                return {
                  id: topic.id,
                  title: String(topic.title || ''),
                  notes: String(topic.notes || ''),
                };
              })
            : [],
          contactId: dialog.contactId || null,
          contactCategory: String(dialog.contactCategory || ''),
          source: dialog.source || null,
          state: dialog.state === 'Archived' ? 'Archived' : 'Active',
          createdAt: dialog.createdAt || dialogNowIsoTime(),
          updatedAt: dialog.updatedAt || dialogNowIsoTime(),
        };
      })
    : [];

  if (!normalized.dialogs.some(function(dialog) { return dialog.id === normalized.activeDialogId; })) {
    normalized.activeDialogId = normalized.dialogs.length > 0 ? normalized.dialogs[0].id : null;
  }

  return normalized;
}

function getDialogStore() {
  var raw = typeof localStorage !== 'undefined' ? localStorage.getItem(DIALOG_ENGINE_STORE_KEY) : null;
  if (raw) {
    try {
      var parsed = JSON.parse(raw);
      var normalized = normalizeDialogStore(parsed);
      if (parsed.version !== normalized.version) {
        saveDialogStore(normalized);
      }
      return normalized;
    } catch (e) {
      // ignore broken state
    }
  }
  var emptyStore = buildEmptyDialogStore();
  emptyStore.dialogs = buildInitialDialogEntriesFromContacts();
  emptyStore.activeDialogId = emptyStore.dialogs.length > 0 ? emptyStore.dialogs[0].id : null;
  saveDialogStore(emptyStore);
  return emptyStore;
}

function saveDialogStore(store) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(DIALOG_ENGINE_STORE_KEY, JSON.stringify(store));
  }
}

function getActiveDialog(store) {
  if (!store || !store.dialogs || store.dialogs.length === 0) return null;
  return store.dialogs.find(function(dialog) { return dialog.id === store.activeDialogId; }) || store.dialogs[0];
}

function getNextDialogId(store) {
  var maxNumber = (store.dialogs || []).reduce(function(max, dialog) {
    var match = String(dialog.id || '').match(/^DIALOG-(\d+)$/);
    var current = match ? Number(match[1]) : 0;
    return current > max ? current : max;
  }, 0);
  return 'DIALOG-' + String(maxNumber + 1).padStart(3, '0');
}

function getNextTopicId(dialog) {
  var maxNumber = (dialog.topics || []).reduce(function(max, topic) {
    var match = String(topic.id || '').match(/^TOPIC-(\d+)$/);
    var current = match ? Number(match[1]) : 0;
    return current > max ? current : max;
  }, 0);
  return 'TOPIC-' + String(maxNumber + 1).padStart(3, '0');
}

function createDialogRecord(input) {
  var now = dialogNowIsoTime();
  return {
    id: input.id,
    name: String(input.name || '').trim(),
    email: String(input.email || '').trim(),
    telephone: String(input.telephone || '').trim(),
    address: String(input.address || '').trim(),
    notes: String(input.notes || '').trim(),
    topics: [],
    contactId: input.contactId || null,
    contactCategory: String(input.contactCategory || '').trim(),
    source: input.source || null,
    state: 'Active',
    createdAt: now,
    updatedAt: now,
  };
}

function getTopicSuggestions(store, activeDialogId) {
  var titles = {};
  (store.dialogs || []).forEach(function(dialog) {
    if (dialog.id === activeDialogId) return;
    (dialog.topics || []).forEach(function(topic) {
      var title = String(topic.title || '').trim();
      if (title) titles[title] = true;
    });
  });
  return Object.keys(titles).sort(function(a, b) { return a.localeCompare(b, 'sv'); });
}

function createDialogFromInquiryEntry(store, inquiryId) {
  if (!inquiryId) return false;

  var existing = store.dialogs.find(function(dialog) {
    return dialog.source && dialog.source.type === 'inquiry' && dialog.source.inquiryId === inquiryId;
  });
  if (existing) {
    store.activeDialogId = existing.id;
    return true;
  }

  var rawInquiryStore = localStorage.getItem(INQUIRY_ENGINE_STORE_KEY);
  if (!rawInquiryStore) return false;

  try {
    var inquiryStore = JSON.parse(rawInquiryStore);
    var inquiry = Array.isArray(inquiryStore.inquiries)
      ? inquiryStore.inquiries.find(function(item) { return item && item.id === inquiryId; })
      : null;
    if (!inquiry) return false;

    var id = getNextDialogId(store);
    var dialog = createDialogRecord({
      id: id,
      name: inquiry.name || '',
      email: inquiry.email || '',
      telephone: inquiry.phone || '',
      notes: inquiry.notes || '',
      source: { type: 'inquiry', inquiryId: inquiryId },
    });

    store.dialogs.unshift(dialog);
    store.activeDialogId = id;
    return true;
  } catch (e) {
    return false;
  }
}

function createDialogFromContactEntry(store, params) {
  var contactId = String(params.get('contactId') || '').trim();
  var contact = contactId ? getContact(contactId) : null;
  var name = String(contact ? contact.name : (params.get('name') || '')).trim();
  var email = String(contact ? contact.email : (params.get('email') || '')).trim();
  var telephone = String(contact ? contact.telephone : (params.get('telephone') || params.get('phone') || '')).trim();
  var address = String(contact ? contact.address : (params.get('address') || '')).trim();
  var notes = String(params.get('notes') || '').trim();

  if (!hasAnyDialogContactField({
    name: name,
    email: email,
    telephone: telephone,
    address: address,
    notes: notes,
  }) && !contactId) return false;

  var id = getNextDialogId(store);
  var dialog = createDialogRecord({
    id: id,
    name: name,
    email: email,
    telephone: telephone,
    address: address,
    notes: notes,
    contactId: contact ? contact.id : null,
    contactCategory: contact ? contact.category : 'Gäst',
    source: { type: 'contact', contactId: contact ? contact.id : null },
  });
  store.dialogs.unshift(dialog);
  store.activeDialogId = id;
  return true;
}

function hasAnyDialogContactField(fields) {
  return ['name', 'email', 'telephone', 'address', 'notes'].some(function(field) {
    return Boolean(String(fields[field] || '').trim());
  });
}

function createEmptyDialogEntry(store) {
  var id = getNextDialogId(store);
  store.dialogs.unshift(createDialogRecord({
    id: id,
    source: { type: 'empty' },
  }));
  store.activeDialogId = id;
  return true;
}

// ── Inquiry consumption ───────────────────────────────────────────────────────
// Called only after confirmed successful Dialog creation.
// Removes the originating Inquiry from the Inquiry store so the register stays clean.
// If anything fails the Inquiry is silently retained.

function consumeInquiryAfterDialogCreation(inquiryId) {
  if (!inquiryId) return;
  try {
    var raw = typeof localStorage !== 'undefined'
      ? localStorage.getItem(INQUIRY_ENGINE_STORE_KEY)
      : null;
    if (!raw) return;
    var store = JSON.parse(raw);
    if (!store || !Array.isArray(store.inquiries)) return;
    store.inquiries = store.inquiries.filter(function(item) {
      return item && item.id !== inquiryId;
    });
    if (store.activeInquiryId === inquiryId) {
      store.activeInquiryId = store.inquiries.length > 0 ? store.inquiries[0].id : null;
    }
    localStorage.setItem(INQUIRY_ENGINE_STORE_KEY, JSON.stringify(store));
  } catch (e) {
    // storage unavailable or parse error – Inquiry silently retained
  }
}

function handleDialogEntryPoint(store) {
  var params = new URLSearchParams(window.location.search || '');
  var from = params.get('from');
  var requestedDialogId = params.get('dialogId');
  var changed = false;

  if (requestedDialogId && store.dialogs.some(function(dialog) { return dialog.id === requestedDialogId; })) {
    store.activeDialogId = requestedDialogId;
    changed = true;
  } else if (from === 'inquiry') {
    var inquiryId = params.get('id');
    changed = createDialogFromInquiryEntry(store, inquiryId);
    if (changed && inquiryId) {
      consumeInquiryAfterDialogCreation(inquiryId);
    }
  } else if (from === 'contact') {
    changed = createDialogFromContactEntry(store, params);
  } else if (from === 'empty') {
    changed = createEmptyDialogEntry(store);
  }

  if (changed) {
    saveDialogStore(store);
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', 'dialog.html');
    }
  }
}

function getDialogPreview(dialog) {
  var notesPreview = String(dialog.notes || '').replace(/\s+/g, ' ').trim();
  if (notesPreview) return notesPreview.slice(0, 64);

  var firstTopicWithNotes = (dialog.topics || []).find(function(topic) {
    return String(topic.notes || '').trim() || String(topic.title || '').trim();
  });

  if (!firstTopicWithNotes) return 'Inga anteckningar';

  var topicTitle = String(firstTopicWithNotes.title || '').trim();
  var topicNotes = String(firstTopicWithNotes.notes || '').replace(/\s+/g, ' ').trim();
  if (topicNotes) return topicTitle ? (topicTitle + ': ' + topicNotes).slice(0, 64) : topicNotes.slice(0, 64);
  return topicTitle || 'Inga anteckningar';
}

function renderDialogInbox(dialogs, activeId) {
  if (!dialogs || dialogs.length === 0) {
    return '<p class="dialog-inbox-empty">Inga aktiva dialoger.</p>';
  }

  return dialogs.map(function(dialog) {
    var activeClass = dialog.id === activeId ? ' active' : '';
    return ''
      + '<button class="dialog-inbox-row' + activeClass + '" type="button" data-dialog-select="' + dialogEscapeHtml(dialog.id) + '">'
      +   '<span class="dialog-inbox-row-name">' + dialogEscapeHtml(dialog.name || 'Namnlös dialog') + '</span>'
      +   '<span class="dialog-inbox-row-date">' + dialogEscapeHtml(dialogFormatDate(dialog.updatedAt)) + '</span>'
      +   '<span class="dialog-inbox-row-preview">' + dialogEscapeHtml(getDialogPreview(dialog)) + '</span>'
      + '</button>';
  }).join('');
}

function renderDialogWorkspace(dialog) {
  if (!dialog) {
    return ''
      + '<div class="card">'
      +   '<div class="card-body">'
      +     '<div class="empty-state">'
      +       '<i data-feather="inbox" style="width:40px;height:40px" aria-hidden="true"></i>'
      +       '<p class="text-muted">Skapa en tom dialog eller öppna en dialog från Förfrågningar eller Kontakter.</p>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  var topics = (dialog.topics || []).map(function(topic) {
    return ''
      + '<div class="dialog-topic" data-topic-id="' + dialogEscapeHtml(topic.id) + '">'
      +   '<div class="dialog-topic-header">'
      +     '<input class="dialog-input dialog-topic-title" type="text" data-topic-field="title" data-topic-id="' + dialogEscapeHtml(topic.id) + '" value="' + dialogEscapeHtml(topic.title) + '" placeholder="Titel">'
      +     '<button class="btn btn-sm btn-tertiary" type="button" data-dialog-action="delete-topic" data-topic-id="' + dialogEscapeHtml(topic.id) + '">Ta bort topic</button>'
      +   '</div>'
      +   '<textarea class="dialog-topic-notes" data-topic-field="notes" data-topic-id="' + dialogEscapeHtml(topic.id) + '" placeholder="Anteckningar">' + dialogEscapeHtml(topic.notes) + '</textarea>'
      + '</div>';
  }).join('');

  return ''
    + '<div class="card dialog-workspace-card">'
    +   '<div class="card-header dialog-workspace-header">'
    +     '<span class="dialog-workspace-id">' + dialogEscapeHtml(dialog.id) + '</span>'
    +     '<div class="dialog-workspace-status">'
    +       '<span class="text-muted dialog-workspace-updated-at" id="dialog-workspace-updated-at">' + dialogEscapeHtml(dialogFormatDate(dialog.updatedAt)) + '</span>'
    +     '</div>'
    +   '</div>'
    +   '<div class="card-body dialog-workspace-body">'
    +     '<div class="dialog-save-error" id="dialog-save-error" role="alert" aria-live="assertive" hidden>'
    +       '<span>Kunde inte spara ändringarna.</span>'
    +       '<button class="btn btn-tertiary btn-sm" type="button" data-dialog-action="retry-save">Försök igen</button>'
    +     '</div>'
    +     '<section class="dialog-section" aria-labelledby="dialog-person-heading">'
    +       '<h2 id="dialog-person-heading">Person</h2>'
    +       '<div class="dialog-field-grid">'
    +         '<div class="dialog-field">'
    +           '<label class="dialog-label" for="dialog-person-name">Namn</label>'
    +           '<input class="dialog-input" id="dialog-person-name" type="text" data-dialog-field="name" value="' + dialogEscapeHtml(dialog.name) + '">'
    +         '</div>'
    +         '<div class="dialog-field">'
    +           '<label class="dialog-label" for="dialog-person-email">E-post</label>'
    +           '<input class="dialog-input" id="dialog-person-email" type="email" data-dialog-field="email" value="' + dialogEscapeHtml(dialog.email) + '">'
    +         '</div>'
    +         '<div class="dialog-field">'
    +           '<label class="dialog-label" for="dialog-person-telephone">Telefon</label>'
    +           '<input class="dialog-input" id="dialog-person-telephone" type="tel" data-dialog-field="telephone" value="' + dialogEscapeHtml(dialog.telephone) + '">'
    +         '</div>'
    +   '<div class="dialog-field" style="grid-column:1 / -1;">'
    +     '<label class="dialog-label" for="dialog-person-address">Adress</label>'
    +     '<input class="dialog-input" id="dialog-person-address" type="text" data-dialog-field="address" value="' + dialogEscapeHtml(dialog.address) + '">'
    +   '</div>'
    + '</div>'
    + '</section>'
    +     '<section class="dialog-section" aria-labelledby="dialog-notes-heading">'
    +       '<h2 id="dialog-notes-heading">General Notes</h2>'
    +       '<textarea class="dialog-general-notes" data-dialog-field="notes" placeholder="Anteckningar">' + dialogEscapeHtml(dialog.notes) + '</textarea>'
    +     '</section>'
    +     '<section class="dialog-section" aria-labelledby="dialog-topics-heading">'
    +       '<div class="dialog-topics-header">'
    +         '<h2 id="dialog-topics-heading">Topics</h2>'
    +         '<button class="btn btn-secondary btn-sm" type="button" data-dialog-action="add-topic">Nytt ämne</button>'
    +       '</div>'
    +       '<div class="dialog-topics-list">' + (topics || '<p class="text-muted">Inga topics ännu.</p>') + '</div>'
    +     '</section>'
    +     '<section class="dialog-section dialog-actions" aria-label="Dialog actions">'
    +       '<button class="btn btn-tertiary" type="button" data-dialog-action="delete-dialog">Ta bort dialog</button>'
    +       '<button class="btn btn-secondary" type="button" data-dialog-action="archive-dialog">Arkivera dialog</button>'
    +       '<a class="btn btn-secondary" href="kontakter.html" data-dialog-action="update-contact">Uppdatera kontakt</a>'
    +     '</section>'
    +   '</div>'
    + '</div>';
}

function setDialogSaveErrorState(hasError, dialogId) {
  dialogSaveErrorVisible = Boolean(hasError);
  dialogSaveErrorDialogId = dialogSaveErrorVisible ? dialogId : null;
  var errorEl = document.getElementById('dialog-save-error');
  if (!errorEl) return;
  errorEl.hidden = !dialogSaveErrorVisible;
}

function cancelDialogAutoSave() {
  if (dialogAutoSaveTimeoutId) {
    clearTimeout(dialogAutoSaveTimeoutId);
    dialogAutoSaveTimeoutId = null;
  }
}

function getDialogSnapshotFromWorkspace() {
  if (!dialogEngineState || !dialogEngineState.store) return null;
  var dialog = getActiveDialog(dialogEngineState.store);
  if (!dialog) return null;

  var snapshot = {
    name: dialog.name,
    email: dialog.email,
    telephone: dialog.telephone,
    address: dialog.address,
    notes: dialog.notes,
    topics: (dialog.topics || []).map(function(topic) {
      return {
        id: topic.id,
        title: topic.title,
        notes: topic.notes,
      };
    }),
  };

  var fieldNodes = document.querySelectorAll('[data-dialog-field]');
  fieldNodes.forEach(function(node) {
    var field = node.getAttribute('data-dialog-field');
    if (field) snapshot[field] = String(node.value || '').trim();
  });

  var topicMap = {};
  (snapshot.topics || []).forEach(function(topic) {
    topicMap[topic.id] = topic;
  });

  var topicFieldNodes = document.querySelectorAll('[data-topic-field][data-topic-id]');
  topicFieldNodes.forEach(function(node) {
    var topicId = node.getAttribute('data-topic-id');
    var field = node.getAttribute('data-topic-field');
    var topic = topicMap[topicId];
    if (topic && field) {
      topic[field] = String(node.value || '').trim();
    }
  });

  return snapshot;
}

function getDialogSnapshotFromRecord(dialog) {
  if (!dialog) return '';
  return JSON.stringify({
    name: String(dialog.name || '').trim(),
    email: String(dialog.email || '').trim(),
    telephone: String(dialog.telephone || '').trim(),
    address: String(dialog.address || '').trim(),
    notes: String(dialog.notes || '').trim(),
    topics: (dialog.topics || []).map(function(topic) {
      return {
        id: topic.id,
        title: String(topic.title || '').trim(),
        notes: String(topic.notes || '').trim(),
      };
    }),
  });
}

function refreshDialogLiveMeta(dialog) {
  var updatedAtEl = document.getElementById('dialog-workspace-updated-at');
  if (updatedAtEl) {
    updatedAtEl.textContent = dialogFormatDate(dialog.updatedAt);
  }

  var activeRow = document.querySelector('[data-dialog-select="' + dialog.id + '"]');
  if (activeRow) {
    var dateEl = activeRow.querySelector('.dialog-inbox-row-date');
    var previewEl = activeRow.querySelector('.dialog-inbox-row-preview');
    if (dateEl) dateEl.textContent = dialogFormatDate(dialog.updatedAt);
    if (previewEl) previewEl.textContent = getDialogPreview(dialog);
  }
}

function persistDialogFromWorkspace() {
  cancelDialogAutoSave();
  if (!dialogEngineState || !dialogEngineState.store) return;
  var store = dialogEngineState.store;
  var dialog = getActiveDialog(store);
  if (!dialog) return;

  var snapshot = getDialogSnapshotFromWorkspace();
  if (!snapshot) return;
  var snapshotString = JSON.stringify(snapshot);
  if (snapshotString === dialogLastSnapshot) return;

  dialog.name = snapshot.name;
  dialog.email = snapshot.email;
  dialog.telephone = snapshot.telephone;
  dialog.address = snapshot.address;
  dialog.notes = snapshot.notes;
  (dialog.topics || []).forEach(function(topic) {
    var next = snapshot.topics.find(function(item) { return item.id === topic.id; });
    if (next) {
      topic.title = next.title;
      topic.notes = next.notes;
    }
  });

  var previousUpdatedAt = dialog.updatedAt;
  dialog.updatedAt = dialogNowIsoTime();
  try {
    saveDialogStore(store);
    dialogLastSnapshot = snapshotString;
    refreshDialogLiveMeta(dialog);
    setDialogSaveErrorState(false, dialog.id);
  } catch (e) {
    dialog.updatedAt = previousUpdatedAt;
    console.warn('Dialog auto-save failed for dialog ' + dialog.id + '.', e);
    setDialogSaveErrorState(true, dialog.id);
  }
}

function scheduleDialogAutoSave() {
  cancelDialogAutoSave();
  dialogAutoSaveTimeoutId = setTimeout(function() {
    dialogAutoSaveTimeoutId = null;
    persistDialogFromWorkspace();
  }, DIALOG_AUTOSAVE_DEBOUNCE_MS);
}

function updateContactFromActiveDialog() {
  persistDialogFromWorkspace();
  if (!dialogEngineState || !dialogEngineState.store) return;
  var store = dialogEngineState.store;
  var dialog = getActiveDialog(store);
  if (!dialog) return;

  if (!hasAnyDialogContactField(dialog)) {
    window.alert('Lägg till minst en kontaktuppgift innan kontakten uppdateras.');
    return;
  }

  var matchedContact = findContactMatch({
    name: dialog.name,
    email: dialog.email,
    telephone: dialog.telephone,
  }, dialog.contactId);
  var contactPatch = {
    name: dialog.name,
    telephone: dialog.telephone,
    email: dialog.email,
    address: dialog.address,
    category: matchedContact ? matchedContact.category : (dialog.contactCategory || 'Gäst'),
  };
  var contact = matchedContact;

  if (contact) {
    if (!saveContact(contact.id, contactPatch)) {
      window.alert('Det gick inte att uppdatera kontakten. Försök igen.');
      return;
    }
    contact = getContact(contact.id);
  } else {
    contact = createContact(contactPatch);
    if (!contact) {
      window.alert('Det gick inte att skapa kontakten. Försök igen.');
      return;
    }
  }

  dialog.contactId = contact.id;
  dialog.contactCategory = contact.category;
  dialog.updatedAt = dialogNowIsoTime();
  saveDialogStore(store);
  window.location.href = 'kontakt-workspace.html?id=' + encodeURIComponent(contact.id);
}

function deleteActiveDialog() {
  if (!dialogEngineState || !dialogEngineState.store) return;
  var store = dialogEngineState.store;
  var activeId = store.activeDialogId;
  if (!activeId) return;

  function commitDeleteDialog() {
    store.dialogs = store.dialogs.filter(function(dialog) { return dialog.id !== activeId; });
    store.activeDialogId = store.dialogs.length > 0 ? store.dialogs[0].id : null;
    saveDialogStore(store);
    renderDialog();
  }

  showPlatformConfirmModal({
    title: 'Radera?',
    message: 'Ta bort dialog? Åtgärden kan inte ångras.',
    confirmLabel: 'Ja',
    cancelLabel: 'Nej',
    onConfirm: commitDeleteDialog,
  });
}

function archiveActiveDialog() {
  if (!dialogEngineState || !dialogEngineState.store) return;
  var store = dialogEngineState.store;
  var activeId = store.activeDialogId;
  if (!activeId) return;

  function commitArchiveDialog() {
    var dialog = store.dialogs.find(function(d) { return d.id === activeId; });
    if (!dialog) return;
    dialog.state = 'Archived';
    dialog.updatedAt = dialogNowIsoTime();
    var activeDialogs = store.dialogs
      .filter(function(d) { return d.state !== 'Archived'; })
      .sort(function(a, b) { return String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')); });
    store.activeDialogId = activeDialogs.length > 0 ? activeDialogs[0].id : null;
    saveDialogStore(store);
    renderDialog();
  }

  showPlatformConfirmModal({
    title: 'Arkivera dialog?',
    message: 'Dialogen arkiveras och försvinner från registret. Den förblir tillgänglig via kontaktens historik.',
    confirmLabel: 'Arkivera',
    cancelLabel: 'Avbryt',
    onConfirm: commitArchiveDialog,
  });
}

function addTopicToActiveDialog() {
  if (!dialogEngineState || !dialogEngineState.store) return;
  var store = dialogEngineState.store;
  var dialog = getActiveDialog(store);
  if (!dialog) return;

  var suggestions = getTopicSuggestions(store, dialog.id);
  var suggestionHint = suggestions.length > 0 ? 'Förslag: ' + suggestions.slice(0, 5).join(', ') : '';

  function commitAddTopic(cleanTitle) {
    dialog.topics.push({ id: getNextTopicId(dialog), title: cleanTitle, notes: '' });
    dialog.updatedAt = dialogNowIsoTime();
    saveDialogStore(store);
    renderDialog();
  }

  showPlatformInputModal({
    title: 'Nytt ämne',
    description: suggestionHint,
    placeholder: 'Ämnestitel',
    confirmLabel: 'Skapa',
    cancelLabel: 'Avbryt',
    onConfirm: commitAddTopic,
  });
}

function deleteTopicFromActiveDialog(topicId) {
  if (!dialogEngineState || !dialogEngineState.store) return;
  var store = dialogEngineState.store;
  var dialog = getActiveDialog(store);
  if (!dialog) return;
  function commitDeleteTopic() {
    dialog.topics = (dialog.topics || []).filter(function(topic) { return topic.id !== topicId; });
    dialog.updatedAt = dialogNowIsoTime();
    saveDialogStore(store);
    renderDialog();
  }

  showPlatformConfirmModal({
    title: 'Radera?',
    message: 'Ta bort ämne?',
    confirmLabel: 'Ja',
    cancelLabel: 'Nej',
    onConfirm: commitDeleteTopic,
  });
}

function bindDialogHandlers() {
  if (dialogHandlersBound) return;
  dialogHandlersBound = true;

  document.addEventListener('click', function(event) {
    var target = event.target;

    var selectTrigger = target.closest('[data-dialog-select]');
    if (selectTrigger) {
      if (!dialogEngineState || !dialogEngineState.store) return;
      var dialogId = selectTrigger.getAttribute('data-dialog-select');
      dialogEngineState.store.activeDialogId = dialogId;
      saveDialogStore(dialogEngineState.store);
      renderDialog();
      return;
    }

    if (target.closest('#dialog-create-empty-button')) {
      if (!dialogEngineState || !dialogEngineState.store) return;
      createEmptyDialogEntry(dialogEngineState.store);
      saveDialogStore(dialogEngineState.store);
      renderDialog();
      return;
    }

    var actionTrigger = target.closest('[data-dialog-action]');
    if (actionTrigger) {
      var action = actionTrigger.getAttribute('data-dialog-action');
      if (action === 'delete-dialog') { deleteActiveDialog(); return; }
      if (action === 'archive-dialog') { archiveActiveDialog(); return; }
      if (action === 'add-topic') { addTopicToActiveDialog(); return; }
      if (action === 'retry-save') { persistDialogFromWorkspace(); return; }
      if (action === 'update-contact') {
        event.preventDefault();
        updateContactFromActiveDialog();
        return;
      }
      if (action === 'delete-topic') {
        deleteTopicFromActiveDialog(actionTrigger.getAttribute('data-topic-id'));
        return;
      }
    }
  });

  document.addEventListener('input', function(event) {
    var target = event.target;
    if (target && target.matches('[data-dialog-field], [data-topic-field]')) {
      scheduleDialogAutoSave();
    }
  });

  document.addEventListener('focusout', function(event) {
    var target = event.target;
    if (target && target.matches('[data-dialog-field], [data-topic-field]')) {
      persistDialogFromWorkspace();
    }
  });
}

function renderDialog() {
  renderSidebar();
  renderHeader();

  var store = getDialogStore();
  handleDialogEntryPoint(store);
  var activeDialog = getActiveDialog(store);

  dialogEngineState = { store: store, activeDialog: activeDialog };

  var inboxEl = document.getElementById('dialog-inbox-list');
  var activeDialogs = store.dialogs.filter(function(d) { return d.state !== 'Archived'; });
  if (inboxEl) inboxEl.innerHTML = renderDialogInbox(activeDialogs, store.activeDialogId);

  var workspaceEl = document.getElementById('dialog-workspace-panel');
  if (workspaceEl) workspaceEl.innerHTML = renderDialogWorkspace(activeDialog);

  cancelDialogAutoSave();
  dialogLastSnapshot = getDialogSnapshotFromRecord(activeDialog);

  bindDialogHandlers();
  setDialogSaveErrorState(
    dialogSaveErrorVisible
      && Boolean(activeDialog)
      && dialogSaveErrorDialogId === activeDialog.id,
    activeDialog ? activeDialog.id : null
  );
  if (typeof feather !== 'undefined') feather.replace();
}
