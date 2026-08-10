(function() {
  'use strict';
  var slug = 'height-and-distance-calculator';
  var findEl = document.getElementById(slug + '-input');
  var angleEl = document.getElementById(slug + '-angle');
  var sideEl = document.getElementById(slug + '-side');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var angle = parseFloat(angleEl.value), side = parseFloat(sideEl.value);
    if (isNaN(angle) || isNaN(side)) { setMsg('Please enter both angle and known side.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (angle <= 0 || angle >= 90) { setMsg('Angle must be between 0 and 90 degrees.', true); return; }
    if (side <= 0) { setMsg('Known side must be positive.', true); return; }
    var rad = angle * Math.PI / 180;
    var tanVal = Math.tan(rad);
    var out = '';
    if (findEl.value === 'height') {
      var height = side * tanVal;
      out = 'Finding: Height (opposite)\nAngle = ' + angle + '°\nAdjacent (distance) = ' + side + ' m\n\nFormula: tan(θ) = height / distance\n';
      out += 'height = ' + side + ' x tan(' + angle + '°)\n';
      out += 'height = ' + height.toFixed(4) + ' m';
    } else {
      var dist = side / tanVal;
      out = 'Finding: Distance (adjacent)\nAngle = ' + angle + '°\nOpposite (height) = ' + side + ' m\n\nFormula: tan(θ) = height / distance\n';
      out += 'distance = ' + side + ' / tan(' + angle + '°)\n';
      out += 'distance = ' + dist.toFixed(4) + ' m';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Calculation complete.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    angleEl.value=''; sideEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter angle and side above.');
  });
})();
