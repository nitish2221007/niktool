(function() {
  'use strict';
  var slug = 'si-vs-ci-calculator';
  var pEl = document.getElementById(slug + '-input');
  var rEl = document.getElementById(slug + '-r');
  var tEl = document.getElementById(slug + '-t');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var p = parseFloat(pEl.value), r = parseFloat(rEl.value), t = parseFloat(tEl.value);
    if (isNaN(p) || isNaN(r) || isNaN(t)) { setMsg('Please enter P, R, and T.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (p <= 0 || r < 0 || t < 0) { setMsg('Principal must be positive; rate and time non-negative.', true); return; }
    var si = p * r * t / 100;
    var amountCI = p * Math.pow(1 + r/100, t);
    var ci = amountCI - p;
    var diff = ci - si;
    var out = 'P = ' + p + ', R = ' + r + '%, T = ' + t + ' years (CI compounded yearly)\n\n';
    out += 'Simple Interest: ' + si.toFixed(2) + '\n';
    out += 'SI Amount: ' + (p + si).toFixed(2) + '\n\n';
    out += 'Compound Interest: ' + ci.toFixed(2) + '\n';
    out += 'CI Amount: ' + amountCI.toFixed(2) + '\n\n';
    out += 'Difference (CI - SI): ' + diff.toFixed(2);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Comparison calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    pEl.value=''; rEl.value=''; tEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter P, R, and T above.');
  });
})();
