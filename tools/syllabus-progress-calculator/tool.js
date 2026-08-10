(function() {
  'use strict';
  var slug = 'syllabus-progress-calculator';
  var totalEl = document.getElementById(slug + '-input');
  var doneEl = document.getElementById(slug + '-done');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var total = parseInt(totalEl.value, 10), done = parseInt(doneEl.value, 10);
    if (isNaN(total) || isNaN(done)) { setMsg('Please enter both total and completed chapters.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (total <= 0) { setMsg('Total chapters must be greater than zero.', true); return; }
    if (done < 0 || done > total) { setMsg('Completed chapters must be between 0 and total.', true); return; }
    var pct = (done / total) * 100;
    var rem = total - done;
    var out = 'Total Chapters: ' + total + '\n';
    out += 'Completed: ' + done + '\n';
    out += 'Remaining: ' + rem + '\n\n';
    out += 'Progress: ' + pct.toFixed(1) + '%\n\n';
    if (pct === 100) out += 'Status: Syllabus fully completed! Now focus on revision and mock tests.';
    else if (pct >= 75) out += 'Status: Excellent progress. Start integrating full-length mock tests.';
    else if (pct >= 50) out += 'Status: Halfway there. Maintain consistency to finish on time.';
    else out += 'Status: Needs focus. Prioritize high-weightage chapters first.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Progress calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { totalEl.value=''; doneEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
