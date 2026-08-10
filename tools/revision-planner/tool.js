(function() {
  'use strict';
  var slug = 'revision-planner';
  var daysEl = document.getElementById(slug + '-input');
  var chapEl = document.getElementById(slug + '-chapters');
  var hoursEl = document.getElementById(slug + '-hours');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var days = parseInt(daysEl.value, 10), chap = parseInt(chapEl.value, 10), hours = parseFloat(hoursEl.value);
    if (isNaN(days) || isNaN(chap) || isNaN(hours)) { setMsg('Please enter all planning values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (days <= 0 || chap <= 0 || hours <= 0) { setMsg('All values must be greater than zero.', true); return; }
    var chapPerDay = Math.ceil(chap / days);
    var hoursPerChap = hours / chapPerDay;
    var totalHours = days * hours;
    var out = 'Days Left: ' + days + '\n';
    out += 'Total Chapters: ' + chap + '\n';
    out += 'Daily Study Hours: ' + hours + '\n\n';
    out += 'Target: ' + chapPerDay + ' chapters per day\n';
    out += 'Time per Chapter: ' + hoursPerChap.toFixed(1) + ' hours\n';
    out += 'Total Study Hours Available: ' + totalHours + '\n\n';
    out += 'Note: Reserve the last 10% of your days purely for mock tests and final formula revision.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Revision plan calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { daysEl.value=''; chapEl.value=''; hoursEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
