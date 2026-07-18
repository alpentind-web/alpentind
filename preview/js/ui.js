/* ========================================
   AlpenTind Platform Preview v0.2
   UI – Rendering och DOM-hantering
   ======================================== */

// ========================================
// SVG-logotyp – AlpenTind bergssilhuett
// ========================================

const logoSVG = `
<svg class="logo-svg" viewBox="0 0 80 52" width="80" height="52"
     xmlns="http://www.w3.org/2000/svg" aria-label="AlpenTind logotyp">
  <polyline
    points="40,4 10,40 70,40"
    fill="none"
    stroke="var(--color-primary)"
    stroke-width="2.5"
    stroke-linejoin="round"
    stroke-linecap="round"/>
  <polygon
    points="40,4 32,20 48,20"
    fill="var(--color-primary)"
    opacity="0.5"/>
</svg>`;

// ========================================
// Sidopanel
// ========================================

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      ${logoSVG}
      <h1>AlpenTind</h1>
      <p>Guideplattform</p>
    </div>
    <nav class="sidebar-nav" id="nav-menu" aria-label="Huvudmeny"></nav>
    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar" aria-hidden="true">${mockData.currentUser.avatar}</div>
        <div class="user-info">
          <p class="user-name">${mockData.currentUser.name}</p>
          <p class="user-role">${mockData.currentUser.role}</p>
        </div>
      </div>
      <button class="btn btn-secondary btn-full mt-md" onclick="logout()" style="margin-top:var(--spacing-sm)">
        <i data-feather="log-out" style="width:14px;height:14px"></i>
        Logga ut
      </button>
    </div>
  `;

  const navMenu = document.getElementById('nav-menu');
  mockData.navigationItems.forEach(item => {
    const button = document.createElement('button');
    button.className = 'nav-item';
    button.dataset.page = item.page;
    button.setAttribute('aria-label', item.label);
    button.innerHTML = `
      <span class="nav-icon" aria-hidden="true">
        <i data-feather="${item.featherIcon}" style="width:16px;height:16px"></i>
      </span>
      <span>${item.label}</span>
    `;
    button.onclick = () => navigateTo(item.page, item.id);
    navMenu.appendChild(button);
  });

  // Aktivera Feather-ikoner i sidopanelen
  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Sidhuvud
// ========================================

function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const greeting = getGreeting();

  header.innerHTML = `
    <div class="header-left">
      <div class="header-greeting">
        <h2>${greeting}</h2>
        <p>${new Date().toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
    <div class="header-right">
      <div class="header-stats" aria-label="Daglig statistik">
        <div class="stat-item">
          <span class="stat-icon" aria-hidden="true">
            <i data-feather="check-square" style="width:18px;height:18px"></i>
          </span>
          <p class="stat-label">Uppgifter</p>
          <p class="stat-value">${mockData.dashboardStats.tasks}</p>
        </div>
        <div class="stat-item">
          <span class="stat-icon" aria-hidden="true">
            <i data-feather="calendar" style="width:18px;height:18px"></i>
          </span>
          <p class="stat-label">Bokningar</p>
          <p class="stat-value">${mockData.dashboardStats.bookings}</p>
        </div>
        <div class="stat-item">
          <span class="stat-icon" aria-hidden="true">
            <i data-feather="alert-triangle" style="width:18px;height:18px"></i>
          </span>
          <p class="stat-label">Varningar</p>
          <p class="stat-value">${mockData.dashboardStats.warnings}</p>
        </div>
      </div>
      <div class="header-actions">
        <label class="search-box" for="header-search">
          <i data-feather="search" style="width:16px;height:16px;color:var(--color-text-dark)" aria-hidden="true"></i>
          <input type="search" id="header-search" placeholder="Sök..." aria-label="Sök i AlpenTind">
        </label>
        <div class="notification-bell" role="button" aria-label="Aviseringar" tabindex="0">
          <i data-feather="bell" style="width:18px;height:18px"></i>
          <span class="notification-badge" aria-label="${mockData.bookings.length} nya bokningar">
            ${mockData.bookings.length}
          </span>
        </div>
      </div>
    </div>
  `;

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Informationsbanner (diskret dagsöversikt)
// ========================================

function renderInfoBanner() {
  const banner = document.getElementById('info-banner');
  if (!banner) return;

  const daysUntilNext = daysBetween(new Date(), new Date(mockData.dashboardStats.nextDeparture));
  const daysLabel = daysUntilNext === 0
    ? 'Avgång idag'
    : daysUntilNext === 1
      ? 'Nästa avgång imorgon'
      : `Nästa avgång om ${daysUntilNext} dagar`;

  banner.innerHTML = `
    <span class="info-banner-label">Idag</span>
    <div class="info-banner-divider" aria-hidden="true"></div>
    <div class="info-banner-item">
      <i data-feather="check-circle" style="width:14px;height:14px"></i>
      <strong>${mockData.dashboardStats.tasks}</strong>&nbsp;uppgifter
    </div>
    <div class="info-banner-divider" aria-hidden="true"></div>
    <div class="info-banner-item">
      <i data-feather="bookmark" style="width:14px;height:14px"></i>
      <strong>${mockData.dashboardStats.bookings}</strong>&nbsp;nya bokningar
    </div>
    <div class="info-banner-divider" aria-hidden="true"></div>
    <div class="info-banner-item">
      <i data-feather="navigation" style="width:14px;height:14px"></i>
      ${daysLabel}
    </div>
    <div class="info-banner-divider" aria-hidden="true"></div>
    <div class="info-banner-item ${mockData.dashboardStats.warnings > 0 ? 'warning' : 'success'}">
      <i data-feather="${mockData.dashboardStats.warnings > 0 ? 'alert-triangle' : 'sun'}"
         style="width:14px;height:14px"></i>
      ${mockData.dashboardStats.warnings > 0
        ? `<strong>${mockData.dashboardStats.warnings}</strong>&nbsp;vädervarning${mockData.dashboardStats.warnings !== 1 ? 'ar' : ''}`
        : 'Inga vädervarningar'}
    </div>
  `;

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Dashboard
// ========================================

function renderDashboard() {
  renderSidebar();
  renderHeader();
  renderInfoBanner();
  renderAttentionSection();
  renderTodaysExperiences();
  renderOngoingDialogues();
  renderFollowUpSection();
  renderQuickActions();
}

// ========================================
// AttentionCard – reusable component
// ========================================

function createAttentionCard({ id, title, subtitle, status, description, action, badge, priority }) {
  const priorityClassMap = {
    high:   'card-danger',
    medium: 'card-warning',
    low:    '',
  };
  const priorityClass = priorityClassMap[priority] || '';

  const statusMap = {
    waiting_recommendation: { label: 'Väntar på rekommendation', cls: 'badge-warning' },
    pending:                { label: 'Väntande',                  cls: 'badge-warning' },
    overdue:                { label: 'Förfallen',                 cls: 'badge-danger'  },
    active:                 { label: 'Aktiv',                     cls: 'badge-success' },
    unread:                 { label: 'Oläst',                     cls: 'badge-primary' },
    read:                   { label: 'Läst',                      cls: 'badge-info'    },
  };
  const statusInfo = statusMap[status] || { label: status, cls: 'badge-info' };

  const priorityLabelMap = { high: 'Hög', medium: 'Medel', low: 'Låg' };
  const priorityTitle = priorityLabelMap[priority] || priority;

  return `
    <article class="card attention-card ${priorityClass}" data-id="${id}">
      <div class="card-body">
        <div class="attention-card-header">
          ${priority ? `<span class="attention-priority priority-${priority}" aria-label="Prioritet: ${priorityTitle}" title="Prioritet: ${priorityTitle}"></span>` : ''}
          <div class="attention-card-titles">
            <h3 class="attention-card-title">${title}</h3>
            ${subtitle ? `<p class="attention-card-subtitle">${subtitle}</p>` : ''}
          </div>
          ${badge ? `<span class="badge badge-warning">${badge}</span>` : ''}
        </div>
        <p class="attention-card-description">${description}</p>
        <div class="attention-card-footer">
          <span class="badge ${statusInfo.cls}">${statusInfo.label}</span>
          ${action ? `<button class="btn btn-sm btn-primary" type="button">${action}</button>` : ''}
        </div>
      </div>
    </article>
  `;
}

// ========================================
// Kräver uppmärksamhet
// ========================================

function renderAttentionSection() {
  const grid = document.getElementById('attention-grid');
  if (!grid) return;
  grid.innerHTML = mockData.attentionItems.map(item => createAttentionCard(item)).join('');
}

// ========================================
// Dagens upplevelser
// ========================================

function renderTodaysExperiences() {
  const grid = document.getElementById('experiences-grid');
  if (!grid) return;

  const statusMap = {
    active:    { label: 'Aktiv',    cls: 'badge-success' },
    completed: { label: 'Avslutad', cls: 'badge-info'    },
    cancelled: { label: 'Avbruten', cls: 'badge-danger'  },
  };

  grid.innerHTML = mockData.todaysExperiences.map(exp => {
    const s = statusMap[exp.status] || { label: exp.status, cls: 'badge-info' };
    return `
      <article class="card">
        <div class="card-body">
          <div class="attention-card-header">
            <div class="attention-card-titles">
              <h3 class="attention-card-title">${exp.title}</h3>
              <p class="attention-card-subtitle">${exp.subtitle}</p>
            </div>
            <span class="badge ${s.cls}">${s.label}</span>
          </div>
          <p class="attention-card-description">${exp.description}</p>
        </div>
      </article>
    `;
  }).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Pågående dialoger
// ========================================

function renderOngoingDialogues() {
  const container = document.getElementById('dialogues-list');
  if (!container) return;

  container.innerHTML = mockData.ongoingDialogues.map(dlg => `
    <div class="message-item ${dlg.status === 'unread' ? 'unread' : ''}" role="listitem">
      <div class="message-avatar" aria-hidden="true">${dlg.avatar}</div>
      <div class="message-content">
        <div class="message-header">
          <h4>${dlg.title}</h4>
          <time class="text-xs text-muted">${dlg.timestamp}</time>
        </div>
        <p class="message-text">${dlg.subtitle} – ${dlg.description}</p>
      </div>
      <button class="btn btn-sm btn-secondary" type="button">Svara</button>
    </div>
  `).join('');
}

// ========================================
// Att följa upp
// ========================================

function renderFollowUpSection() {
  const grid = document.getElementById('followup-grid');
  if (!grid) return;
  grid.innerHTML = mockData.followUpItems.map(item => createAttentionCard(item)).join('');
}

// ========================================
// Snabbåtgärder
// ========================================

function renderQuickActions() {
  const container = document.getElementById('quick-actions');
  if (!container) return;

  const actions = [
    { label: 'Ny dialog',     icon: 'message-circle' },
    { label: 'Ny upplevelse', icon: 'compass'         },
    { label: 'Ny person',     icon: 'user-plus'       },
    { label: 'Ny guide',      icon: 'user-check'      },
  ];

  container.innerHTML = actions.map(a => `
    <button class="btn btn-secondary" type="button">
      <i data-feather="${a.icon}"></i>
      ${a.label}
    </button>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Uppgiftskort
// ========================================

function renderTasksGrid() {
  const grid = document.getElementById('tasks-grid');
  if (!grid) return;

  const priorityLabel = { high: 'Hög', medium: 'Medel', low: 'Låg' };

  grid.innerHTML = mockData.tasks.map(task => `
    <article class="card task-card">
      <div class="card-header">
        <h3>${task.title}</h3>
        <span class="badge badge-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'}">
          ${priorityLabel[task.priority] || task.priority}
        </span>
      </div>
      <div class="card-body">
        <p class="text-muted">${task.description}</p>
      </div>
      <div class="card-footer">
        <span class="text-xs" style="display:flex;align-items:center;gap:4px">
          <i data-feather="calendar" style="width:12px;height:12px"></i>
          ${task.dueDate}
        </span>
        <span class="badge ${task.status === 'completed' ? 'badge-success' : 'badge-warning'}">
          ${task.status === 'completed' ? 'Slutförd' : 'Väntande'}
        </span>
      </div>
    </article>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Avgångskort
// ========================================

function renderDeparturesGrid() {
  const grid = document.getElementById('departures-grid');
  if (!grid) return;

  grid.innerHTML = mockData.departures.map(dep => `
    <article class="card departure-card">
      <div class="card-image-placeholder" aria-hidden="true">
        <i data-feather="map" style="width:48px;height:48px"></i>
        <span class="card-image-label">${dep.category}</span>
      </div>
      <div class="card-body">
        <h3>${dep.name}</h3>
        <p class="text-muted" style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          <i data-feather="calendar" style="width:13px;height:13px"></i>
          ${dep.startDate}
        </p>
        <p class="text-muted" style="display:flex;align-items:center;gap:6px">
          <i data-feather="users" style="width:13px;height:13px"></i>
          ${dep.participants} deltagare
        </p>
      </div>
      <div class="card-footer">
        <span class="badge badge-success">Bekräftad</span>
      </div>
    </article>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Bokningskort
// ========================================

function renderBookingsGrid() {
  const grid = document.getElementById('bookings-grid');
  if (!grid) return;

  grid.innerHTML = mockData.bookings.map(booking => `
    <article class="card booking-card">
      <div class="card-header">
        <h3>${booking.customerName}</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">${booking.product}</p>
        <p class="text-muted" style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          <i data-feather="users" style="width:13px;height:13px"></i>
          ${booking.participants} deltagare
        </p>
        <p class="text-muted" style="display:flex;align-items:center;gap:6px">
          <i data-feather="calendar" style="width:13px;height:13px"></i>
          ${booking.date}
        </p>
      </div>
      <div class="card-footer">
        <span class="badge badge-warning">Väntande</span>
      </div>
    </article>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Väntar på bekräftelse
// ========================================

function renderAwaitingGrid() {
  const grid = document.getElementById('awaiting-grid');
  if (!grid) return;

  grid.innerHTML = mockData.awaitingConfirmation.map(item => `
    <article class="card awaiting-card">
      <div class="card-header">
        <h3>${item.customerName}</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">${item.product}</p>
        <p class="text-muted" style="display:flex;align-items:center;gap:6px;margin-bottom:var(--spacing-sm)">
          <i data-feather="calendar" style="width:13px;height:13px"></i>
          ${item.date}
        </p>
        <p class="text-muted" style="display:flex;align-items:center;gap:6px">
          <i data-feather="clock" style="width:13px;height:13px"></i>
          ${item.daysLeft} dagar kvar
        </p>
      </div>
      <div class="card-footer">
        <button class="btn btn-sm btn-primary">Skicka påminnelse</button>
      </div>
    </article>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Betalningstabell
// ========================================

function renderPaymentsTable() {
  const container = document.getElementById('payments-table');
  if (!container) return;

  container.innerHTML = `
    <table class="table" aria-label="Betalningar att följa upp">
      <thead>
        <tr>
          <th scope="col">Kund</th>
          <th scope="col">Upplevelse</th>
          <th scope="col">Belopp</th>
          <th scope="col">Förfallodatum</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        ${mockData.payments.map(payment => `
          <tr>
            <td>${payment.customerName}</td>
            <td>${payment.product}</td>
            <td>${payment.amount.toLocaleString('sv-SE')} ${payment.currency}</td>
            <td>${payment.dueDate}</td>
            <td><span class="badge badge-warning">Väntande</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ========================================
// Boendetabell
// ========================================

function renderAccommodationsTable() {
  const container = document.getElementById('accommodations-table');
  if (!container) return;

  container.innerHTML = `
    <table class="table" aria-label="Boenden att boka">
      <thead>
        <tr>
          <th scope="col">Boende</th>
          <th scope="col">Avgång</th>
          <th scope="col">Datum</th>
          <th scope="col">Sängar</th>
          <th scope="col">Åtgärd</th>
        </tr>
      </thead>
      <tbody>
        ${mockData.accommodations.map(acc => `
          <tr>
            <td>${acc.name}</td>
            <td>${acc.departure}</td>
            <td>${acc.dates}</td>
            <td>${acc.beds}</td>
            <td><button class="btn btn-sm btn-primary">Boka nu</button></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ========================================
// Kundmeddelandelista
// ========================================

function renderMessagesList() {
  const container = document.getElementById('messages-list');
  if (!container) return;

  container.innerHTML = mockData.customerMessages.map(msg => `
    <div class="message-item ${msg.status === 'unread' ? 'unread' : ''}"
         role="listitem">
      <div class="message-avatar" aria-hidden="true">${msg.avatar}</div>
      <div class="message-content">
        <div class="message-header">
          <h4>${msg.customerName}</h4>
          <time class="text-xs text-muted">${msg.timestamp}</time>
        </div>
        <p class="message-text">${msg.message}</p>
      </div>
      <button class="btn btn-sm btn-secondary">Svara</button>
    </div>
  `).join('');
}

// ========================================
// Vädervarningar
// ========================================

function renderWeatherWarnings() {
  const container = document.getElementById('weather-warnings');
  if (!container) return;

  container.innerHTML = mockData.weatherWarnings.map(warning => `
    <div class="alert alert-${warning.severity}" role="alert">
      <div style="display:flex;align-items:center;gap:var(--spacing-sm);margin-bottom:var(--spacing-sm)">
        <i data-feather="${warning.featherIcon}" style="width:18px;height:18px;flex-shrink:0"></i>
        <h4 style="margin:0">${warning.title}</h4>
      </div>
      <p style="margin-bottom:var(--spacing-xs)">${warning.description}</p>
      <p class="text-xs" style="display:flex;align-items:center;gap:4px;margin-bottom:2px">
        <i data-feather="calendar" style="width:11px;height:11px"></i>
        ${warning.dates}
      </p>
      <p class="text-xs" style="display:flex;align-items:center;gap:4px;margin:0">
        <i data-feather="map-pin" style="width:11px;height:11px"></i>
        ${warning.departure}
      </p>
    </div>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Upplevelsegrid
// ========================================

function renderProducts() {
  renderSidebar();
  renderHeader();
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = mockData.products.map(product => `
    <article class="card product-card">
      <div class="card-image-placeholder" aria-hidden="true">
        <i data-feather="compass" style="width:48px;height:48px"></i>
        <span class="card-image-label">${product.category}</span>
      </div>
      <div class="card-body">
        <h3>${product.title}</h3>
        <p class="text-muted" style="font-size:var(--font-size-sm);margin-bottom:var(--spacing-sm)">
          ${product.description}
        </p>
        <div class="product-specs">
          <span class="spec">
            <i data-feather="clock" style="width:12px;height:12px"></i>
            ${product.duration}
          </span>
          <span class="spec">
            <i data-feather="trending-up" style="width:12px;height:12px"></i>
            ${product.difficulty}
          </span>
        </div>
        <div class="product-price">
          <span class="price">${product.price.toLocaleString('sv-SE')} ${product.currency}</span>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-sm btn-primary">Se detaljer</button>
      </div>
    </article>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Hjälpfunktioner
// ========================================

function getGreeting() {
  const hour = new Date().getHours();
  const firstName = mockData.currentUser.name.split(' ')[0];
  if (hour < 12) return `God morgon, ${firstName}`;
  if (hour < 18) return `God dag, ${firstName}`;
  return `God kväll, ${firstName}`;
}

function daysBetween(from, to) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.ceil((to - from) / msPerDay));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('sv-SE');
}

function formatCurrency(amount) {
  return amount.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' });
}
