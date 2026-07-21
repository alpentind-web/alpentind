var INQUIRY_ENGINE_STORE_KEY = 'alpentind-inquiry-engine-store';
var INQUIRY_ENGINE_STORE_VERSION = 3;
var INQUIRY_DIALOG_STORE_KEY = 'alpentind-dialog-store';
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

// ── Store ─────────────────────────────────────────────────────────────────────

function buildEmptyInquiryStore() {
  return {
    version: INQUIRY_ENGINE_STORE_VERSION,
    activeInquiryId: null,
    inquiries: [],
  };
}

function isLegacySeedInquiry(inquiry) {
  if (!inquiry || !inquiry.id) return false;
  var fingerprint = LEGACY_INQUIRY_SEED_FINGERPRINTS[inquiry.id];
  return !!(fingerprint
    && (inquiry.title === fingerprint.title || inquiry.name === fingerprint.title)
    && inquiry.createdAt === fingerprint.createdAt);
}

function migrateInquiryToV3(inquiry) {
  if (!inquiry || !inquiry.id) return null;
  if (isLegacySeedInquiry(inquiry)) return null;
  var person = inquiry.person || {};
  var notesText = '';
  if (Array.isArray(inquiry.notes) && inquiry.notes.length > 0) {
    notesText = inquiry.notes.map(function(n) { return n.text || ''; }).filter(Boolean).join('\n');
  }
  return {
    id: inquiry.id,
    name: person.name || inquiry.name || '',
    email: person.email || inquiry.email || '',
    phone: person.phone || inquiry.phone || '',
    notes: notesText,
    readState: inquiry.readState || 'new',
    createdAt: inquiry.createdAt || inquiryNowIsoTime(),
    updatedAt: inquiry.updatedAt || inquiryNowIsoTime(),
  };
}

function normalizeInquiryStore(store) {
  var raw = store || {};

  // Version mismatch: migrate v2 → v3
  if (raw.version !== INQUIRY_ENGINE_STORE_VERSION) {
    var migrated = buildEmptyInquiryStore();
    if (Array.isArray(raw.inquiries)) {
      raw.inquiries.forEach(function(item) {
        var v3 = migrateInquiryToV3(item);
        if (v3) migrated.inquiries.push(v3);
      });
    }
    migrated.activeInquiryId = migrated.inquiries.length > 0 ? migrated.inquiries[0].id : null;
    return migrated;
  }

  var normalized = Object.assign(buildEmptyInquiryStore(), raw);
  normalized.inquiries = Array.isArray(normalized.inquiries)
    ? normalized.inquiries.filter(function(item) { return item && item.id && !isLegacySeedInquiry(item); }).map(function(item) {
        if (!item.readState) item.readState = 'new';
        return item;
      })
    : [];

  if (!normalized.inquiries.some(function(item) { return item.id === normalized.activeInquiryId; })) {
    normalized.activeInquiryId = normalized.inquiries.length > 0 ? normalized.inquiries[0].id : null;
  }

  return normalized;
}

function getInquiryStore() {
  var raw = typeof localStorage !== 'undefined' ? localStorage.getItem(INQUIRY_ENGINE_STORE_KEY) : null;
  if (raw) {
    try {
      var parsed = JSON.parse(raw);
      var normalized = normalizeInquiryStore(parsed);
      if (parsed.version !== normalized.version || parsed.inquiries.length !== normalized.inquiries.length) {
        saveInquiryStore(normalized);
      }
      return normalized;
    } catch (e) {
      // ignore broken state
    }
  }
  var empty = buildEmptyInquiryStore();
  saveInquiryStore(empty);
  return empty;
}

function saveInquiryStore(store) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(INQUIRY_ENGINE_STORE_KEY, JSON.stringify(store));
  }
}

function getNextInquiryId(store) {
  var maxNumber = (store.inquiries || []).reduce(function(max, inquiry) {
    var match = inquiry && inquiry.id ? String(inquiry.id).match(/^INQ-(\d+)$/) : null;
    var current = match ? Number(match[1]) : 0;
    return current > max ? current : max;
  }, 0);
  return 'INQ-' + String(maxNumber + 1).padStart(3, '0');
}

// ── Dialog store ───────────────────────────────────────────────────────────────

