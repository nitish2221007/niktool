(function() {
  'use strict';
  var slug = 'focal-length-calculator';
  var modeEl = document.getElementById(slug + '-mode');
  var uEl = document.getElementById(slug + '-u');
  var vEl = document.getElementById(slug + '-v');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var u = parseFloat(uEl.value), v = parseFloat(vEl.value);
    if (isNaN(u) || isNaN(v)) { setMsg('Please enter both u and v.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var mode = modeEl.value;
    var f, formula;
    if (mode === 'lens') {
      var denom = (1/v) - (1/u);
      if (Math.abs(denom) < 1e-12) { setMsg('Cannot compute focal length for these values.', true); return; }
      f = 1 / denom;
      formula = '1/f = 1/v - 1/u';
    } else {
      var denom2 = (1/v) + (1/u);
      if (Math.abs(denom2) < 1e-12) { setMsg('Cannot compute focal length for these values.', true); return; }
      f = 1 / denom2;
      formula = '1/f = 1/v + 1/u';
    }
    var out = 'Optic: ' + (mode === 'lens' ? 'Lens' : 'Mirror') + '\n';
    out += 'Formula: ' + formula + '\n';
    out += 'u = ' + u + ', v = ' + v + '\n\n';
    out += 'Focal Length f = ' + f.toFixed(4) + ' units\n\n';
    if (f > 0) out += 'Nature: Converging (Convex lens / Concave mirror)';
    else out += 'Nature: Diverging (Concave lens / Convex mirror)';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Focal length calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { uEl.value=''; vEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
