(function() {
  'use strict';
  var slug = 'notice-word-counter';
  var inputEl = document.getElementById(slug + '-input');
  var limitEl = document.getElementById(slug + '-limit');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  function analyze() {
    var text = inputEl.value;
    var words = text.trim() ? text.trim().split(/\s+/).length : 0;
    var limit = parseInt(limitEl.value, 10) || 50;
    var diff = words - limit;
    var out = 'Current Word Count: ' + words + '\n';
    out += 'Standard Limit: ' + limit + ' words\n';
    if (diff > 0) out += 'Status: Over limit by ' + diff + ' words. Try to be more concise.';
    else if (diff < 0) out += 'Status: Under limit. You can add ' + Math.abs(diff) + ' more words.';
    else out += 'Status: Perfect length!';
    return out;
  }
  
  inputEl.addEventListener('input', function() { outputEl.value = analyze(); copyBtn.disabled = !inputEl.value.trim(); });
  limitEl.addEventListener('input', function() { outputEl.value = analyze(); });

  btn.addEventListener('click', function() {
    if (!inputEl.value.trim()) { setMsg('Please enter your notice draft.', true); return; }
    outputEl.value = analyze();
    copyBtn.disabled = false;
    setMsg('Notice analyzed successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter notice draft above.');
  });
})();
