function getAccommodationRegisterData() {
  return (mockData && mockData.accommodationRegister) || { regions: [] };
}

function normalizeRegisterText(value) {
  return (value || '').toLocaleLowerCase('sv-SE');
}

function getEscapeHtml() {
  return typeof escapePreviewHtml === 'function' ? escapePreviewHtml : function(value) { return value; };
}

function buildRegisterRow(options) {
  const escapeHtml = getEscapeHtml();
  return `
    <a href="${escapeHtml(options.link)}" class="register-row" role="listitem">
      <div class="register-row-primary">${escapeHtml(options.primary)}</div>
      <div class="register-row-context">${escapeHtml(options.context)}</div>
      <div class="register-row-status">${escapeHtml(options.status)}</div>
      <div class="register-row-open">${escapeHtml(options.openLabel || '→')}</div>
    </a>
  `;
}

function renderRegisterRows(container, rows, emptyState) {
  const escapeHtml = getEscapeHtml();
  container.innerHTML = rows.length > 0
    ? rows.join('')
    : `
      <div class="register-row" role="listitem">
        <div class="register-row-primary">Inga träffar</div>
        <div class="register-row-context">${escapeHtml((emptyState && emptyState.context) || 'Justera din sökning för att hitta boenden.')}</div>
        <div class="register-row-status">0 resultat</div>
        <div class="register-row-open">•</div>
      </div>
    `;
}

function findAccommodationById(region, accommodationId) {
  return ((region && region.accommodations) || []).find(function(accommodation) {
    return accommodation.id === accommodationId;
  }) || null;
}

function getAccommodationFilterOptions(selectedRegion) {
  if (!selectedRegion) {
    return [
      { value: 'all', label: 'Alla regioner' },
      { value: 'verified', label: 'Har verifierade boenden' },
      { value: 'fallback', label: 'Har fallback-klara boenden' },
    ];
  }

  const typeOptions = Array.from(new Set((selectedRegion.accommodations || []).map(function(item) {
    return item.type;
  }))).sort().map(function(type) {
    return { value: `type:${type}`, label: `Typ: ${type}` };
  });

  const readinessOptions = Array.from(new Set((selectedRegion.accommodations || []).map(function(item) {
    return item.readiness;
  }))).sort().map(function(readiness) {
    return { value: `readiness:${readiness}`, label: `Readiness: ${readiness}` };
  });

  return [{ value: 'all', label: 'Alla boenden' }].concat(typeOptions, readinessOptions);
}

function regionMatchesFilter(region, filterValue) {
  if (!filterValue || filterValue === 'all') return true;
  if (filterValue === 'verified') {
    return (region.accommodations || []).some(function(accommodation) {
      return accommodation.readiness === 'Verifierat';
    });
  }
  if (filterValue === 'fallback') {
    return (region.accommodations || []).some(function(accommodation) {
      return accommodation.readiness === 'Fallback klar';
    });
  }
  return true;
}

function accommodationMatchesFilter(accommodation, filterValue) {
  if (!filterValue || filterValue === 'all') return true;

  if (filterValue.indexOf('type:') === 0) {
    return accommodation.type === filterValue.replace('type:', '');
  }

  if (filterValue.indexOf('readiness:') === 0) {
    return accommodation.readiness === filterValue.replace('readiness:', '');
  }

  return true;
}

