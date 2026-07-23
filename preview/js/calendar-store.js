/* ========================================
   AlpenTind Platform Preview
   Calendar Store – Calendar Notes & Event Projection
   RI-013: Calendar Platform View
   ======================================== */

var CALENDAR_STORE_KEY = 'alpentind-calendar-store';
var CALENDAR_STORE_VERSION = 1;

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

// ── Calendar Event Projection ─────────────────────────────────────────────────
// Projects a uniform event list from multiple sources.
// Platform Views consume this list; no origin-specific branching in display.
//
// Possible origins: calendar-note, experience-engine, journey-engine
// Future: additional Platform Services may contribute events here.

var MAX_EVENT_TITLE_LENGTH = 60;

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
      color: 'info',
      origin: 'calendar-note',
      sourceId: note.id,
    });
  });

  // Project from seed events (e.g. mockData.calendarEvents from Experience Engine)
  (seedEvents || []).forEach(function(ev) {
    events.push({
      id: 'EVT-SRC-' + ev.id,
      date: ev.date,
      title: ev.title,
      type: ev.type || 'event',
      color: ev.color || 'primary',
      origin: 'source',
      sourceId: ev.id,
    });
  });

  return events;
}
