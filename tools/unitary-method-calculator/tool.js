(function() {
  'use strict';
  var slug = 'unitary-method-calculator';
  var qtyEl = document.getElementById(slug + '-input');
  var valEl = document.getElementById(slug + '-value');
  var targetEl = document.getElementById(slug + '-target');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var qty = parseFloat(qtyEl.value), val = parseFloat(valEl.value), target = parseFloat(targetEl.value);
    if (isNaN(qty) || isNaN(val) || isNaN(target)) { setMsg('Please enter all three values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (qty <= 0) { setMsg('Known quantity must be positive.', true); return; }
    if (target < 0) { setMsg('Target quantity cannot be negative.', true); return; }
    var unitValue = val / qty;
    var result = unitValue * target;
    var out = 'Unitary Method Solution\n' + '='.repeat(24) + '\n\n';
    out += 'Given: ' + qty + ' items cost/have value ' + val + '\n\n';
    out += 'Step 1: Find value of 1 unit\n';
    out += 'Value of 1 unit = ' + val + ' / ' + qty + ' = ' + unitValue.toFixed(4) + '\n\n';
    out += 'Step 2: Find value of ' + target + ' units\n';
    out += 'Value of ' + target + ' units = ' + unitValue.toFixed(4) + ' x ' + target + ' = ' + result.toFixed(4) + '\n\n';
    out += 'Answer: ' + target + ' items cost/have value ' + result.toFixed(2);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Unitary method solved.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { qtyEl.value=''; valEl.value=''; targetEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
