(function() {
  'use strict';
  var slug = 'study-time-calculator';
  var awakeEl = document.getElementById(slug + '-input');
  var schoolEl = document.getElementById(slug + '-school');
  var breakEl = document.getElementById(slug + '-break');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var awake = parseFloat(awakeEl.value), school = parseFloat(schoolEl.value), brk = parseFloat(breakEl.value);
    if (isNaN(awake) || isNaN(school) || isNaN(brk)) { setMsg('Please enter all time values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (awake <= 0 || school < 0 || brk < 0) { setMsg('Awake time must be positive; others cannot be negative.', true); return; }
    var available = awake - school - brk;
    var out = 'Hours Awake: ' + awake + ' hrs\n';
    out += 'School/Coaching: ' + school + ' hrs\n';
    out += 'Breaks/Chores: ' + brk + ' hrs\n\n';
    if (available <= 0) {
      out += 'Available Study Time: 0 hrs\n\nNote: Your schedule is completely full. Consider adjusting sleep or breaks.';
    } else {
      out += 'Available Study Time: ' + available.toFixed(1) + ' hrs\n\nTip: Aim for focused blocks of 45-50 minutes with short breaks.';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Study time calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { awakeEl.value=''; schoolEl.value=''; breakEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
