/* ========================================
   AlpenTind Platform Preview
   Workflow Guidance – Communication Pattern

   showWorkflowGuidance(config)

   config = {
     intent:     string,  // What you are doing
     capability: string,  // What this will support
     phase:      string,  // Where the workflow continues
   }
   ======================================== */

function showWorkflowGuidance(config) {
  var existing = document.getElementById('workflow-guidance-overlay');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var esc = typeof escapePreviewHtml === 'function'
    ? escapePreviewHtml
    : function(v) {
        return String(v == null ? '' : v).replace(/[&<>"']/g, function(c) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
      };

  var overlay = document.createElement('div');
  overlay.className  = 'modal-overlay';
  overlay.id         = 'workflow-guidance-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'wg-modal-title');

  overlay.innerHTML =
    '<div class="modal workflow-guidance-modal">'
    + '<div class="modal-header">'
    +   '<div class="flex items-center gap-md">'
    +     '<div class="workflow-guidance-icon-wrap" aria-hidden="true">'
    +       '<i data-feather="compass" style="width:20px;height:20px"></i>'
    +     '</div>'
    +     '<h3 id="wg-modal-title" style="margin:0;">Workflow Guidance</h3>'
    +   '</div>'
    +   '<button class="btn btn-icon btn-sm" id="workflow-guidance-close" aria-label="Stäng">'
    +     '<i data-feather="x" style="width:16px;height:16px" aria-hidden="true"></i>'
    +   '</button>'
    + '</div>'
    + '<div class="modal-body workflow-guidance-body">'
    +   '<div class="workflow-guidance-section">'
    +     '<p class="workflow-guidance-label">What you are doing</p>'
    +     '<p class="workflow-guidance-text">' + esc(config.intent) + '</p>'
    +   '</div>'
    +   '<div class="workflow-guidance-section">'
    +     '<p class="workflow-guidance-label">What this will support</p>'
    +     '<p class="workflow-guidance-text">' + esc(config.capability) + '</p>'
    +   '</div>'
    +   '<div class="workflow-guidance-section workflow-guidance-section--last">'
    +     '<p class="workflow-guidance-label">Where the workflow continues</p>'
    +     '<p class="workflow-guidance-text">' + esc(config.phase) + '</p>'
    +   '</div>'
    + '</div>'
    + '<div class="modal-footer">'
    +   '<button class="btn btn-secondary" id="workflow-guidance-dismiss">Understood</button>'
    + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  if (typeof feather !== 'undefined') feather.replace();

  var closeBtn    = document.getElementById('workflow-guidance-close');
  var dismissBtn  = document.getElementById('workflow-guidance-dismiss');

  function closeModal() {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(e) {
    if (e.key === 'Escape') closeModal();
  }

  closeBtn.addEventListener('click', closeModal);
  dismissBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', handleEsc);

  closeBtn.focus();
}
