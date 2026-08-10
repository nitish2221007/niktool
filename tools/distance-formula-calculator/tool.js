(function() {
  'use strict';
  var slug = 'distance-formula-calculator';
  var p1El = document.getElementById(slug + '-input');
  var p2El = document.getElementById(slug + '-p2');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }
  function parsePoint(str) {
    var parts = str.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number);
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
    return parts;
  }

  btn.addEventListener('click', function() {
    var p1 = parsePoint(p1El.value), p2 = parsePoint(p2El.value);
    if (!p1) { setMsg('Point 1 must be two numbers: x1, y1.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (!p2) { setMsg('Point 2 must be two numbers: x2, y2.', true); return; }
    var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    var dist = Math.sqrt(dx*dx + dy*dy);
    var out = 'Formula: sqrt((x2-x1)^2 + (y2-y1)^2)\n';
    out += 'Point 1: (' + p1[0] + ', ' + p1[1] + ')\n';
    out += 'Point 2: (' + p2[0] + ', ' + p2[1] + ')\n';
    out += 'Substitution: sqrt((' + dx + ')^2 + (' + dy + ')^2)\n';
    out += 'Distance: ' + dist.toFixed(4);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Distance calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    p1El.value = ''; p2El.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter two points above.');
  });
})();
