(function() {
  'use strict';
  var slug = 'simple-interest-calculator';
  var pEl = document.getElementById(slug + '-input');
  var rEl = document.getElementById(slug + '-r');
  var tEl = document.getElementById(slug + '-t');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var p = parseFloat(pEl.value), r = parseFloat(rEl.value), t = parseFloat(tEl.value);
    if (isNaN(p) || isNaN(r) || isNaN(t)) { setMsg('Please enter P, R, and T.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (p <= 0 || r < 0 || t < 0) { setMsg('Principal must be positive; rate and time must be non-negative.', true); return; }
    var si = (p * r * t) / 100;
    var amount = p + si;
    var out = 'Formula: SI = (P x R x T) / 100\n';
    out += 'P = ' + p + ', R = ' + r + '%, T = ' + t + ' years\n';
    out += 'Simple Interest: ' + si.toFixed(2) + '\n';
    out += 'Total Amount: ' + amount.toFixed(2);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Simple interest calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    pEl.value = ''; rEl.value = ''; tEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter P, R, and T above.');
  });
})();
