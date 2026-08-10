(function() {
  'use strict';
  var slug = 'wave-speed-calculator';
  var findEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function updateLabels() {
    var f = findEl.value;
    if (f === 'v') { aEl.placeholder = 'f (Hz)'; bEl.placeholder = 'λ (m)'; }
    else if (f === 'f') { aEl.placeholder = 'v (m/s)'; bEl.placeholder = 'λ (m)'; }
    else { aEl.placeholder = 'v (m/s)'; bEl.placeholder = 'f (Hz)'; }
  }
  findEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var f = findEl.value;
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both known values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 0 || b < 0) { setMsg('Values must be non-negative.', true); return; }
    var out = 'Formula: v = f x λ\n';
    var result;
    if (f === 'v') {
      result = a * b;
      out += 'f = ' + a + ' Hz, λ = ' + b + ' m\n';
      out += 'Speed v = ' + result.toFixed(4) + ' m/s';
    } else if (f === 'f') {
      if (b === 0) { setMsg('Wavelength cannot be zero.', true); return; }
      result = a / b;
      out += 'v = ' + a + ' m/s, λ = ' + b + ' m\n';
      out += 'Frequency f = ' + result.toFixed(4) + ' Hz';
    } else {
      if (a === 0) { setMsg('Speed cannot be zero.', true); return; }
      result = b / a;
      out += 'v = ' + a + ' m/s, f = ' + b + ' Hz\n';
      out += 'Wavelength λ = ' + result.toFixed(4) + ' m';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Wave calculation complete.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Choose the unknown and enter values.');
  });
})();
