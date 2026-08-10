(function() {
  'use strict';
  var slug = 'electrical-energy-calculator';
  var pEl = document.getElementById(slug + '-input');
  var tEl = document.getElementById(slug + '-t');
  var unitEl = document.getElementById(slug + '-unit');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var p = parseFloat(pEl.value), t = parseFloat(tEl.value);
    if (isNaN(p) || isNaN(t)) { setMsg('Please enter both power and time.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (p < 0 || t < 0) { setMsg('Power and time must be non-negative.', true); return; }
    var tSec = unitEl.value === 'h' ? t * 3600 : t;
    var joules = p * tSec;
    var tHours = unitEl.value === 'h' ? t : t / 3600;
    var kwh = (p / 1000) * tHours;
    var out = 'Formula: E = P x t\n';
    out += 'Power = ' + p + ' W, Time = ' + t + ' ' + (unitEl.value === 'h' ? 'hours' : 'seconds') + '\n\n';
    out += 'Energy (joules): ' + joules.toLocaleString() + ' J\n';
    out += 'Energy (kWh): ' + kwh.toFixed(4) + ' kWh\n';
    out += 'Energy (Wh): ' + (p * tHours).toFixed(2) + ' Wh';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Energy calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    pEl.value=''; tEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter power and time above.');
  });
})();
