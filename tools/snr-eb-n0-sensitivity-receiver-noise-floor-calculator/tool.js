(function() {
  'use strict';
  var slug = 'snr-eb-n0-sensitivity-receiver-noise-floor-calculator';

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

      var bw_khz = parseFloat(el('bw-khz').value);
      var nf = parseFloat(el('nf-db').value);
      var snr_req = parseFloat(el('snr-req-db').value);
      var T = parseFloat(el('temp-k').value);
      if (isNaN(bw_khz) || bw_khz <= 0 || isNaN(nf) || isNaN(snr_req) || isNaN(T) || T <= 0) {
        return { err: 'Please enter valid positive values for bandwidth and temperature.' };
      }
      var k = 1.380649e-23;
      var bw_hz = bw_khz * 1000;
      var nfloor_w = k * T * bw_hz;
      var nfloor_dbm = 10 * Math.log10(nfloor_w) + 30;
      var sens_dbm = nfloor_dbm + nf + snr_req;
      var out = 'RECEIVER NOISE FLOOR & SENSITIVITY ANALYSIS\n';
      out += '===========================================\n';
      out += 'Bandwidth (BW)        : ' + bw_khz + ' kHz (' + bw_hz + ' Hz)\n';
      out += 'Noise Figure (NF)     : ' + nf + ' dB\n';
      out += 'Required SNR          : ' + snr_req + ' dB\n';
      out += 'Temperature (T)       : ' + T + ' K (27°C room temp)\n\n';
      out += 'RESULTS:\n';
      out += 'Thermal Noise Floor   : ' + nfloor_dbm.toFixed(2) + ' dBm (' + (nfloor_dbm - 30).toFixed(2) + ' dBW)\n';
      out += 'Total Noise Density N0: ' + (10 * Math.log10(k * T) + 30 + nf).toFixed(2) + ' dBm/Hz\n';
      out += 'Receiver Sensitivity  : ' + sens_dbm.toFixed(2) + ' dBm';
      return { out: out, msg: 'Receiver sensitivity computed successfully.' };
    
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
    var inputs = ['bw-khz', 'nf-db', 'snr-req-db', 'temp-k'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
