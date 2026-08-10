(function() {
  'use strict';
  var slug = 'parallel-resistance-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var vals = inputEl.value.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number);
    if (vals.length < 2 || vals.some(isNaN)) { setMsg('Please enter at least two valid resistor values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (vals.some(function(v){ return v <= 0; })) { setMsg('All resistance values must be positive.', true); return; }
    var reciprocalSum = 0;
    vals.forEach(function(v){ reciprocalSum += 1/v; });
    var total = 1 / reciprocalSum;
    var out = 'Formula: 1/R = 1/R1 + 1/R2 + ...\n';
    out += 'Resistors: ' + vals.join(', ') + '\n';
    out += 'Sum of reciprocals: ' + reciprocalSum.toFixed(6) + '\n';
    out += 'Equivalent Resistance: ' + total.toFixed(4) + ' ohm\n\n';
    out += 'Note: For positive resistors, the result is always less than the smallest branch resistance.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Parallel resistance calculated.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter resistor values above.');
  });
})();
