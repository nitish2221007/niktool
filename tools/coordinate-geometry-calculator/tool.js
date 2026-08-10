(function() {
  'use strict';
  var slug = 'coordinate-geometry-calculator';
  var typeEl = document.getElementById(slug + '-input');
  var p1El = document.getElementById(slug + '-p1');
  var p2El = document.getElementById(slug + '-p2');
  var ratioEl = document.getElementById(slug + '-ratio');
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
  function fmt(x) { return Number.isInteger(x) ? String(x) : x.toFixed(4); }
  btn.addEventListener('click', function() {
    var p1 = parsePoint(p1El.value), p2 = parsePoint(p2El.value);
    if (!p1) { setMsg('Point 1 must be two numbers: x1, y1.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (!p2) { setMsg('Point 2 must be two numbers: x2, y2.', true); return; }
    var type = typeEl.value;
    var out = '';
    if (type === 'distance') {
      var dx = p2[0]-p1[0], dy = p2[1]-p1[1];
      var dist = Math.sqrt(dx*dx + dy*dy);
      out = 'Distance Formula: sqrt((x2-x1)^2 + (y2-y1)^2)\n';
      out += 'P1: (' + p1[0] + ', ' + p1[1] + '), P2: (' + p2[0] + ', ' + p2[1] + ')\n';
      out += 'Distance = ' + dist.toFixed(4);
    } else if (type === 'midpoint') {
      var mx = (p1[0]+p2[0])/2, my = (p1[1]+p2[1])/2;
      out = 'Midpoint Formula: ((x1+x2)/2, (y1+y2)/2)\n';
      out += 'P1: (' + p1[0] + ', ' + p1[1] + '), P2: (' + p2[0] + ', ' + p2[1] + ')\n';
      out += 'Midpoint = (' + fmt(mx) + ', ' + fmt(my) + ')';
    } else {
      var ratio = parsePoint(ratioEl.value);
      if (!ratio) { setMsg('Ratio must be two numbers: m, n.', true); return; }
      var m = ratio[0], n = ratio[1];
      if (m <= 0 || n <= 0) { setMsg('Both m and n must be positive.', true); return; }
      var sx = (m*p2[0] + n*p1[0]) / (m+n);
      var sy = (m*p2[1] + n*p1[1]) / (m+n);
      out = 'Section Formula: ((mx2+nx1)/(m+n), (my2+ny1)/(m+n))\n';
      out += 'P1: (' + p1[0] + ', ' + p1[1] + '), P2: (' + p2[0] + ', ' + p2[1] + ')\n';
      out += 'Ratio m:n = ' + m + ':' + n + '\n';
      out += 'Point = (' + fmt(sx) + ', ' + fmt(sy) + ')';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Coordinate geometry calculation complete.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    p1El.value=''; p2El.value=''; ratioEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter points above.');
  });
})();
