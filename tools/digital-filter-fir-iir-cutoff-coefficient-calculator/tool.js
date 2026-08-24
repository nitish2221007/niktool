(function() {
  'use strict';
  var slug = 'digital-filter-fir-iir-cutoff-coefficient-calculator';

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

      var fs = parseFloat(el('fs').value);
      var fc = parseFloat(el('fc').value);
      var N = parseInt(el('taps').value, 10);
      if (isNaN(fs) || fs <= 0 || isNaN(fc) || fc <= 0 || fc >= fs/2 || isNaN(N) || N < 3) {
        return { err: 'Cutoff fc must be less than Nyquist frequency (fs / 2), and N >= 3.' };
      }
      if (N % 2 === 0) N += 1;
      var M = (N - 1) / 2;
      var fc_norm = fc / fs;
      var coeffs = [];
      var sum = 0;
      for (var n = -M; n <= M; n++) {
        var h = 0;
        if (n === 0) {
          h = 2 * fc_norm;
        } else {
          h = Math.sin(2 * Math.PI * fc_norm * n) / (Math.PI * n);
        }
        var win = 0.54 - 0.46 * Math.cos((2 * Math.PI * (n + M)) / (N - 1));
        var hw = h * win;
        coeffs.push(hw);
        sum += hw;
      }
      var out = 'WINDOWED SINC FIR LOWPASS FILTER DESIGN (Hamming Window)\n';
      out += '=======================================================\n';
      out += 'Sampling Rate (fs)   : ' + fs + ' Hz\n';
      out += 'Cutoff Frequency (fc): ' + fc + ' Hz (Normalized: ' + fc_norm.toFixed(4) + ')\n';
      out += 'Filter Taps (N)      : ' + N + ' taps\n\n';
      out += 'IMPULSE RESPONSE COEFFICIENTS h[n] (Normalized DC Gain = 1.0):\n';
      for (var i = 0; i < coeffs.length; i++) {
        var norm_c = coeffs[i] / sum;
        out += 'h[' + (i - M) + '] = ' + norm_c.toFixed(6) + '\n';
      }
      return { out: out, msg: 'FIR filter coefficients computed successfully.' };
    
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
    var inputs = ['fs', 'fc', 'taps'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
