(function() {
  'use strict';
  var slug = 'ohms-law-triangle-helper';
  var findEl = document.getElementById(slug + '-input');
  var aEl = document.getElementById(slug + '-a');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function updateLabels() {
    var f = findEl.value;
    if (f === 'V') { aEl.placeholder = 'Current I (A)'; bEl.placeholder = 'Resistance R (ohm)'; }
    else if (f === 'I') { aEl.placeholder = 'Voltage V (V)'; bEl.placeholder = 'Resistance R (ohm)'; }
    else { aEl.placeholder = 'Voltage V (V)'; bEl.placeholder = 'Current I (A)'; }
  }
  findEl.addEventListener('change', updateLabels);
  updateLabels();
  btn.addEventListener('click', function() {
    var a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b)) { setMsg('Please enter both known values.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (a < 0 || b < 0) { setMsg('Values must be non-negative.', true); return; }
    var f = findEl.value;
    var out = "Ohm's Law Triangle: V = I x R\n\n";
    if (f === 'V') {
      var v = a * b;
      out += 'Finding: Voltage (V)\nFormula: V = I x R\n';
      out += 'V = ' + a + ' A x ' + b + ' ohm\n';
      out += 'V = ' + v.toFixed(4) + ' volts';
    } else if (f === 'I') {
      if (b === 0) { setMsg('Resistance cannot be zero.', true); return; }
      var i = a / b;
      out += 'Finding: Current (I)\nFormula: I = V / R\n';
      out += 'I = ' + a + ' V / ' + b + ' ohm\n';
      out += 'I = ' + i.toFixed(4) + ' amperes';
    } else {
      if (b === 0) { setMsg('Current cannot be zero.', true); return; }
      var r = a / b;
      out += 'Finding: Resistance (R)\nFormula: R = V / I\n';
      out += 'R = ' + a + ' V / ' + b + ' A\n';
      out += 'R = ' + r.toFixed(4) + ' ohms';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg("Ohm's Law calculated.");
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
