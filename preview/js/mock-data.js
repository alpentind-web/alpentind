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
// Kräver uppmärksamhet (Requires Attention)
// ========================================

const attentionItems = [
  {
    id: 'ATT-001',
    title: 'Anna Andersson',
    subtitle: 'Tour du Mont Blanc',
    status: 'waiting_recommendation',
    description: 'Väntar på rekommendation inför avgång 22 juli.',
    priority: 'high',
    badge: 'Väntar',
    action: 'Öppna',
  },
  {
    id: 'ATT-002',
    title: 'Refuge Bonatti',
    subtitle: 'Tour du Mont Blanc – boende ej bekräftat',
    status: 'pending',
    description: 'Boende måste bekräftas före onsdag.',
    priority: 'high',
    badge: 'Kritiskt',
    action: 'Öppna',
  },
  {
    id: 'ATT-003',
    title: 'Martin Nilsson',
    subtitle: 'Sarek Sommar – betalning förfallen',
    status: 'overdue',
    description: 'Betalning 32 950 SEK förfallen sedan fredag.',
    priority: 'medium',
    badge: 'Förfallen',
    action: 'Öppna',
  },
];

// ========================================
// Kommande upplevelser (Upcoming Experiences)
// ========================================

const upcomingExperiences = [
  {
    id: 'EXP-001',
    title: 'Tour du Mont Blanc',
    date: '2026-07-22',
    dateRange: '22–29 juli 2026',
    guide: 'Linda Svensson',
    status: 'active',
    participants: 8,
    category: 'Vandring',
  },
  {
    id: 'EXP-002',
    title: 'Klätterkurs Klippa',
    date: '2026-07-24',
    dateRange: '24 juli 2026',
    guide: 'Johan Svensson',
    status: 'planned',
    participants: 6,
    category: 'Klättring',
  },
  {
    id: 'EXP-003',
    title: 'Watzmann övernattning',
    date: '2026-08-01',
    dateRange: '1–3 aug 2026',
    guide: 'Erik Bergström',
    status: 'planned',
    participants: 4,
    category: 'Alpin',
  },
  {
    id: 'EXP-004',
    title: 'Stubaier Höhenweg',
    date: '2026-08-10',
    dateRange: '10–16 aug 2026',
    guide: 'Linda Svensson',
    status: 'planned',
    participants: 6,
    category: 'Vandring',
  },
];

// ========================================
// Pågående dialoger (Ongoing Dialogues)
// ========================================

const ongoingDialogues = [
  {
    id: 'DLG-001',
    title: 'Anna Andersson',
    subtitle: 'Tour du Mont Blanc',
    status: 'unread',
    description: 'Fråga om packlistan – behöver jag ha med en större ryggsäck?',
    timestamp: '2h sedan',
    avatar: 'AA',
  },
  {
    id: 'DLG-002',
    title: 'Peter Nilsson',
    subtitle: 'Sarek Sommar',
    status: 'unread',
    description: 'Kan ni bekräfta avgångstiden?',
    timestamp: '5h sedan',
    avatar: 'PN',
  },
  {
    id: 'DLG-003',
    title: 'ACME AB',
    subtitle: 'Klätterkurs Klippa',
    status: 'read',
    description: 'Kan ni skicka fakturan med organisationsnummer?',
    timestamp: '1 dag sedan',
    avatar: 'AB',
  },
];

// ========================================
// Min arbetskö (Work Queue)
// ========================================

const workQueue = [
  {
    id: 'WQ-001',
    type: 'phone',
    title: 'Ring Hotel Bonatti och bekräfta boende',
    context: 'Tour du Mont Blanc – 8 deltagare',
    status: 'pending',
    priority: 'high',
    dueDate: '2026-07-19',
    association: 'Upplevelse: Tour du Mont Blanc • Guide: Linda Svensson',
  },
  {
    id: 'WQ-002',
    type: 'email',
    title: 'Skicka deltagarbrev',
    context: 'Klätterkurs Klippa',
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-07-20',
    association: 'Upplevelse: Klätterkurs Klippa • Guide: Johan Svensson',
  },
  {
    id: 'WQ-003',
    type: 'payment',
    title: 'Kontrollera betalning Martin Nilsson',
    context: '32 950 SEK förfallen',
    status: 'overdue',
    priority: 'high',
    dueDate: '2026-07-19',
    association: 'Person: Martin Nilsson • Upplevelse: Sarek Sommar',
  },
  {
    id: 'WQ-004',
    type: 'dialogue',
    title: 'Följ upp Anna Andersson dialog',
    context: 'Väntar på svar om rekommendation',
    status: 'overdue',
    priority: 'medium',
    dueDate: '2026-07-17',
    association: 'Person: Anna Andersson • Upplevelse: Tour du Mont Blanc',
  },
  {
    id: 'WQ-005',
    type: 'accommodation',
    title: 'Bekräfta guideuppdrag',
    context: 'Watzmann övernattning',
    status: 'pending',
    priority: 'low',
    dueDate: '2026-07-22',
    association: 'Guide: Erik Andersson • Upplevelse: Watzmann övernattning',
  },
];

