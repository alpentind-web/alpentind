var platformModalActiveOverlay = null;

function platformModalEscapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function closePlatformModal() {
  if (!platformModalActiveOverlay) return;
  var overlay = platformModalActiveOverlay;
  platformModalActiveOverlay = null;
  if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

function buildPlatformModal(config) {
  closePlatformModal();

  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', config.titleId);

  overlay.innerHTML = ''
    + '<div class="modal platform-modal-box">'
    +   '<div class="modal-header">'
    +     '<h2 class="modal-title" id="' + platformModalEscapeHtml(config.titleId) + '">' + platformModalEscapeHtml(config.title) + '</h2>'
    +   '</div>'
    +   '<div class="modal-body">' + config.bodyHtml + '</div>'
    +   '<div class="modal-footer">' + config.footerHtml + '</div>'
    + '</div>';

  platformModalActiveOverlay = overlay;
  document.body.appendChild(overlay);
  if (typeof feather !== 'undefined') feather.replace();

  return overlay;
}

function showPlatformConfirmModal(options) {
  var opts = options || {};
  var title = opts.title || 'Bekräfta';
  var message = opts.message || '';
  var confirmLabel = opts.confirmLabel || 'Ja';
  var cancelLabel = opts.cancelLabel || 'Nej';
  var titleId = 'platform-confirm-modal-title';

  var overlay = buildPlatformModal({
    title: title,
    titleId: titleId,
    bodyHtml: '<p class="text-muted" style="margin:0;">' + platformModalEscapeHtml(message) + '</p>',
    footerHtml: ''
      + '<button class="btn btn-secondary" type="button" data-platform-modal-action="cancel">' + platformModalEscapeHtml(cancelLabel) + '</button>'
      + '<button class="btn btn-primary" type="button" data-platform-modal-action="confirm">' + platformModalEscapeHtml(confirmLabel) + '</button>',
  });

  var resolved = false;
  function cleanup() {
    document.removeEventListener('keydown', onKeydown);
  }
  function resolveAndClose(handler) {
    if (resolved) return;
    resolved = true;
    cleanup();
    closePlatformModal();
    if (typeof handler === 'function') handler();
  }

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      resolveAndClose(opts.onCancel);
      return;
    }
    var actionTrigger = event.target.closest('[data-platform-modal-action]');
    if (!actionTrigger) return;
    var action = actionTrigger.getAttribute('data-platform-modal-action');
    if (action === 'confirm') resolveAndClose(opts.onConfirm);
    if (action === 'cancel') resolveAndClose(opts.onCancel);
  });

  function onKeydown(event) {
    if (event.key === 'Escape') {
      resolveAndClose(opts.onCancel);
    }
  }
  document.addEventListener('keydown', onKeydown);

  var confirmBtn = overlay.querySelector('[data-platform-modal-action="confirm"]');
  if (confirmBtn) confirmBtn.focus();
}

