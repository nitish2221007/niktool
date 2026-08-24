(function() {
  'use strict';
  var slug = 'ofdm-subcarrier-spacing-symbol-duration-cyclic-prefix-calculator';

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

      var df_khz = parseFloat(el('df-khz').value);
      var n_fft = parseInt(el('n-fft').value, 10);
      var cp_ratio = parseFloat(el('cp-ratio').value);
      if (isNaN(df_khz) || df_khz <= 0 || isNaN(n_fft) || n_fft <= 0 || isNaN(cp_ratio) || cp_ratio < 0) {
        return { err: 'Please enter valid positive numbers for subcarrier spacing, FFT size, and CP ratio.' };
      }
      var tu_us = 1000 / df_khz;
      var tcp_us = tu_us * cp_ratio;
      var ttotal_us = tu_us + tcp_us;
      var bw_mhz = (n_fft * df_khz) / 1000;
      var out = 'OFDM SYMBOL STRUCTURE & TIMING ANALYSIS\n';
      out += '=======================================\n';
      out += 'Subcarrier Spacing (Δf): ' + df_khz + ' kHz\n';
      out += 'FFT Size (Nfft)        : ' + n_fft + '\n';
      out += 'CP Overhead Ratio      : ' + (cp_ratio * 100).toFixed(2) + '%\n\n';
      out += 'RESULTS:\n';
      out += 'Useful Symbol Time (Tu): ' + tu_us.toFixed(3) + ' µs\n';
      out += 'Cyclic Prefix Time (Tcp): ' + tcp_us.toFixed(3) + ' µs\n';
      out += 'Total Symbol Time (T)  : ' + ttotal_us.toFixed(3) + ' µs\n';
      out += 'Total FFT Bandwidth    : ' + bw_mhz.toFixed(2) + ' MHz\n';
      out += 'Max Multipath Delay Tolarance: ' + tcp_us.toFixed(3) + ' µs';
      return { out: out, msg: 'OFDM parameters calculated successfully.' };
    
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
    var inputs = ['df-khz', 'n-fft', 'cp-ratio'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
