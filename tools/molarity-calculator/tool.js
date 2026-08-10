(function() {
  'use strict';
  var slug = 'molarity-calculator';
  var modeEl = document.getElementById(slug + '-mode');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function updateLabels() {
    var m = modeEl.value;
    if (m === 'M') { aEl.placeholder = 'Moles (n)'; bEl.placeholder = 'Volume in Liters (V)'; }
    else if (m === 'n') { aEl.placeholder = 'Molarity (M)'; bEl.placeholder = 'Volume in Liters (V)'; }
    else { aEl.placeholder = 'Moles (n)'; bEl.placeholder = 'Molarity (M)'; }
  }
  modeEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var mode = modeEl.value;
    var out = 'Formula: Molarity (M) = Moles (n) / Volume in L (V)\n\n';
    if (mode === 'M') {
      if (b === 0) { setMsg('Volume cannot be zero.', true); return; }
      var M = a / b;
      out += 'n = ' + a + ' moles, V = ' + b + ' L\n';
      out += 'Molarity = ' + M.toFixed(4) + ' M (mol/L)';
    } else if (mode === 'n') {
      var n = a * b;
      out += 'M = ' + a + ' mol/L, V = ' + b + ' L\n';
      out += 'Moles = ' + n.toFixed(4) + ' moles';
    } else {
      if (a === 0) { setMsg('Molarity cannot be zero.', true); return; }
      var V = b / a;
      out += 'n = ' + b + ' moles, M = ' + a + ' mol/L\n';
      out += 'Volume = ' + V.toFixed(4) + ' L';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Molarity calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
