const REGISTER_VIEW_MODES = {
  REGISTER: 'register',
  SELECT: 'select',
};

function parsePreviewState(rawValue) {
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return null;
  }
}

function serializePreviewState(value) {
  if (value === undefined || value === null) return '';

  try {
    return JSON.stringify(value);
  } catch (error) {
    return '';
  }
}

function buildPreviewHref(path, params) {
  const searchParams = new URLSearchParams();

  Object.entries(params || {}).forEach(function(entry) {
    const key = entry[0];
    const value = entry[1];

    if (value === undefined || value === null || value === '') return;

    if (typeof value === 'object') {
      const serializedValue = serializePreviewState(value);
      if (serializedValue) searchParams.set(key, serializedValue);
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

function getSelectionStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parsePreviewState(params.get('selectionState'));
}

function getRegisterViewStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode') === REGISTER_VIEW_MODES.SELECT
    ? REGISTER_VIEW_MODES.SELECT
    : REGISTER_VIEW_MODES.REGISTER;

  return {
    mode,
    selectionContext: parsePreviewState(params.get('selectionContext')),
  };
}

function buildRegisterViewUrl(path, viewState, extraParams) {
  const params = Object.assign({}, extraParams || {});

  if (
    viewState &&
    viewState.mode === REGISTER_VIEW_MODES.SELECT &&
    viewState.selectionContext
  ) {
    params.mode = REGISTER_VIEW_MODES.SELECT;
    params.selectionContext = viewState.selectionContext;
  }

  return buildPreviewHref(path, params);
}

function buildRegisterSelectionUrl(path, selectionContext, extraParams) {
  return buildRegisterViewUrl(
    path,
    {
      mode: REGISTER_VIEW_MODES.SELECT,
      selectionContext,
    },
    extraParams
  );
}

function buildRegisterReturnUrl(selectionContext, nextState) {
  if (!selectionContext || !selectionContext.returnTo) return '#';

  const returnState = nextState || selectionContext.state || null;
  const params = {};

  if (returnState && returnState.projectId) {
    params.projectId = returnState.projectId;
  }

  if (returnState) {
    params.selectionState = returnState;
  }

  return buildPreviewHref(selectionContext.returnTo, params);
}

function mergeRegisterReferences(existingRefs, nextRef) {
  const normalizedExistingRefs = Array.isArray(existingRefs) ? existingRefs.slice() : [];
  if (!nextRef) return normalizedExistingRefs;

  const alreadySelected = normalizedExistingRefs.some(function(reference) {
    return (
      reference &&
      reference.registerId === nextRef.registerId &&
      reference.objectId === nextRef.objectId
    );
  });

  return alreadySelected ? normalizedExistingRefs : normalizedExistingRefs.concat(nextRef);
}

function renderRegisterSelectionBanner(containerId, config) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const selectionContext = config && config.selectionContext;
  if (!selectionContext) {
    container.hidden = true;
    container.innerHTML = '';
    return;
  }

  const source = selectionContext.source || {};
  const sourceParts = [source.label, source.areaLabel].filter(Boolean);
  const description = (config && config.description)
    || 'Locate existing register objects and return references without leaving the originating workflow.';
  const returnLabel = (selectionContext && selectionContext.returnLabel) || 'Return';
  const returnHref = buildRegisterReturnUrl(
    selectionContext,
    (config && config.returnState) || selectionContext.state || null
  );

  container.hidden = false;
  container.innerHTML = `
    <div class="selection-mode-banner">
      <div class="selection-mode-banner-copy">
        <p class="selection-mode-eyebrow">Selection Mode</p>
        <h2 class="selection-mode-title">${(config && config.title) || 'Select existing register objects'}</h2>
        <p class="text-muted">${description}</p>
        ${sourceParts.length > 0 ? `<p class="selection-mode-context">Source: ${sourceParts.join(' · ')}</p>` : ''}
      </div>
      <a href="${returnHref}" class="btn btn-secondary">${returnLabel}</a>
    </div>
  `;
}