function getDialogStore() {
  var raw = typeof localStorage !== 'undefined' ? localStorage.getItem(INQUIRY_DIALOG_STORE_KEY) : null;
  if (raw) { try { return JSON.parse(raw); } catch (e) {} }
  return { dialogs: [] };
}

function saveDialogStore(store) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(INQUIRY_DIALOG_STORE_KEY, JSON.stringify(store));
  }
}

function getNextDialogId(store) {
  var max = (store.dialogs || []).reduce(function(m, d) {
    var match = d && d.id ? String(d.id).match(/^DIA-(\d+)$/) : null;
    var n = match ? Number(match[1]) : 0;
    return n > m ? n : m;
  }, 0);
  return 'DIA-' + String(max + 1).padStart(3, '0');
}

function getActiveInquiry(store) {
  if (!store || !store.inquiries || store.inquiries.length === 0) return null;
  return store.inquiries.find(function(item) { return item.id === store.activeInquiryId; })
    || store.inquiries[0];
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function renderInquiryInbox(inquiries, activeId) {
  if (!inquiries || inquiries.length === 0) {
    return '<p class="inquiry-inbox-empty">Inga förfrågningar.</p>';
  }
  return inquiries.map(function(inquiry) {
    var activeClass = inquiry.id === activeId ? ' active' : '';
    var preview = String(inquiry.notes || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    var previewText = preview ? inquiryEscapeHtml(preview) : '<em>Inga anteckningar</em>';
    var unreadBadge = inquiry.readState === 'new' ? '<span class="inquiry-read-badge">Ny</span>' : '';
    return ''
      + '<button class="inquiry-inbox-row' + activeClass + '" type="button" data-inquiry-select="' + inquiryEscapeHtml(inquiry.id) + '">'
      +   '<span class="inquiry-inbox-row-name">' + inquiryEscapeHtml(inquiry.name || '–') + unreadBadge + '</span>'
      +   '<span class="inquiry-inbox-row-date">' + inquiryEscapeHtml(inquiryFormatDateTime(inquiry.createdAt)) + '</span>'
      +   '<span class="inquiry-inbox-row-preview">' + previewText + '</span>'
      + '</button>';
  }).join('');
}

function renderInquiryEditor(inquiry) {
  return ''
    + '<div class="card inquiry-editor-card">'
    +   '<div class="card-header inquiry-editor-header">'
    +     '<span class="inquiry-editor-id">' + inquiryEscapeHtml(inquiry.id) + '</span>'
    +     '<span class="text-muted" style="font-size:var(--font-size-xs)">'
    +       inquiryEscapeHtml(inquiryFormatDateTime(inquiry.updatedAt))
    +     '</span>'
    +   '</div>'
    +   '<div class="card-body inquiry-editor-form">'
    +     '<div class="inquiry-editor-field">'
    +       '<label class="inquiry-editor-label" for="inquiry-field-name">Namn</label>'
    +       '<input class="inquiry-editor-input" id="inquiry-field-name" type="text" value="' + inquiryEscapeHtml(inquiry.name) + '" placeholder="Namn eller organisation" data-inquiry-field="name">'
    +     '</div>'
    +     '<div class="inquiry-editor-field">'
    +       '<label class="inquiry-editor-label" for="inquiry-field-email">E-post</label>'
    +       '<input class="inquiry-editor-input" id="inquiry-field-email" type="email" value="' + inquiryEscapeHtml(inquiry.email) + '" placeholder="e-postadress" data-inquiry-field="email">'
    +     '</div>'
    +     '<div class="inquiry-editor-field">'
    +       '<label class="inquiry-editor-label" for="inquiry-field-phone">Telefon</label>'
    +       '<input class="inquiry-editor-input" id="inquiry-field-phone" type="tel" value="' + inquiryEscapeHtml(inquiry.phone) + '" placeholder="telefonnummer" data-inquiry-field="phone">'
    +     '</div>'
    +     '<div class="inquiry-editor-field inquiry-editor-field--notes">'
    +       '<label class="inquiry-editor-label" for="inquiry-field-notes">Anteckningar</label>'
    +       '<textarea class="inquiry-notes-textarea" id="inquiry-field-notes" placeholder="Fritext – bakgrund, önskemål, uppföljning..." data-inquiry-field="notes">' + inquiryEscapeHtml(inquiry.notes) + '</textarea>'
    +     '</div>'
    +     '<div class="inquiry-editor-actions">'
    +       '<button class="btn btn-primary" type="button" data-inquiry-action="create-dialog">'
    +         '<i data-feather="message-square" style="width:15px;height:15px" aria-hidden="true"></i>'
    +         'Skapa dialog'
    +       '</button>'
    +       '<button class="btn btn-tertiary" type="button" data-inquiry-action="delete-inquiry">'
    +         '<i data-feather="trash-2" style="width:15px;height:15px" aria-hidden="true"></i>'
    +         'Ta bort förfrågan'
    +       '</button>'
    +     '</div>'
    +   '</div>'
    + '</div>';
}

function renderInquiryEditorEmpty() {
  return ''
    + '<div class="card">'
    +   '<div class="card-body">'
    +     '<div class="empty-state">'
    +       '<i data-feather="inbox" style="width:40px;height:40px" aria-hidden="true"></i>'
    +       '<p class="text-muted">Välj en förfrågan i listan.</p>'
    +     '</div>'
    +   '</div>'
    + '</div>';
}

function renderInquiryEmptyInbox() {
  return ''
    + '<div class="card">'
    +   '<div class="card-body">'
    +     '<div class="empty-state">'
    +       '<i data-feather="inbox" style="width:48px;height:48px" aria-hidden="true"></i>'
    +       '<h3>Inkorgen är tom.</h3>'
    +       '<p class="text-muted">Skapa en ny förfrågan eller invänta inkommande via webbplatsen.</p>'
    +       '<button class="btn btn-primary mt-lg" type="button" id="inquiry-empty-create-button">Ny förfrågan</button>'
    +     '</div>'
    +   '</div>'
    + '</div>';
}

function renderWebsiteEntryPointBanner() {
  return ''
    + '<div class="inquiry-website-notification" id="inquiry-website-notification" role="status" aria-label="Webbplats ingångspunkt">'
    +   '<i data-feather="globe" style="width:14px;height:14px" aria-hidden="true"></i>'
    +   '<span>Webbplats ingångspunkt — inkommande förfrågningar via webbplatsen visas här.</span>'
    + '</div>';
}

function renderCreateModal() {
  return ''
    + '<div class="modal-overlay" id="inquiry-create-modal" hidden aria-modal="true" role="dialog" aria-labelledby="inquiry-modal-title">'
    +   '<div class="modal inquiry-create-modal-box">'
    +     '<div class="modal-header">'
    +       '<h2 class="modal-title" id="inquiry-modal-title">Ny förfrågan</h2>'
    +       '<button class="btn btn-icon btn-sm" id="inquiry-modal-close" aria-label="Stäng" type="button">'
    +         '<i data-feather="x" style="width:16px;height:16px" aria-hidden="true"></i>'
    +       '</button>'
    +     '</div>'
    +     '<div class="modal-body">'
    +       '<div class="inquiry-editor-form">'
    +         '<div class="inquiry-editor-field">'
    +           '<label class="inquiry-editor-label" for="inquiry-new-name">Namn</label>'
    +           '<input class="inquiry-editor-input" id="inquiry-new-name" type="text" placeholder="Namn eller organisation" autocomplete="off">'
    +         '</div>'
    +         '<div class="inquiry-editor-field">'
    +           '<label class="inquiry-editor-label" for="inquiry-new-email">E-post</label>'
    +           '<input class="inquiry-editor-input" id="inquiry-new-email" type="email" placeholder="e-postadress" autocomplete="off">'
    +         '</div>'
    +         '<div class="inquiry-editor-field">'
    +           '<label class="inquiry-editor-label" for="inquiry-new-phone">Telefon</label>'
    +           '<input class="inquiry-editor-input" id="inquiry-new-phone" type="tel" placeholder="telefonnummer" autocomplete="off">'
    +         '</div>'
    +         '<div class="inquiry-editor-field inquiry-editor-field--notes">'
    +           '<label class="inquiry-editor-label" for="inquiry-new-notes">Anteckningar</label>'
    +           '<textarea class="inquiry-notes-textarea" id="inquiry-new-notes" placeholder="Fritext..."></textarea>'
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +     '<div class="modal-footer">'
    +       '<button class="btn btn-secondary" type="button" id="inquiry-modal-cancel">Avbryt</button>'
    +       '<button class="btn btn-primary" type="button" id="inquiry-modal-save">Skapa förfrågan</button>'
    +     '</div>'
    +   '</div>'
    + '</div>';
}

// ── Actions ───────────────────────────────────────────────────────────────────

function openCreateModal() {
  var modal = document.getElementById('inquiry-create-modal');
  if (!modal) return;
  var nameEl = document.getElementById('inquiry-new-name');
  var emailEl = document.getElementById('inquiry-new-email');
  var phoneEl = document.getElementById('inquiry-new-phone');
  var notesEl = document.getElementById('inquiry-new-notes');
  if (nameEl) nameEl.value = '';
  if (emailEl) emailEl.value = '';
  if (phoneEl) phoneEl.value = '';
  if (notesEl) notesEl.value = '';
  modal.hidden = false;
  if (nameEl) nameEl.focus();
}

function closeCreateModal() {
  var modal = document.getElementById('inquiry-create-modal');
  if (modal) modal.hidden = true;
}

function commitCreateInquiry() {
  var name = String((document.getElementById('inquiry-new-name') || {}).value || '').trim();
  var nameEl = document.getElementById('inquiry-new-name');
  if (!name) {
    if (nameEl) { nameEl.focus(); nameEl.setAttribute('aria-invalid', 'true'); }
    return;
  }
  if (nameEl) nameEl.removeAttribute('aria-invalid');
  var email = String((document.getElementById('inquiry-new-email') || {}).value || '').trim();
  var phone = String((document.getElementById('inquiry-new-phone') || {}).value || '').trim();
  var notes = String((document.getElementById('inquiry-new-notes') || {}).value || '').trim();

  if (!inquiryEngineState || !inquiryEngineState.store) return;
  var store = inquiryEngineState.store;
  var id = getNextInquiryId(store);
  var now = inquiryNowIsoTime();

  store.inquiries.unshift({ id: id, name: name, email: email, phone: phone, notes: notes, readState: 'new', createdAt: now, updatedAt: now });
  store.activeInquiryId = id;
  saveInquiryStore(store);
  closeCreateModal();
  renderInquiryEngine();
}

function deleteActiveInquiry() {
  if (!inquiryEngineState || !inquiryEngineState.store) return;
  var store = inquiryEngineState.store;
  var activeId = store.activeInquiryId;
  if (!activeId) return;

  if (!window.confirm('Ta bort förfrågan? Åtgärden kan inte ångras.')) return;

  store.inquiries = store.inquiries.filter(function(item) { return item.id !== activeId; });
  store.activeInquiryId = store.inquiries.length > 0 ? store.inquiries[0].id : null;
  saveInquiryStore(store);
  renderInquiryEngine();
}

function createDialogFromInquiry() {
  if (!inquiryEngineState) return;
  var inquiry = getActiveInquiry(inquiryEngineState.store);
  if (!inquiry) return;

  // If already linked to a dialog, navigate directly
  if (inquiry.dialogId) {
    window.location.href = 'dialog.html';
    return;
  }

  // Create dialog placeholder and link to inquiry
  var dialogStore = getDialogStore();
  var dialogId = getNextDialogId(dialogStore);
  var now = inquiryNowIsoTime();

  dialogStore.dialogs.push({
    id: dialogId,
    inquiryId: inquiry.id,
    name: inquiry.name,
    createdAt: now,
  });
  saveDialogStore(dialogStore);

  inquiry.dialogId = dialogId;
  inquiry.updatedAt = now;
  saveInquiryStore(inquiryEngineState.store);

  window.location.href = 'dialog.html';
}

function saveFieldToActiveInquiry(field, value) {
  if (!inquiryEngineState || !inquiryEngineState.store) return;
  var store = inquiryEngineState.store;
  var inquiry = getActiveInquiry(store);
  if (!inquiry) return;
  inquiry[field] = value;
  inquiry.updatedAt = inquiryNowIsoTime();
  saveInquiryStore(store);
  // Update selector row preview without full re-render (avoid losing focus mid-edit)
  if (field === 'name' || field === 'notes') {
    var activeRow = document.querySelector('[data-inquiry-select="' + inquiry.id + '"]');
    if (activeRow) {
      var nameEl = activeRow.querySelector('.inquiry-inbox-row-name');
      if (nameEl && field === 'name') nameEl.textContent = inquiry.name || '–';
      var previewEl = activeRow.querySelector('.inquiry-inbox-row-preview');
      if (previewEl && field === 'notes') {
        var preview = String(inquiry.notes || '').replace(/\s+/g, ' ').trim().slice(0, 60);
        previewEl.textContent = preview || '';
      }
    }
    // also update editor header id/date
    var headerDate = document.querySelector('.inquiry-editor-header .text-muted');
    if (headerDate) headerDate.textContent = inquiryFormatDateTime(inquiry.updatedAt);
  }
}

// ── Event binding ──────────────────────────────────────────────────────────────

function bindInquiryHandlers() {
  if (inquiryEngineHandlersBound) return;
  inquiryEngineHandlersBound = true;

  // Create button (header)
  document.addEventListener('click', function(event) {
    var target = event.target;

    // Inbox row selection
    var rowTrigger = target.closest('[data-inquiry-select]');
    if (rowTrigger) {
      var id = rowTrigger.getAttribute('data-inquiry-select');
      if (!inquiryEngineState || !inquiryEngineState.store) return;
      inquiryEngineState.store.activeInquiryId = id;
      var selectedInquiry = inquiryEngineState.store.inquiries.find(function(item) { return item.id === id; });
      if (selectedInquiry && selectedInquiry.readState === 'new') {
        selectedInquiry.readState = 'opened';
      }
      saveInquiryStore(inquiryEngineState.store);
      renderInquiryEngine();
      return;
    }

    // Header create button
    if (target.closest('#inquiry-create-button')) { openCreateModal(); return; }
    // Empty state create button
    if (target.closest('#inquiry-empty-create-button')) { openCreateModal(); return; }

    // Modal controls
    if (target.closest('#inquiry-modal-close') || target.closest('#inquiry-modal-cancel')) { closeCreateModal(); return; }
    if (target.closest('#inquiry-modal-save')) { commitCreateInquiry(); return; }
    if (target.id === 'inquiry-create-modal') { closeCreateModal(); return; }

    // Editor actions
    var actionTrigger = target.closest('[data-inquiry-action]');
    if (actionTrigger) {
      var action = actionTrigger.getAttribute('data-inquiry-action');
      if (action === 'delete-inquiry') { deleteActiveInquiry(); return; }
      if (action === 'create-dialog') { createDialogFromInquiry(); return; }
    }
  });

  // Modal Enter key
  document.addEventListener('keydown', function(event) {
    var modal = document.getElementById('inquiry-create-modal');
    if (modal && !modal.hidden) {
      if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA' && event.target.tagName !== 'BUTTON') { commitCreateInquiry(); return; }
      if (event.key === 'Escape') { closeCreateModal(); return; }
    }
  });

  // Editor field blur → save
  document.addEventListener('blur', function(event) {
    var field = event.target.getAttribute && event.target.getAttribute('data-inquiry-field');
    if (!field) return;
    saveFieldToActiveInquiry(field, event.target.value || '');
  }, true);
}

// ── Main ──────────────────────────────────────────────────────────────────────

function renderInquiryEngine() {
  var store = getInquiryStore();
  var activeInquiry = getActiveInquiry(store);

  inquiryEngineState = { store: store, activeInquiry: activeInquiry };

  // Inbox list
  var inboxEl = document.getElementById('inquiry-inbox-list');
  if (inboxEl) {
    if (store.inquiries.length === 0) {
      inboxEl.innerHTML = '';
    } else {
      inboxEl.innerHTML = renderInquiryInbox(store.inquiries, store.activeInquiryId);
    }
  }

  // Editor / empty state
  var editorEl = document.getElementById('inquiry-editor-panel');
  if (editorEl) {
    if (store.inquiries.length === 0) {
      editorEl.innerHTML = renderInquiryEmptyInbox();
    } else if (!activeInquiry) {
      editorEl.innerHTML = renderInquiryEditorEmpty();
    } else {
      editorEl.innerHTML = renderInquiryEditor(activeInquiry);
    }
  }

  // Website entry point banner
  var notifEl = document.getElementById('inquiry-website-notification-slot');
  if (notifEl && !notifEl.innerHTML.trim()) {
    notifEl.innerHTML = renderWebsiteEntryPointBanner();
  }

  // Create modal (inject once)
  if (!document.getElementById('inquiry-create-modal')) {
    document.body.insertAdjacentHTML('beforeend', renderCreateModal());
  }

  bindInquiryHandlers();
  if (typeof feather !== 'undefined') feather.replace();
}
