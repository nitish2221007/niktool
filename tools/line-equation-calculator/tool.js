(function() {
  'use strict';
  var slug = 'line-equation-calculator';
  var modeEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
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
    var mode = modeEl.value;
    var out = '';
    if (mode === 'two-points') {
      var p1 = parsePoint(aEl.value), p2 = parsePoint(bEl.value);
      if (!p1 || !p2) { setMsg('Enter two valid points.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      var dx = p2[0]-p1[0], dy = p2[1]-p1[1];
      out += 'Mode: Two Points\nP1: (' + p1[0] + ', ' + p1[1] + '), P2: (' + p2[0] + ', ' + p2[1] + ')\n\n';
      if (dx === 0) { out += 'Vertical line: x = ' + p1[0]; }
      else {
        var m = dy/dx, b = p1[1] - m*p1[0];
        out += 'Slope = ' + m.toFixed(4) + '\nY-intercept = ' + b.toFixed(4) + '\n';
        out += 'Equation: y = ' + m.toFixed(4) + 'x' + (b >= 0 ? ' + ' : ' - ') + Math.abs(b).toFixed(4);
      }
    } else {
      var slope = parseFloat(aEl.value), pt = parsePoint(bEl.value);
      if (isNaN(slope)) { setMsg('Enter a valid slope number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      if (!pt) { setMsg('Enter a valid point as x, y.', true); return; }
      var b2 = pt[1] - slope * pt[0];
      out += 'Mode: Slope and Point\nSlope = ' + slope + ', Point: (' + pt[0] + ', ' + pt[1] + ')\n\n';
      out += 'Point-slope form: y - ' + pt[1] + ' = ' + slope + '(x - ' + pt[0] + ')\n';
      out += 'Slope-intercept form: y = ' + slope.toFixed(4) + 'x' + (b2 >= 0 ? ' + ' : ' - ') + Math.abs(b2).toFixed(4);
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Line equation calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
