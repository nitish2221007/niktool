(function() {
  'use strict';
  var slug = 'impedance-matching-l-network-pi-network-rf-calculator';

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

      var rs = parseFloat(el('rs').value);
      var rl = parseFloat(el('rl').value);
      var f_mhz = parseFloat(el('freq-mhz').value);
      if (isNaN(rs) || rs <= 0 || isNaN(rl) || rl <= 0 || isNaN(f_mhz) || f_mhz <= 0 || rs === rl) {
        return { err: 'Rs and Rl must be positive numbers and unequal (Rs != Rl).' };
      }
      var r_high = Math.max(rs, rl);
      var r_low = Math.min(rs, rl);
      var Q = Math.sqrt((r_high / r_low) - 1);
      var omega = 2 * Math.PI * f_mhz * 1e6;
      var L_henry = (r_low * Q) / omega;
      var C_farad = Q / (omega * r_high);
      var out = 'L-NETWORK RF IMPEDANCE MATCHING CIRCUIT DESIGN\n';
      out += '============================================\n';
      out += 'Source Resistance (Rs): ' + rs + ' Ω\n';
      out += 'Load Resistance (Rl)  : ' + rl + ' Ω\n';
      out += 'Frequency (f)         : ' + f_mhz + ' MHz\n\n';
      out += 'RESULTS:\n';
      out += 'Network Q Factor      : ' + Q.toFixed(3) + '\n';
      out += 'Matching Inductance (L): ' + (L_henry * 1e9).toFixed(2) + ' nH\n';
      out += 'Matching Capacitance (C): ' + (C_farad * 1e12).toFixed(2) + ' pF';
      return { out: out, msg: 'L-network matching components calculated successfully.' };
    
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
    var inputs = ['rs', 'rl', 'freq-mhz'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
