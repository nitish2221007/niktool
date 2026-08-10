(function() {
  'use strict';
  var slug = 'density-calculator';
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
    if (f === 'd') { aEl.placeholder = 'mass (kg)'; bEl.placeholder = 'volume (m³)'; }
    else if (f === 'm') { aEl.placeholder = 'density (kg/m³)'; bEl.placeholder = 'volume (m³)'; }
    else { aEl.placeholder = 'mass (kg)'; bEl.placeholder = 'density (kg/m³)'; }
  }
  findEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var f = findEl.value;
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both known values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 0 || b < 0) { setMsg('Values must be non-negative.', true); return; }
    var out = 'Formula: ρ = m / V\n';
    var result;
    if (f === 'd') {
      if (b === 0) { setMsg('Volume cannot be zero.', true); return; }
      result = a / b;
      out += 'm = ' + a + ' kg, V = ' + b + ' m³\n';
      out += 'Density ρ = ' + result.toFixed(4) + ' kg/m³';
    } else if (f === 'm') {
      result = a * b;
      out += 'ρ = ' + a + ' kg/m³, V = ' + b + ' m³\n';
      out += 'Mass m = ' + result.toFixed(4) + ' kg';
    } else {
      if (a === 0) { setMsg('Density cannot be zero.', true); return; }
      result = b / a;
      out += 'm = ' + b + ' kg, ρ = ' + a + ' kg/m³\n';
      out += 'Volume V = ' + result.toFixed(4) + ' m³';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Density calculation complete.');
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
