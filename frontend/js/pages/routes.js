const RoutesPage = {
  render() {
    return `
      <div class="container">
        ${Components.pageHeader(
          '🗺️ Alpine Routes',
          'Explore our verified and curated mountain routes across the Alps'
        )}

        <div class="section">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: var(--spacing-lg);">
            ${MockData.routes.map(route => Components.routeCard(route)).join('')}
          </div>
        </div>

        <div class="section" style="background-color: var(--color-light-gray); padding: var(--spacing-lg); border-radius: var(--radius-lg);">
          <h3 style="color: var(--color-primary); margin-top: 0;">📊 Route Statistics</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md);">
            <div>
              <p style="margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm);">TOTAL ROUTES</p>
              <p style="margin: 10px 0 0 0; font-size: 2.5rem; font-weight: bold; color: var(--color-primary);">${MockData.routes.length}</p>
            </div>
            <div>
              <p style="margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm);">VERIFIED ROUTES</p>
              <p style="margin: 10px 0 0 0; font-size: 2.5rem; font-weight: bold; color: var(--color-secondary);">${MockData.routes.filter(r => r.verification_status === 'verified').length}</p>
            </div>
            <div>
              <p style="margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm);">TOTAL GUIDES</p>
              <p style="margin: 10px 0 0 0; font-size: 2.5rem; font-weight: bold; color: var(--color-primary);">${MockData.guides.length}</p>
            </div>
            <div>
              <p style="margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm);">AVG GUIDE RATING</p>
              <p style="margin: 10px 0 0 0; font-size: 2.5rem; font-weight: bold; color: var(--color-secondary);">${MockData.stats.avg_customer_rating.toFixed(2)}⭐</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Expert Guides</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--spacing-lg);">
            ${MockData.guides.map(guide => `
              <div class="card">
                <div style="padding: var(--spacing-lg);">
                  <h4 style="margin: 0 0 5px 0; color: var(--color-primary);">${guide.name}</h4>
                  <p style="margin: 0 0 10px 0; font-size: var(--font-size-sm); color: var(--color-text-light);">${guide.specialization}</p>
                  <div style="display: flex; gap: 5px; margin-bottom: 10px;">
                    ${Array(Math.floor(guide.rating)).fill('⭐').join('')}
                    <span style="color: var(--color-secondary); font-weight: bold;">${guide.rating}</span>
                  </div>
                  <div style="font-size: var(--font-size-sm); color: var(--color-text-light); margin-bottom: 10px;">
                    <p style="margin: 5px 0; padding: 2px 0;">📅 ${guide.experience_years} years experience</p>
                    <p style="margin: 5px 0; padding: 2px 0;">🗣️ ${guide.languages.join(', ')}</p>
                    <p style="margin: 5px 0; padding: 2px 0;">📜 ${guide.certifications.join(', ')}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Difficulty Levels</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg);">
            <div class="card" style="padding: var(--spacing-lg); border-left: 5px solid var(--color-success);">
              <h4 style="margin: 0 0 10px 0; color: var(--color-success);">🟢 Beginner</h4>
              <p style="margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm);">Perfect for families and newcomers to mountaineering. Well-established trails with minimal technical difficulty.</p>
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--color-medium-gray);">
                <p style="margin: 0; font-size: var(--font-size-sm);">Routes: ${MockData.routes.filter(r => r.difficulty_level === 'beginner').length}</p>
              </div>
            </div>
            <div class="card" style="padding: var(--spacing-lg); border-left: 5px solid var(--color-warning);">
              <h4 style="margin: 0 0 10px 0; color: var(--color-warning);">🟡 Intermediate</h4>
              <p style="margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm);">Suitable for experienced hikers with good fitness. May include some scrambling and exposed terrain.</p>
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--color-medium-gray);">
                <p style="margin: 0; font-size: var(--font-size-sm);">Routes: ${MockData.routes.filter(r => r.difficulty_level === 'intermediate').length}</p>
              </div>
            </div>
            <div class="card" style="padding: var(--spacing-lg); border-left: 5px solid var(--color-danger);">
              <h4 style="margin: 0 0 10px 0; color: var(--color-danger);">🔴 Advanced</h4>
              <p style="margin: 0; color: var(--color-text-light); font-size: var(--font-size-sm);">For experienced mountaineers only. Technical climbing, glacier work, and high altitude required.</p>
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--color-medium-gray);">
                <p style="margin: 0; font-size: var(--font-size-sm);">Routes: ${MockData.routes.filter(r => r.difficulty_level === 'advanced').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    console.log('Routes page initialized');
  }
};