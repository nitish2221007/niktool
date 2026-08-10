(function() {
  'use strict';
  var slug = 'compound-interest-calculator';
  var pEl = document.getElementById(slug + '-input');
  var rEl = document.getElementById(slug + '-r');
  var tEl = document.getElementById(slug + '-t');
  var nEl = document.getElementById(slug + '-n');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var p = parseFloat(pEl.value), r = parseFloat(rEl.value), t = parseFloat(tEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(p) || isNaN(r) || isNaN(t)) { setMsg('Please enter P, R, and T.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (p <= 0 || r < 0 || t < 0) { setMsg('Principal must be positive; rate and time must be non-negative.', true); return; }
    var rate = r / 100;
    var amount = p * Math.pow(1 + rate / n, n * t);
    var ci = amount - p;
    var freqName = n === 1 ? 'Yearly' : (n === 2 ? 'Half-yearly' : 'Quarterly');
    var out = 'Formula: A = P(1 + r/n)^(nt)\n';
    out += 'P = ' + p + ', R = ' + r + '%, T = ' + t + ', n = ' + n + ' (' + freqName + ')\n';
    out += 'Amount: ' + amount.toFixed(2) + '\n';
    out += 'Compound Interest: ' + ci.toFixed(2);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Compound interest calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    pEl.value = ''; rEl.value = ''; tEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter P, R, T and choose compounding.');
  });
})();
