(function() {
  'use strict';
  var slug = 'weighted-average-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var lines = inputEl.value.split('\n').map(function(l){return l.trim();}).filter(Boolean);
    if (!lines.length) { setMsg('Please enter at least one score and weight.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var weightedSum = 0, weightTotal = 0, errors = [];
    lines.forEach(function(line, idx) {
      var parts = line.split(',').map(function(p){return p.trim();});
      if (parts.length < 2) { errors.push('Line ' + (idx+1) + ': need Score, Weight'); return; }
      var score = parseFloat(parts[0]), weight = parseFloat(parts[1]);
      if (isNaN(score) || isNaN(weight)) { errors.push('Line ' + (idx+1) + ': values must be numbers'); return; }
      if (weight < 0) { errors.push('Line ' + (idx+1) + ': weight cannot be negative'); return; }
      weightedSum += score * weight;
      weightTotal += weight;
    });
    if (errors.length) { setMsg(errors[0], true); return; }
    if (weightTotal === 0) { setMsg('Total weight cannot be zero.', true); return; }
    var result = weightedSum / weightTotal;
    var out = 'Weighted Average: ' + result.toFixed(2) + '\n';
    out += 'Total Weight: ' + weightTotal + '\n';
    if (Math.abs(weightTotal - 100) > 0.001) {
      out += 'Note: weights do not add up to 100.\n';
    }
    out += 'Rows: ' + lines.length;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Weighted average calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter score and weight pairs above.');
  });
})();
