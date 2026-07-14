/* ========================================
   AlpenTind Platform Preview v0.1
   Navigation - Page & Menu Management
   ======================================== */

// ========================================
// Initialize Navigation
// ========================================

function initNavigation(activeNavId) {
  setActiveNavItem(activeNavId);
  renderSidebar();
  renderHeader();
}

// ========================================
// Navigate Between Pages
// ========================================

function navigateTo(page, navId) {
  // Get the current page
  const currentPage = document.querySelector('.page.active');
  
  // Map pages to files
  const pageMap = {
    'arbetsdag': 'arbetsdag.html',
    'produkter': 'produkter.html',
    'departures': 'departures.html',
    'customers': 'customers.html',
    'guides': 'guides.html',
    'accommodations': 'accommodations.html',
    'economy': 'economy.html',
    'maps': 'maps.html',
    'documents': 'documents.html',
    'messages': 'messages.html',
    'settings': 'settings.html',
  };

  // If we're on the same page, don't reload
  const targetFile = pageMap[page];
  if (targetFile) {
    window.location.href = targetFile;
  }

  // Set active nav item
  setActiveNavItem(navId);
}

// ========================================
// Set Active Navigation Item
// ========================================

function setActiveNavItem(navId) {
  // Remove active class from all nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });

  // Add active class to selected item
  const activeItem = document.querySelector(`[data-page="${mockData.navigationItems.find(item => item.id === navId)?.page}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
  }
}

// ========================================
// Logout Function
// ========================================

function logout() {
  localStorage.removeItem('alpentind-user-logged-in');
  window.location.href = 'index.html';
}

// ========================================
// Check Authentication
// ========================================

function checkAuth() {
  const isLoggedIn = localStorage.getItem('alpentind-user-logged-in');
  if (!isLoggedIn) {
    window.location.href = 'index.html';
  }
}

// ========================================
// Page Setup on Load
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  checkAuth();
});
