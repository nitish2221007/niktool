(function() {
  'use strict';
  var slug = 'radio-wave-propagation-itu-r-path-loss-model-calculator';

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

      var d_m = parseFloat(el('dist-m').value);
      var f_mhz = parseFloat(el('freq-mhz').value);
      var env = el('env').value;
      if (isNaN(d_m) || d_m <= 0 || isNaN(f_mhz) || f_mhz <= 0) {
        return { err: 'Please enter positive numbers for distance and frequency.' };
      }
      var N = 30;
      var L_floor = 15;
      if (env === 'commercial') { N = 22; L_floor = 10; }
      else if (env === 'suburban') { N = 35; L_floor = 0; }
      else if (env === 'urban') { N = 40; L_floor = 0; }
      var pl_db = 20 * Math.log10(f_mhz) + N * Math.log10(d_m) + L_floor - 28;
      var out = 'ITU-R RADIO PROPAGATION PATH LOSS ANALYSIS\n';
      out += '============================================\n';
      out += 'Distance (d)          : ' + d_m + ' meters\n';
      out += 'Frequency (f)         : ' + f_mhz + ' MHz\n';
      out += 'Environment           : ' + env.toUpperCase() + '\n\n';
      out += 'RESULTS:\n';
      out += 'Distance Exponent (N) : ' + N + '\n';
      out += 'Estimated Path Loss   : ' + pl_db.toFixed(2) + ' dB';
      return { out: out, msg: 'Radio propagation path loss computed successfully.' };
    
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
    var inputs = ['dist-m', 'freq-mhz', 'env'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