// ========================================
// Kalender – händelser (Calendar Events)
// ========================================

const calendarEvents = [
  {
    id: 'CAL-001',
    date: '2026-07-15',
    type: 'deadline',
    title: 'Tour du Mont Blanc start',
    color: 'danger',
  },
  {
    id: 'CAL-002',
    date: '2026-07-16',
    type: 'meeting',
    title: 'Möte: Guideplanering',
    color: 'info',
  },
  {
    id: 'CAL-003',
    date: '2026-07-17',
    type: 'followup',
    title: 'Följ upp dialoger',
    color: 'warning',
  },
  {
    id: 'CAL-004',
    date: '2026-07-19',
    type: 'deadline',
    title: 'Betalning Martin Nilsson',
    color: 'danger',
  },
  {
    id: 'CAL-005',
    date: '2026-07-22',
    type: 'experience',
    title: 'Tour du Mont Blanc – avgång',
    color: 'primary',
  },
  {
    id: 'CAL-006',
    date: '2026-07-24',
    type: 'experience',
    title: 'Klätterkurs Klippa',
    color: 'info',
  },
  {
    id: 'CAL-007',
    date: '2026-08-01',
    type: 'experience',
    title: 'Watzmann övernattning',
    color: 'primary',
  },
  {
    id: 'CAL-008',
    date: '2026-08-10',
    type: 'experience',
    title: 'Stubaier Höhenweg',
    color: 'primary',
  },
];

const weekAgenda = [
  {
    id: 'WAG-001',
    dateLabel: 'Ons 15 juli',
    title: 'Tour du Mont Blanc start',
    assignment: 'Guide: Linda Svensson • Avstämning med boende',
    status: 'in_progress',
  },
  {
    id: 'WAG-002',
    dateLabel: 'Tor 16 juli',
    title: 'Möte: Guideplanering',
    assignment: 'Ansvarig: Erik Bergström',
    status: 'planned',
  },
  {
    id: 'WAG-003',
    dateLabel: 'Fre 17 juli',
    title: 'Följ upp dialoger',
    assignment: 'Anna Andersson • Martin Nilsson',
    status: 'planned',
  },
  {
    id: 'WAG-004',
    dateLabel: 'Sön 19 juli',
    title: 'Betalningskontroll',
    assignment: 'Förfallna betalningar och påminnelser',
    status: 'planned',
  },
];

// ========================================
// Dagliga uppgifter – inline redigerbara
// ========================================

const todoItems = [
  { id: 'TODO-001', text: 'Ring Refuge Bonatti och bekräfta 12 platser', done: false },
  { id: 'TODO-002', text: 'Skicka deltagarbrev Sarek Sommar', done: false },
  { id: 'TODO-003', text: 'Granska packlista TMB med Linda', done: true  },
  { id: 'TODO-004', text: 'Faktura ACME AB – lägg till org-nummer', done: false },
];

// ========================================
// Dialoger (Dialogue Workspace)
// ========================================

