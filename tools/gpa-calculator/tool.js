(function() {
  'use strict';
  var slug = 'gpa-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var scaleEl = document.getElementById(slug + '-scale');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var lines = inputEl.value.split('\n').map(function(l){return l.trim();}).filter(Boolean);
    if (!lines.length) { setMsg('Please enter at least one grade and credit pair.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var scale = parseFloat(scaleEl.value);
    var map = {};
    if (scale === 4) { map = {'A':4,'B':3,'C':2,'D':1,'F':0,'A+':4,'A-':3.7,'B+':3.3,'B-':2.7,'C+':2.3,'C-':1.7}; }
    else { for(var i=0; i<=10; i++) map[i.toString()] = i; }
    var totalPoints = 0, totalCredits = 0, errors = [];
    lines.forEach(function(line, idx) {
      var parts = line.split(',').map(function(p){return p.trim();});
      if (parts.length < 2) { errors.push('Line ' + (idx+1) + ': needs Grade, Credits'); return; }
      var gradeStr = parts[0].toUpperCase(), credits = parseFloat(parts[1]);
      if (!(gradeStr in map)) { errors.push('Line ' + (idx+1) + ': unknown grade "' + parts[0] + '"'); return; }
      if (isNaN(credits) || credits < 0) { errors.push('Line ' + (idx+1) + ': invalid credits'); return; }
      totalPoints += map[gradeStr] * credits;
      totalCredits += credits;
    });
    if (errors.length) { setMsg(errors[0], true); return; }
    if (totalCredits === 0) { setMsg('Total credits cannot be zero.', true); return; }
    var gpa = totalPoints / totalCredits;
    var out = 'Scale: ' + scale + '.0\nTotal Credits: ' + totalCredits + '\nTotal Points: ' + totalPoints.toFixed(1) + '\n\nGPA: ' + gpa.toFixed(2);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('GPA calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
