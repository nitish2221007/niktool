(function() {
  'use strict';
  var slug = 'ph-calculator';
  var modeEl = document.getElementById(slug + '-mode');
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var val = parseFloat(inputEl.value);
    if (isNaN(val)) { setMsg('Please enter a valid number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var mode = modeEl.value;
    var out = '';
    if (mode === 'ph') {
      if (val <= 0) { setMsg('H+ concentration must be positive.', true); return; }
      var ph = -Math.log10(val);
      var poh = 14 - ph;
      out = 'Formula: pH = -log₁₀[H⁺]\n\n';
      out += '[H⁺] = ' + val + ' mol/L\n';
      out += 'pH = ' + ph.toFixed(4) + '\n';
      out += 'pOH = 14 - pH = ' + poh.toFixed(4) + '\n\n';
      out += 'Nature: ' + (ph < 7 ? 'Acidic' : ph > 7 ? 'Basic/Alkaline' : 'Neutral');
    } else if (mode === 'h') {
      if (val < 0 || val > 14) { setMsg('pH must be between 0 and 14.', true); return; }
      var h = Math.pow(10, -val);
      var poh2 = 14 - val;
      out = 'Formula: [H⁺] = 10^(-pH)\n\n';
      out += 'pH = ' + val + '\n';
      out += '[H⁺] = ' + h.toExponential(4) + ' mol/L\n';
      out += 'pOH = ' + poh2.toFixed(4) + '\n\n';
      out += 'Nature: ' + (val < 7 ? 'Acidic' : val > 7 ? 'Basic/Alkaline' : 'Neutral');
    } else {
      if (val <= 0) { setMsg('OH- concentration must be positive.', true); return; }
      var poh3 = -Math.log10(val);
      var ph3 = 14 - poh3;
      out = 'Formula: pOH = -log₁₀[OH⁻]\n\n';
      out += '[OH⁻] = ' + val + ' mol/L\n';
      out += 'pOH = ' + poh3.toFixed(4) + '\n';
      out += 'pH = 14 - pOH = ' + ph3.toFixed(4) + '\n\n';
      out += 'Nature: ' + (ph3 < 7 ? 'Acidic' : ph3 > 7 ? 'Basic/Alkaline' : 'Neutral');
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Calculation complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
