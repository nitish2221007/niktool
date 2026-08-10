(function() {
  'use strict';
  var slug = 'chapter-progress-tracker';
  var totalEl = document.getElementById(slug + '-input');
  var doneEl = document.getElementById(slug + '-done');
  var pracEl = document.getElementById(slug + '-prac');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var total = parseInt(totalEl.value, 10), done = parseInt(doneEl.value, 10), prac = parseInt(pracEl.value, 10);
    if (isNaN(total) || isNaN(done) || isNaN(prac)) { setMsg('Please enter all chapter counts.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (total <= 0 || done < 0 || prac < 0) { setMsg('Total must be > 0; others cannot be negative.', true); return; }
    if (done > total || prac > total) { setMsg('Completed/Practiced cannot exceed total.', true); return; }
    var untouched = total - done;
    var out = 'Subject Chapter Tracker\n' + '='.repeat(24) + '\n';
    out += 'Total Chapters: ' + total + '\n';
    out += 'Fully Revised: ' + done + '\n';
    out += 'PYQs Practiced: ' + prac + '\n';
    out += 'Untouched: ' + untouched + '\n\n';
    out += 'Revision Completion: ' + ((done/total)*100).toFixed(0) + '%\n';
    out += 'Practice Completion: ' + ((prac/total)*100).toFixed(0) + '%';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Tracker updated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { totalEl.value=''; doneEl.value=''; pracEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
