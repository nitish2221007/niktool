(function() {
  'use strict';
  var slug = 'power-of-lens-calculator';
  var fEl = document.getElementById(slug + '-input');
  var unitEl = document.getElementById(slug + '-unit');
  var typeEl = document.getElementById(slug + '-type');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var f = parseFloat(fEl.value);
    if (isNaN(f)) { setMsg('Please enter a valid focal length.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (f <= 0) { setMsg('Focal length must be positive; the sign is set by lens type.', true); return; }
    var fMetres = unitEl.value === 'cm' ? f / 100 : f;
    var sign = typeEl.value === 'convex' ? 1 : -1;
    var signedF = sign * fMetres;
    var power = 1 / signedF;
    var out = 'Formula: P = 1 / f (f in metres)\n';
    out += 'Focal Length: ' + f + ' ' + (unitEl.value === 'cm' ? 'cm' : 'm') + ' = ' + fMetres.toFixed(4) + ' m\n';
    out += 'Lens Type: ' + typeEl.options[typeEl.selectedIndex].text + '\n';
    out += 'Signed f: ' + signedF.toFixed(4) + ' m\n';
    out += 'Power: ' + power.toFixed(4) + ' D (diopters)\n\n';
    out += 'Note: Convex lenses have positive power, concave lenses have negative power.';
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
    fEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter focal length above.');
  });
})();
