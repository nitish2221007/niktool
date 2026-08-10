(function() {
  'use strict';
  var slug = 'attendance-calculator';
  var attEl = document.getElementById(slug + '-input');
  var totalEl = document.getElementById(slug + '-total');
  var targetEl = document.getElementById(slug + '-target');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var att = parseInt(attEl.value, 10), total = parseInt(totalEl.value, 10), target = parseFloat(targetEl.value);
    if (isNaN(att) || isNaN(total) || isNaN(target)) { setMsg('Please enter all attendance values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (total <= 0 || att < 0 || att > total || target < 0 || target > 100) { setMsg('Invalid values. Attended must be <= Total.', true); return; }
    var currentPct = (att / total) * 100;
    var out = 'Current Attendance: ' + att + ' / ' + total + ' (' + currentPct.toFixed(1) + '%)\n';
    out += 'Target: ' + target + '%\n\n';
    if (currentPct >= target) {
      var canMiss = Math.floor(att - (target / 100) * total);
      out += 'Status: Safe!\n';
      out += 'You can afford to miss up to ' + canMiss + ' more classes and still stay above ' + target + '%.';
    } else {
      var needed = Math.ceil((target * total / 100) - att);
      out += 'Status: Shortage!\n';
      out += 'You must attend the next ' + needed + ' classes consecutively to reach ' + target + '%.';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Attendance calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { attEl.value=''; totalEl.value=''; targetEl.value='75'; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
