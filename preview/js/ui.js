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

  const attentionCount = (mockData.attentionItems || []).length;
  const highPriority = (mockData.workQueue || []).filter(item => item.priority === 'high' && item.status !== 'done').length;
  const todayItems = (mockData.workQueue || []).filter(item => item.dueDate === '2026-07-19').length;

  banner.innerHTML = `
    <span class="info-banner-label">Lägesbild</span>
    <div class="info-banner-divider" aria-hidden="true"></div>
    <div class="info-banner-item">
      <i data-feather="alert-circle" style="width:14px;height:14px"></i>
      <strong>${attentionCount}</strong>&nbsp;saker kräver din uppmärksamhet idag
    </div>
    <div class="info-banner-divider" aria-hidden="true"></div>
    <div class="info-banner-item">
      <i data-feather="flag" style="width:14px;height:14px"></i>
      <strong>${highPriority}</strong>&nbsp;ärenden med hög prioritet
    </div>
    <div class="info-banner-divider" aria-hidden="true"></div>
    <div class="info-banner-item">
      <i data-feather="clock" style="width:14px;height:14px"></i>
      <strong>${todayItems}</strong>&nbsp;saker planerade idag
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
  renderWorkdayForwardFocus();
  renderWeekAgenda();
  renderAttentionSection();
  renderUpcomingExperiences();
  renderWorkQueue();
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
        ${description ? `<p class="attention-card-description">${description}</p>` : ''}
        <div class="attention-card-footer">
          <span class="badge ${statusInfo.cls}">${statusInfo.label}</span>
          ${action ? `<button class="btn btn-sm btn-tertiary" type="button">${action}</button>` : ''}
        </div>
      </div>
    </article>
  `;
}

// ========================================
// Operationell kalender
// ========================================

