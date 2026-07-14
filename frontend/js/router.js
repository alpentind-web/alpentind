class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  }

  register(path, page) {
    this.routes[path] = page;
  }

  navigate(path = null) {
    if (!path) {
      path = window.location.hash.slice(1) || 'dashboard';
    }

    const page = this.routes[path] || this.routes['dashboard'];
    
    if (page && page !== this.currentPage) {
      this.currentPage = page;
      this.render(path);
    }
  }

  render(path) {
    const page = this.routes[path];
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = page.render();
    page.init();
    
    document.querySelectorAll('.navbar-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${path}`) {
        link.classList.add('active');
      }
    });
  }

  go(path) {
    window.location.hash = path;
  }
}

const router = new Router();