(function() {
  'use strict';
  var slug = 'radar-range-equation-snr-detection-range-calculator';

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

      var pt_kw = parseFloat(el('pt-kw').value);
      var gain_db = parseFloat(el('gain-db').value);
      var rcs = parseFloat(el('rcs-m2').value);
      var f_ghz = parseFloat(el('freq-ghz').value);
      var pmin_dbm = parseFloat(el('pmin-dbm').value);
      if (isNaN(pt_kw) || pt_kw <= 0 || isNaN(gain_db) || isNaN(rcs) || rcs <= 0 || isNaN(f_ghz) || f_ghz <= 0 || isNaN(pmin_dbm)) {
        return { err: 'Please enter valid positive values for power, RCS, frequency, and valid gains.' };
      }
      var pt_w = pt_kw * 1000;
      var g_lin = Math.pow(10, gain_db / 10);
      var lam = 3e8 / (f_ghz * 1e9);
      var pmin_w = Math.pow(10, (pmin_dbm - 30) / 10);
      var num = pt_w * g_lin * g_lin * lam * lam * rcs;
      var den = Math.pow(4 * Math.PI, 3) * pmin_w;
      var r_max_m = Math.pow(num / den, 0.25);
      var r_max_km = r_max_m / 1000;
      var out = 'RADAR RANGE EQUATION MAXIMUM DETECTION ANALYSIS\n';
      out += '===============================================\n';
      out += 'Peak Tx Power (Pt)    : ' + pt_kw + ' kW\n';
      out += 'Antenna Gain (G)      : ' + gain_db + ' dB\n';
      out += 'Target RCS (σ)        : ' + rcs + ' m²\n';
      out += 'Frequency (f)         : ' + f_ghz + ' GHz (λ = ' + (lam*1000).toFixed(2) + ' mm)\n';
      out += 'Min Detectable (Pmin) : ' + pmin_dbm + ' dBm\n\n';
      out += 'RESULTS:\n';
      out += 'Max Radar Range (Rmax): ' + r_max_km.toFixed(2) + ' km (' + (r_max_km * 0.539957).toFixed(2) + ' nmi)';
      return { out: out, msg: 'Maximum radar detection range computed successfully.' };
    
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
    var inputs = ['pt-kw', 'gain-db', 'rcs-m2', 'freq-ghz', 'pmin-dbm'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
