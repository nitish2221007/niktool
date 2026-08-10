(function() {
  'use strict';
  var slug = 'alphabetical-text-sorter';
  var inputEl = document.getElementById(slug + '-input');
  var modeEl = document.getElementById(slug + '-mode');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  function sortList() {
    var lines = inputEl.value.split('\n').map(function(l){return l.trim();}).filter(Boolean);
    if (lines.length === 0) return '';
    
    lines.sort(function(a, b) {
      return a.localeCompare(b, undefined, { sensitivity: 'base' });
    });
    
    if (modeEl.value === 'desc') lines.reverse();
    return lines.join('\n');
  }
  
  inputEl.addEventListener('input', function() { outputEl.value = sortList(); copyBtn.disabled = !inputEl.value.trim(); });
  modeEl.addEventListener('change', function() { outputEl.value = sortList(); });

  btn.addEventListener('click', function() {
    if (!inputEl.value.trim()) { setMsg('Please enter a list.', true); return; }
    outputEl.value = sortList();
    copyBtn.disabled = false;
    setMsg('List sorted successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter list above.');
  });
})();
