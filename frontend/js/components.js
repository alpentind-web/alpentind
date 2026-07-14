const Components = {
  navbar: () => `
    <div class="navbar-container">
      <a href="#dashboard" class="navbar-brand">
        🏔️ AlpenTind
      </a>
      <ul class="navbar-menu">
        <li><a href="#dashboard" class="navbar-link active">Dashboard</a></li>
        <li><a href="#routes" class="navbar-link">Routes</a></li>
        <li><a href="#products" class="navbar-link">Products</a></li>
        <li><a href="#customers" class="navbar-link">Customers</a></li>
        <li><a href="#departures" class="navbar-link">Departures</a></li>
      </ul>
    </div>
  `,

  hero: (title, description, cta = null) => `
    <section class="hero">
      <h1>${title}</h1>
      <p>${description}</p>
      ${cta ? `<a href="${cta.link}" class="btn btn-secondary">${cta.text}</a>` : ''}
    </section>
  `,

  routeCard: (route) => `
    <div class="card route-card">
      <div class="card-header">
        <div>
          <h3 class="route-card-title">${route.name}</h3>
          <p class="route-card-description">${route.description}</p>
        </div>
        <span class="badge badge-primary">${route.difficulty_level.toUpperCase()}</span>
      </div>
      <div class="route-card-stats">
        <div class="route-stat">
          <div class="route-stat-value">${route.distance_km}</div>
          <div class="route-stat-label">km</div>
        </div>
        <div class="route-stat">
          <div class="route-stat-value">${(route.elevation_gain_m / 1000).toFixed(1)}</div>
          <div class="route-stat-label">km elevation</div>
        </div>
        <div class="route-stat">
          <div class="route-stat-value">${route.estimated_days}</div>
          <div class="route-stat-label">days</div>
        </div>
      </div>
      <div class="card-footer">
        <span class="badge badge-success">${route.verification_status}</span>
        <a href="#route/${route.id}" class="link">View Details →</a>
      </div>
    </div>
  `,

  productCard: (product) => `
    <div class="card product-card">
      <div class="card-header">
        <h3 style="margin: 0;">${product.name}</h3>
        <span class="badge badge-secondary" style="margin-top: 8px;">${product.status.toUpperCase()}</span>
      </div>
      <div class="card-body">
        <p>${product.description}</p>
        <div class="product-card-price">
          €${product.price_base}
          <span class="product-card-price-small">/person</span>
        </div>
        <div class="product-card-info">
          <div class="product-card-info-item">📅 ${product.duration_days} days</div>
          <div class="product-card-info-item">👥 ${product.group_size_min}-${product.group_size_max} people</div>
          <div class="product-card-info-item">🗓️ ${product.season}</div>
        </div>
      </div>
      <div class="card-footer">
        <a href="#product/${product.id}" class="link">View Details →</a>
        <a href="#product/${product.id}" class="btn btn-primary btn-sm">Book Now</a>
      </div>
    </div>
  `,

  customerCard: (customer) => `
    <div class="card customer-card">
      <div class="customer-card-info">
        <div class="customer-card-name">${customer.name}</div>
        <div class="customer-card-email">${customer.email}</div>
        <div class="customer-card-meta">
          <span>📍 ${customer.country}</span>
          <span>📞 ${customer.phone || 'N/A'}</span>
          <span>🎯 ${customer.experience_level}</span>
        </div>
      </div>
      <div>
        <span class="badge badge-success">${customer.verification_status}</span>
      </div>
    </div>
  `,

  statCard: (value, label) => `
    <div class="stat-card">
      <div class="stat-card-value">${value}</div>
      <div class="stat-card-label">${label}</div>
    </div>
  `,

  pageHeader: (title, description = '') => `
    <div class="page-header">
      <h1>${title}</h1>
      ${description ? `<p class="page-header-description">${description}</p>` : ''}
    </div>
  `,

  sectionTitle: (title, subtitle = '') => `
    <h2 class="section-title">${title}</h2>
    ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
  `,

  spinner: () => '<div class="spinner"></div>',

  emptyState: (title, description, action = null) => `
    <div style="text-align: center; padding: 60px 20px;">
      <h3 style="color: var(--color-text-light); margin-bottom: 10px;">${title}</h3>
      <p style="color: var(--color-text-light); margin-bottom: 20px;">${description}</p>
      ${action ? `<a href="${action.link}" class="btn btn-primary">${action.text}</a>` : ''}
    </div>
  `,

  alert: (message, type = 'info') => `
    <div class="alert alert-${type}">${message}</div>
  `,

  breadcrumb: (items) => `
    <div class="breadcrumb">
      ${items.map((item, i) => `
        <div class="breadcrumb-item ${i === items.length - 1 ? 'active' : ''}">
          ${item.link ? `<a href="${item.link}">${item.text}</a>` : item.text}
        </div>
      `).join('')}
    </div>
  `,

  badge: (text, type = 'primary') => `<span class="badge badge-${type}">${text}</span>`,

  button: (text, link = '#', type = 'primary', size = 'md') => `
    <a href="${link}" class="btn btn-${type} btn-${size}">${text}</a>
  `
};