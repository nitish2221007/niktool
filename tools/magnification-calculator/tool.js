(function() {
  'use strict';
  var slug = 'magnification-calculator';
  var modeEl = document.getElementById(slug + '-mode');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function updateLabels() {
    var m = modeEl.value;
    if (m === 'm-h') { aEl.placeholder = 'Image height (hi)'; bEl.placeholder = 'Object height (ho)'; }
    else if (m === 'm-d') { aEl.placeholder = 'Image dist (v)'; bEl.placeholder = 'Object dist (u)'; }
    else if (m === 'hi') { aEl.placeholder = 'Magnification (m)'; bEl.placeholder = 'Object height (ho)'; }
    else { aEl.placeholder = 'Magnification (m)'; bEl.placeholder = 'Image height (hi)'; }
  }
  modeEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var mode = modeEl.value;
    var out = '', m, result;
    if (mode === 'm-h') {
      if (b === 0) { setMsg('Object height cannot be zero.', true); return; }
      m = a / b;
      out = 'Formula: m = hi / ho\nhi = ' + a + ', ho = ' + b + '\nMagnification m = ' + m.toFixed(4);
    } else if (mode === 'm-d') {
      if (b === 0) { setMsg('Object distance cannot be zero.', true); return; }
      m = a / b; 
      out = 'Formula: m = v / u (Lens) or -v / u (Mirror)\nv = ' + a + ', u = ' + b + '\nRatio v/u = ' + m.toFixed(4);
    } else if (mode === 'hi') {
      result = a * b;
      out = 'Formula: hi = m x ho\nm = ' + a + ', ho = ' + b + '\nImage Height hi = ' + result.toFixed(4);
    } else {
      if (a === 0) { setMsg('Magnification cannot be zero.', true); return; }
      result = b / a;
      out = 'Formula: ho = hi / m\nhi = ' + b + ', m = ' + a + '\nObject Height ho = ' + result.toFixed(4);
    }
    out += '\n\nNote: If m is negative, the image is real and inverted. If m is positive, the image is virtual and erect. If |m| > 1, it is magnified; if |m| < 1, it is diminished.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Magnification calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
