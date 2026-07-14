/* ========================================
   AlpenTind Platform Preview v0.1
   UI Functions - Rendering & DOM Management
   ======================================== */

// ========================================
// Sidebar Rendering
// ========================================

function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <img src="https://via.placeholder.com/120x60?text=AlpenTind" alt="AlpenTind">
      <h1>AlpenTind</h1>
      <p>Guiding Platform</p>
    </div>
    <nav class="sidebar-nav" id="nav-menu"></nav>
    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar">${mockData.currentUser.avatar}</div>
        <div class="user-info">
          <p class="user-name">${mockData.currentUser.name}</p>
          <p class="user-role">${mockData.currentUser.role}</p>
        </div>
      </div>
    </div>
  `;

  const navMenu = document.getElementById('nav-menu');
  mockData.navigationItems.forEach(item => {
    const button = document.createElement('button');
    button.className = 'nav-item';
    button.dataset.page = item.page;
    button.innerHTML = `
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
    `;
    button.onclick = () => navigateTo(item.page, item.id);
    navMenu.appendChild(button);
  });
}

// ========================================
// Header Rendering
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
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-icon">📋</span>
          <p class="stat-label">Uppgifter</p>
          <p class="stat-value">${mockData.dashboardStats.tasks}</p>
        </div>
        <div class="stat-item">
          <span class="stat-icon">📅</span>
          <p class="stat-label">Bokningar</p>
          <p class="stat-value">${mockData.dashboardStats.bookings}</p>
        </div>
        <div class="stat-item">
          <span class="stat-icon">⚠️</span>
          <p class="stat-label">Varningar</p>
          <p class="stat-value">${mockData.dashboardStats.warnings}</p>
        </div>
      </div>
      <div class="header-actions">
        <div class="search-box">
          <span>🔍</span>
          <input type="text" placeholder="Sök...">
        </div>
        <div class="notification-bell">
          🔔
          <span class="notification-badge">${mockData.bookings.length}</span>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// Dashboard Rendering
// ========================================

function renderDashboard() {
  renderSidebar();
  renderHeader();
  renderTasksGrid();
  renderDeparturesGrid();
  renderBookingsGrid();
  renderAwaitingGrid();
  renderPaymentsTable();
  renderAccommodationsTable();
  renderMessagesList();
  renderWeatherWarnings();
}

// ========================================
// Tasks Grid
// ========================================

function renderTasksGrid() {
  const grid = document.getElementById('tasks-grid');
  if (!grid) return;

  grid.innerHTML = mockData.tasks.map(task => `
    <div class="card task-card">
      <div class="card-header">
        <h3>${task.title}</h3>
        <span class="badge badge-${task.priority}">${task.priority}</span>
      </div>
      <p class="text-muted">${task.description}</p>
      <div class="card-footer">
        <span class="text-xs">📅 ${task.dueDate}</span>
        <span class="badge ${task.status === 'completed' ? 'badge-success' : 'badge-warning'}">
          ${task.status === 'completed' ? '✓ Slutförd' : '⏳ Väntande'}
        </span>
      </div>
    </div>
  `).join('');
}

// ========================================
// Departures Grid
// ========================================

function renderDeparturesGrid() {
  const grid = document.getElementById('departures-grid');
  if (!grid) return;

  grid.innerHTML = mockData.departures.map(dep => `
    <div class="card departure-card">
      <img src="${dep.image}" alt="${dep.name}" class="card-image">
      <div class="card-body">
        <h3>${dep.name}</h3>
        <p class="text-muted">📅 ${dep.startDate}</p>
        <p class="text-muted">👥 ${dep.participants} deltagare</p>
        <div class="card-footer">
          <span class="badge badge-success">Bekräftad</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ========================================
// Bookings Grid
// ========================================

function renderBookingsGrid() {
  const grid = document.getElementById('bookings-grid');
  if (!grid) return;

  grid.innerHTML = mockData.bookings.map(booking => `
    <div class="card booking-card">
      <div class="card-header">
        <h3>${booking.customerName}</h3>
      </div>
      <p class="text-muted">${booking.product}</p>
      <p class="text-muted">👥 ${booking.participants} ${booking.participants === 1 ? 'deltagare' : 'deltagare'}</p>
      <p class="text-muted">📅 ${booking.date}</p>
      <div class="card-footer">
        <span class="badge badge-warning">Väntande</span>
      </div>
    </div>
  `).join('');
}

