(function() {
  'use strict';
  var slug = 'qam-bit-error-rate-snr-modulation-order-calculator';

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

      var M = parseInt(el('m-order').value, 10);
      var ebn0_db = parseFloat(el('ebn0-db').value);
      if (isNaN(ebn0_db)) return { err: 'Please enter a valid Eb/N0 in dB.' };
      var k = Math.log2(M);
      var ebn0_lin = Math.pow(10, ebn0_db / 10);
      var snr_lin = ebn0_lin * k;
      var snr_db = 10 * Math.log10(snr_lin);
      var q_arg = Math.sqrt((3 * k * ebn0_lin) / (M - 1));
      function erfc(x) {
        var z = Math.abs(x);
        var t = 1.0 / (1.0 + 0.5 * z);
        var ans = t * Math.exp(-z*z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
        return x >= 0 ? ans : 2.0 - ans;
      }
      function Q(x) { return 0.5 * erfc(x / Math.SQRT2); }
      var ser_approx = 4 * (1 - (1 / Math.sqrt(M))) * Q(q_arg);
      var ber_approx = ser_approx / k;
      var out = 'M-QAM MODULATION & ERROR RATE ANALYSIS\n';
      out += '=======================================\n';
      out += 'Modulation Order (M)  : ' + M + '-QAM\n';
      out += 'Bits per Symbol (k)   : ' + k + ' bits/symbol\n';
      out += 'Eb/N0                 : ' + ebn0_db.toFixed(2) + ' dB\n';
      out += 'Equivalent SNR        : ' + snr_db.toFixed(2) + ' dB\n\n';
      out += 'RESULTS:\n';
      out += 'Spectral Efficiency   : ' + k + ' bps/Hz\n';
      out += 'Symbol Error Rate (SER): ' + ser_approx.toExponential(4) + '\n';
      out += 'Bit Error Rate (BER)  : ' + ber_approx.toExponential(4);
      return { out: out, msg: 'QAM BER calculated successfully.' };
    
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
    var inputs = ['m-order', 'ebn0-db'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
