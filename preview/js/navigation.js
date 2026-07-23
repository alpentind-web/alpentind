/* ========================================
   AlpenTind Platform Preview v0.2
   Navigation – Sidnavigering och autentisering
   ======================================== */

// ========================================
// Initiera navigation
// ========================================

function initNavigation(activeNavId) {
  setActiveNavItem(activeNavId);
  renderSidebar();
  renderHeader();
}

// ========================================
// Navigera till sida
// ========================================

function navigateTo(page, navId) {
  // Mappning av sidor till HTML-filer
  const pageMap = {
    'oversikt':       'oversikt.html',
    'kalender':       'kalender.html',
    'arbetsdag':      'arbetsdag.html',
    'dialog':         'dialog.html',
    'reseplanering':  'planering.html',
    'forfragningar':  'forfragningar.html',
    'kontakter':      'kontakter.html',
    'accommodations': 'accommodations.html',
    'documents':      'documents.html',
    'settings':       'settings.html',
  };

  const targetFile = pageMap[page];
  if (targetFile) {
    window.location.href = targetFile;
  }

  setActiveNavItem(navId);
}

// ========================================
// Markera aktiv menypost
// ========================================

function setActiveNavItem(navId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    item.removeAttribute('aria-current');
  });

  const navItem = mockData.navigationItems.find(item => item.id === navId);
  if (!navItem) return;

  const activeItem = document.querySelector(`[data-page="${navItem.page}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
    activeItem.setAttribute('aria-current', 'page');
  }
}

// ========================================
// Utloggning
// ========================================

function logout() {
  localStorage.removeItem('alpentind-user-logged-in');
  window.location.href = 'index.html';
}

// ========================================
// Autentiseringskontroll
// ========================================

function checkAuth() {
  if (!localStorage.getItem('alpentind-user-logged-in')) {
    window.location.href = 'index.html';
  }
}

// ========================================
// Kontrollera autentisering vid sidladdning
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  checkAuth();
});