function renderAccommodationRegister() {
  const breadcrumb = document.getElementById('accommodation-breadcrumb');
  const title = document.getElementById('accommodations-title');
  const description = document.getElementById('accommodations-description');
  const heading = document.getElementById('accommodation-register-heading');
  const meta = document.getElementById('accommodation-register-meta');
  const list = document.getElementById('accommodation-register-list');
  const search = document.getElementById('accommodation-search');
  const filter = document.getElementById('accommodation-filter');
  const createAction = document.getElementById('accommodation-create-action');
  if (!breadcrumb || !title || !description || !heading || !meta || !list || !search || !filter || !createAction) return;

  const registerData = getAccommodationRegisterData();
  const regions = registerData.regions || [];
  const params = new URLSearchParams(window.location.search);
  const selectedRegionSlug = params.get('region');
  const selectedRegion = regions.find(region => region.slug === selectedRegionSlug) || null;
  const viewState = typeof getRegisterViewStateFromUrl === 'function'
    ? getRegisterViewStateFromUrl()
    : { mode: 'register', selectionContext: null };
  const selectionContext = viewState.selectionContext;
  const isSelectionMode = viewState.mode === 'select';

  renderRegisterSelectionBanner('register-selection-banner', {
    title: 'Select from Accommodation Register',
    description: selectedRegion
      ? 'Browse, search, filter, and return an existing accommodation reference to Planning.'
      : 'Choose a region, continue to an accommodation, and return an existing register reference to Planning.',
    selectionContext,
  });

  createAction.hidden = isSelectionMode;

  const filterOptions = getAccommodationFilterOptions(selectedRegion);
  const escapeHtml = getEscapeHtml();
  filter.innerHTML = filterOptions.map(function(option) {
    return `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`;
  }).join('');
  filter.hidden = !isSelectionMode;
  if (filter.hidden) filter.value = 'all';

  if (!selectedRegion) {
    breadcrumb.innerHTML = isSelectionMode
      ? '<span>Selection Mode</span><span aria-hidden="true">›</span><span>Boenden</span>'
      : '<span>Boenden</span>';
    title.textContent = 'Accommodation Register';
    description.textContent = isSelectionMode
      ? 'Locate existing accommodation references without leaving the planning context.'
      : 'AlpenTinds operativa kunskapsbibliotek för boenden vi känner, återanvänder och underhåller över tid.';
    heading.textContent = 'Regionöversikt';
    meta.textContent = isSelectionMode
      ? 'Välj region för att bläddra, söka, filtrera och fortsätta till val av befintliga boenden.'
      : 'Välj region för att bläddra, söka och öppna boenden i rätt operativ kontext.';
    search.placeholder = 'Sök region eller boende...';

    const renderLandingRows = function() {
      const searchTerm = normalizeRegisterText(search.value);
      const filterValue = filter.value;
      const rows = regions
        .filter(function(region) {
          if (!searchTerm) return true;
          const haystack = normalizeRegisterText(region.name + ' ' + (region.accommodations || []).map(item => item.name).join(' '));
          return haystack.includes(searchTerm);
        })
        .filter(function(region) {
          return regionMatchesFilter(region, filterValue);
        })
        .map(function(region) {
          const countLabel = `${region.accommodations.length} boenden`;
          return buildRegisterRow({
            link: typeof buildRegisterViewUrl === 'function'
              ? buildRegisterViewUrl('accommodations.html', viewState, { region: region.slug })
              : `accommodations.html?region=${encodeURIComponent(region.slug)}`,
            primary: region.name,
            context: `${countLabel} registrerade`,
            status: isSelectionMode ? 'Fortsätt till val' : 'Öppna region',
            openLabel: '→',
          });
        });

      renderRegisterRows(list, rows, {
        context: isSelectionMode
          ? 'Justera sökning eller filter för att hitta rätt region att välja från.'
          : 'Justera din sökning för att hitta boenden.',
      });
      if (typeof feather !== 'undefined') feather.replace();
    };

    search.addEventListener('input', renderLandingRows);
    filter.addEventListener('change', renderLandingRows);
    renderLandingRows();
    return;
  }

  breadcrumb.innerHTML = `
    <a href="${typeof buildRegisterViewUrl === 'function' ? buildRegisterViewUrl('accommodations.html', viewState) : 'accommodations.html'}" class="link">Boenden</a>
    <span aria-hidden="true">›</span>
    <span>${selectedRegion.name}</span>
  `;
  title.textContent = selectedRegion.name;
  description.textContent = isSelectionMode
    ? 'Curated accommodations in this region. Select an existing register object and return directly to Planning.'
    : 'Kuraterade boenden för regionen. Öppna ett boende för att gå vidare till Accommodation Workspace.';
  heading.textContent = 'Boenden i regionen';
  meta.textContent = `${selectedRegion.accommodations.length} registrerade boenden`;
  search.placeholder = `Sök boenden i ${selectedRegion.name}...`;

  const renderRegionRows = function() {
    const searchTerm = normalizeRegisterText(search.value);
    const filterValue = filter.value;
    const rows = (selectedRegion.accommodations || [])
      .filter(function(accommodation) {
        if (!searchTerm) return true;
        const haystack = normalizeRegisterText(`${accommodation.name} ${accommodation.place} ${accommodation.type}`);
        return haystack.includes(searchTerm);
      })
      .filter(function(accommodation) {
        return accommodationMatchesFilter(accommodation, filterValue);
      })
      .map(function(accommodation) {
        const selectionReference = {
          registerId: 'accommodation',
          regionSlug: selectedRegion.slug,
          objectId: accommodation.id,
        };
        const returnState = selectionContext
          ? Object.assign({}, selectionContext.state || {}, {
              selectedAccommodationRefs: typeof mergeRegisterReferences === 'function'
                ? mergeRegisterReferences((selectionContext.state && selectionContext.state.selectedAccommodationRefs) || [], selectionReference)
                : [selectionReference],
            })
          : null;
        const workspaceHref = `accommodations-workspace.html?region=${encodeURIComponent(selectedRegion.slug)}&accommodation=${encodeURIComponent(accommodation.id)}`;
        const selectionHref = selectionContext && typeof buildRegisterReturnUrl === 'function'
          ? buildRegisterReturnUrl(selectionContext, returnState)
          : workspaceHref;

        return buildRegisterRow({
          link: isSelectionMode ? selectionHref : workspaceHref,
          primary: accommodation.name,
          context: `${accommodation.type} · ${accommodation.place}`,
          status: isSelectionMode ? `Select · ${accommodation.readiness}` : accommodation.readiness,
          openLabel: isSelectionMode ? '↩' : '→',
        });
      });

    renderRegisterRows(list, rows, {
      context: isSelectionMode
        ? 'Justera sökning eller filter för att hitta rätt boendereferens att returnera.'
        : 'Justera din sökning för att hitta boenden.',
    });
    if (typeof feather !== 'undefined') feather.replace();
  };

  search.addEventListener('input', renderRegionRows);
  filter.addEventListener('change', renderRegionRows);
  renderRegionRows();
}
