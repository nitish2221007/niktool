(function() {
  'use strict';
  var slug = 'probability-calculator';
  var favEl = document.getElementById(slug + '-input');
  var totalEl = document.getElementById(slug + '-total');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }
  function gcd(a, b) { while (b) { var t = b; b = a % b; a = t; } return a; }

  btn.addEventListener('click', function() {
    var fav = parseInt(favEl.value, 10), total = parseInt(totalEl.value, 10);
    if (isNaN(fav) || isNaN(total)) { setMsg('Please enter both favorable and total outcomes.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (total <= 0) { setMsg('Total outcomes must be greater than zero.', true); return; }
    if (fav < 0 || fav > total) { setMsg('Favorable outcomes must be between 0 and total.', true); return; }
    var p = fav / total;
    var g = fav === 0 ? total : gcd(fav, total);
    var frac = fav === 0 ? '0' : (fav / g) + '/' + (total / g);
    var out = 'Formula: P(E) = Favorable / Total\n';
    out += 'Favorable: ' + fav + ', Total: ' + total + '\n';
    out += 'Probability (fraction): ' + frac + '\n';
    out += 'Probability (decimal): ' + p.toFixed(4) + '\n';
    out += 'Probability (percent): ' + (p * 100).toFixed(2) + '%\n';
    out += 'Complement P(not E): ' + (1 - p).toFixed(4);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Probability calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    favEl.value = ''; totalEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter outcomes above.');
  });
})();
