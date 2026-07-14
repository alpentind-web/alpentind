const DashboardPage = {
  render() {
    return `
      <div class="container">
        ${Components.hero(
          '📊 AlpenTind Dashboard',
          'Welcome to your Alpine expedition management platform. Monitor routes, products, customers, and departures all in one place.'
        )}

        <div class="section">
          ${Components.sectionTitle('Dashboard Overview', 'Key metrics and statistics')}
          
          <div class="stats-grid">
            ${Components.statCard(MockData.stats.total_routes, 'Total Routes')}
            ${Components.statCard(MockData.stats.total_customers, 'Total Customers')}
            ${Components.statCard(MockData.stats.active_departures, 'Active Departures')}
            ${Components.statCard(MockData.stats.total_guides, 'Expert Guides')}
          </div>
        </div>

        <div class="layout-sidebar">
          <div class="sidebar">
            <div class="sidebar-section">
              <h3 class="sidebar-title">Quick Links</h3>
              <ul class="sidebar-menu">
                <li class="sidebar-menu-item">
                  <a href="#routes" class="sidebar-menu-link">🗺️ Browse Routes</a>
                </li>
                <li class="sidebar-menu-item">
                  <a href="#products" class="sidebar-menu-link">🎒 View Products</a>
                </li>
                <li class="sidebar-menu-item">
                  <a href="#customers" class="sidebar-menu-link">👥 Manage Customers</a>
                </li>
                <li class="sidebar-menu-item">
                  <a href="#departures" class="sidebar-menu-link">📅 Schedule Departures</a>
                </li>
              </ul>
            </div>
            <div class="sidebar-section">
              <h3 class="sidebar-title">System Status</h3>
              <ul class="sidebar-menu">
                <li class="sidebar-menu-item" style="padding: 10px 0;">
                  <span style="color: var(--color-text-light);">✅ All systems operational</span>
                </li>
                <li class="sidebar-menu-item" style="padding: 10px 0;">
                  <span style="color: var(--color-text-light);">Last update: Just now</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div class="section">
              ${Components.sectionTitle('Recent Activity', 'Latest updates from your platform')}
              
              <div style="display: grid; gap: var(--spacing-md);">
                ${[
                  { date: '2024-07-14', event: 'New customer registered: Jean Dupont (France)', type: 'info' },
                  { date: '2024-07-14', event: 'Departure confirmed: Matterhorn Challenge - 6 participants', type: 'success' },
                  { date: '2024-07-13', event: 'Route verified: Gran Paradiso (Advanced)', type: 'success' },
                  { date: '2024-07-13', event: 'Guide rating updated: Amélie Rousseau (4.95 stars)', type: 'info' },
                  { date: '2024-07-12', event: 'New product listed: Expert Glacier Tour - Ecrins', type: 'success' }
                ].map(activity => `
                  <div class="card" style="padding: var(--spacing-md);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                      <strong style="color: var(--color-primary);">${activity.date}</strong>
                      ${Components.badge(activity.type.charAt(0).toUpperCase() + activity.type.slice(1), activity.type)}
                    </div>
                    <p style="margin: 0; color: var(--color-text);">${activity.event}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="section">
              ${Components.sectionTitle('Upcoming Departures', 'Next scheduled expeditions')}
              
              <div style="display: grid; gap: var(--spacing-md);">
                ${MockData.departures.slice(0, 3).map(departure => {
                  const product = MockData.products.find(p => p.id === departure.product_id);
                  return `
                    <div class="card" style="padding: var(--spacing-md);">
                      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                        <div>
                          <h4 style="margin: 0 0 5px 0; color: var(--color-primary);">${product.name}</h4>
                          <p style="margin: 0; font-size: var(--font-size-sm); color: var(--color-text-light);">📅 ${departure.start_date}</p>
                        </div>
                        ${Components.badge(departure.status, departure.status === 'confirmed' ? 'success' : 'info')}
                      </div>
                      <div style="display: flex; justify-content: space-between; font-size: var(--font-size-sm); color: var(--color-text-light);">
                        <span>👥 ${departure.current_participants}/${departure.max_participants} participants</span>
                        <span>💶 €${departure.price_per_person}/person</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    // Dashboard initialization if needed
    console.log('Dashboard initialized');
  }
};