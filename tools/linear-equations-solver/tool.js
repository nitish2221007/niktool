(function() {
  'use strict';
  var slug = 'linear-equations-solver';
  var eq1El = document.getElementById(slug + '-input');
  var eq2El = document.getElementById(slug + '-eq2');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function parseTriple(str) {
    var parts = str.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return parts;
  }
  btn.addEventListener('click', function() {
    var e1 = parseTriple(eq1El.value), e2 = parseTriple(eq2El.value);
    if (!e1) { setMsg('Equation 1 must be three numbers: a1, b1, c1.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (!e2) { setMsg('Equation 2 must be three numbers: a2, b2, c2.', true); return; }
    var a1=e1[0], b1=e1[1], c1=e1[2], a2=e2[0], b2=e2[1], c2=e2[2];
    var det = a1*b2 - a2*b1;
    var out = 'Equation 1: ' + a1 + 'x + ' + b1 + 'y = ' + c1 + '\n';
    out += 'Equation 2: ' + a2 + 'x + ' + b2 + 'y = ' + c2 + '\n\n';
    if (Math.abs(det) > 1e-12) {
      var x = (c1*b2 - c2*b1) / det;
      var y = (a1*c2 - a2*c1) / det;
      out += 'Determinant: ' + det + '\n';
      out += 'Unique Solution\n';
      out += 'x = ' + x.toFixed(4) + '\n';
      out += 'y = ' + y.toFixed(4);
    } else {
      var ratio = (a1*c2 - a2*c1);
      if (Math.abs(ratio) < 1e-12) {
        out += 'Determinant: 0\nInfinite solutions (lines are coincident).';
      } else {
        out += 'Determinant: 0\nNo solution (lines are parallel).';
      }
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Equations solved successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    eq1El.value=''; eq2El.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter both equations above.');
  });
})();
