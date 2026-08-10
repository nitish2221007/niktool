(function() {
  'use strict';
  var slug = 'grade-calculator';
  var marksEl = document.getElementById(slug + '-input');
  var totalEl = document.getElementById(slug + '-total');
  var scaleEl = document.getElementById(slug + '-scale');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  function standardGrade(p) {
    if (p >= 91) return 'A1';
    if (p >= 81) return 'A2';
    if (p >= 71) return 'B1';
    if (p >= 61) return 'B2';
    if (p >= 51) return 'C1';
    if (p >= 41) return 'C2';
    if (p >= 33) return 'D';
    return 'E';
  }
  function letterGrade(p) {
    if (p >= 90) return 'A';
    if (p >= 80) return 'B';
    if (p >= 70) return 'C';
    if (p >= 60) return 'D';
    return 'F';
  }

  btn.addEventListener('click', function() {
    var marks = parseFloat(marksEl.value);
    var total = parseFloat(totalEl.value);
    if (isNaN(marks) || isNaN(total)) { setMsg('Please enter both marks and total marks.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (total <= 0) { setMsg('Total marks must be greater than zero.', true); return; }
    if (marks < 0 || marks > total) { setMsg('Marks must be between 0 and total marks.', true); return; }
    var pct = (marks / total) * 100;
    var grade = scaleEl.value === 'letter' ? letterGrade(pct) : standardGrade(pct);
    var out = 'Marks: ' + marks + ' / ' + total + '\n';
    out += 'Percentage: ' + pct.toFixed(2) + '%\n';
    out += 'Grade: ' + grade + '\n';
    out += 'Scale: ' + scaleEl.options[scaleEl.selectedIndex].text;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Grade calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    marksEl.value = ''; totalEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter your marks above.');
  });
})();
