(function() {
  'use strict';
  var slug = 'electricity-bill-calculator';
  var unitsEl = document.getElementById(slug + '-input');
  var rateEl = document.getElementById(slug + '-rate');
  var fixedEl = document.getElementById(slug + '-fixed');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var units = parseFloat(unitsEl.value), rate = parseFloat(rateEl.value);
    var fixed = parseFloat(fixedEl.value);
    if (isNaN(units) || isNaN(rate)) { setMsg('Please enter units and rate.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (units < 0 || rate < 0) { setMsg('Units and rate must be non-negative.', true); return; }
    if (isNaN(fixed)) fixed = 0;
    if (fixed < 0) { setMsg('Fixed charge cannot be negative.', true); return; }
    var energyCharge = units * rate;
    var total = energyCharge + fixed;
    var out = 'Units: ' + units + ' kWh\n';
    out += 'Rate: ' + rate + ' per unit\n';
    out += 'Energy Charge: ' + energyCharge.toFixed(2) + '\n';
    out += 'Fixed Charge: ' + fixed.toFixed(2) + '\n';
    out += 'Estimated Total: ' + total.toFixed(2) + '\n\n';
    out += 'Note: Tariffs vary by provider and state. This is an estimate, not an official bill.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Bill estimated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    unitsEl.value=''; rateEl.value=''; fixedEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter units and rate above.');
  });
})();
