(function() {
  'use strict';
  var slug = 'duplicate-word-finder';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  
  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please enter some text.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    
    var words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
    var freq = {};
    words.forEach(function(w) { freq[w] = (freq[w] || 0) + 1; });
    
    var duplicates = [];
    for (var w in freq) {
      if (freq[w] > 1 && w.length > 2) { // Ignore very short words like 'a', 'is'
        duplicates.push({word: w, count: freq[w]});
      }
    }
    
    duplicates.sort(function(a,b){ return b.count - a.count; });
    
    if (duplicates.length === 0) {
      outputEl.value = 'No significant duplicate words found (ignoring words 2 letters or shorter).';
    } else {
      var out = 'Duplicate Words Found:\n\n';
      duplicates.forEach(function(d) {
        out += d.word + ': ' + d.count + ' times\n';
      });
      outputEl.value = out;
    }
    copyBtn.disabled = false;
    setMsg('Analysis complete.');
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
