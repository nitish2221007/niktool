(function() {
  'use strict';
  var slug = 'reading-time-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var wpmEl = document.getElementById(slug + '-wpm');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function calc() {
    var text = inputEl.value.trim();
    var words = text ? text.split(/\s+/).length : 0;
    var wpm = parseInt(wpmEl.value, 10) || 200;
    if (words === 0) { outputEl.value = 'Word Count: 0\nReading Time: 0 seconds'; return; }
    var mins = words / wpm;
    var m = Math.floor(mins);
    var s = Math.round((mins - m) * 60);
    var out = 'Word Count: ' + words + '\n';
    out += 'Reading Speed: ' + wpm + ' WPM\n\n';
    out += 'Estimated Reading Time:\n';
    out += m + ' minute(s) and ' + s + ' second(s)';
    outputEl.value = out;
  }
  inputEl.addEventListener('input', calc);
  wpmEl.addEventListener('input', calc);
  btn.addEventListener('click', function() {
    calc();
    copyBtn.disabled = !inputEl.value.trim();
    setMsg('Reading time calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); calc(); });
  calc();
})();
