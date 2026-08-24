(function() {
  'use strict';
  var slug = 'antenna-array-beamforming-half-power-beamwidth-directivity-calculator';

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

      var N = parseInt(el('n').value, 10);
      var d_lam = parseFloat(el('d-lambda').value);
      var f_ghz = parseFloat(el('freq-ghz').value);
      if (isNaN(N) || N <= 0 || isNaN(d_lam) || d_lam <= 0 || isNaN(f_ghz) || f_ghz <= 0) {
        return { err: 'Please enter valid positive numbers for all parameters.' };
      }
      var c = 3e8;
      var f = f_ghz * 1e9;
      var lam = c / f;
      var d = d_lam * lam;
      var hpbw_rad = 0.886 * lam / (N * d);
      var hpbw_deg = hpbw_rad * 180 / Math.PI;
      var directivity_dbi = 10 * Math.log10(N);
      var out = 'ANTENNA ARRAY BEAMFORMING ANALYSIS\n';
      out += '====================================\n';
      out += 'Number of Elements (N)  : ' + N + '\n';
      out += 'Element Spacing (d)     : ' + d_lam + ' λ (' + (d * 1000).toFixed(2) + ' mm)\n';
      out += 'Wavelength (λ)          : ' + (lam * 1000).toFixed(2) + ' mm @ ' + f_ghz + ' GHz\n\n';
      out += 'RESULTS:\n';
      out += 'Half-Power Beamwidth    : ' + hpbw_deg.toFixed(2) + '° (' + hpbw_rad.toFixed(4) + ' rad)\n';
      out += 'Array Directivity (D)   : ' + directivity_dbi.toFixed(2) + ' dBi\n';
      out += 'Linear Directivity Factor: ' + N + ' (ideal ULA)';
      return { out: out, msg: 'Beamwidth and directivity computed successfully.' };
    
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
    var inputs = ['n', 'd-lambda', 'freq-ghz'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
