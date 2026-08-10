(function() {
  'use strict';
  var slug = 'essay-word-counter';
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
    var limit = parseInt(limitEl.value, 10);
    var out = 'Current Word Count: ' + words + '\n';
    
    if (!isNaN(limit) && limit > 0) {
      var diff = words - limit;
      if (diff > 0) {
        out += 'Target Limit: ' + limit + ' words\n';
        out += 'Status: Over limit by ' + diff + ' words.';
      } else if (diff < 0) {
        out += 'Target Limit: ' + limit + ' words\n';
        out += 'Status: Under limit. You can write ' + Math.abs(diff) + ' more words.';
      } else {
        out += 'Target Limit: ' + limit + ' words\n';
        out += 'Status: Perfect! You hit the exact target.';
      }
    }
    return out;
  }
  
  inputEl.addEventListener('input', function() { outputEl.value = analyze(); copyBtn.disabled = !inputEl.value.trim(); });
  limitEl.addEventListener('input', function() { outputEl.value = analyze(); });

  btn.addEventListener('click', function() {
    if (!inputEl.value.trim()) { setMsg('Please enter some text.', true); return; }
    outputEl.value = analyze();
    copyBtn.disabled = false;
    setMsg('Essay analyzed successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; limitEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter text above.');
  });
})();
