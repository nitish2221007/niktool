(function() {
  'use strict';
  var slug = 'section-formula-calculator';
  var p1El = document.getElementById(slug + '-input');
  var p2El = document.getElementById(slug + '-p2');
  var ratioEl = document.getElementById(slug + '-ratio');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }
  function parsePair(str) {
    var parts = str.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number);
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
    return parts;
  }
  function fmt(x) { return Number.isInteger(x) ? String(x) : x.toFixed(4); }

  btn.addEventListener('click', function() {
    var p1 = parsePair(p1El.value), p2 = parsePair(p2El.value), ratio = parsePair(ratioEl.value);
    if (!p1) { setMsg('Point A must be two numbers: x1, y1.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (!p2) { setMsg('Point B must be two numbers: x2, y2.', true); return; }
    if (!ratio) { setMsg('Ratio must be two numbers: m, n.', true); return; }
    var m = ratio[0], n = ratio[1];
    if (m <= 0 || n <= 0) { setMsg('Both m and n must be positive.', true); return; }
    var px = (m * p2[0] + n * p1[0]) / (m + n);
    var py = (m * p2[1] + n * p1[1]) / (m + n);
    var out = 'Formula: ((mx2 + nx1)/(m+n), (my2 + ny1)/(m+n))\n';
    out += 'A: (' + p1[0] + ', ' + p1[1] + '), B: (' + p2[0] + ', ' + p2[1] + ')\n';
    out += 'Ratio m:n = ' + m + ':' + n + '\n';
    out += 'Point P: (' + fmt(px) + ', ' + fmt(py) + ')';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Section point calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    p1El.value = ''; p2El.value = ''; ratioEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter points and ratio above.');
  });
})();
