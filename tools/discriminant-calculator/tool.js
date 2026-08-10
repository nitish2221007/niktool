(function() {
  'use strict';
  var slug = 'discriminant-calculator';
  var aEl = document.getElementById(slug + '-input');
  var bEl = document.getElementById(slug + '-b');
  var cEl = document.getElementById(slug + '-c');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value), c = parseFloat(cEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(c)) { setMsg('Please enter a, b, and c.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a === 0) { setMsg('Coefficient a cannot be 0 for a quadratic.', true); return; }
    var D = b*b - 4*a*c;
    var nature;
    if (D > 0) nature = 'Two distinct real roots';
    else if (D === 0) nature = 'Two equal real roots';
    else nature = 'No real roots (two complex roots)';
    var out = 'Equation: ' + a + 'x^2 + ' + b + 'x + ' + c + ' = 0\n';
    out += 'Formula: D = b^2 - 4ac\n';
    out += 'D = (' + b + ')^2 - 4(' + a + ')(' + c + ')\n';
    out += 'D = ' + D + '\n\n';
    out += 'Nature of Roots: ' + nature;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Discriminant calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    aEl.value=''; bEl.value=''; cEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter coefficients above.');
  });
})();
