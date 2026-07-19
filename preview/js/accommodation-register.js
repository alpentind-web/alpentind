function getAccommodationRegisterData() {
  return (mockData && mockData.accommodationRegister) || { regions: [] };
}

function normalizeRegisterText(value) {
  return (value || '').toLocaleLowerCase('sv-SE');
}

function buildRegisterRow(link, primary, context, status) {
  return `
    <a href="${link}" class="register-row" role="listitem">
      <div class="register-row-primary">${primary}</div>
      <div class="register-row-context">${context}</div>
      <div class="register-row-status">${status}</div>
      <div class="register-row-open">→</div>
    </a>
  `;
}

function renderRegisterRows(container, rows) {
  container.innerHTML = rows.length > 0
    ? rows.join('')
    : `
      <div class="register-row" role="listitem">
        <div class="register-row-primary">Inga träffar</div>
        <div class="register-row-context">Justera din sökning för att hitta boenden.</div>
        <div class="register-row-status">0 resultat</div>
        <div class="register-row-open">•</div>
      </div>
    `;
}

function renderAccommodationRegister() {
  const breadcrumb = document.getElementById('accommodation-breadcrumb');
  const title = document.getElementById('accommodations-title');
  const description = document.getElementById('accommodations-description');
  const heading = document.getElementById('accommodation-register-heading');
  const meta = document.getElementById('accommodation-register-meta');
  const list = document.getElementById('accommodation-register-list');
  const search = document.getElementById('accommodation-search');
  if (!breadcrumb || !title || !description || !heading || !meta || !list || !search) return;

  const registerData = getAccommodationRegisterData();
  const regions = registerData.regions || [];
  const params = new URLSearchParams(window.location.search);
  const selectedRegionSlug = params.get('region');
  const selectedRegion = regions.find(region => region.slug === selectedRegionSlug) || null;

  if (!selectedRegion) {
    breadcrumb.innerHTML = '<span>Boenden</span>';
    title.textContent = 'Accommodation Register';
    description.textContent = 'AlpenTinds operativa kunskapsbibliotek för boenden vi känner, återanvänder och underhåller över tid.';
    heading.textContent = 'Regionöversikt';
    meta.textContent = 'Välj region för att bläddra, söka och öppna boenden i rätt operativ kontext.';
    search.placeholder = 'Sök region eller boende...';

    const renderLandingRows = function() {
      const searchTerm = normalizeRegisterText(search.value);
      const rows = regions
        .filter(function(region) {
          if (!searchTerm) return true;
          const haystack = normalizeRegisterText(region.name + ' ' + (region.accommodations || []).map(item => item.name).join(' '));
          return haystack.includes(searchTerm);
        })
        .map(function(region) {
          const countLabel = `${region.accommodations.length} boenden`;
          return buildRegisterRow(
            `accommodations.html?region=${encodeURIComponent(region.slug)}`,
            region.name,
            `${countLabel} registrerade`,
            'Öppna region'
          );
        });

      renderRegisterRows(list, rows);
      if (typeof feather !== 'undefined') feather.replace();
    };

    search.addEventListener('input', renderLandingRows);
    renderLandingRows();
    return;
  }

  breadcrumb.innerHTML = `
    <a href="accommodations.html" class="link">Boenden</a>
    <span aria-hidden="true">›</span>
    <span>${selectedRegion.name}</span>
  `;
  title.textContent = selectedRegion.name;
  description.textContent = 'Kuraterade boenden för regionen. Öppna ett boende för att gå vidare till Accommodation Workspace.';
  heading.textContent = 'Boenden i regionen';
  meta.textContent = `${selectedRegion.accommodations.length} registrerade boenden`;
  search.placeholder = `Sök boenden i ${selectedRegion.name}...`;

  const renderRegionRows = function() {
    const searchTerm = normalizeRegisterText(search.value);
    const rows = (selectedRegion.accommodations || [])
      .filter(function(accommodation) {
        if (!searchTerm) return true;
        const haystack = normalizeRegisterText(`${accommodation.name} ${accommodation.place} ${accommodation.type}`);
        return haystack.includes(searchTerm);
      })
      .map(function(accommodation) {
        return buildRegisterRow(
          `accommodations-workspace.html?region=${encodeURIComponent(selectedRegion.slug)}&accommodation=${encodeURIComponent(accommodation.id)}`,
          accommodation.name,
          `${accommodation.type} · ${accommodation.place}`,
          accommodation.readiness
        );
      });

    renderRegisterRows(list, rows);
    if (typeof feather !== 'undefined') feather.replace();
  };

  search.addEventListener('input', renderRegionRows);
  renderRegionRows();
}
