(function() {
  'use strict';
  var slug = 'ratio-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }
  function gcd(a, b) { while (b) { var t = b; b = a % b; a = t; } return a; }

  btn.addEventListener('click', function() {
    var nums = inputEl.value.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number).filter(function(n){return !isNaN(n);});
    if (nums.length < 2) { setMsg('Please enter at least two values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (nums.some(function(n){ return n <= 0 || !Number.isInteger(n); })) {
      setMsg('All values must be positive integers.', true); return;
    }
    var g = nums[0];
    for (var i = 1; i < nums.length; i++) { g = gcd(g, nums[i]); }
    var simplified = nums.map(function(n){ return n / g; });
    var out = 'Original: ' + nums.join(' : ') + '\n';
    out += 'Simplified: ' + simplified.join(' : ') + '\n';
    out += 'Divided by HCF: ' + g + '\n';
    out += 'Equivalent (x2): ' + simplified.map(function(n){return n*2;}).join(' : ');
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Ratio simplified successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter ratio values above.');
  });
})();
