function escapeContactRegisterHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderContactRegisterRow(contact) {
  return '<a href="kontakt-workspace.html?id=' + encodeURIComponent(contact.id) + '" class="register-row" role="listitem">'
    + '<div class="register-row-primary">' + escapeContactRegisterHtml(contact.name) + '</div>'
    + '<div class="register-row-context">' + escapeContactRegisterHtml(contact.registerContext || '—') + '</div>'
    + '<div class="register-row-status">' + escapeContactRegisterHtml(contact.registerStatus || '—') + '</div>'
    + '<div class="register-row-open">→</div>'
    + '</a>';
}

function initContactRegisterPage(config) {
  var listEl = document.getElementById(config.listId);
  if (!listEl) return;

  function render(query) {
    var normalizedQuery = String(query || '').trim().toLowerCase();
    var contacts = getContactsByCategory(config.category).filter(function(contact) {
      return !normalizedQuery || contact.name.toLowerCase().indexOf(normalizedQuery) !== -1;
    });

    if (contacts.length === 0) {
      listEl.innerHTML = '<p class="text-muted" style="margin:0;">Inga kontakter matchar sökningen.</p>';
      return;
    }

    listEl.innerHTML = contacts.map(renderContactRegisterRow).join('');
  }

  render('');

  var searchInput = config.searchId ? document.getElementById(config.searchId) : null;
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      render(this.value);
    });
  }
}
