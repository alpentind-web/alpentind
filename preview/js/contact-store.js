/* ========================================
   AlpenTind Platform Preview
   Contact Store – Contact Register Data (RI-012)

   API:
     getContact(id)       → contact object or null
     saveContact(id, patch) → true/false (localStorage persistence)
   ======================================== */

var CONTACT_STORE_KEY = 'alpentind-contact-store';

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

function getContactStore() {
  try {
    var raw = localStorage.getItem(CONTACT_STORE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.contacts)) return parsed;
    }
  } catch (e) {
    // fall through to mock data
  }
  return JSON.parse(JSON.stringify(CONTACT_MOCK_DATA));
}

function saveContactStore(store) {
  try {
    localStorage.setItem(CONTACT_STORE_KEY, JSON.stringify(store));
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

function saveContact(id, patch) {
  var store = getContactStore();
  for (var i = 0; i < store.contacts.length; i++) {
    if (store.contacts[i].id === id) {
      store.contacts[i] = Object.assign({}, store.contacts[i], patch);
      return saveContactStore(store);
    }
  }
  return false;
}
