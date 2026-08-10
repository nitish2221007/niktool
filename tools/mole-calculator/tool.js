(function() {
  'use strict';
  var slug = 'mole-calculator';
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
    if (m === 'n') { aEl.placeholder = 'Mass in grams (m)'; bEl.placeholder = 'Molar Mass (M)'; }
    else if (m === 'm') { aEl.placeholder = 'Moles (n)'; bEl.placeholder = 'Molar Mass (M)'; }
    else { aEl.placeholder = 'Mass in grams (m)'; bEl.placeholder = 'Moles (n)'; }
  }
  modeEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var mode = modeEl.value;
    var out = 'Formula: Moles (n) = Mass (m) / Molar Mass (M)\n\n';
    if (mode === 'n') {
      if (b === 0) { setMsg('Molar Mass cannot be zero.', true); return; }
      var n = a / b;
      out += 'm = ' + a + ' g, M = ' + b + ' g/mol\n';
      out += 'Moles = ' + n.toFixed(4) + ' moles\n';
      out += 'Number of particles = ' + (n * 6.022e23).toExponential(4);
    } else if (mode === 'm') {
      var mass = a * b;
      out += 'n = ' + a + ' moles, M = ' + b + ' g/mol\n';
      out += 'Mass = ' + mass.toFixed(4) + ' grams';
    } else {
      if (a === 0) { setMsg('Moles cannot be zero.', true); return; }
      var M = b / a;
      out += 'm = ' + b + ' g, n = ' + a + ' moles\n';
      out += 'Molar Mass = ' + M.toFixed(4) + ' g/mol';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Mole calculation complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
