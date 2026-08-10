(function() {
  'use strict';
  var slug = 'potential-energy-calculator';
  var mEl = document.getElementById(slug + '-input');
  var hEl = document.getElementById(slug + '-h');
  var gEl = document.getElementById(slug + '-g');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var m = parseFloat(mEl.value), h = parseFloat(hEl.value), g = parseFloat(gEl.value);
    if (isNaN(m) || isNaN(h)) { setMsg('Please enter mass and height.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (isNaN(g)) { g = 9.8; gEl.value = '9.8'; }
    if (m < 0) { setMsg('Mass cannot be negative.', true); return; }
    if (g < 0) { setMsg('Gravity cannot be negative.', true); return; }
    var pe = m * g * h;
    outputEl.value = 'Formula: PE = mgh\nMass m = ' + m + ' kg\nGravity g = ' + g + ' m/s²\nHeight h = ' + h + ' m\n\nPotential Energy = ' + pe.toFixed(4) + ' J';
    copyBtn.disabled = false;
    setMsg('Potential energy calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    mEl.value=''; hEl.value=''; gEl.value='9.8'; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter mass and height above.');
  });
})();
