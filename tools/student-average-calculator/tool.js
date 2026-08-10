(function() {
  'use strict';
  var slug = 'student-average-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var nums = inputEl.value.split(/[\s,]+/).map(function(s){return s.trim();}).filter(Boolean).map(Number).filter(function(n){return !isNaN(n);});
    if (!nums.length) { setMsg('Please enter at least one valid number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var sum = nums.reduce(function(a,b){return a+b;}, 0);
    var mean = sum / nums.length;
    var max = Math.max.apply(null, nums);
    var min = Math.min.apply(null, nums);
    var out = 'Count: ' + nums.length + '\n';
    out += 'Sum: ' + sum + '\n';
    out += 'Average (Mean): ' + mean.toFixed(2) + '\n';
    out += 'Highest: ' + max + '\n';
    out += 'Lowest: ' + min;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Average calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter your marks above.');
  });
})();
