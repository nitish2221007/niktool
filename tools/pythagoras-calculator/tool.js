(function() {
  'use strict';
  var slug = 'pythagoras-calculator';
  var findEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both known sides.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a <= 0 || b <= 0) { setMsg('Sides must be positive.', true); return; }
    var out = '';
    if (findEl.value === 'hypotenuse') {
      var c = Math.sqrt(a*a + b*b);
      out = 'Formula: c = sqrt(a² + b²)\n';
      out += 'a = ' + a + ', b = ' + b + '\n';
      out += 'Hypotenuse c = ' + c.toFixed(4);
    } else {
      if (b <= a) { setMsg('When finding a side, Side B must be the hypotenuse (larger than Side A).', true); return; }
      var side = Math.sqrt(b*b - a*a);
      out = 'Formula: a = sqrt(c² - b²)\n';
      out += 'Known side = ' + a + ', Hypotenuse = ' + b + '\n';
      out += 'Missing side = ' + side.toFixed(4);
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Pythagoras calculation complete.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter sides above.');
  });
})();
