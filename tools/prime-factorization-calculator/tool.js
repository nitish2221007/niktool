(function() {
  'use strict';
  var slug = 'prime-factorization-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var n = parseInt(inputEl.value, 10);
    if (isNaN(n)) { setMsg('Please enter a valid integer.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (n < 2) { setMsg('Please enter an integer greater than 1.', true); return; }
    var original = n, factors = [], steps = [];
    var d = 2;
    while (d * d <= n) {
      while (n % d === 0) { factors.push(d); steps.push(original + ' / ' + d + ' ... '); n = n / d; original = n; }
      d++;
    }
    if (n > 1) factors.push(n);
    var counts = {};
    factors.forEach(function(f){ counts[f] = (counts[f]||0)+1; });
    var expParts = Object.keys(counts).map(function(k){ return counts[k] > 1 ? k + '^' + counts[k] : k; });
    var out = 'Number: ' + inputEl.value + '\n';
    out += 'Prime Factors: ' + factors.join(' x ') + '\n';
    out += 'Exponent Form: ' + expParts.join(' x ') + '\n';
    out += 'Total Prime Factors: ' + factors.length;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Prime factorization complete.');
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
