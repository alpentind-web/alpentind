/* ========================================
   AlpenTind Platform Preview v0.2
   Mock-data – Exempeldata för demo
   ======================================== */

// Inloggad användare
const currentUser = {
  id: 'USER-001',
  name: 'Erik Bergström',
  role: 'Guide & Årsguide',
  email: 'erik@alpentind.se',
  phone: '+46 70 123 45 67',
  avatar: 'EB',
  department: 'Guider',
};

// ========================================
// Uppgifter (Dagens uppgifter)
// ========================================

const tasks = [
  {
    id: 'TASK-001',
    title: 'Bekräfta boende',
    description: 'Refuge Bonatti',
    dueDate: '2027-07-15',
    status: 'pending',
    priority: 'high',
    assignee: 'Erik Bergström',
  },
  {
    id: 'TASK-002',
    title: 'Skicka deltagarbrev',
    description: 'Sarek Sommar 3 aug',
    dueDate: '2027-07-20',
    status: 'pending',
    priority: 'medium',
    assignee: 'Erik Bergström',
  },
  {
    id: 'TASK-003',
    title: 'Ring guide Johan',
    description: 'Klätterkurs 14 juni',
    dueDate: '2027-07-14',
    status: 'completed',
    priority: 'low',
    assignee: 'Erik Bergström',
  },
];

// ========================================
// Avgångar (Kommande avgångar)
// ========================================

const departures = [
  {
    id: 'DEP-001',
    name: 'Tour du Mont Blanc',
    startDate: '2027-07-15',
    participants: 12,
    guides: ['Erik Bergström', 'Anna Andersson'],
    status: 'confirmed',
    category: 'Vandring',
  },
  {
    id: 'DEP-002',
    name: 'Sarek Sommar',
    startDate: '2027-08-03',
    participants: 8,
    guides: ['Erik Bergström'],
    status: 'confirmed',
    category: 'Vildmark',
  },
  {
    id: 'DEP-003',
    name: 'Klätterkurs Klippa',
    startDate: '2027-06-14',
    participants: 6,
    guides: ['Johan Svensson'],
    status: 'confirmed',
    category: 'Klättring',
  },
];

// ========================================
// Bokningar (Nya bokningar)
// ========================================

const bookings = [
  {
    id: 'BOOK-001',
    customerName: 'Anna Andersson',
    product: 'Tour du Mont Blanc',
    participants: 2,
    date: '2027-07-15',
    status: 'pending',
    email: 'anna@example.com',
  },
  {
    id: 'BOOK-002',
    customerName: 'Martin Nilsson',
    product: 'Sarek Sommar',
    participants: 1,
    date: '2027-08-03',
    status: 'pending',
    email: 'martin@example.com',
  },
];

// ========================================
// Väntar på bekräftelse
// ========================================

const awaitingConfirmation = [
  {
    id: 'AWAIT-001',
    customerName: 'Anna Andersson',
    product: 'Tour du Mont Blanc',
    status: 'awaiting_confirmation',
    date: '2027-07-15',
    daysLeft: 3,
  },
  {
    id: 'AWAIT-002',
    customerName: 'Martin Nilsson',
    product: 'Sarek Sommar',
    status: 'awaiting_confirmation',
    date: '2027-08-03',
    daysLeft: 5,
  },
];

// ========================================
// Betalningar att följa upp
// ========================================

const payments = [
  {
    id: 'PAY-001',
    customerName: 'Anna Andersson',
    product: 'Tour du Mont Blanc',
    amount: 28500,
    dueDate: '2027-07-15',
    status: 'pending',
    currency: 'SEK',
  },
  {
    id: 'PAY-002',
    customerName: 'Peter Nilsson',
    product: 'Sarek Sommar',
    amount: 32950,
    dueDate: '2027-07-20',
    status: 'pending',
    currency: 'SEK',
  },
  {
    id: 'PAY-003',
    customerName: 'ACME AB',
    product: 'Klätterkurs Klippa',
    amount: 26000,
    dueDate: '2027-07-25',
    status: 'pending',
    currency: 'SEK',
  },
];

// ========================================
// Boenden som inte är bokade
// ========================================

const accommodations = [
  {
    id: 'ACC-001',
    name: 'Refuge Bonatti',
    departure: 'Tour du Mont Blanc',
    dates: '2027-07-15 – 2027-07-20',
    beds: 12,
    status: 'not_booked',
    contact: 'booking@bonatti.it',
  },
  {
    id: 'ACC-002',
    name: 'Sarek Lodge',
    departure: 'Sarek Sommar',
    dates: '2027-08-03 – 2027-08-05',
    beds: 8,
    status: 'not_booked',
    contact: 'info@sarek-lodge.se',
  },
];

// ========================================
// Kundmeddelanden
// ========================================

