(function() {
  'use strict';
  var slug = 'lens-formula-calculator';
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
    if (f === 'f') { aEl.placeholder = 'v (image distance)'; bEl.placeholder = 'u (object distance)'; }
    else if (f === 'v') { aEl.placeholder = 'f (focal length)'; bEl.placeholder = 'u (object distance)'; }
    else { aEl.placeholder = 'f (focal length)'; bEl.placeholder = 'v (image distance)'; }
  }
  findEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var f = findEl.value;
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both known values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var out = 'Lens Formula: 1/f = 1/v - 1/u\n';
    var result, m;
    if (f === 'f') {
      var v=a, u=b;
      var denom = (1/v) - (1/u);
      if (Math.abs(denom) < 1e-12) { setMsg('Cannot compute focal length for these values.', true); return; }
      result = 1/denom;
      out += 'v = ' + v + ', u = ' + u + '\n';
      out += 'Focal Length f = ' + result.toFixed(4) + '\n';
      m = v/u;
    } else if (f === 'v') {
      var fl=a, u=b;
      var denom2 = (1/fl) + (1/u);
      if (Math.abs(denom2) < 1e-12) { setMsg('Cannot compute image distance for these values.', true); return; }
      result = 1/denom2;
      out += 'f = ' + fl + ', u = ' + u + '\n';
      out += 'Image Distance v = ' + result.toFixed(4) + '\n';
      m = result/u;
    } else {
      var fl2=a, v=b;
      var denom3 = (1/v) - (1/fl2);
      if (Math.abs(denom3) < 1e-12) { setMsg('Cannot compute object distance for these values.', true); return; }
      result = 1/denom3;
      out += 'f = ' + fl2 + ', v = ' + v + '\n';
      out += 'Object Distance u = ' + result.toFixed(4) + '\n';
      m = v/result;
    }
    out += 'Magnification m = v/u = ' + m.toFixed(4);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Lens calculation complete.');
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
