(function() {
  'use strict';
  var slug = 'pressure-calculator';
  var modeEl = document.getElementById(slug + '-mode');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function updateLabels() {
    var m = modeEl.value;
    if (m === 'P') { aEl.placeholder = 'Force (N)'; bEl.placeholder = 'Area (m²)'; }
    else if (m === 'F') { aEl.placeholder = 'Pressure (Pa)'; bEl.placeholder = 'Area (m²)'; }
    else { aEl.placeholder = 'Force (N)'; bEl.placeholder = 'Pressure (Pa)'; }
  }
  modeEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 0 || b < 0) { setMsg('Values cannot be negative.', true); return; }
    var mode = modeEl.value;
    var out = 'Formula: Pressure = Force / Area\n\n';
    if (mode === 'P') {
      if (b === 0) { setMsg('Area cannot be zero.', true); return; }
      var p = a / b;
      out += 'Force = ' + a + ' N, Area = ' + b + ' m²\n';
      out += 'Pressure = ' + p.toFixed(4) + ' Pa (N/m²)\n';
      out += 'Pressure = ' + (p / 1000).toFixed(4) + ' kPa';
    } else if (mode === 'F') {
      var f = a * b;
      out += 'Pressure = ' + a + ' Pa, Area = ' + b + ' m²\n';
      out += 'Force = ' + f.toFixed(4) + ' N';
    } else {
      if (a === 0) { setMsg('Pressure cannot be zero.', true); return; }
      var ar = b / a;
      out += 'Force = ' + b + ' N, Pressure = ' + a + ' Pa\n';
      out += 'Area = ' + ar.toFixed(4) + ' m²';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Calculation complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
