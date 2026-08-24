(function() {
  'use strict';
  var slug = 'nyquist-sampling-theorem-aliasing-minimum-sample-rate-calculator';

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

      var fmax = parseFloat(el('fmax-khz').value);
      var fs = parseFloat(el('fs-khz').value);
      if (isNaN(fmax) || fmax <= 0 || isNaN(fs) || fs <= 0) {
        return { err: 'Please enter positive frequencies for fmax and fs.' };
      }
      var nyquist_rate = 2 * fmax;
      var fn = fs / 2;
      var is_aliased = fs < nyquist_rate;
      var alias_freq = 0;
      if (is_aliased) {
        var k = Math.round(fmax / fs);
        alias_freq = Math.abs(fmax - k * fs);
      }
      var out = 'NYQUIST SAMPLING & ALIASING ANALYSIS\n';
      out += '====================================\n';
      out += 'Max Signal Freq (fmax): ' + fmax + ' kHz\n';
      out += 'Sampling Rate (fs)    : ' + fs + ' kHz\n';
      out += 'Nyquist Frequency (fs/2): ' + fn + ' kHz\n\n';
      out += 'RESULTS:\n';
      out += 'Min Nyquist Rate      : ' + nyquist_rate + ' kHz\n';
      out += 'Aliasing Status       : ' + (is_aliased ? 'WARNING: ALIASING OCCURS! (fs < 2*fmax)' : 'NO ALIASING (fs >= 2*fmax)') + '\n';
      if (is_aliased) {
        out += 'Apparent Aliased Freq : ' + alias_freq.toFixed(2) + ' kHz';
      } else {
        out += 'Guard Band Margin     : ' + (fs - nyquist_rate).toFixed(2) + ' kHz';
      }
      return { out: out, msg: 'Nyquist sampling parameters evaluated successfully.' };
    
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
    var inputs = ['fmax-khz', 'fs-khz'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
