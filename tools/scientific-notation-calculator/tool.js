(function() {
  'use strict';
  var slug = 'scientific-notation-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var raw = inputEl.value.trim();
    if (!raw) { setMsg('Please enter a number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var num = parseFloat(raw);
    if (isNaN(num)) { setMsg('Please enter a valid number.', true); return; }
    var sci = num.toExponential();
    var parts = sci.split('e');
    var coeff = parseFloat(parts[0]);
    var exp = parseInt(parts[1], 10);
    var out = 'Original: ' + raw + '\n';
    out += 'Scientific Notation: ' + coeff + ' x 10^' + exp + '\n';
    out += 'E-notation: ' + coeff + 'e' + exp + '\n';
    out += 'Decimal: ' + num.toLocaleString();
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Converted to scientific notation.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter a number above.');
  });
})();
