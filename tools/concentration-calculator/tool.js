(function() {
  'use strict';
  var slug = 'concentration-calculator';
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
    if (m === 'conc') { aEl.placeholder = 'Mass of solute (g)'; bEl.placeholder = 'Volume of solution (L)'; }
    else if (m === 'mass') { aEl.placeholder = 'Concentration (g/L)'; bEl.placeholder = 'Volume (L)'; }
    else { aEl.placeholder = 'Mass of solute (g)'; bEl.placeholder = 'Concentration (g/L)'; }
  }
  modeEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 0 || b < 0) { setMsg('Values cannot be negative.', true); return; }
    var mode = modeEl.value;
    var out = 'Formula: Concentration = Mass of solute / Volume of solution\n\n';
    if (mode === 'conc') {
      if (b === 0) { setMsg('Volume cannot be zero.', true); return; }
      var c = a / b;
      out += 'Mass = ' + a + ' g, Volume = ' + b + ' L\n';
      out += 'Concentration = ' + c.toFixed(4) + ' g/L\n';
      out += 'Concentration = ' + (c * 1000).toFixed(2) + ' mg/L';
    } else if (mode === 'mass') {
      var m = a * b;
      out += 'Concentration = ' + a + ' g/L, Volume = ' + b + ' L\n';
      out += 'Mass of solute = ' + m.toFixed(4) + ' g';
    } else {
      if (a === 0) { setMsg('Concentration cannot be zero.', true); return; }
      var v = b / a;
      out += 'Mass = ' + b + ' g, Concentration = ' + a + ' g/L\n';
      out += 'Volume = ' + v.toFixed(4) + ' L\n';
      out += 'Volume = ' + (v * 1000).toFixed(2) + ' mL';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Calculation complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
