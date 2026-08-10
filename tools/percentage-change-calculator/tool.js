(function() {
  'use strict';
  var slug = 'percentage-change-calculator';
  var oldEl = document.getElementById(slug + '-input');
  var newEl = document.getElementById(slug + '-new');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var oldV = parseFloat(oldEl.value), newV = parseFloat(newEl.value);
    if (isNaN(oldV) || isNaN(newV)) { setMsg('Please enter both old and new values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (oldV === 0) { setMsg('Old value cannot be zero for percentage change.', true); return; }
    var change = newV - oldV;
    var pct = (change / Math.abs(oldV)) * 100;
    var direction = pct > 0 ? 'Increase' : (pct < 0 ? 'Decrease' : 'No change');
    var out = 'Old Value: ' + oldV + '\nNew Value: ' + newV + '\n';
    out += 'Change: ' + change.toFixed(2) + '\n';
    out += 'Percentage Change: ' + pct.toFixed(2) + '%\n';
    out += 'Direction: ' + direction;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Percentage change calculated.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    oldEl.value=''; newEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter old and new values above.');
  });
})();