function showPlatformEditModal(options) {
  var opts = options || {};
  var title = opts.title || 'Redigera';
  var fields = opts.fields || [];
  var confirmLabel = opts.confirmLabel || 'Spara';
  var cancelLabel = opts.cancelLabel || 'Avbryt';
  var titleId = 'platform-edit-modal-title';

  var fieldsHtml = fields.map(function(field) {
    return '<div class="form-group">'
      + '<label class="form-label" for="' + platformModalEscapeHtml(field.id) + '">' + platformModalEscapeHtml(field.label) + '</label>'
      + '<input class="form-input platform-modal-input" id="' + platformModalEscapeHtml(field.id) + '"'
      + ' type="' + platformModalEscapeHtml(field.type || 'text') + '"'
      + ' value="' + platformModalEscapeHtml(field.value || '') + '"'
      + ' placeholder="' + platformModalEscapeHtml(field.placeholder || '') + '"'
      + ' autocomplete="off">'
      + '</div>';
  }).join('');

  var overlay = buildPlatformModal({
    title: title,
    titleId: titleId,
    bodyHtml: '<div style="display:flex;flex-direction:column;gap:var(--spacing-md);">' + fieldsHtml + '</div>',
    footerHtml: ''
      + '<button class="btn btn-secondary" type="button" data-platform-modal-action="cancel">' + platformModalEscapeHtml(cancelLabel) + '</button>'
      + '<button class="btn btn-primary" type="button" data-platform-modal-action="confirm">' + platformModalEscapeHtml(confirmLabel) + '</button>',
  });

  var resolved = false;
  function cleanup() { document.removeEventListener('keydown', onKeydown); }

  function collectValues() {
    var values = {};
    fields.forEach(function(field) {
      var el = overlay.querySelector('#' + field.id);
      values[field.id] = el ? el.value : '';
    });
    return values;
  }

  function resolveAndClose(handler) {
    if (resolved) return;
    resolved = true;
    cleanup();
    closePlatformModal();
    if (typeof handler === 'function') handler();
  }

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) { resolveAndClose(opts.onCancel); return; }
    var actionTrigger = event.target.closest('[data-platform-modal-action]');
    if (!actionTrigger) return;
    var action = actionTrigger.getAttribute('data-platform-modal-action');
    if (action === 'confirm') {
      var values = collectValues();
      resolveAndClose(function() {
        if (typeof opts.onConfirm === 'function') opts.onConfirm(values);
      });
    }
    if (action === 'cancel') resolveAndClose(opts.onCancel);
  });

  function onKeydown(event) {
    if (event.key === 'Escape') resolveAndClose(opts.onCancel);
  }
  document.addEventListener('keydown', onKeydown);

  var firstInput = overlay.querySelector('.platform-modal-input');
  if (firstInput) { firstInput.focus(); firstInput.select(); }
}

function showPlatformInputModal(options) {
  var opts = options || {};
  var title = opts.title || 'Ange värde';
  var description = opts.description || '';
  var placeholder = opts.placeholder || '';
  var initialValue = String(opts.initialValue || '');
  var confirmLabel = opts.confirmLabel || 'Spara';
  var cancelLabel = opts.cancelLabel || 'Avbryt';
  var titleId = 'platform-input-modal-title';
  var inputId = 'platform-input-modal-value';

  var descriptionHtml = description
    ? '<p class="text-muted" style="margin:0 0 var(--spacing-sm);">' + platformModalEscapeHtml(description) + '</p>'
    : '';

  var overlay = buildPlatformModal({
    title: title,
    titleId: titleId,
    bodyHtml: ''
      + descriptionHtml
      + '<input class="platform-modal-input" id="' + platformModalEscapeHtml(inputId) + '" type="text" value="' + platformModalEscapeHtml(initialValue) + '" placeholder="' + platformModalEscapeHtml(placeholder) + '" autocomplete="off">',
    footerHtml: ''
      + '<button class="btn btn-secondary" type="button" data-platform-modal-action="cancel">' + platformModalEscapeHtml(cancelLabel) + '</button>'
      + '<button class="btn btn-primary" type="button" data-platform-modal-action="confirm">' + platformModalEscapeHtml(confirmLabel) + '</button>',
  });

  var resolved = false;
  var input = overlay.querySelector('#' + inputId);
  function cleanup() {
    document.removeEventListener('keydown', onKeydown);
  }

  function resolveAndClose(handler) {
    if (resolved) return;
    resolved = true;
    cleanup();
    closePlatformModal();
    if (typeof handler === 'function') handler();
  }

  function submitValue() {
    var value = String((input && input.value) || '').trim();
    if (!value) {
      if (input) input.focus();
      return;
    }
    resolveAndClose(function() {
      if (typeof opts.onConfirm === 'function') opts.onConfirm(value);
    });
  }

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      resolveAndClose(opts.onCancel);
      return;
    }
    var actionTrigger = event.target.closest('[data-platform-modal-action]');
    if (!actionTrigger) return;
    var action = actionTrigger.getAttribute('data-platform-modal-action');
    if (action === 'confirm') submitValue();
    if (action === 'cancel') resolveAndClose(opts.onCancel);
  });

  function onKeydown(event) {
    if (event.key === 'Escape') {
      resolveAndClose(opts.onCancel);
      return;
    }
    if (event.key === 'Enter' && event.target === input) {
      submitValue();
    }
  }
  document.addEventListener('keydown', onKeydown);

  if (input) {
    input.focus();
    input.select();
  }
}
