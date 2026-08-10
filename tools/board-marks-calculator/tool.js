(function() {
  'use strict';
  var slug = 'board-marks-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var lines = inputEl.value.split('\n').map(function(l){return l.trim();}).filter(Boolean);
    if (!lines.length) { setMsg('Please enter at least one subject row.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var total = 0, maxTotal = 0, rows = [], errors = [];
    lines.forEach(function(line, idx) {
      var parts = line.split(',').map(function(p){return p.trim();});
      if (parts.length < 3) { errors.push('Line ' + (idx+1) + ': need Subject, Marks, Max Marks'); return; }
      var name = parts[0], marks = parseFloat(parts[1]), max = parseFloat(parts[2]);
      if (isNaN(marks) || isNaN(max)) { errors.push('Line ' + (idx+1) + ': marks must be numbers'); return; }
      if (max <= 0) { errors.push('Line ' + (idx+1) + ': max marks must be greater than 0'); return; }
      if (marks < 0 || marks > max) { errors.push('Line ' + (idx+1) + ': marks must be between 0 and max'); return; }
      total += marks; maxTotal += max;
      rows.push(name + ': ' + marks + ' / ' + max);
    });
    if (errors.length) { setMsg(errors[0], true); return; }
    if (maxTotal === 0) { setMsg('Total maximum marks cannot be zero.', true); return; }
    var pct = (total / maxTotal) * 100;
    var out = 'Board Marks Summary\n' + '='.repeat(24) + '\n';
    out += rows.join('\n') + '\n';
    out += '-'.repeat(24) + '\n';
    out += 'Total: ' + total + ' / ' + maxTotal + '\n';
    out += 'Percentage: ' + pct.toFixed(2) + '%\n';
    out += 'Subjects: ' + rows.length;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Board marks calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter subject marks above.');
  });
})();
