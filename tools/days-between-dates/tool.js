(function() {
  'use strict';
  var slug = 'days-between-dates';
  var startEl = document.getElementById(slug + '-input');
  var endEl = document.getElementById(slug + '-end');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    if (!startEl.value || !endEl.value) { setMsg('Please select both start and end dates.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var d1 = new Date(startEl.value), d2 = new Date(endEl.value);
    var diffTime = Math.abs(d2 - d1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var weeks = Math.floor(diffDays / 7);
    var remDays = diffDays % 7;
    var out = 'Start: ' + d1.toDateString() + '\nEnd: ' + d2.toDateString() + '\n\n';
    out += 'Total Days: ' + diffDays + '\n';
    out += 'Weeks: ' + weeks + ' weeks and ' + remDays + ' days\n';
    out += 'Total Hours: ' + (diffDays * 24);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Date difference calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { startEl.value=''; endEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
