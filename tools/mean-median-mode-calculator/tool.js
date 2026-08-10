(function() {
  'use strict';
  var slug = 'mean-median-mode-calculator';
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
    var sorted = nums.slice().sort(function(a,b){return a-b;});
    var n = nums.length;
    var sum = nums.reduce(function(a,b){return a+b;},0);
    var mean = sum / n;
    var median;
    if (n % 2 === 1) { median = sorted[(n-1)/2]; }
    else { median = (sorted[n/2 - 1] + sorted[n/2]) / 2; }
    var freq = {};
    nums.forEach(function(v){ freq[v] = (freq[v]||0)+1; });
    var maxFreq = 0;
    Object.keys(freq).forEach(function(k){ if (freq[k] > maxFreq) maxFreq = freq[k]; });
    var modes = Object.keys(freq).filter(function(k){ return freq[k] === maxFreq; }).map(Number);
    var modeText = (maxFreq === 1) ? 'No mode' : modes.join(', ');
    var range = sorted[n-1] - sorted[0];
    var out = 'Count: ' + n + '\n';
    out += 'Mean: ' + mean.toFixed(2) + '\n';
    out += 'Median: ' + median + '\n';
    out += 'Mode: ' + modeText + '\n';
    out += 'Range: ' + range + '\n';
    out += 'Sorted: ' + sorted.join(', ');
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Statistics calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter your data above.');
  });
})();
