(function() {
  'use strict';
  var slug = 'polynomial-calculator';
  var coefEl = document.getElementById(slug + '-input');
  var xEl = document.getElementById(slug + '-x');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var coefs = coefEl.value.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number);
    if (!coefs.length || coefs.some(isNaN)) { setMsg('Please enter valid coefficients.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var x = parseFloat(xEl.value);
    if (isNaN(x)) { setMsg('Please enter a valid value for x.', true); return; }
    var degree = coefs.length - 1;
    var terms = coefs.map(function(c, i) {
      var power = degree - i;
      if (c === 0) return null;
      var termStr = (c === 1 && power !== 0 ? '' : (c === -1 && power !== 0 ? '-' : c));
      if (power === 0) return String(c);
      if (power === 1) return termStr + 'x';
      return termStr + 'x^' + power;
    }).filter(Boolean);
    var result = 0;
    for (var i = 0; i < coefs.length; i++) {
      result += coefs[i] * Math.pow(x, degree - i);
    }
    var out = 'Polynomial: ' + (terms.join(' + ').replace(/\+ -/g, '- ') || '0') + '\n';
    out += 'Degree: ' + degree + '\n';
    out += 'Leading Coefficient: ' + coefs[0] + '\n\n';
    out += 'At x = ' + x + ':\n';
    out += 'P(' + x + ') = ' + result.toFixed(4);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Polynomial evaluated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    coefEl.value=''; xEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter coefficients and x above.');
  });
})();
