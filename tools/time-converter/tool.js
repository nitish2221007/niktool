(function() {
  'use strict';
  var slug = 'time-converter';
  var valueEl = document.getElementById(slug + '-input');
  var fromEl = document.getElementById(slug + '-from');
  var toEl = document.getElementById(slug + '-to');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  var toSeconds = { seconds: 1, minutes: 60, hours: 3600, days: 86400 };

  btn.addEventListener('click', function() {
    var val = parseFloat(valueEl.value);
    if (isNaN(val)) { setMsg('Please enter a valid number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (val < 0) { setMsg('Time cannot be negative.', true); return; }
    var from = fromEl.value;
    var to = toEl.value;
    var seconds = val * toSeconds[from];
    var result = seconds / toSeconds[to];
    var out = val + ' ' + from + ' = ' + result.toFixed(4) + ' ' + to + '\n\n';
    out += 'All conversions:\n';
    out += 'Seconds: ' + (seconds / toSeconds.seconds).toFixed(2) + '\n';
    out += 'Minutes: ' + (seconds / toSeconds.minutes).toFixed(4) + '\n';
    out += 'Hours: ' + (seconds / toSeconds.hours).toFixed(4) + '\n';
    out += 'Days: ' + (seconds / toSeconds.days).toFixed(6);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Time converted.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied.');
  });
  clearBtn.addEventListener('click', function() {
    valueEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared.');
  });
})();
