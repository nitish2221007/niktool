(function() {
  'use strict';
  var slug = 'gsm-lte-link-budget-indoor-outdoor-coverage-calculator';

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

      var pt = parseFloat(el('tx-power-dbm').value);
      var gt = parseFloat(el('tx-gain-dbi').value);
      var gr = parseFloat(el('rx-gain-dbi').value);
      var sens = parseFloat(el('rx-sens-dbm').value);
      var f_mhz = parseFloat(el('freq-mhz').value);
      if (isNaN(pt) || isNaN(gt) || isNaN(gr) || isNaN(sens) || isNaN(f_mhz) || f_mhz <= 0) {
        return { err: 'Please enter valid numerical values.' };
      }
      var mapl = pt + gt + gr - sens;
      var f_ghz = f_mhz / 1000;
      var max_d_km = Math.pow(10, (mapl - 92.45 - 20 * Math.log10(f_ghz)) / 20);
      var out = 'CELLULAR NETWORK LINK BUDGET & MAPL ANALYSIS\n';
      out += '=============================================\n';
      out += 'Tx Power              : ' + pt + ' dBm (20 W)\n';
      out += 'Tx Antenna Gain       : ' + gt + ' dBi\n';
      out += 'Rx Antenna Gain       : ' + gr + ' dBi\n';
      out += 'Receiver Sensitivity  : ' + sens + ' dBm\n';
      out += 'Frequency             : ' + f_mhz + ' MHz\n\n';
      out += 'RESULTS:\n';
      out += 'Max Allowable Path Loss (MAPL): ' + mapl.toFixed(2) + ' dB\n';
      out += 'Est. Max Free-Space Cell Radius: ' + max_d_km.toFixed(2) + ' km';
      return { out: out, msg: 'Cellular link budget computed successfully.' };
    
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
    var inputs = ['tx-power-dbm', 'tx-gain-dbi', 'rx-gain-dbi', 'rx-sens-dbm', 'freq-mhz'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
