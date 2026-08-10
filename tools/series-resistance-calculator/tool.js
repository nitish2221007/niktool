(function() {
  'use strict';
  var slug = 'series-resistance-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var vals = inputEl.value.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number);
    if (vals.length < 1 || vals.some(isNaN)) { setMsg('Please enter valid resistor values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (vals.some(function(v){ return v < 0; })) { setMsg('Resistance values cannot be negative.', true); return; }
    var total = vals.reduce(function(a,b){return a+b;},0);
    var out = 'Formula: R = R1 + R2 + R3 + ...\n';
    out += 'Resistors: ' + vals.join(' + ') + '\n';
    out += 'Number of Resistors: ' + vals.length + '\n';
    out += 'Equivalent Resistance: ' + total.toFixed(4) + ' ohm';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Series resistance calculated.');
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
