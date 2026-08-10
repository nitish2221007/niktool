(function() {
  'use strict';
  var slug = 'electrical-power-calculator';
  var modeEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  function updateLabels() {
    var m = modeEl.value;
    if (m === 'vi') { aEl.placeholder = 'Voltage V (V)'; bEl.placeholder = 'Current I (A)'; }
    else if (m === 'i2r') { aEl.placeholder = 'Current I (A)'; bEl.placeholder = 'Resistance R (ohm)'; }
    else { aEl.placeholder = 'Voltage V (V)'; bEl.placeholder = 'Resistance R (ohm)'; }
  }
  modeEl.addEventListener('change', updateLabels);
  updateLabels();

  btn.addEventListener('click', function() {
    var m = modeEl.value;
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 0 || b < 0) { setMsg('Values must be non-negative.', true); return; }
    var p, out;
    if (m === 'vi') {
      p = a * b;
      out = 'Formula: P = V x I\nV = ' + a + ' V, I = ' + b + ' A\nPower P = ' + p.toFixed(4) + ' W';
    } else if (m === 'i2r') {
      p = a * a * b;
      out = 'Formula: P = I^2 x R\nI = ' + a + ' A, R = ' + b + ' ohm\nPower P = ' + p.toFixed(4) + ' W';
    } else {
      if (b === 0) { setMsg('Resistance cannot be zero.', true); return; }
      p = (a * a) / b;
      out = 'Formula: P = V^2 / R\nV = ' + a + ' V, R = ' + b + ' ohm\nPower P = ' + p.toFixed(4) + ' W';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Power calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    aEl.value = ''; bEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Choose a formula mode and enter values.');
  });
})();
