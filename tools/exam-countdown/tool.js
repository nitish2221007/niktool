(function() {
  'use strict';
  var slug = 'exam-countdown';
  var dateEl = document.getElementById(slug + '-input');
  var timeEl = document.getElementById(slug + '-time');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    if (!dateEl.value) { setMsg('Please select an exam date.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var examStr = dateEl.value + 'T' + (timeEl.value || '09:00') + ':00';
    var examDate = new Date(examStr);
    var now = new Date();
    var diff = examDate - now;
    if (diff <= 0) { outputEl.value = 'The exam date has already passed!'; copyBtn.disabled = false; setMsg('Countdown finished.'); return; }
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var out = 'Exam Date: ' + examDate.toLocaleString() + '\n\n';
    out += 'Days Remaining: ' + days + '\n';
    out += 'Hours Remaining: ' + hours + '\n';
    out += 'Minutes Remaining: ' + mins + '\n\n';
    out += 'Total Hours Left: ' + Math.floor(diff / (1000 * 60 * 60));
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Countdown calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { dateEl.value=''; timeEl.value='09:00'; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
