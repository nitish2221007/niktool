(function() {
  'use strict';
  var slug = 'case-converter';
  var inputEl = document.getElementById(slug + '-input');
  var modeEl = document.getElementById(slug + '-mode');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  function convert() {
    var text = inputEl.value;
    if (!text.trim()) return '';
    var mode = modeEl.value;
    if (mode === 'upper') return text.toUpperCase();
    if (mode === 'lower') return text.toLowerCase();
    if (mode === 'sentence') {
      return text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, function(m, p1, p2) {
        return p1 + p2.toUpperCase();
      });
    }
    if (mode === 'title') {
      return text.toLowerCase().replace(/\b\w/g, function(c) { return c.toUpperCase(); });
    }
    return text;
  }
  
  inputEl.addEventListener('input', function() { outputEl.value = convert(); copyBtn.disabled = !inputEl.value.trim(); });
  modeEl.addEventListener('change', function() { outputEl.value = convert(); });

  btn.addEventListener('click', function() {
    if (!inputEl.value.trim()) { setMsg('Please enter some text.', true); return; }
    outputEl.value = convert();
    copyBtn.disabled = false;
    setMsg('Case converted successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter text above.');
  });
})();
