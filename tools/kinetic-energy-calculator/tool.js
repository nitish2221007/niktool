(function() {
  'use strict';
  var slug = 'kinetic-energy-calculator';
  var mEl = document.getElementById(slug + '-input');
  var vEl = document.getElementById(slug + '-v');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var m = parseFloat(mEl.value), v = parseFloat(vEl.value);
    if (isNaN(m) || isNaN(v)) { setMsg('Please enter both mass and velocity.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (m < 0) { setMsg('Mass cannot be negative.', true); return; }
    var ke = 0.5 * m * v * v;
    outputEl.value = 'Formula: KE = 1/2 mv^2\nMass m = ' + m + ' kg\nVelocity v = ' + v + ' m/s\n\nKinetic Energy = ' + ke.toFixed(4) + ' J';
    copyBtn.disabled = false;
    setMsg('Kinetic energy calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    mEl.value=''; vEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter mass and velocity above.');
  });
})();