const dialogues = [
  {
    id: 'DIA-001',
    person: {
      name: 'Anna Andersson',
      avatar: 'AA',
      email: 'anna.andersson@example.com',
      phone: '+46 70 234 56 78',
      organization: null,
    },
    status: 'in_progress',
    goal: 'Bestiga Galdhøpiggen',
    motivation: 'Drömmer om att bestiga toppen tillsammans med sin far.',
    experience: 'Flera fjällvandringar i Sverige och Norge.',
    questions: 'Utrustning – vad behövs för en säker bestigning?',
    observations: 'Motiverad men osäker på tekniska krav. Verkar sakna erfarenhet av isyxa och crampons.',
    notes: 'Far är i 60-årsåldern. Viktigt att ta hänsyn till kondition och tempo.',
    nextAction: 'call',
    timeline: [
      {
        id: 'TL-001',
        date: '2027-07-10',
        type: 'inbound',
        summary: 'Första kontakt via e-post. Frågade om Galdhøpiggen-bestigning.',
      },
      {
        id: 'TL-002',
        date: '2027-07-12',
        type: 'outbound',
        summary: 'Svarade och bad om mer information om erfarenhet och mål.',
      },
      {
        id: 'TL-003',
        date: '2027-07-14',
        type: 'inbound',
        summary: 'Berättade om fjällvandringserfarenhet. Nämner far som medföljer.',
      },
    ],
  },
  {
    id: 'DIA-002',
    person: {
      name: 'Peter Nilsson',
      avatar: 'PN',
      email: 'peter.nilsson@example.com',
      phone: '+46 70 345 67 89',
      organization: null,
    },
    status: 'ready_for_recommendation',
    goal: 'Tour du Mont Blanc',
    motivation: 'Långsiktigt mål – vill slutföra ett av Europas klassiska fjällrundturer.',
    experience: 'Har genomfört Haute Route (Chamonix–Zermatt). God kondition.',
    questions: '',
    observations: 'Redo för rekommendation. Vet vad han vill. Behöver datum och pris.',
    notes: 'Flexibel på datum. Föredrar juli eller augusti.',
    nextAction: 'create_recommendation',
    timeline: [
      {
        id: 'TL-004',
        date: '2027-06-20',
        type: 'inbound',
        summary: 'Kontaktade via telefon. Intresserad av TMB.',
      },
      {
        id: 'TL-005',
        date: '2027-06-22',
        type: 'outbound',
        summary: 'Genomförd dialog om erfarenhet och förväntningar. Haute Route bekräftad.',
      },
      {
        id: 'TL-006',
        date: '2027-07-01',
        type: 'note',
        summary: 'Anteckning: Klar för rekommendation. Datum och prisförslag saknas.',
      },
    ],
  },
  {
    id: 'DIA-003',
    person: {
      name: 'ACME AB',
      avatar: 'AB',
      email: 'kontakt@acme.se',
      phone: '+46 8 123 456 78',
      organization: 'ACME AB',
    },
    status: 'needs_followup',
    goal: 'Ledarskapsretreat i fjällmiljö',
    motivation: 'Stärka ledarskapet och teamkänslan inför en organisationsförändring.',
    experience: 'Okänd – behöver kartläggas.',
    questions: 'Antal deltagare? Datum? Budget? Nivå på fysisk aktivitet?',
    observations: 'Kontakten kom via en rekommendation. Oklart vem inom organisationen som är beslutsfattare.',
    notes: 'Behöver uppföljningsmöte för att förstå scope och deltagarnas förutsättningar.',
    nextAction: 'schedule_meeting',
    timeline: [
      {
        id: 'TL-007',
        date: '2027-07-08',
        type: 'inbound',
        summary: 'E-post från Anna Lindgren, HR-chef. Frågar om teambuilding i fjällen.',
      },
      {
        id: 'TL-008',
        date: '2027-07-09',
        type: 'outbound',
        summary: 'Svarade med frågor om grupp, datum och förväntningar. Inget svar ännu.',
      },
    ],
  },
];

// ========================================
// Menystruktur
// ========================================

const navigationItems = [
  { id: 'nav-0',  label: 'Översikt',      featherIcon: 'layout',        page: 'oversikt'      },
  { id: 'nav-1',  label: 'Arbetsdag',     featherIcon: 'home',          page: 'arbetsdag'     },
  { id: 'nav-12', label: 'Dialoger',       featherIcon: 'message-circle', page: 'dialog'       },
  { id: 'nav-2',  label: 'Upplevelser',   featherIcon: 'compass',       page: 'upplevelser'   },
  { id: 'nav-3',  label: 'Avgångar',      featherIcon: 'navigation',    page: 'departures'    },
  { id: 'nav-4',  label: 'Kunder',        featherIcon: 'users',         page: 'customers'     },
  { id: 'nav-5',  label: 'Guider',        featherIcon: 'user-check',    page: 'guides'        },
  { id: 'nav-6',  label: 'Boenden',       featherIcon: 'layers',        page: 'accommodations'},
  { id: 'nav-7',  label: 'Ekonomi',       featherIcon: 'bar-chart-2',   page: 'economy'       },
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
  nextDeparture: '2026-07-22',
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
  attentionItems,
  upcomingExperiences,
  ongoingDialogues,
  workQueue,
  calendarEvents,
  weekAgenda,
  todoItems,
  dialogues,
};
