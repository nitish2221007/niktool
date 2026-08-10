(function() {
  'use strict';
  var slug = 'lcm-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }
  function gcd(a, b) { while (b) { var t = b; b = a % b; a = t; } return a; }
  function lcm(a, b) { return (a / gcd(a, b)) * b; }

  btn.addEventListener('click', function() {
    var nums = inputEl.value.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number).filter(function(n){return !isNaN(n);});
    if (nums.length < 2) { setMsg('Please enter at least two numbers.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (nums.some(function(n){ return !Number.isInteger(n) || n <= 0; })) {
      setMsg('All values must be positive integers.', true); return;
    }
    var result = nums[0];
    for (var i = 1; i < nums.length; i++) { result = lcm(result, nums[i]); }
    var out = 'Numbers: ' + nums.join(', ') + '\n';
    out += 'LCM: ' + result;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('LCM calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter two or more numbers above.');
  });
})();
