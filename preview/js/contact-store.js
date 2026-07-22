/* ========================================
   AlpenTind Platform Preview
   Contact Store – Contact Register Data (RI-012)

   API:
     getContact(id)       → contact object or null
     saveContact(id, patch) → true/false (localStorage persistence)
   ======================================== */

var CONTACT_STORE_KEY = 'alpentind-contact-store';
var CONTACT_STORE_VERSION = 2;

var CONTACT_MOCK_DATA = {
  contacts: [
    {
      id: 'anna-andersson',
      name: 'Anna Andersson',
      telephone: '+46 70 234 56 78',
      email: 'anna.andersson@example.com',
      address: 'Storgatan 12, 114 55 Stockholm',
      category: 'Gäst',
      relationship: {
        firstContact: 'Mars 2024',
        latestJourney: 'Tour du Mont Blanc 2025',
      },
      interests: ['Tour du Mont Blanc', 'Dolomitterna', 'Alpinism'],
      history: {
        dialogs: [
          { id: 'DIA-001', date: '14 jul 2027', summary: 'Fråga om utrustning och höjdacklimatisering', href: 'dialog.html' },
          { id: 'DIA-002', date: '10 jun 2027', summary: 'Bekräftelse av anmälan till TMB', href: 'dialog.html' },
          { id: 'DIA-003', date: '5 mar 2027', summary: 'Inledande kontakt – intresse för sommarprogram', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-001', name: 'Tour du Mont Blanc 2025', date: 'Augusti 2025', href: 'resa.html' },
          { id: 'JRN-002', name: 'Haute Route 2024', date: 'Juli 2024', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'erik-bergstrom',
      name: 'Erik Bergström',
      telephone: '+46 70 345 67 89',
      email: 'erik.bergstrom@example.com',
      address: 'Bergsgatan 4, 411 04 Göteborg',
      category: 'Gäst',
      relationship: {
        firstContact: 'Januari 2025',
        latestJourney: 'Haute Route 2026',
      },
      interests: ['Haute Route', 'Skidturer', 'Vinteralpinism'],
      history: {
        dialogs: [
          { id: 'DIA-010', date: '2 jul 2027', summary: 'Bokning Haute Route bekräftad', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-010', name: 'Haute Route 2026', date: 'Mars 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'sofia-lofgren',
      name: 'Sofia Löfgren',
      telephone: '+46 76 456 78 90',
      email: 'sofia.lofgren@example.com',
      address: 'Parkvägen 8, 582 14 Linköping',
      category: 'Gäst',
      relationship: {
        firstContact: 'April 2025',
        latestJourney: 'Sarek Sommar 2026',
      },
      interests: ['Sarek', 'Fjällvandring', 'Vildmark'],
      history: {
        dialogs: [
          { id: 'DIA-020', date: '5 jul 2027', summary: 'Utrustningsfrågor inför Sarek-expedition', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-020', name: 'Sarek Sommar 2026', date: 'Augusti 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'per-nystrom',
      name: 'Per Nyström',
      telephone: '+46 73 567 89 01',
      email: 'per.nystrom@example.com',
      address: 'Kyrkogatan 3, 211 22 Malmö',
      category: 'Gäst',
      relationship: {
        firstContact: 'Juni 2026',
        latestJourney: 'Kebnekaise 2026',
      },
      interests: ['Kebnekaise', 'Höga toppar', 'Vandring'],
      history: {
        dialogs: [
          { id: 'DIA-030', date: '8 jul 2027', summary: 'Deltagarinformation bekräftad', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-030', name: 'Kebnekaise 2026', date: 'Juli 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'maria-eklund',
      name: 'Maria Eklund',
      telephone: '+46 70 678 90 12',
      email: 'maria.eklund@example.com',
      address: 'Gamla Brogatan 22, 111 20 Stockholm',
      category: 'Gäst',
      relationship: {
        firstContact: 'Februari 2026',
        latestJourney: '—',
      },
      interests: ['Tour du Mont Blanc', 'Alpinism'],
      history: {
        dialogs: [
          { id: 'DIA-040', date: '12 jul 2027', summary: 'Väntelista TMB – uppföljning', href: 'dialog.html' },
        ],
        journeys: [],
      },
    },
    {
      id: 'johan-lundgren',
      name: 'Johan Lundgren',
      telephone: '+46 76 789 01 23',
      email: 'johan.lundgren@example.com',
      address: 'Norra Vägen 15, 752 64 Uppsala',
      category: 'Gäst',
      relationship: {
        firstContact: 'Maj 2025',
        latestJourney: 'Haute Route 2026',
      },
      interests: ['Haute Route', 'Skidalpinism', 'Chamonix–Zermatt'],
      history: {
        dialogs: [
          { id: 'DIA-050', date: '1 jul 2027', summary: 'Färdbekräftelse Haute Route', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-050', name: 'Haute Route 2026', date: 'April 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'emma-svensson',
      name: 'Emma Svensson',
      telephone: '+46 70 890 12 34',
      email: 'emma.svensson@example.com',
      address: 'Linnégatan 7, 413 04 Göteborg',
      category: 'Gäst',
      relationship: {
        firstContact: 'September 2025',
        latestJourney: 'Sarek Sommar 2026',
      },
      interests: ['Sarek', 'Norrland', 'Fjällvandring'],
      history: {
        dialogs: [
          { id: 'DIA-060', date: '10 jul 2027', summary: 'Säkerhetsbriefing bekräftad', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-060', name: 'Sarek Sommar 2026', date: 'Augusti 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'karl-olsson',
      name: 'Karl Olsson',
      telephone: '+46 73 901 23 45',
      email: 'karl.olsson@example.com',
      address: 'Vasagatan 19, 411 22 Göteborg',
      category: 'Gäst',
      relationship: {
        firstContact: 'Oktober 2025',
        latestJourney: 'Kebnekaise 2026',
      },
      interests: ['Kebnekaise', 'Toppturer', 'Vinter'],
      history: {
        dialogs: [
          { id: 'DIA-070', date: '9 jul 2027', summary: 'Utrustningslista genomgången', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-070', name: 'Kebnekaise 2026', date: 'Juli 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'lisa-norberg',
      name: 'Lisa Norberg',
      telephone: '+46 76 012 34 56',
      email: 'lisa.norberg@example.com',
      address: 'Folkungagatan 31, 116 22 Stockholm',
      category: 'Gäst',
      relationship: {
        firstContact: 'November 2024',
        latestJourney: 'Tour du Mont Blanc 2025',
      },
      interests: ['Tour du Mont Blanc', 'Alpin vandring', 'Chamonix'],
      history: {
        dialogs: [
          { id: 'DIA-080', date: '11 jul 2027', summary: 'Bokning TMB 2026 bekräftad', href: 'dialog.html' },
          { id: 'DIA-081', date: '20 jun 2027', summary: 'Frågor om packlista', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-080', name: 'Tour du Mont Blanc 2025', date: 'Augusti 2025', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'andreas-strom',
      name: 'Andreas Ström',
      telephone: '+46 70 123 45 67',
      email: 'andreas.strom@example.com',
      address: 'Hantverkargatan 5, 112 21 Stockholm',
      category: 'Gäst',
      relationship: {
        firstContact: 'Mars 2027',
        latestJourney: '—',
      },
      interests: ['Haute Route', 'Alperna'],
      history: {
        dialogs: [
          { id: 'DIA-090', date: '13 jul 2027', summary: 'Intresseanmälan Haute Route', href: 'dialog.html' },
        ],
        journeys: [],
      },
    },
    {
      id: 'karin-lindqvist',
      name: 'Karin Lindqvist',
      telephone: '+46 76 234 56 78',
      email: 'karin.lindqvist@example.com',
      address: 'Sandgatan 44, 223 50 Lund',
      category: 'Gäst',
      relationship: {
        firstContact: 'December 2024',
        latestJourney: 'Sarek Sommar 2026',
      },
      interests: ['Sarek', 'Vildmarksexpeditioner', 'Fjällorientering'],
      history: {
        dialogs: [
          { id: 'DIA-100', date: '7 jul 2027', summary: 'Kartmaterial och vägbeskrivning', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-100', name: 'Sarek Sommar 2026', date: 'Augusti 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'robert-malmberg',
      name: 'Robert Malmberg',
      telephone: '+46 73 345 67 89',
      email: 'robert.malmberg@example.com',
      address: 'Östra Hamngatan 18, 411 10 Göteborg',
      category: 'Gäst',
      relationship: {
        firstContact: 'Januari 2026',
        latestJourney: 'Kebnekaise 2026',
      },
      interests: ['Kebnekaise', 'Fjällsäkerhet', 'Vandring'],
      history: {
        dialogs: [
          { id: 'DIA-110', date: '6 jul 2027', summary: 'Säkerhetsinformation genomgången', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-110', name: 'Kebnekaise 2026', date: 'Juli 2026', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'ingrid-petersson',
      name: 'Ingrid Petersson',
      telephone: '+46 70 456 78 90',
      email: 'ingrid.petersson@example.com',
      address: 'Brahegatan 9, 114 37 Stockholm',
      category: 'Gäst',
      relationship: {
        firstContact: 'Februari 2025',
        latestJourney: 'Tour du Mont Blanc 2025',
      },
      interests: ['Tour du Mont Blanc', 'Alpvandring', 'Frankrike–Italien'],
      history: {
        dialogs: [
          { id: 'DIA-120', date: '4 jul 2027', summary: 'Bokning TMB 2026 – preliminär', href: 'dialog.html' },
          { id: 'DIA-121', date: '12 maj 2027', summary: 'Frågor om svårighetsgrad', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-120', name: 'Tour du Mont Blanc 2025', date: 'Augusti 2025', href: 'resa.html' },
        ],
      },
    },
    {
      id: 'peter-nilsson',
      name: 'Peter Nilsson',
      telephone: '+46 70 345 67 89',
      email: 'peter.nilsson@example.com',
      address: 'Drottninggatan 55, 111 51 Stockholm',
      category: 'Gäst',
      relationship: {
        firstContact: 'Juni 2027',
        latestJourney: 'Haute Route (under bearbetning)',
      },
      interests: ['Tour du Mont Blanc', 'Haute Route', 'Klassiska rundturer'],
      history: {
        dialogs: [
          { id: 'DIA-002', date: '22 jun 2027', summary: 'Dialog om erfarenhet och förväntningar', href: 'dialog.html' },
          { id: 'DIA-001', date: '20 jun 2027', summary: 'Inledande kontakt – intresse för TMB', href: 'dialog.html' },
        ],
        journeys: [
          { id: 'JRN-200', name: 'Haute Route (Chamonix–Zermatt)', date: 'Maj 2027', href: 'resa.html' },
        ],
      },
    },
  ],
};

var CONTACT_ADDITIONAL_CONTACTS = [
  {
    id: 'linda-svensson',
    name: 'Linda Svensson',
    telephone: '+46 70 111 22 33',
    email: 'linda.svensson@example.com',
    address: 'Årevägen 8, 837 52 Åre',
    category: 'Guide',
    registerContext: 'Alpine climbing',
    registerStatus: 'Tour du Mont Blanc',
    interests: ['Alpin klättring', 'Glaciär', 'Utbildning'],
    journeys: [
      { id: 'GUIDE-JRN-001', name: 'Tour du Mont Blanc', date: 'Juli 2027', href: 'resa.html' },
    ],
  },
  {
    id: 'marcus-bergstrom',
    name: 'Marcus Bergström',
    telephone: '+46 70 222 33 44',
    email: 'marcus.bergstrom@example.com',
    address: 'Bergsstigen 4, 981 38 Kiruna',
    category: 'Guide',
    registerContext: 'Mountaineering',
    registerStatus: 'Haute Route',
    interests: ['Bergsklättring', 'Skidalpinism'],
    journeys: [
      { id: 'GUIDE-JRN-002', name: 'Haute Route', date: 'Mars 2027', href: 'resa.html' },
    ],
  },
  {
    id: 'sofia-johansson',
    name: 'Sofia Johansson',
    telephone: '+46 70 333 44 55',
    email: 'sofia.johansson@example.com',
    address: 'Stenbacken 12, 831 34 Östersund',
    category: 'Guide',
    registerContext: 'Winter climbing',
    registerStatus: 'Available',
    interests: ['Vinterklättring', 'Isfall'],
    journeys: [],
  },
  {
    id: 'peter-lundstrom',
    name: 'Peter Lundström',
    telephone: '+46 70 444 55 66',
    email: 'peter.lundstrom@example.com',
    address: 'Fjällgatan 3, 981 31 Kiruna',
    category: 'Guide',
    registerContext: 'Ski touring',
    registerStatus: 'Sarek Sommar',
    interests: ['Topptur', 'Logistik'],
    journeys: [
      { id: 'GUIDE-JRN-003', name: 'Sarek Sommar', date: 'Augusti 2027', href: 'resa.html' },
    ],
  },
  {
    id: 'refuge-bonatti',
    name: 'Refuge Bonatti',
    telephone: '+39 0165 555 100',
    email: 'operations@bonatti.example.com',
    address: 'Val Ferret, Courmayeur, Italien',
    category: 'Samarbetspartner',
    registerContext: 'Mountain hut',
    registerStatus: 'Italian Alps',
    interests: ['Boende', 'Logistik'],
    journeys: [
      { id: 'PARTNER-JRN-001', name: 'Tour du Mont Blanc', date: 'Juli 2027', href: 'resa.html' },
    ],
  },
  {
    id: 'alpinabus',
    name: 'Alpinabus',
    telephone: '+41 22 555 20 20',
    email: 'dispatch@alpinabus.example.com',
    address: 'Rue des Alpes 22, Genève, Schweiz',
    category: 'Samarbetspartner',
    registerContext: 'Transport company',
    registerStatus: 'Switzerland',
    interests: ['Transfer', 'Koordinering'],
    journeys: [],
  },
  {
    id: 'hotel-chamonix',
    name: 'Hotel Chamonix',
    telephone: '+33 4 50 55 66 77',
    email: 'booking@hotelchamonix.example.com',
    address: '12 Rue du Mont Blanc, Chamonix, Frankrike',
    category: 'Samarbetspartner',
    registerContext: 'Hotel',
    registerStatus: 'France',
    interests: ['Boende', 'Grupper'],
    journeys: [
      { id: 'PARTNER-JRN-002', name: 'Haute Route', date: 'Mars 2027', href: 'resa.html' },
    ],
  },
  {
    id: 'mountain-guides-bureau',
    name: 'Mountain Guides Bureau',
    telephone: '+33 4 50 11 22 33',
    email: 'office@guidesbureau.example.com',
    address: "8 Avenue de l'Aiguille, Chamonix, Frankrike",
    category: 'Samarbetspartner',
    registerContext: 'Local operator',
    registerStatus: 'Chamonix',
    interests: ['Lokala operatörer', 'Säkerhet'],
    journeys: [],
  },
];

CONTACT_MOCK_DATA.contacts = CONTACT_MOCK_DATA.contacts.concat(CONTACT_ADDITIONAL_CONTACTS);

function cloneContactValue(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeContactText(value) {
  return String(value || '').trim();
}

function normalizeContactLookupValue(value) {
  return normalizeContactText(value).toLowerCase();
}

function normalizeTelephoneLookupValue(value) {
  return normalizeContactText(value).replace(/[^\d+]/g, '');
}

function parseJourneyDateValue(value) {
  var cleanValue = normalizeContactText(value);
  if (!cleanValue) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanValue)) return cleanValue;

  var monthMap = {
    januari: '01',
    februari: '02',
    mars: '03',
    april: '04',
    maj: '05',
    juni: '06',
    juli: '07',
    augusti: '08',
    september: '09',
    oktober: '10',
    november: '11',
    december: '12',
  };
  var monthMatch = cleanValue.toLowerCase().match(/^(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)\s+(\d{4})$/);
  if (monthMatch) {
    return monthMatch[2] + '-' + monthMap[monthMatch[1]] + '-01';
  }
  return '';
}

function normalizeJourneyEntry(journey, index) {
  var normalizedJourney = journey || {};
  return {
    id: normalizeContactText(normalizedJourney.id || ('JOURNEY-' + String(index + 1).padStart(3, '0'))),
    name: normalizeContactText(normalizedJourney.name || normalizedJourney.summary || 'Resa'),
    dateLabel: normalizeContactText(normalizedJourney.dateLabel || normalizedJourney.date),
    dateValue: normalizeContactText(normalizedJourney.dateValue || parseJourneyDateValue(normalizedJourney.dateLabel || normalizedJourney.date)),
    href: normalizeContactText(normalizedJourney.href || 'resa.html') || 'resa.html',
  };
}

function getContactDefaultRegisterContext(contact) {
  if (contact.registerContext) return contact.registerContext;
  var journeys = contact.journeys || [];
  if (journeys.length > 0) return journeys[0].name;
  if (contact.category === 'Guide') return 'Operativ guide';
  if (contact.category === 'Samarbetspartner') return 'Operativ partner';
  return 'Ingen aktiv resa';
}

function getContactDefaultRegisterStatus(contact) {
  if (contact.registerStatus) return contact.registerStatus;
  var journeys = contact.journeys || [];
  if (journeys.length > 0) {
    return journeys[0].dateLabel || 'Aktiv';
  }
  return contact.category === 'Gäst' ? 'Under bearbetning' : 'Available';
}

function normalizeContactRecord(contact, index) {
  var legacyHistory = contact && contact.history ? contact.history : {};
  var journeysSource = Array.isArray(contact && contact.journeys)
    ? contact.journeys
    : Array.isArray(legacyHistory.journeys) ? legacyHistory.journeys : [];
  var normalized = {
    id: normalizeContactText(contact && contact.id),
    name: normalizeContactText(contact && contact.name),
    telephone: normalizeContactText(contact && contact.telephone),
    email: normalizeContactText(contact && contact.email),
    address: normalizeContactText(contact && contact.address),
    category: normalizeContactText(contact && contact.category) || 'Gäst',
    interests: Array.isArray(contact && contact.interests)
      ? contact.interests.map(normalizeContactText).filter(Boolean)
      : [],
    journeys: journeysSource.map(normalizeJourneyEntry),
    registerContext: normalizeContactText(contact && contact.registerContext),
    registerStatus: normalizeContactText(contact && contact.registerStatus),
  };

  normalized.registerContext = getContactDefaultRegisterContext(normalized);
  normalized.registerStatus = getContactDefaultRegisterStatus(normalized);
  if (!normalized.id) {
    normalized.id = buildSuggestedContactId(normalized.name || normalized.email || ('kontakt-' + index));
  }
  return normalized;
}

function normalizeContactStore(store) {
  var normalizedStore = {
    version: CONTACT_STORE_VERSION,
    contacts: Array.isArray(store && store.contacts)
      ? store.contacts.map(normalizeContactRecord)
      : [],
  };
  normalizedStore.contacts = normalizedStore.contacts.filter(function(contact, index, contacts) {
    return contact.id && contacts.findIndex(function(other) { return other.id === contact.id; }) === index;
  });
  return normalizedStore;
}

function getContactStore() {
  var normalizedStore = null;
  try {
    var raw = localStorage.getItem(CONTACT_STORE_KEY);
    if (raw) {
      normalizedStore = normalizeContactStore(JSON.parse(raw));
    }
  } catch (e) {
    normalizedStore = null;
  }

  if (!normalizedStore) {
    normalizedStore = normalizeContactStore(cloneContactValue(CONTACT_MOCK_DATA));
  }

  if (!localStorage.getItem(CONTACT_STORE_KEY) || normalizedStore.version !== CONTACT_STORE_VERSION) {
    saveContactStore(normalizedStore);
  }
  return normalizedStore;
}

function saveContactStore(store) {
  try {
    localStorage.setItem(CONTACT_STORE_KEY, JSON.stringify(normalizeContactStore(store)));
    return true;
  } catch (e) {
    return false;
  }
}

function getContact(id) {
  var store = getContactStore();
  for (var i = 0; i < store.contacts.length; i++) {
    if (store.contacts[i].id === id) return store.contacts[i];
  }
  return null;
}

function getContactsByCategory(category) {
  var store = getContactStore();
  return store.contacts.filter(function(contact) {
    return contact.category === category;
  });
}

function buildSuggestedContactId(seed) {
  var slug = normalizeContactText(seed)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'kontakt';
}

function ensureUniqueContactId(store, baseId) {
  var candidate = buildSuggestedContactId(baseId);
  var suffix = 2;
  while (store.contacts.some(function(contact) { return contact.id === candidate; })) {
    candidate = buildSuggestedContactId(baseId) + '-' + suffix;
    suffix += 1;
  }
  return candidate;
}

function createContact(patch) {
  var store = getContactStore();
  var contact = normalizeContactRecord(patch || {}, store.contacts.length);
  contact.id = ensureUniqueContactId(store, contact.id || contact.name || contact.email || 'kontakt');
  store.contacts.push(contact);
  if (!saveContactStore(store)) return null;
  return contact;
}

function saveContact(id, patch) {
  var store = getContactStore();
  for (var i = 0; i < store.contacts.length; i++) {
    if (store.contacts[i].id === id) {
      store.contacts[i] = normalizeContactRecord(Object.assign({}, store.contacts[i], patch), i);
      store.contacts[i].id = id;
      return saveContactStore(store);
    }
  }
  return false;
}

function deleteContact(id) {
  var store = getContactStore();
  var newContacts = store.contacts.filter(function(contact) { return contact.id !== id; });
  if (newContacts.length === store.contacts.length) return false;
  store.contacts = newContacts;
  return saveContactStore(store);
}

function findContactMatch(fields, preferredContactId) {
  var store = getContactStore();
  if (preferredContactId) {
    var preferredContact = getContact(preferredContactId);
    if (preferredContact) return preferredContact;
  }

  var email = normalizeContactLookupValue(fields && fields.email);
  var telephone = normalizeTelephoneLookupValue(fields && fields.telephone);
  var name = normalizeContactLookupValue(fields && fields.name);

  if (email) {
    for (var i = 0; i < store.contacts.length; i++) {
      if (normalizeContactLookupValue(store.contacts[i].email) === email) return store.contacts[i];
    }
  }
  if (telephone) {
    for (var j = 0; j < store.contacts.length; j++) {
      if (normalizeTelephoneLookupValue(store.contacts[j].telephone) === telephone) return store.contacts[j];
    }
  }
  if (name) {
    for (var k = 0; k < store.contacts.length; k++) {
      if (normalizeContactLookupValue(store.contacts[k].name) === name) return store.contacts[k];
    }
  }
  return null;
}
