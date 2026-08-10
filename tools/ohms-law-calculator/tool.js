(function() {
  'use strict';
  var slug = 'ohms-law-calculator';
  var findEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  function updateLabels() {
    var f = findEl.value;
    if (f === 'V') { aEl.placeholder = 'Current I (A)'; bEl.placeholder = 'Resistance R (ohm)'; }
    else if (f === 'I') { aEl.placeholder = 'Voltage V (V)'; bEl.placeholder = 'Resistance R (ohm)'; }
    else { aEl.placeholder = 'Voltage V (V)'; bEl.placeholder = 'Current I (A)'; }
  }
  findEl.addEventListener('change', updateLabels);
  updateLabels();

  btn.addEventListener('click', function() {
    var f = findEl.value;
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both known values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var out = '';
    if (f === 'V') {
      if (a < 0 || b < 0) { setMsg('Current and resistance must be non-negative.', true); return; }
      var v = a * b;
      out = 'Formula: V = I x R\nI = ' + a + ' A, R = ' + b + ' ohm\nVoltage V = ' + v.toFixed(4) + ' V';
    } else if (f === 'I') {
      if (b === 0) { setMsg('Resistance cannot be zero when finding current.', true); return; }
      if (a < 0 || b < 0) { setMsg('Voltage and resistance must be non-negative.', true); return; }
      var i = a / b;
      out = 'Formula: I = V / R\nV = ' + a + ' V, R = ' + b + ' ohm\nCurrent I = ' + i.toFixed(4) + ' A';
    } else {
      if (b === 0) { setMsg('Current cannot be zero when finding resistance.', true); return; }
      if (a < 0 || b < 0) { setMsg('Voltage and current must be non-negative.', true); return; }
      var r = a / b;
      out = 'Formula: R = V / I\nV = ' + a + ' V, I = ' + b + ' A\nResistance R = ' + r.toFixed(4) + ' ohm';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Result calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    aEl.value = ''; bEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Choose the unknown and enter two known values.');
  });
})();