const customerMessages = [
  {
    id: 'MSG-001',
    customerName: 'Anna Andersson',
    message: 'Hej! Jag undrar om packlistan för TMB. Behöver jag ha med en större ryggsäck?',
    timestamp: '2 h sedan',
    status: 'unread',
    avatar: 'AA',
  },
  {
    id: 'MSG-002',
    customerName: 'Peter Nilsson',
    message: 'Ser fram emot resan! Kan ni bekräfta avgångstiden?',
    timestamp: '5 h sedan',
    status: 'unread',
    avatar: 'PN',
  },
  {
    id: 'MSG-003',
    customerName: 'ACME AB',
    message: 'Hej, kan ni skicka fakturan med vårt organisationsnummer?',
    timestamp: '1 dag sedan',
    status: 'read',
    avatar: 'AB',
  },
];

// ========================================
// Vädervarningar
// ========================================

const weatherWarnings = [
  {
    id: 'WEATHER-001',
    title: 'Kraftigt regn',
    departure: 'Tour du Mont Blanc',
    dates: '2027-07-14 – 2027-07-16',
    severity: 'warning',
    description: 'Lokalt kraftigt regn och risk för stenfall i höjdläge.',
    featherIcon: 'cloud-rain',
  },
  {
    id: 'WEATHER-002',
    title: 'Snöfall i Sarek',
    departure: 'Sarek Sommar',
    dates: '2027-08-02 – 2027-08-04',
    severity: 'info',
    description: 'Förväntade snöfall ovan 800 m ö.h.',
    featherIcon: 'cloud-snow',
  },
];

// ========================================
// Upplevelser (ersätter Produkter)
// ========================================

const products = [
  {
    id: 'PROD-001',
    name: 'Vandringsresa A',
    title: 'Tour du Mont Blanc',
    category: 'Vandring',
    status: 'active',
    variant: 'Standard',
    description: 'En klassisk vandring runt Mont Blanc genom tre länder.',
    duration: '12 dagar',
    difficulty: 'Mellannivå',
    price: 28500,
    currency: 'SEK',
    guides: ['Erik Bergström', 'Anna Andersson'],
    dates: [
      {
        id: 'DATE-001',
        startDate: '2027-07-15',
        endDate: '2027-07-27',
        participants: 12,
        status: 'confirmed',
      },
    ],
  },
  {
    id: 'PROD-002',
    name: 'Vandringsresa B',
    title: 'Sarek Sommar',
    category: 'Vildmark',
    status: 'active',
    variant: 'Standard',
    description: 'Vildmarksvandring i Sarek nationalpark.',
    duration: '8 dagar',
    difficulty: 'Avancerad',
    price: 32950,
    currency: 'SEK',
    guides: ['Erik Bergström'],
    dates: [
      {
        id: 'DATE-002',
        startDate: '2027-08-03',
        endDate: '2027-08-10',
        participants: 8,
        status: 'confirmed',
      },
    ],
  },
  {
    id: 'PROD-003',
    name: 'Klätterkurs A',
    title: 'Klätterkurs Klippa',
    category: 'Klättring',
    status: 'active',
    variant: 'Introduktion',
    description: 'Introduktionskurs i klättring för nybörjare.',
    duration: '6 dagar',
    difficulty: 'Nybörjare',
    price: 26000,
    currency: 'SEK',
    guides: ['Johan Svensson'],
    dates: [
      {
        id: 'DATE-003',
        startDate: '2027-06-14',
        endDate: '2027-06-19',
        participants: 6,
        status: 'confirmed',
      },
    ],
  },
];

// ========================================
// Menystruktur
// ========================================

const navigationItems = [
  { id: 'nav-1',  label: 'Min arbetsdag', featherIcon: 'home',          page: 'arbetsdag'     },
  { id: 'nav-2',  label: 'Upplevelser',   featherIcon: 'compass',       page: 'upplevelser'   },
  { id: 'nav-3',  label: 'Avgångar',      featherIcon: 'navigation',    page: 'departures'    },
  { id: 'nav-4',  label: 'Kunder',        featherIcon: 'users',         page: 'customers'     },
  { id: 'nav-5',  label: 'Guider',        featherIcon: 'user-check',    page: 'guides'        },
  { id: 'nav-6',  label: 'Boenden',       featherIcon: 'layers',        page: 'accommodations'},
  { id: 'nav-7',  label: 'Ekonomi',       featherIcon: 'bar-chart-2',   page: 'economy'       },
  { id: 'nav-8',  label: 'Kartor',        featherIcon: 'map',           page: 'maps'          },
  { id: 'nav-9',  label: 'Dokument',      featherIcon: 'file-text',     page: 'documents'     },
  { id: 'nav-10', label: 'Meddelanden',   featherIcon: 'message-square',page: 'messages'      },
  { id: 'nav-11', label: 'Inställningar', featherIcon: 'settings',      page: 'settings'      },
];

// ========================================
// Dashboard-statistik
// ========================================

const dashboardStats = {
  tasks: tasks.filter(t => t.status === 'pending').length,
  bookings: bookings.length,
  warnings: weatherWarnings.length,
  nextDeparture: departures[0].startDate,
};

// ========================================
// Exporterat datapaket
// ========================================

const mockData = {
  currentUser,
  tasks,
  departures,
  bookings,
  awaitingConfirmation,
  payments,
  accommodations,
  customerMessages,
  weatherWarnings,
  products,
  navigationItems,
  dashboardStats,
};
