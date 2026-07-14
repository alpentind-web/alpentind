/* ========================================
   AlpenTind Platform Preview v0.1
   Mock Data - All Example Data
   ======================================== */

// User Information
const currentUser = {
  id: 'USER-001',
  name: 'Erik Bergström',
  role: 'Guide & Årsguide',
  email: 'erik@alpentind.se',
  phone: '+46 70 123 45 67',
  avatar: 'EB',
  department: 'Guides',
};

// ========================================
// Tasks (Dagens uppgifter)
// ========================================

const tasks = [
  {
    id: 'TASK-001',
    title: 'Bekrafta boende',
    description: 'Refuge Bonatti',
    dueDate: '2027-07-15',
    status: 'pending',
    priority: 'high',
    assignee: 'Erik Bergström',
  },
  {
    id: 'TASK-002',
    title: 'Skicka deltgarbrev',
    description: 'Sarek Sommar 3 aug',
    dueDate: '2027-07-20',
    status: 'pending',
    priority: 'medium',
    assignee: 'Erik Bergström',
  },
  {
    id: 'TASK-003',
    title: 'Ring Guide Johan',
    description: 'Klätterkurs 14 juni',
    dueDate: '2027-07-14',
    status: 'completed',
    priority: 'low',
    assignee: 'Erik Bergström',
  },
];

// ========================================
// Departures (Kommande avgångar)
// ========================================

const departures = [
  {
    id: 'DEP-001',
    name: 'Tour du Mont Blanc',
    startDate: '2027-07-15',
    participants: 12,
    guides: ['Erik Bergström', 'Anna Andersson'],
    status: 'confirmed',
    image: 'https://via.placeholder.com/200x150?text=Tour+du+Mont+Blanc',
  },
  {
    id: 'DEP-002',
    name: 'Sarek Sommar',
    startDate: '2027-08-03',
    participants: 8,
    guides: ['Erik Bergström'],
    status: 'confirmed',
    image: 'https://via.placeholder.com/200x150?text=Sarek+Sommar',
  },
  {
    id: 'DEP-003',
    name: 'Klätterkurs Klippa',
    startDate: '2027-06-14',
    participants: 6,
    guides: ['Johan Svensson'],
    status: 'confirmed',
    image: 'https://via.placeholder.com/200x150?text=Klatterkurs',
  },
];

// ========================================
// Bookings (Nya bokningar)
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
// Awaiting Confirmation (Väntar på bekräftelse)
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
// Payments to Follow Up (Betalningar att följa upp)
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
// Accommodations Not Booked (Boenden som inte är bokade)
// ========================================

const accommodations = [
  {
    id: 'ACC-001',
    name: 'Refuge Bonatti',
    departure: 'Tour du Mont Blanc',
    dates: '2027-07-15 - 2027-07-20',
    beds: 12,
    status: 'not_booked',
    contact: 'booking@bonatti.it',
  },
  {
    id: 'ACC-002',
    name: 'Sarek Lodge',
    departure: 'Sarek Sommar',
    dates: '2027-08-03 - 2027-08-05',
    beds: 8,
    status: 'not_booked',
    contact: 'info@sarek-lodge.se',
  },
];

// ========================================
// Customer Messages (Senaste kundmeddelanden)
// ========================================

const customerMessages = [
  {
    id: 'MSG-001',
    customerName: 'Anna Andersson',
    message: 'Hej! Jag undrar över packlistan för TMB. Behöver över packlistin för TMB. Behöver jag medbringardag större ryggsäck?',
    timestamp: '2 h sedan',
    status: 'unread',
    avatar: 'AA',
  },
  {
    id: 'MSG-002',
    customerName: 'Peter Nilsson',
    message: 'Se fram emot resan! Kan vi få snabba svar!',
    timestamp: '5 h sedan',
    status: 'unread',
    avatar: 'PN',
  },
  {
    id: 'MSG-003',
    customerName: 'ACME AB',
    message: 'Hej, kan vi fakturan med vår organisationsnummer?',
    timestamp: '1 dag sedan',
    status: 'read',
    avatar: 'AA',
  },
];

// ========================================
// Weather Warnings (Vädervarningar)
// ========================================

const weatherWarnings = [
  {
    id: 'WEATHER-001',
    title: 'Kraftigt regn',
    departure: 'Tour du Mont Blanc',
    dates: '2027-07-14 - 16 juli',
    severity: 'warning',
    description: 'Lokalt kraftig regn fall och risk för små i höjd.',
    icon: '⚠️',
  },
  {
    id: 'WEATHER-002',
    title: 'Snöfall i Sarek',
    departure: 'Sarek Sommar',
    dates: '2027-08-02 - 04 augusti',
    severity: 'info',
    description: 'Förväntad vid 800 m o.h.',
    icon: '❄️',
  },
];

// ========================================
// Products (Produkter)
// ========================================

const products = [
  {
    id: 'PROD-001',
    name: 'Vandringsresa A',
    title: 'Tour du Mont Blanc',
    category: 'Walking',
    status: 'active',
    variant: 'Standard',
    description: 'En klassisk vandring runt Mont Blanc med tre länder.',
    duration: '12 dagar',
    difficulty: 'Mittelnivå',
    price: 28500,
    currency: 'SEK',
    image: 'https://via.placeholder.com/400x300?text=Mont+Blanc',
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
    category: 'Walking',
    status: 'active',
    variant: 'Standard',
    description: 'Vildmarksvandring i Sarek nationalpark.',
    duration: '8 dagar',
    difficulty: 'Högnivå',
    price: 32950,
    currency: 'SEK',
    image: 'https://via.placeholder.com/400x300?text=Sarek',
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
    category: 'Climbing',
    status: 'active',
    variant: 'Introductory',
    description: 'Introduktionskurs i klättring för nybörjare.',
    duration: '6 dagar',
    difficulty: 'Nybörjare',
    price: 26000,
    currency: 'SEK',
    image: 'https://via.placeholder.com/400x300?text=Klattring',
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
// Navigation Menu Items
// ========================================

const navigationItems = [
  { id: 'nav-1', label: 'Min arbetsdag', icon: '🏠', page: 'arbetsdag' },
  { id: 'nav-2', label: 'Produkter', icon: '🎒', page: 'produkter' },
  { id: 'nav-3', label: 'Avgångar', icon: '📅', page: 'departures' },
  { id: 'nav-4', label: 'Kunder', icon: '👥', page: 'customers' },
  { id: 'nav-5', label: 'Guider', icon: '🧗', page: 'guides' },
  { id: 'nav-6', label: 'Boenden', icon: '🏠', page: 'accommodations' },
  { id: 'nav-7', label: 'Ekonomi', icon: '💰', page: 'economy' },
  { id: 'nav-8', label: 'Kartor', icon: '🗺️', page: 'maps' },
  { id: 'nav-9', label: 'Dokument', icon: '📄', page: 'documents' },
  { id: 'nav-10', label: 'Meddelanden', icon: '💬', page: 'messages' },
  { id: 'nav-11', label: 'Inställningar', icon: '⚙️', page: 'settings' },
];

// ========================================
// Dashboard Statistics
// ========================================

const dashboardStats = {
  tasks: tasks.filter(t => t.status === 'pending').length,
  bookings: bookings.length,
  warnings: weatherWarnings.length,
  nextDeparture: departures[0].startDate,
};

// ========================================
// Export all data
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
