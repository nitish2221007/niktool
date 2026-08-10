(function() {
  'use strict';
  var slug = 'factor-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var n = parseInt(inputEl.value, 10);
    if (isNaN(n) || n < 1) { setMsg('Please enter a positive integer.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (n > 1000000) { setMsg('Please enter a number up to 1,000,000 for performance.', true); return; }
    var factors = [];
    for (var i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) factors.push(n / i);
      }
    }
    factors.sort(function(a,b){return a-b;});
    var pairs = [];
    for (var j = 0; j < factors.length / 2; j++) {
      pairs.push(factors[j] + ' x ' + factors[factors.length - 1 - j]);
    }
    var isPrime = factors.length === 2;
    var out = 'Number: ' + n + '\n';
    out += 'Total Factors: ' + factors.length + '\n';
    out += 'Factors: ' + factors.join(', ') + '\n\n';
    out += 'Factor Pairs:\n' + pairs.join('\n') + '\n\n';
    out += 'Type: ' + (isPrime ? 'Prime number' : (n === 1 ? 'Neither prime nor composite' : 'Composite number'));
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Factors found.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
