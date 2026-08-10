(function() {
  'use strict';
  var slug = 'arithmetic-progression-calculator';
  var aEl = document.getElementById(slug + '-input');
  var dEl = document.getElementById(slug + '-d');
  var nEl = document.getElementById(slug + '-n');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }
  function fmt(x) { return Number.isInteger(x) ? String(x) : x.toFixed(4); }

  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), d = parseFloat(dEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(a) || isNaN(d)) { setMsg('Please enter valid values for a and d.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (isNaN(n) || n < 1) { setMsg('Number of terms n must be a positive integer.', true); return; }
    var nth = a + (n - 1) * d;
    var sum = (n / 2) * (2 * a + (n - 1) * d);
    var terms = [];
    for (var i = 0; i < Math.min(n, 6); i++) { terms.push(fmt(a + i * d)); }
    var out = 'a = ' + fmt(a) + ', d = ' + fmt(d) + ', n = ' + n + '\n';
    out += 'nth term: a + (n-1)d = ' + fmt(nth) + '\n';
    out += 'Sum of n terms: ' + fmt(sum) + '\n';
    out += 'First terms: ' + terms.join(', ') + (n > 6 ? ', ...' : '');
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('AP calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    aEl.value = ''; dEl.value = ''; nEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter a, d, and n above.');
  });
})();
