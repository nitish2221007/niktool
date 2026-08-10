(function() {
  'use strict';
  const KEY = 'niktool_college_res';
  const titleEl = document.getElementById('res-title');
  const urlEl = document.getElementById('res-url');
  const subEl = document.getElementById('res-subject');
  const notesEl = document.getElementById('res-notes');
  const outEl = document.getElementById('college-resource-manager-output');
  const msgEl = document.getElementById('college-resource-manager-message');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  let resources = JSON.parse(localStorage.getItem(KEY) || '[]');

  function render() {
    if (!resources.length) {
      outEl.value = 'No resources saved yet.';
      copyBtn.disabled = true;
      return;
    }
    let text = '';
    resources.forEach((r, i) => {
      text += `[${i + 1}] ${r.title} (${r.subject})\n`;
      text += `URL: ${r.url}\n`;
      if (r.notes) text += `Notes: ${r.notes}\n`;
      text += '-'.repeat(30) + '\n';
    });
    outEl.value = text;
    copyBtn.disabled = false;
  }

  primaryBtn.addEventListener('click', () => {
    if (!titleEl.value.trim() || !urlEl.value.trim()) {
      msgEl.textContent = 'Title and URL are required.';
      msgEl.classList.add('is-error');
      return;
    }
    msgEl.classList.remove('is-error');
    resources.push({
      title: titleEl.value.trim(),
      url: urlEl.value.trim(),
      subject: subEl.value.trim() || 'General',
      notes: notesEl.value.trim()
    });
    localStorage.setItem(KEY, JSON.stringify(resources));
    titleEl.value = '';
    urlEl.value = '';
    subEl.value = '';
    notesEl.value = '';
    msgEl.textContent = 'Resource saved locally!';
    render();
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else {
      navigator.clipboard.writeText(outEl.value);
    }
    msgEl.textContent = 'List copied to clipboard!';
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Delete all saved resources?')) {
      resources = [];
      localStorage.removeItem(KEY);
      msgEl.textContent = 'All resources cleared.';
      render();
    }
  });

  render();
})();
