(function() {
  'use strict';
  var slug = 'cgpa-to-percentage-calculator';
  var cgpaEl = document.getElementById(slug + '-input');
  var formulaEl = document.getElementById(slug + '-formula');
  var customEl = document.getElementById(slug + '-custom');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) { msgEl.textContent = t; msgEl.classList.toggle('is-error', !!err); }

  btn.addEventListener('click', function() {
    var cgpa = parseFloat(cgpaEl.value);
    if (isNaN(cgpa)) { setMsg('Please enter a valid CGPA.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (cgpa < 0 || cgpa > 10) { setMsg('CGPA should normally be between 0 and 10.', true); return; }
    var multiplier, label;
    if (formulaEl.value === 'custom') {
      multiplier = parseFloat(customEl.value);
      if (isNaN(multiplier) || multiplier <= 0) { setMsg('Please enter a valid custom multiplier.', true); return; }
      label = 'Custom multiplier x ' + multiplier;
    } else {
      multiplier = parseFloat(formulaEl.value);
      label = formulaEl.options[formulaEl.selectedIndex].text;
    }
    var pct = cgpa * multiplier;
    var out = 'CGPA: ' + cgpa + '\n';
    out += 'Method: ' + label + '\n';
    out += 'Percentage: ' + pct.toFixed(2) + '%\n\n';
    out += 'Note: Institutions may use different conversion rules.\n';
    out += 'Always verify with your board or institution.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Percentage calculated successfully.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    cgpaEl.value = ''; customEl.value = ''; outputEl.value = ''; copyBtn.disabled = true;
    setMsg('Cleared. Enter your CGPA above.');
  });
})();
