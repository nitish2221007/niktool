(function() {
  'use strict';
  var slug = 'statistics-frequency-table-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please enter data values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var values = text.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number).filter(function(n){return !isNaN(n);});
    if (values.length === 0) { setMsg('Please enter at least one valid number.', true); return; }
    var freq = {};
    values.forEach(function(v) { freq[v] = (freq[v] || 0) + 1; });
    var sorted = Object.keys(freq).map(Number).sort(function(a,b){return a-b;});
    var totalFreq = 0;
    var weightedSum = 0;
    var out = 'Value\tFrequency\tRelative Freq\n';
    out += '-'.repeat(40) + '\n';
    sorted.forEach(function(v) {
      var f = freq[v];
      totalFreq += f;
      weightedSum += v * f;
      out += v + '\t' + f + '\t' + (f / values.length).toFixed(4) + '\n';
    });
    out += '-'.repeat(40) + '\n';
    out += 'Total\t' + totalFreq + '\n\n';
    out += 'Mean from frequency table: ' + (weightedSum / totalFreq).toFixed(4) + '\n';
    out += 'Number of unique values: ' + sorted.length;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Frequency table generated.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared.');
  });
})();