// ========================================
// Awaiting Confirmation Grid
// ========================================

function renderAwaitingGrid() {
  const grid = document.getElementById('awaiting-grid');
  if (!grid) return;

  grid.innerHTML = mockData.awaitingConfirmation.map(item => `
    <div class="card awaiting-card">
      <div class="card-header">
        <h3>${item.customerName}</h3>
      </div>
      <p class="text-muted">${item.product}</p>
      <p class="text-muted">📅 ${item.date}</p>
      <p class="alert-info">⏳ ${item.daysLeft} dagar kvar</p>
      <div class="card-footer">
        <button class="btn btn-sm btn-primary">Skicka påminnelse</button>
      </div>
    </div>
  `).join('');
}

// ========================================
// Payments Table
// ========================================

function renderPaymentsTable() {
  const container = document.getElementById('payments-table');
  if (!container) return;

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Kund</th>
          <th>Produkt</th>
          <th>Belopp</th>
          <th>Förfallodatum</th>
          <th>Status</th>
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
// Accommodations Table
// ========================================

function renderAccommodationsTable() {
  const container = document.getElementById('accommodations-table');
  if (!container) return;

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Boende</th>
          <th>Avgang</th>
          <th>Datum</th>
          <th>Säng</th>
          <th>Åtgärd</th>
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
// Messages List
// ========================================

function renderMessagesList() {
  const container = document.getElementById('messages-list');
  if (!container) return;

  container.innerHTML = mockData.customerMessages.map(msg => `
    <div class="message-item ${msg.status === 'unread' ? 'unread' : ''}">
      <div class="message-avatar">${msg.avatar}</div>
      <div class="message-content">
        <div class="message-header">
          <h4>${msg.customerName}</h4>
          <span class="text-xs text-muted">${msg.timestamp}</span>
        </div>
        <p class="message-text">${msg.message}</p>
      </div>
      <button class="btn btn-sm btn-outline">Svar</button>
    </div>
  `).join('');
}

// ========================================
// Weather Warnings
// ========================================

function renderWeatherWarnings() {
  const container = document.getElementById('weather-warnings');
  if (!container) return;

  container.innerHTML = mockData.weatherWarnings.map(warning => `
    <div class="alert alert-${warning.severity}">
      <div class="alert-header">
        <span class="alert-icon">${warning.icon}</span>
        <h4>${warning.title}</h4>
      </div>
      <p>${warning.description}</p>
      <p class="text-xs text-muted">📅 ${warning.dates}</p>
      <p class="text-xs text-muted">📍 ${warning.departure}</p>
    </div>
  `).join('');
}

// ========================================
// Products Grid
// ========================================

function renderProducts() {
  renderSidebar();
  renderHeader();
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = mockData.products.map(product => `
    <div class="card product-card">
      <img src="${product.image}" alt="${product.title}" class="card-image">
      <div class="card-body">
        <h3>${product.title}</h3>
        <p class="text-muted">${product.category}</p>
        <p class="text-sm">${product.description}</p>
        <div class="product-specs">
          <span class="spec">⏱️ ${product.duration}</span>
          <span class="spec">📊 ${product.difficulty}</span>
        </div>
        <div class="product-price">
          <span class="price">${product.price.toLocaleString('sv-SE')} ${product.currency}</span>
        </div>
        <div class="card-footer">
          <button class="btn btn-sm btn-primary">Se detaljer</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ========================================
// Helper Functions
// ========================================

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return `Godmorgon, ${mockData.currentUser.name.split(' ')[0]}! 🌅`;
  if (hour < 18) return `Godmiddag, ${mockData.currentUser.name.split(' ')[0]}! ☀️`;
  return `Godkväll, ${mockData.currentUser.name.split(' ')[0]}! 🌙`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('sv-SE');
}

function formatCurrency(amount) {
  return amount.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK' });
}
