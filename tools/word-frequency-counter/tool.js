(function() {
  'use strict';
  var slug = 'word-frequency-counter';
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
    
    var sorted = Object.keys(freq).map(function(w) { return {word: w, count: freq[w]}; });
    sorted.sort(function(a,b){ return b.count - a.count; });
    
    var out = 'Word Frequency Table (Top 50):\n\n';
    sorted.slice(0, 50).forEach(function(item) {
      out += item.word + ': ' + item.count + '\n';
    });
    out += '\nTotal Unique Words: ' + sorted.length;
    
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Frequency analysis complete.');
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
