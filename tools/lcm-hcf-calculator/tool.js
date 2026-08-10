(function() {
  'use strict';
  var slug = 'lcm-hcf-calculator';
  var aEl = document.getElementById(slug + '-input');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function gcd(a, b) { while(b){ var t=b; b=a%b; a=t; } return a; }
  function primeFactors(n) {
    var factors = [];
    for (var i = 2; i <= n; i++) {
      while (n % i === 0) { factors.push(i); n = n / i; }
    }
    return factors;
  }
  btn.addEventListener('click', function() {
    var a = parseInt(aEl.value, 10), b = parseInt(bEl.value, 10);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both numbers.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 1 || b < 1) { setMsg('Both numbers must be positive integers.', true); return; }
    var hcf = gcd(a, b);
    var lcm = (a / hcf) * b;
    var out = 'Numbers: ' + a + ' and ' + b + '\n\n';
    out += 'HCF (GCD): ' + hcf + '\n';
    out += 'LCM: ' + lcm + '\n\n';
    out += 'Prime Factorization:\n';
    out += a + ' = ' + primeFactors(a).join(' x ') + '\n';
    out += b + ' = ' + primeFactors(b).join(' x ') + '\n\n';
    out += 'Verification:\n';
    out += 'HCF x LCM = ' + hcf + ' x ' + lcm + ' = ' + (hcf * lcm) + '\n';
    out += 'a x b = ' + a + ' x ' + b + ' = ' + (a * b) + '\n';
    out += 'HCF x LCM = a x b: ' + (hcf * lcm === a * b ? 'TRUE' : 'FALSE');
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('HCF and LCM calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
