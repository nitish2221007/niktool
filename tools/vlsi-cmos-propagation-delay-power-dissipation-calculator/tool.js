(function() {
  'use strict';
  var slug = 'vlsi-cmos-propagation-delay-power-dissipation-calculator';

  function el(id) {
    return document.getElementById(slug + '-' + id);
  }

  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) {
    msgEl.textContent = t;
    msgEl.classList.toggle('is-error', !!err);
  }

  function calculate() {
    try {

      var cl_ff = parseFloat(el('cl-ff').value);
      var vdd = parseFloat(el('vdd-v').value);
      var f_ghz = parseFloat(el('f-ghz').value);
      var alpha = parseFloat(el('alpha').value);
      var req_kohm = parseFloat(el('req-kohm').value);
      if (isNaN(cl_ff) || cl_ff <= 0 || isNaN(vdd) || vdd <= 0 || isNaN(f_ghz) || f_ghz <= 0 || isNaN(alpha) || alpha < 0 || alpha > 1) {
        return { err: 'Please enter valid positive values for CL, VDD, clock frequency, and alpha between 0 and 1.' };
      }
      var CL = cl_ff * 1e-15;
      var f = f_ghz * 1e9;
      var Req = req_kohm * 1000;
      var p_dyn_w = alpha * CL * vdd * vdd * f;
      var tp_sec = 0.69 * Req * CL;
      var tp_ps = tp_sec * 1e12;
      var out = 'VLSI CMOS GATE DELAY & POWER DISSIPATION ANALYSIS\n';
      out += '==================================================\n';
      out += 'Load Capacitance (CL) : ' + cl_ff + ' fF\n';
      out += 'Supply Voltage (VDD)  : ' + vdd + ' V\n';
      out += 'Clock Frequency (f)   : ' + f_ghz + ' GHz\n';
      out += 'Activity Factor (α)   : ' + alpha + '\n';
      out += 'Equivalent Resistance : ' + req_kohm + ' kΩ\n\n';
      out += 'RESULTS:\n';
      out += 'Dynamic Power Dissipation: ' + (p_dyn_w * 1e6).toFixed(4) + ' µW (' + (p_dyn_w * 1e3).toFixed(4) + ' mW)\n';
      out += 'Propagation Delay (tp)   : ' + tp_ps.toFixed(2) + ' ps\n';
      out += 'Energy per Switching Event: ' + (CL * vdd * vdd * 1e15).toFixed(2) + ' fJ';
      return { out: out, msg: 'CMOS gate delay and power dissipation computed successfully.' };
    
    } catch(e) {
      return { err: 'Error during calculation: ' + e.message };
    }
  }

  btn.addEventListener('click', function() {
    var res = calculate();
    if (res.err) {
      outputEl.value = '';
      copyBtn.disabled = true;
      setMsg(res.err, true);
    } else {
      outputEl.value = res.out;
      copyBtn.disabled = false;
      setMsg(res.msg || 'Calculation completed successfully.');
    }
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outputEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    var inputs = ['cl-ff', 'vdd-v', 'f-ghz', 'alpha', 'req-kohm'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
