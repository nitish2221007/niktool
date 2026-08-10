(function() {
  'use strict';
  var slug = 'work-energy-power-calculator';
  var typeEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var cEl = document.getElementById(slug + '-c');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function updateLabels() {
    var t = typeEl.value;
    if (t === 'work') { aEl.placeholder='Force F (N)'; bEl.placeholder='Displacement s (m)'; cEl.value=''; }
    else if (t === 'ke') { aEl.placeholder='Mass m (kg)'; bEl.placeholder='Velocity v (m/s)'; cEl.value=''; }
    else if (t === 'pe') { aEl.placeholder='Mass m (kg)'; bEl.placeholder='g (9.8 m/s²)'; cEl.placeholder='Height h (m)'; }
    else { aEl.placeholder='Work W (J)'; bEl.placeholder='Time t (s)'; cEl.value=''; }
  }
  typeEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var t = typeEl.value;
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value), c = parseFloat(cEl.value);
    var out = '', result;
    if (t === 'work') {
      if (isNaN(a) || isNaN(b)) { setMsg('Please enter force and displacement.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      result = a * b;
      out = 'Formula: W = F x s\nF = ' + a + ' N, s = ' + b + ' m\nWork = ' + result.toFixed(4) + ' J';
    } else if (t === 'ke') {
      if (isNaN(a) || isNaN(b)) { setMsg('Please enter mass and velocity.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      if (a < 0) { setMsg('Mass cannot be negative.', true); return; }
      result = 0.5 * a * b * b;
      out = 'Formula: KE = ½ m v²\nm = ' + a + ' kg, v = ' + b + ' m/s\nKinetic Energy = ' + result.toFixed(4) + ' J';
    } else if (t === 'pe') {
      if (isNaN(a) || isNaN(b) || isNaN(c)) { setMsg('Please enter mass, g, and height.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      if (a < 0) { setMsg('Mass cannot be negative.', true); return; }
      result = a * b * c;
      out = 'Formula: PE = m g h\nm = ' + a + ' kg, g = ' + b + ' m/s², h = ' + c + ' m\nPotential Energy = ' + result.toFixed(4) + ' J';
    } else {
      if (isNaN(a) || isNaN(b)) { setMsg('Please enter work and time.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      if (b === 0) { setMsg('Time cannot be zero.', true); return; }
      result = a / b;
      out = 'Formula: P = W / t\nW = ' + a + ' J, t = ' + b + ' s\nPower = ' + result.toFixed(4) + ' W';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Calculation complete.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    aEl.value=''; bEl.value=''; cEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Choose a calculation type.');
  });
})();
