(function() {
  'use strict';
  var slug = 'triangle-area-calculator';
  var modeEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var cEl = document.getElementById(slug + '-c');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var mode = modeEl.value;
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value), c = parseFloat(cEl.value);
    var out = '';
    if (mode === 'base') {
      if (isNaN(a) || isNaN(b)) { setMsg('Please enter base and height.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      if (a <= 0 || b <= 0) { setMsg('Base and height must be positive.', true); return; }
      var area = 0.5 * a * b;
      out = 'Method: Base and Height\nFormula: Area = (1/2) x base x height\n';
      out += 'Base = ' + a + ', Height = ' + b + '\n';
      out += 'Area = ' + area.toFixed(4) + ' square units';
    } else {
      if (isNaN(a) || isNaN(b) || isNaN(c)) { setMsg('Please enter all three sides.', true); outputEl.value=''; copyBtn.disabled=true; return; }
      if (a <= 0 || b <= 0 || c <= 0) { setMsg('All sides must be positive.', true); return; }
      if (a + b <= c || a + c <= b || b + c <= a) { setMsg('These sides do not form a valid triangle.', true); return; }
      var s = (a + b + c) / 2;
      var areaH = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      out = 'Method: Heron\'s Formula\nFormula: Area = sqrt(s(s-a)(s-b)(s-c))\n';
      out += 'Sides: ' + a + ', ' + b + ', ' + c + '\n';
      out += 'Semi-perimeter s = ' + s.toFixed(4) + '\n';
      out += 'Area = ' + areaH.toFixed(4) + ' square units';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Area calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    aEl.value=''; bEl.value=''; cEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter triangle values above.');
  });
})();
