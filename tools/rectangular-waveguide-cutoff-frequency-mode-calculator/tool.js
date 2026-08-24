(function() {
  'use strict';
  var slug = 'rectangular-waveguide-cutoff-frequency-mode-calculator';

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

      var a = parseFloat(el('a-mm').value) / 1000;
      var b = parseFloat(el('b-mm').value) / 1000;
      var m = parseInt(el('m').value, 10);
      var n = parseInt(el('n').value, 10);
      var f_ghz = parseFloat(el('f-ghz').value);
      if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(m) || m < 0 || isNaN(n) || n < 0 || (m===0 && n===0)) {
        return { err: 'Please enter valid positive dimensions a, b and non-negative integers m, n (not both zero).' };
      }
      var c = 3e8;
      var fc_hz = (c / 2) * Math.sqrt(Math.pow(m / a, 2) + Math.pow(n / b, 2));
      var fc_ghz = fc_hz / 1e9;
      var out = 'RECTANGULAR WAVEGUIDE TE/TM MODE ANALYSIS\n';
      out += '=========================================\n';
      out += 'Waveguide Dimensions : a = ' + (a*1000) + ' mm, b = ' + (b*1000) + ' mm\n';
      out += 'Selected Mode        : TE' + m + n + ' / TM' + m + n + '\n';
      out += 'Operating Frequency  : ' + f_ghz + ' GHz\n\n';
      out += 'RESULTS:\n';
      out += 'Cutoff Frequency (fc): ' + fc_ghz.toFixed(3) + ' GHz\n';
      if (f_ghz > fc_ghz) {
        var lambda_g = (c / (f_ghz * 1e9)) / Math.sqrt(1 - Math.pow(fc_ghz / f_ghz, 2));
        out += 'Wave Propagation Status: PROPAGATING (f > fc)\n';
        out += 'Guide Wavelength (λg): ' + (lambda_g * 1000).toFixed(2) + ' mm';
      } else {
        out += 'Wave Propagation Status: EVANESCENT / CUTOFF (f <= fc)';
      }
      return { out: out, msg: 'Waveguide mode cutoff calculated successfully.' };
    
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
    var inputs = ['a-mm', 'b-mm', 'm', 'n', 'f-ghz'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
