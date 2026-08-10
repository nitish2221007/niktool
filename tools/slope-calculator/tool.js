(function() {
  'use strict';
  var slug = 'slope-calculator';
  var p1El = document.getElementById(slug + '-input');
  var p2El = document.getElementById(slug + '-p2');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
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
    var out = 'Point 1: (' + p1[0] + ', ' + p1[1] + ')\nPoint 2: (' + p2[0] + ', ' + p2[1] + ')\n\n';
    out += 'Formula: slope = (y2 - y1) / (x2 - x1)\n';
    if (dx === 0) {
      out += 'Slope: Undefined (vertical line)\n';
      out += 'The line is vertical because x2 - x1 = 0.\n';
      out += 'Equation: x = ' + p1[0];
    } else {
      var slope = dy / dx;
      out += 'Slope = (' + dy + ') / (' + dx + ') = ' + slope.toFixed(4) + '\n\n';
      if (dy === 0) out += 'Type: Horizontal line (slope = 0)\n';
      else if (slope > 0) out += 'Type: Positive slope (line goes up)\n';
      else out += 'Type: Negative slope (line goes down)\n';
      var b = p1[1] - slope * p1[0];
      out += 'Y-intercept: ' + b.toFixed(4) + '\n';
      out += 'Equation: y = ' + slope.toFixed(4) + 'x' + (b >= 0 ? ' + ' : ' - ') + Math.abs(b).toFixed(4);
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Slope calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { p1El.value=''; p2El.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
