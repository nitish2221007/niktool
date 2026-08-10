(function() {
  'use strict';
  var slug = 'significant-figures-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var nEl = document.getElementById(slug + '-n');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function countSigFigs(str) {
    str = str.trim();
    if (!str) return 0;
    var cleaned = str.replace(/^[-+]/, '');
    var hasDecimal = cleaned.indexOf('.') !== -1;
    cleaned = cleaned.replace('.', '');
    cleaned = cleaned.replace(/^0+/, '');
    if (!cleaned) return 0;
    if (hasDecimal) {
      return cleaned.length;
    } else {
      return cleaned.replace(/0+$/, '').length;
    }
  }
  btn.addEventListener('click', function() {
    var raw = inputEl.value.trim();
    if (!raw) { setMsg('Please enter a number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var num = parseFloat(raw);
    if (isNaN(num)) { setMsg('Please enter a valid number.', true); return; }
    var sigFigs = countSigFigs(raw);
    var out = 'Number: ' + raw + '\n';
    out += 'Significant Figures: ' + sigFigs + '\n';
    var n = parseInt(nEl.value, 10);
    if (!isNaN(n) && n > 0) {
      var rounded = Number(num.toPrecision(n));
      out += 'Rounded to ' + n + ' sig figs: ' + rounded;
    }
    out += '\n\nRules:\n';
    out += '- All non-zero digits are significant.\n';
    out += '- Zeros between non-zero digits are significant.\n';
    out += '- Leading zeros are not significant.\n';
    out += '- Trailing zeros are significant only with a decimal point.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Significant figures counted.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; nEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter a number above.');
  });
})();
