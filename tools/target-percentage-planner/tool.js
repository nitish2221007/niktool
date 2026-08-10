(function() {
  'use strict';
  var slug = 'target-percentage-planner';
  var targetEl = document.getElementById(slug + '-input');
  var subsEl = document.getElementById(slug + '-subjects');
  var maxEl = document.getElementById(slug + '-max');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var target = parseFloat(targetEl.value), subs = parseInt(subsEl.value, 10), max = parseInt(maxEl.value, 10);
    if (isNaN(target) || isNaN(subs) || isNaN(max)) { setMsg('Please enter all target values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (target < 0 || target > 100 || subs <= 0 || max <= 0) { setMsg('Target must be 0-100; subjects and max marks must be > 0.', true); return; }
    var totalMax = subs * max;
    var reqTotal = (target / 100) * totalMax;
    var avgPerSub = reqTotal / subs;
    var out = 'Target: ' + target + '%\n';
    out += 'Subjects: ' + subs + ' (Max ' + max + ' each)\n';
    out += 'Total Max Marks: ' + totalMax + '\n\n';
    out += 'Total Marks Required: ' + reqTotal.toFixed(0) + '\n';
    out += 'Average Needed Per Subject: ' + avgPerSub.toFixed(1) + '\n\n';
    if (avgPerSub > max) out += 'Warning: Your target requires more than 100% in some subjects. Please adjust.';
    else out += 'Strategy: Aim for ' + Math.ceil(avgPerSub) + ' in each subject to safely cross your target.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Target planned.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { targetEl.value=''; subsEl.value=''; maxEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