function renderOperationalCalendar() {
  const container = document.getElementById('operational-calendar');
  if (!container) return;

  // Build calendar for current month view (centered on July 2026 for mock data)
  const viewYear = 2026;
  const viewMonth = 6; // July (0-indexed)
  const monthNames = [
    'Januari','Februari','Mars','April','Maj','Juni',
    'Juli','Augusti','September','Oktober','November','December',
  ];
  const dayNames = ['Mån','Tis','Ons','Tor','Fre','Lör','Sön'];

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay  = new Date(viewYear, viewMonth + 1, 0);

  // ISO week: Monday = 0
  let startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  // Group events by date string
  const eventsByDate = {};
  (mockData.calendarEvents || []).forEach(ev => {
    if (!eventsByDate[ev.date]) eventsByDate[ev.date] = [];
    eventsByDate[ev.date].push(ev);
  });

  const colorMap = {
    primary: 'var(--color-primary)',
    danger:  'var(--color-danger)',
    warning: 'var(--color-warning)',
    info:    'var(--color-info)',
    success: 'var(--color-success)',
  };

  // Build day cells
  // Mock "today" within the calendar month to demonstrate the today-highlight feature
  const mockToday = 19; // 19 July 2026

  let cells = '';

  // Empty cells before first day
  for (let i = 0; i < startOffset; i++) {
    cells += `<div class="cal-cell cal-cell--empty"></div>`;
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayEvents = eventsByDate[dateStr] || [];
    const isToday = (d === mockToday);

    const eventsHTML = dayEvents.map(ev => {
      const col = colorMap[ev.color] || 'var(--color-primary)';
      return `<span class="cal-event" title="${ev.title}"
                style="display:block;background:${col};color:#fff;font-size:10px;border-radius:3px;padding:1px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px"
              >${ev.title}</span>`;
    }).join('');

    cells += `
      <div class="cal-cell${isToday ? ' cal-cell--today' : ''}${dayEvents.length ? ' cal-cell--has-events' : ''}">
        <span class="cal-day-num">${d}</span>
        ${eventsHTML}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="cal-wrapper" style="background:var(--color-bg-card);border-radius:var(--border-radius-lg);padding:var(--spacing-lg);border:1px solid var(--color-border)">
      <div class="cal-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--spacing-md)">
        <h3 style="margin:0;font-size:var(--font-size-base);font-weight:600">${monthNames[viewMonth]} ${viewYear}</h3>
        <div class="cal-legend" style="display:flex;gap:var(--spacing-sm);flex-wrap:wrap">
          <span style="display:flex;align-items:center;gap:4px;font-size:var(--font-size-xs);color:var(--color-text-muted)">
            <span style="width:10px;height:10px;border-radius:2px;background:var(--color-primary);display:inline-block"></span>Upplevelse
          </span>
          <span style="display:flex;align-items:center;gap:4px;font-size:var(--font-size-xs);color:var(--color-text-muted)">
            <span style="width:10px;height:10px;border-radius:2px;background:var(--color-info);display:inline-block"></span>Möte
          </span>
          <span style="display:flex;align-items:center;gap:4px;font-size:var(--font-size-xs);color:var(--color-text-muted)">
            <span style="width:10px;height:10px;border-radius:2px;background:var(--color-warning);display:inline-block"></span>Uppföljning
          </span>
          <span style="display:flex;align-items:center;gap:4px;font-size:var(--font-size-xs);color:var(--color-text-muted)">
            <span style="width:10px;height:10px;border-radius:2px;background:var(--color-danger);display:inline-block"></span>Deadline
          </span>
        </div>
      </div>
      <div class="cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
        ${dayNames.map(n => `<div class="cal-day-name" style="text-align:center;font-size:var(--font-size-xs);font-weight:600;color:var(--color-text-muted);padding:var(--spacing-xs) 0">${n}</div>`).join('')}
        ${cells}
      </div>
    </div>
  `;
}

function renderWeekAgenda() {
  const container = document.getElementById('week-agenda-list');
  if (!container) return;

  const agenda = mockData.weekAgenda || [];

  container.innerHTML = `
    <div class="card">
      <div class="card-body">
        <p class="text-xs text-muted" style="margin:0 0 var(--spacing-sm)">v. 29 • 13–19 juli 2026</p>
        <div class="week-agenda-list">
          ${agenda.map(item => `
            <article class="week-agenda-item">
              <div>
                <p class="week-agenda-date">${item.dateLabel}</p>
                <h4 class="week-agenda-title">${item.title}</h4>
                <p class="week-agenda-meta">${item.assignment}</p>
              </div>
              <span class="badge ${item.status === 'planned' ? 'badge-info' : 'badge-warning'}">${item.status === 'planned' ? 'Planerad' : 'Pågår'}</span>
            </article>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderWorkdayForwardFocus() {
  const container = document.getElementById('workday-forward-focus');
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <div class="card-body" style="display:grid;gap:var(--spacing-sm)">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-md)">
          <div>
            <p style="margin:0;font-size:var(--font-size-sm);font-weight:600">Uppföljningar</p>
            <p class="text-xs text-muted" style="margin:2px 0 0">Kommande plats för prioriterade uppföljningar</p>
          </div>
          <span class="badge badge-info">Platshållare</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-md)">
          <div>
            <p style="margin:0;font-size:var(--font-size-sm);font-weight:600">Deadlines</p>
            <p class="text-xs text-muted" style="margin:2px 0 0">Kommande plats för tidskritiska deadlines</p>
          </div>
          <span class="badge badge-warning">Platshållare</span>
        </div>
      </div>
    </div>
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
// Kommande upplevelser
// ========================================

function renderUpcomingExperiences() {
  const grid = document.getElementById('experiences-grid');
  if (!grid) return;

  const statusMap = {
    active:  { label: 'AKTIV',    cls: 'badge-success' },
    planned: { label: 'PLANERAD', cls: 'badge-info'    },
  };

  const sorted = [...mockData.upcomingExperiences].sort((a, b) => a.date.localeCompare(b.date));

  grid.innerHTML = sorted.map(exp => {
    const s = statusMap[exp.status] || { label: exp.status, cls: 'badge-info' };
    return `
      <article class="card">
        <div class="card-body">
          <div class="attention-card-header">
            <div class="attention-card-titles">
              <h3 class="attention-card-title">${exp.title}</h3>
              <p class="attention-card-subtitle">${exp.category}</p>
            </div>
            <span class="badge ${s.cls}">${s.label}</span>
          </div>
          <ul class="experience-meta" style="list-style:none;padding:0;margin:var(--spacing-sm) 0 0;display:flex;flex-direction:column;gap:4px">
            <li style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-sm);color:var(--color-text-muted)">
              <i data-feather="calendar" style="width:13px;height:13px;flex-shrink:0"></i>
              ${exp.dateRange || exp.date}
            </li>
            <li style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-sm);color:var(--color-text-muted)">
              <i data-feather="user-check" style="width:13px;height:13px;flex-shrink:0"></i>
              Guide: ${exp.guide}
            </li>
            <li style="display:flex;align-items:center;gap:6px;font-size:var(--font-size-sm);color:var(--color-text-muted)">
              <i data-feather="users" style="width:13px;height:13px;flex-shrink:0"></i>
              ${exp.participants} deltagare
            </li>
          </ul>
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
// Min arbetskö
// ========================================

function renderWorkQueue() {
  const container = document.getElementById('work-queue-list');
  if (!container) return;

  const typeMap = {
    phone:         { icon: 'phone',        label: 'Telefon'      },
    email:         { icon: 'mail',         label: 'E-post'       },
    payment:       { icon: 'credit-card',  label: 'Betalning'    },
    dialogue:      { icon: 'message-circle', label: 'Dialog'     },
    accommodation: { icon: 'layers',       label: 'Boende'       },
    planning:      { icon: 'clipboard',    label: 'Planering'    },
  };

  const priorityClassMap = {
    high:   'card-danger',
    medium: 'card-warning',
    low:    '',
  };

  const statusMap = {
    pending: { label: 'Att göra',  cls: 'badge-warning' },
    overdue: { label: 'Förfallen', cls: 'badge-danger'  },
    done:    { label: 'Klar',      cls: 'badge-success' },
  };

  container.innerHTML = mockData.workQueue.map(item => {
    const t = typeMap[item.type] || { icon: 'circle', label: item.type };
    const s = statusMap[item.status] || { label: item.status, cls: 'badge-info' };
    const pClass = priorityClassMap[item.priority] || '';
    return `
      <div class="card work-queue-item ${pClass}" data-id="${item.id}" style="margin-bottom:var(--spacing-sm)">
        <div class="card-body" style="display:flex;align-items:flex-start;gap:var(--spacing-md)">
          <input type="checkbox" data-action="complete" data-id="${item.id}" aria-label="Markera ${item.title} som klar" ${item.status === 'done' ? 'checked' : ''} style="margin-top:2px;cursor:pointer">
          <div class="wq-type-icon" aria-label="${t.label}" title="${t.label}"
               style="flex-shrink:0;width:32px;height:32px;border-radius:50%;background:var(--color-bg-subtle);display:flex;align-items:center;justify-content:center">
            <i data-feather="${t.icon}" style="width:15px;height:15px"></i>
          </div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:var(--spacing-sm);flex-wrap:wrap;margin-bottom:4px">
              <h4 style="margin:0;font-size:var(--font-size-sm);font-weight:600">${item.title}</h4>
              <span class="badge ${s.cls}">${s.label}</span>
            </div>
            <p style="margin:0;font-size:var(--font-size-xs);color:var(--color-text-muted)">${item.context}</p>
            <p style="margin:4px 0 0;font-size:var(--font-size-xs);color:var(--color-text-muted);display:flex;align-items:center;gap:4px">
              <i data-feather="calendar" style="width:11px;height:11px"></i>
              ${item.dueDate}
            </p>
            <p style="margin:4px 0 0;font-size:var(--font-size-xs);color:var(--color-text-muted)">${item.association}</p>
          </div>
          <div style="display:flex;gap:var(--spacing-xs);flex-shrink:0">
            <button class="btn btn-sm btn-tertiary" data-action="open" data-id="${item.id}" type="button">Öppna</button>
            <button class="btn btn-sm btn-secondary" data-action="remind" data-id="${item.id}" type="button">Påminn</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Min arbetskö – sammandrag (hög prioritet)
// ========================================

function renderWorkQueueSummary() {
  const container = document.getElementById('oversikt-work-queue');
  if (!container) return;

  const typeMap = {
    phone:         { icon: 'phone',          label: 'Telefon'   },
    email:         { icon: 'mail',            label: 'E-post'    },
    payment:       { icon: 'credit-card',     label: 'Betalning' },
    dialogue:      { icon: 'message-circle',  label: 'Dialog'    },
    accommodation: { icon: 'layers',          label: 'Boende'    },
    planning:      { icon: 'clipboard',       label: 'Planering' },
  };

  const statusMap = {
    pending: { label: 'Att göra',  cls: 'badge-warning' },
    overdue: { label: 'Förfallen', cls: 'badge-danger'  },
    done:    { label: 'Klar',      cls: 'badge-success' },
  };

  const highPriorityItems = mockData.workQueue.filter(item => item.priority === 'high' && item.status !== 'done');

  const statusCardClassMap = {
    overdue: 'card-danger',
    pending: 'card-warning',
  };

  container.innerHTML = highPriorityItems.map(item => {
    const t = typeMap[item.type] || { icon: 'circle', label: item.type };
    const s = statusMap[item.status] || { label: item.status, cls: 'badge-info' };
    const cardCls = statusCardClassMap[item.status] || '';
    return `
      <div class="card ${cardCls}" data-id="${item.id}" style="margin-bottom:var(--spacing-sm)">
        <div class="card-body" style="display:flex;align-items:flex-start;gap:var(--spacing-md)">
          <div class="wq-type-icon" aria-label="${t.label}" title="${t.label}"
               style="flex-shrink:0;width:32px;height:32px;border-radius:50%;background:var(--color-bg-subtle);display:flex;align-items:center;justify-content:center">
            <i data-feather="${t.icon}" style="width:15px;height:15px"></i>
          </div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:var(--spacing-sm);flex-wrap:wrap;margin-bottom:4px">
              <h4 style="margin:0;font-size:var(--font-size-sm);font-weight:600">${item.title}</h4>
              <span class="badge ${s.cls}">${s.label}</span>
            </div>
            <p style="margin:0;font-size:var(--font-size-xs);color:var(--color-text-muted)">${item.context}</p>
          </div>
          <button class="btn btn-sm btn-tertiary" data-action="open" data-id="${item.id}" type="button">Öppna</button>
        </div>
      </div>
    `;
  }).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Översikt – Platform View (RI-013)
// ========================================

function renderOversikt() {
  renderSidebar();
  renderHeader();
  renderOversiktNavShortcuts();
  renderOversiktCalendar();
  renderOversiktAttention();
  renderOversiktActiveWork();
}

// Snabblänkar till Kalender, Dialog, Förfrågningar och Kontakter
function renderOversiktNavShortcuts() {
  const container = document.getElementById('oversikt-nav-shortcuts');
  if (!container) return;

  const shortcuts = [
    { label: 'Kalender',      icon: 'calendar',       href: 'kalender.html'      },
    { label: 'Dialog',        icon: 'message-circle', href: 'dialog.html'        },
    { label: 'Förfrågningar', icon: 'inbox',          href: 'forfragningar.html' },
    { label: 'Kontakter',     icon: 'users',          href: 'kontakter.html'     },
  ];

  container.innerHTML = shortcuts.map(s => `
    <a class="pv-shortcut" href="${s.href}" aria-label="${s.label}">
      <i data-feather="${s.icon}" style="width:16px;height:16px" aria-hidden="true"></i>
      <span>${s.label}</span>
    </a>
  `).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// Kalender – dominant sektion i Översikt
// Visar aktuell månad med projekterade händelser (noter + upplevelser)
function renderOversiktCalendar() {
  const container = document.getElementById('oversikt-month-calendar');
  if (!container) return;

  const MAX_VISIBLE_EVENTS_PER_DAY = 2;

  const today = new Date();
  const year  = today.getFullYear();
  const month = today.getMonth();

  const monthNames = [
    'Januari','Februari','Mars','April','Maj','Juni',
    'Juli','Augusti','September','Oktober','November','December',
  ];
  const dayNames = ['Mån','Tis','Ons','Tor','Fre','Lör','Sön'];

  const firstDay  = new Date(year, month, 1);
  const lastDay   = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const todayStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  // Projected events (notes + seed events)
  const allEvents = (typeof projectCalendarEvents !== 'undefined')
    ? projectCalendarEvents(mockData.calendarEvents)
    : mockData.calendarEvents.map(ev => ({ ...ev, color: ev.color || 'primary' }));

  const eventsByDate = {};
  allEvents.forEach(ev => {
    if (!eventsByDate[ev.date]) eventsByDate[ev.date] = [];
    eventsByDate[ev.date].push(ev);
  });

  const colorMap = {
    danger:  'var(--color-danger)',
    warning: 'var(--color-warning)',
    info:    'var(--color-info)',
    success: 'var(--color-success)',
  };

  let cells = '';
  for (let i = 0; i < startOffset; i++) {
    cells += `<div class="pv-cal-cell pv-cal-cell--empty" aria-hidden="true"></div>`;
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr   = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayEvents = eventsByDate[dateStr] || [];
    const isToday   = (dateStr === todayStr);
    const hasEvents = dayEvents.length > 0;

    const evLines = dayEvents.slice(0, MAX_VISIBLE_EVENTS_PER_DAY).map(ev => {
      const col = colorMap[ev.color] || 'var(--color-primary)';
      if (ev.navigable && ev.workspaceHref) {
        return `<a class="pv-cal-event-label" style="background:${col}" title="${ev.title}" href="${ev.workspaceHref}">${ev.title}</a>`;
      }
      return `<span class="pv-cal-event-label" style="background:${col}" title="${ev.title}">${ev.title}</span>`;
    }).join('');

    const moreCount = dayEvents.length - MAX_VISIBLE_EVENTS_PER_DAY;
    const moreLabel = moreCount > 0
      ? `<span class="pv-cal-event-more">+${moreCount}</span>`
      : '';

    cells += `
      <div class="pv-cal-cell${isToday ? ' pv-cal-cell--today' : ''}${hasEvents ? ' pv-cal-cell--has-events' : ''}">
        <span class="pv-cal-day-num">${d}</span>
        ${evLines}${moreLabel}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="pv-cal-oversikt">
      <div class="pv-cal-grid">
        ${dayNames.map(n => `<div class="pv-cal-day-header" aria-hidden="true">${n}</div>`).join('')}
        ${cells}
      </div>
      <div class="pv-cal-legend" aria-label="Förklaring">
        <span class="pv-cal-legend-item">
          <span class="pv-cal-legend-dot" style="background:var(--color-danger)"></span>Omedelbar uppmärksamhet
        </span>
        <span class="pv-cal-legend-item">
          <span class="pv-cal-legend-dot" style="background:var(--color-warning)"></span>Viktig
        </span>
        <span class="pv-cal-legend-item">
          <span class="pv-cal-legend-dot" style="background:var(--color-info)"></span>Information
        </span>
        <span class="pv-cal-legend-item">
          <span class="pv-cal-legend-dot" style="background:var(--color-success)"></span>Slutförd
        </span>
      </div>
    </div>
  `;
}

// Uppmärksamhet – platshållare, validerar placering
// Visar mock-data för layoutvalidering. Äger ingen affärsinformation.
function renderOversiktAttention() {
  const container = document.getElementById('oversikt-attention');
  if (!container) return;

  const items = mockData.attentionItems || [];

  if (items.length === 0) {
    container.innerHTML = '<p class="text-sm text-muted">Inget kräver uppmärksamhet just nu.</p>';
    return;
  }

  const priorityIconMap = {
    high:   { icon: 'alert-circle', cls: 'var(--color-danger)'  },
    medium: { icon: 'alert-triangle', cls: 'var(--color-warning)' },
    low:    { icon: 'info', cls: 'var(--color-info)' },
  };

  container.innerHTML = items.map(item => {
    const pi = priorityIconMap[item.priority] || priorityIconMap.low;
    return `
      <div class="pv-attention-item">
        <i data-feather="${pi.icon}" style="width:16px;height:16px;flex-shrink:0;color:${pi.cls}" aria-hidden="true"></i>
        <div class="pv-attention-item-body">
          <p class="pv-attention-item-title">${item.title}</p>
          <p class="pv-attention-item-sub">${item.subtitle}</p>
        </div>
      </div>
    `;
  }).join('');

  if (typeof feather !== 'undefined') feather.replace();
}

// Aktivt arbete – projektion från Dialog och Förfrågningar
// Läser från respektive engines localStorage-lager. Äger ingen information.
function renderOversiktActiveWork() {
  const container = document.getElementById('oversikt-active-work');
  if (!container) return;

  // Projicera aktiva dialoger
  let activeDialogs = [];
  try {
    const raw = localStorage.getItem('alpentind-dialog-engine-store');
    if (raw) {
      const store = JSON.parse(raw);
      activeDialogs = (store.dialogs || []).filter(d => d.state !== 'Archived');
    }
  } catch (e) {
    // engine not initialized or unavailable
  }

  // Projicera öppna förfrågningar
  let openInquiries = [];
  try {
    const raw = localStorage.getItem('alpentind-inquiry-engine-store');
    if (raw) {
      const store = JSON.parse(raw);
      openInquiries = (store.inquiries || []).filter(i => !i.closedAt);
    }
  } catch (e) {
    // engine not initialized or unavailable
  }

  const dialogCount  = activeDialogs.length;
  const inquiryCount = openInquiries.length;

  if (dialogCount === 0 && inquiryCount === 0) {
    container.innerHTML = '<p class="text-sm text-muted">Inga aktiva dialoger eller öppna förfrågningar just nu.</p>';
    return;
  }

  let html = '';

  if (dialogCount > 0) {
    html += `
      <a class="pv-active-work-item" href="dialog.html" aria-label="${dialogCount} aktiva dialoger – öppna Dialog">
        <i data-feather="message-circle" style="width:18px;height:18px;flex-shrink:0" aria-hidden="true"></i>
        <div class="pv-active-work-body">
          <span class="pv-active-work-count">${dialogCount}</span>
          <span class="pv-active-work-label">Aktiva dialoger</span>
        </div>
        <i data-feather="chevron-right" style="width:16px;height:16px;flex-shrink:0;color:var(--color-text-dark)" aria-hidden="true"></i>
      </a>
    `;
  }

  if (inquiryCount > 0) {
    html += `
      <a class="pv-active-work-item" href="forfragningar.html" aria-label="${inquiryCount} öppna förfrågningar – öppna Förfrågningar">
        <i data-feather="inbox" style="width:18px;height:18px;flex-shrink:0" aria-hidden="true"></i>
        <div class="pv-active-work-body">
          <span class="pv-active-work-count">${inquiryCount}</span>
          <span class="pv-active-work-label">Öppna förfrågningar</span>
        </div>
        <i data-feather="chevron-right" style="width:16px;height:16px;flex-shrink:0;color:var(--color-text-dark)" aria-hidden="true"></i>
      </a>
    `;
  }

  container.innerHTML = html;
  if (typeof feather !== 'undefined') feather.replace();
}

// ========================================
// Dagliga uppgifter – inline redigerbara
// ========================================

let _todos = null;
let _todoCounter = 0;

function getTodos() {
  if (!_todos) {
    _todos = mockData.todoItems.map(t => ({ ...t }));
  }
  return _todos;
}

function renderTodoList() {
  const container = document.getElementById('todo-list');
  if (!container) return;

  const todos = getTodos();

  container.innerHTML = todos.map(todo => `
    <div class="todo-item${todo.done ? ' todo-item--done' : ''}" data-id="${todo.id}"
         style="display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-sm) 0;border-bottom:1px solid var(--color-border)">
      <input type="checkbox" class="todo-checkbox" data-id="${todo.id}"
             ${todo.done ? 'checked' : ''}
             style="flex-shrink:0;width:16px;height:16px;cursor:pointer"
             aria-label="Markera som klar">
      <span class="todo-text" data-id="${todo.id}"
            style="flex:1;font-size:var(--font-size-sm);${todo.done ? 'text-decoration:line-through;color:var(--color-text-muted)' : ''};cursor:text"
            title="Klicka för att redigera">${escapeHtml(todo.text)}</span>
      <button class="todo-delete btn btn-sm" data-id="${todo.id}" type="button"
              style="flex-shrink:0;padding:2px 6px;opacity:0.5"
              aria-label="Ta bort uppgift">
        <i data-feather="x" style="width:13px;height:13px"></i>
      </button>
    </div>
  `).join('');

  // Wire up add button
  const addBtn = document.getElementById('todo-add-btn');
  const newInput = document.getElementById('todo-new-input');
  if (addBtn && newInput) {
    addBtn.onclick = function() { todoAdd(newInput); };
    newInput.onkeydown = function(e) { if (e.key === 'Enter') todoAdd(newInput); };
  }

  // Wire up checkbox, delete, inline-edit
  container.querySelectorAll('.todo-checkbox').forEach(cb => {
    cb.onchange = function() { todoToggle(this.dataset.id); };
  });

  container.querySelectorAll('.todo-delete').forEach(btn => {
    btn.onclick = function() { todoDelete(this.dataset.id); };
  });

  container.querySelectorAll('.todo-text').forEach(span => {
    span.onclick = function() { todoStartEdit(this); };
  });

  if (typeof feather !== 'undefined') feather.replace();
}

function todoAdd(input) {
  const text = (input.value || '').trim();
  if (!text) return;
  const todos = getTodos();
  const newId = 'TODO-NEW-' + (++_todoCounter);
  todos.push({ id: newId, text: text, done: false });
  input.value = '';
  renderTodoList();
}

function todoToggle(id) {
  const todos = getTodos();
  const todo = todos.find(t => t.id === id);
  if (todo) { todo.done = !todo.done; renderTodoList(); }
}

function todoDelete(id) {
  _todos = getTodos().filter(t => t.id !== id);
  renderTodoList();
}

function todoStartEdit(span) {
  const id = span.dataset.id;
  const todos = getTodos();
  const todo = todos.find(t => t.id === id);
  if (!todo || todo.done) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;
  input.className = 'todo-edit-input';
  input.style.cssText = 'flex:1;font-size:var(--font-size-sm);border:1px solid var(--color-primary);border-radius:var(--border-radius);padding:2px 6px;outline:none;';

  span.replaceWith(input);
  input.focus();
  input.select();

  function commitEdit() {
    const newText = (input.value || '').trim();
    if (newText) todo.text = newText;
    renderTodoList();
  }

  input.onblur = commitEdit;
  input.onkeydown = function(e) {
    if (e.key === 'Enter') { input.blur(); }
    if (e.key === 'Escape') { renderTodoList(); }
  };
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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
    <button class="btn btn-tertiary btn-sm" type="button">
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
// Dialog – PersonCard
// ========================================

function createPersonCard(dialogue) {
  const { person, status, notes } = dialogue;

  const statusMap = {
    in_progress:             { label: 'Dialog pågår',          cls: 'badge-primary'  },
    ready_for_recommendation:{ label: 'Redo för rekommendation', cls: 'badge-success' },
    needs_followup:          { label: 'Behöver uppföljning',    cls: 'badge-warning'  },
  };
  const statusInfo = statusMap[status] || { label: status, cls: 'badge-info' };
  const personName = person.workspaceId
    ? `<a class="link" href="person.html?id=${person.workspaceId}">${person.name}</a>`
    : person.name;
  const personWorkspaceLink = person.workspaceId
    ? `<a class="btn btn-sm btn-tertiary person-workspace-link" href="person.html?id=${person.workspaceId}">Öppna Person Workspace</a>`
    : '';

  return `
    <article class="card dialog-person-card" aria-label="Personkort: ${person.name}">
      <div class="card-body">
        <div class="dialog-person-header">
          <div class="dialog-person-avatar" aria-hidden="true">${person.avatar}</div>
          <div class="dialog-person-meta">
            <h3 class="dialog-person-name">${personName}</h3>
            ${person.organization ? `<p class="dialog-person-org">${person.organization}</p>` : ''}
            <span class="badge ${statusInfo.cls}">${statusInfo.label}</span>
          </div>
        </div>
        <div class="dialog-info-group">
          <p class="dialog-info-label">Kontakt</p>
          <p class="dialog-info-value">
            <i data-feather="mail" style="width:13px;height:13px"></i>
            ${person.email}
          </p>
          <p class="dialog-info-value">
            <i data-feather="phone" style="width:13px;height:13px"></i>
            ${person.phone}
          </p>
        </div>
        ${notes ? `
        <div class="dialog-info-group">
          <p class="dialog-info-label">Anteckningar</p>
          <p class="dialog-info-value">${notes}</p>
        </div>` : ''}
        ${personWorkspaceLink}
      </div>
    </article>
  `;
}

// ========================================
// Dialog – ConversationCard
// ========================================

function createConversationCard(dialogue) {
  const { goal, motivation, experience, questions, observations, timeline } = dialogue;

  const timelineTypeMap = {
    inbound:  { icon: 'arrow-down-left', cls: 'timeline-inbound',  label: 'Inkommande' },
    outbound: { icon: 'arrow-up-right',  cls: 'timeline-outbound', label: 'Utgående'   },
    note:     { icon: 'edit-2',          cls: 'timeline-note',     label: 'Anteckning' },
  };

  const timelineHTML = timeline.map(entry => {
    const t = timelineTypeMap[entry.type] || { icon: 'circle', cls: '', label: entry.type };
    return `
      <li class="dialog-timeline-item ${t.cls}" role="listitem">
        <div class="dialog-timeline-icon" aria-label="${t.label}">
          <i data-feather="${t.icon}" style="width:12px;height:12px"></i>
        </div>
        <div class="dialog-timeline-content">
          <p class="dialog-timeline-date">${entry.date}</p>
          <p class="dialog-timeline-summary">${entry.summary}</p>
        </div>
      </li>
    `;
  }).join('');

  return `
    <article class="card dialog-conversation-card" aria-label="Dialogkort">
      <div class="card-body">
        <div class="dialog-info-group">
          <p class="dialog-info-label">Mål</p>
          <p class="dialog-info-value dialog-info-value--prominent">${goal}</p>
        </div>
        <div class="dialog-info-group">
          <p class="dialog-info-label">Motivation</p>
          <p class="dialog-info-value">${motivation}</p>
        </div>
        <div class="dialog-info-group">
          <p class="dialog-info-label">Erfarenhet</p>
          <p class="dialog-info-value">${experience}</p>
        </div>
        ${questions ? `
        <div class="dialog-info-group">
          <p class="dialog-info-label">Öppna frågor</p>
          <p class="dialog-info-value dialog-info-value--highlight">${questions}</p>
        </div>` : ''}
        ${observations ? `
        <div class="dialog-info-group">
          <p class="dialog-info-label">Observationer</p>
          <p class="dialog-info-value">${observations}</p>
        </div>` : ''}
        <div class="dialog-info-group">
          <p class="dialog-info-label">Tidslinje</p>
          <ol class="dialog-timeline" aria-label="Konversationshistorik">
            ${timelineHTML}
          </ol>
        </div>
      </div>
    </article>
  `;
}

// ========================================
// Dialog – NextStepCard
// ========================================

function createNextStepCard(dialogue) {
  const nextActionMap = {
    call:                    { icon: 'phone',        label: 'Ring',                   primary: true  },
    send_email:              { icon: 'mail',         label: 'Skicka e-post',           primary: false },
    continue_dialogue:       { icon: 'message-circle', label: 'Fortsätt dialog',       primary: false },
    schedule_meeting:        { icon: 'calendar',     label: 'Boka möte',              primary: true  },
    create_recommendation:   { icon: 'star',         label: 'Skapa rekommendation',   primary: true  },
    waiting_for_reply:       { icon: 'clock',        label: 'Väntar på svar',         primary: false },
  };

  const actions = [
    'call', 'send_email', 'continue_dialogue',
    'schedule_meeting', 'create_recommendation', 'waiting_for_reply',
  ];

  const actionsHTML = actions.map(key => {
    const a = nextActionMap[key];
    const isNext = key === dialogue.nextAction;
    const btnClass = isNext ? 'btn btn-primary btn-full' : 'btn btn-secondary btn-full';
    return `
      <button class="${btnClass}" type="button" aria-pressed="${isNext}">
        <i data-feather="${a.icon}" style="width:15px;height:15px"></i>
        ${a.label}
        ${isNext ? '<span class="dialog-next-indicator" aria-label="Nästa steg"></span>' : ''}
      </button>
    `;
  }).join('');

  return `
    <article class="card dialog-nextstep-card" aria-label="Nästa steg">
      <div class="card-header">
        <h3>Nästa steg</h3>
      </div>
      <div class="card-body dialog-nextstep-actions">
        ${actionsHTML}
      </div>
    </article>
  `;
}

// ========================================
// Dialog – RecommendationCard (placeholder)
// ========================================

function createRecommendationCard(dialogue) {
  const isReady = dialogue.status === 'ready_for_recommendation';
  return `
    <article class="card dialog-recommendation-card${isReady ? ' dialog-recommendation-card--ready' : ''}"
             aria-label="Rekommendation (platshållare)">
      <details ${isReady ? 'open' : ''}>
        <summary class="dialog-recommendation-summary">
          <i data-feather="star" style="width:15px;height:15px"></i>
          Rekommendation
          ${isReady ? '<span class="badge badge-success" style="margin-left:auto">Redo</span>' : '<span class="badge badge-info" style="margin-left:auto">Ej påbörjad</span>'}
        </summary>
        <div class="dialog-recommendation-body">
          <p class="text-muted" style="font-size:var(--font-size-sm)">
            Rekommendationsfunktionen är inte implementerad.
            Den visas här som platshållare.
          </p>
        </div>
      </details>
    </article>
  `;
}

// ========================================
// Dialog – renderDialog
// ========================================

let activeDialogueId = null;
let dialogSelectorInitialized = false;

function renderDialog() {
  renderSidebar();
  renderHeader();

  const dialogues = mockData.dialogues;
  if (!dialogues || dialogues.length === 0) return;

  // Default to first dialogue
  if (!activeDialogueId) activeDialogueId = dialogues[0].id;

  renderDialogSelector(dialogues);
  renderDialogWorkspace(dialogues.find(d => d.id === activeDialogueId) || dialogues[0]);

  // Attach delegated click listener once
  if (!dialogSelectorInitialized) {
    const selector = document.getElementById('dialog-selector');
    if (selector) {
      selector.addEventListener('click', function(e) {
        const btn = e.target.closest('[data-dialogue-id]');
        if (btn) selectDialogue(btn.dataset.dialogueId);
      });
      dialogSelectorInitialized = true;
    }
  }
}

function renderDialogSelector(dialogues) {
  const selector = document.getElementById('dialog-selector');
  if (!selector) return;

  const statusMap = {
    in_progress:              { label: 'Dialog pågår',          cls: 'badge-primary'  },
    ready_for_recommendation: { label: 'Redo för rekommendation', cls: 'badge-success' },
    needs_followup:           { label: 'Behöver uppföljning',    cls: 'badge-warning'  },
  };

  selector.innerHTML = dialogues.map(d => {
    const s = statusMap[d.status] || { label: d.status, cls: 'badge-info' };
    const isActive = d.id === activeDialogueId;
    return `
      <button class="dialog-selector-item${isActive ? ' active' : ''}"
              data-dialogue-id="${d.id}"
              aria-pressed="${isActive}"
              type="button">
        <span class="dialog-selector-avatar" aria-hidden="true">${d.person.avatar}</span>
        <span class="dialog-selector-info">
          <span class="dialog-selector-name">${d.person.name}</span>
          <span class="badge ${s.cls}">${s.label}</span>
        </span>
      </button>
    `;
  }).join('');
}

function renderDialogWorkspace(dialogue) {
  const personSlot   = document.getElementById('dialog-person-slot');
  const convSlot     = document.getElementById('dialog-conversation-slot');
  const nextstepSlot = document.getElementById('dialog-nextstep-slot');
  const recSlot      = document.getElementById('dialog-recommendation-slot');

  if (personSlot)   personSlot.innerHTML   = createPersonCard(dialogue);
  if (convSlot)     convSlot.innerHTML     = createConversationCard(dialogue);
  if (nextstepSlot) nextstepSlot.innerHTML = createNextStepCard(dialogue);
  if (recSlot)      recSlot.innerHTML      = createRecommendationCard(dialogue);

  if (typeof feather !== 'undefined') feather.replace();
}

function selectDialogue(id) {
  activeDialogueId = id;
  const dialogues = mockData.dialogues;
  renderDialogSelector(dialogues);
  renderDialogWorkspace(dialogues.find(d => d.id === id) || dialogues[0]);
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
