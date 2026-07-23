/* ========================================
   AlpenTind Platform Preview
   Calendar Store – Calendar Notes & Event Projection
   RI-013: Calendar Platform View
   ======================================== */

var CALENDAR_STORE_KEY = 'alpentind-calendar-store';
var CALENDAR_STORE_VERSION = 1;
var MAX_EVENT_TITLE_LENGTH = 60;

var CALENDAR_SEMANTIC_COLOR_TOKEN = {
  immediate_attention: 'danger',
  important: 'warning',
  informational: 'info',
  completed: 'success',
};

// ── Store ─────────────────────────────────────────────────────────────────────

function buildEmptyCalendarStore() {
  return {
    version: CALENDAR_STORE_VERSION,
    notes: [],
  };
}

function loadCalendarStore() {
  try {
    var raw = typeof localStorage !== 'undefined'
      ? localStorage.getItem(CALENDAR_STORE_KEY)
      : null;
    if (!raw) return buildEmptyCalendarStore();
    var parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== CALENDAR_STORE_VERSION) {
      return buildEmptyCalendarStore();
    }
    return {
      version: CALENDAR_STORE_VERSION,
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
    };
  } catch (e) {
    return buildEmptyCalendarStore();
  }
}

function saveCalendarStore(store) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CALENDAR_STORE_KEY, JSON.stringify(store));
    }
  } catch (e) {
    // storage unavailable – silent
  }
}

function calendarNowIso() {
  return new Date().toISOString();
}

// ── Calendar Notes CRUD ───────────────────────────────────────────────────────

function calendarNoteCreate(date, text) {
  var store = loadCalendarStore();
  var note = {
    id: 'CN-' + Date.now(),
    date: date,
    text: String(text || '').trim(),
    createdAt: calendarNowIso(),
    updatedAt: calendarNowIso(),
  };
  store.notes.push(note);
  saveCalendarStore(store);
  return note;
}

function calendarNoteUpdate(id, text) {
  var store = loadCalendarStore();
  var note = store.notes.find(function(n) { return n.id === id; });
  if (!note) return null;
  note.text = String(text || '').trim();
  note.updatedAt = calendarNowIso();
  saveCalendarStore(store);
  return note;
}

function calendarNoteDelete(id) {
  var store = loadCalendarStore();
  store.notes = store.notes.filter(function(n) { return n.id !== id; });
  saveCalendarStore(store);
}

function calendarNotesForDate(date) {
  var store = loadCalendarStore();
  return store.notes.filter(function(n) { return n.date === date; });
}

function calendarAllNotes() {
  return loadCalendarStore().notes;
}

function normalizeCalendarSemantic(rawEvent) {
  var ev = rawEvent || {};
  var semantic = String(ev.semantic || '').trim().toLowerCase();
  if (Object.prototype.hasOwnProperty.call(CALENDAR_SEMANTIC_COLOR_TOKEN, semantic)) {
    return semantic;
  }

  var state = String(ev.state || '').trim().toLowerCase();
  if (state === 'completed' || state === 'done' || state === 'closed') return 'completed';

  var priority = String(ev.priority || '').trim().toLowerCase();
  if (priority === 'high' || priority === 'critical' || priority === 'urgent') return 'immediate_attention';
  if (priority === 'medium' || priority === 'important') return 'important';

  var type = String(ev.type || '').trim().toLowerCase();
  if (type === 'deadline' || type === 'payment_due') return 'immediate_attention';
  if (type === 'followup' || type === 'follow_up') return 'important';
  if (type === 'note' || type === 'meeting' || type === 'information') return 'informational';

  return 'informational';
}

function calendarColorTokenForSemantic(semantic) {
  return CALENDAR_SEMANTIC_COLOR_TOKEN[semantic] || CALENDAR_SEMANTIC_COLOR_TOKEN.informational;
}

function isValidCalendarWorkspaceHref(href) {
  var value = String(href || '').trim();
  if (!value) return false;
  return /^[a-z0-9-]+\.html(?:\?[a-z0-9=&_%.-]*)?$/i.test(value);
}

function buildWorkspaceHref(defaultHref, queryKey, queryValue, explicitHref) {
  if (isValidCalendarWorkspaceHref(explicitHref)) return explicitHref;
  if (queryValue) {
    return defaultHref + '?' + encodeURIComponent(queryKey) + '=' + encodeURIComponent(queryValue);
  }
  return defaultHref;
}

function resolveCalendarWorkspaceTarget(rawEvent) {
  var ev = rawEvent || {};
  var workspaceType = String(ev.workspaceType || '').trim().toLowerCase();
  var type = String(ev.type || '').trim().toLowerCase();

  if (!workspaceType) {
    if (type === 'journey' || type === 'experience') workspaceType = 'journey';
    else if (type === 'dialog' || type === 'meeting') workspaceType = 'dialog';
    else if (type === 'inquiry' || type === 'followup' || type === 'follow_up') workspaceType = 'inquiry';
    else if (type === 'contact') workspaceType = 'contact';
  }

  if (workspaceType === 'journey') {
    return {
      workspaceType: 'journey',
      href: buildWorkspaceHref('resa.html', 'id', ev.journeyId, ev.workspaceHref),
    };
  }
  if (workspaceType === 'dialog') {
    return {
      workspaceType: 'dialog',
      href: buildWorkspaceHref('dialog.html', 'dialogId', ev.dialogId, ev.workspaceHref),
    };
  }
  if (workspaceType === 'inquiry') {
    return {
      workspaceType: 'inquiry',
      href: buildWorkspaceHref('forfragningar.html', 'id', ev.inquiryId, ev.workspaceHref),
    };
  }
  if (workspaceType === 'contact') {
    if (isValidCalendarWorkspaceHref(ev.workspaceHref)) {
      return { workspaceType: 'contact', href: ev.workspaceHref };
    }
    return {
      workspaceType: 'contact',
      href: ev.contactId
        ? 'kontakt-workspace.html?id=' + encodeURIComponent(ev.contactId)
        : 'kontakter.html',
    };
  }

  return { workspaceType: null, href: null };
}

// ── Calendar Event Projection ─────────────────────────────────────────────────
// Projects a uniform event list from multiple sources.
// Platform Views consume this list; no origin-specific branching in display.

function projectCalendarEvents(seedEvents) {
  var events = [];

  // Project from Calendar Notes (owned by this Platform Object)
  calendarAllNotes().forEach(function(note) {
    if (!note.date || !note.text) return;
    events.push({
      id: 'EVT-NOTE-' + note.id,
      date: note.date,
      title: note.text.length > MAX_EVENT_TITLE_LENGTH
        ? note.text.slice(0, MAX_EVENT_TITLE_LENGTH - 3) + '\u2026'
        : note.text,
      type: 'note',
      semantic: 'informational',
      color: calendarColorTokenForSemantic('informational'),
      origin: 'calendar-note',
      sourceId: note.id,
      workspaceType: null,
      workspaceHref: null,
      navigable: false,
    });
  });

  // Project from seed events (e.g. mockData.calendarEvents from Experience Engine)
  (seedEvents || []).forEach(function(ev) {
    var semantic = normalizeCalendarSemantic(ev);
    var target = resolveCalendarWorkspaceTarget(ev);
    events.push({
      id: 'EVT-SRC-' + ev.id,
      date: ev.date,
      title: ev.title,
      type: ev.type || 'event',
      semantic: semantic,
      color: calendarColorTokenForSemantic(semantic),
      origin: 'source',
      sourceId: ev.id,
      workspaceType: target.workspaceType,
      workspaceHref: target.href,
      navigable: Boolean(target.href),
    });
  });

  return events;
}
