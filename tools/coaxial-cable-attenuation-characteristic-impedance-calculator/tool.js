(function() {
  'use strict';
  var slug = 'coaxial-cable-attenuation-characteristic-impedance-calculator';

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

      var d = parseFloat(el('d').value);
      var D = parseFloat(el('D').value);
      var er = parseFloat(el('er').value);
      if (isNaN(d) || d <= 0 || isNaN(D) || D <= d || isNaN(er) || er < 1) {
        return { err: 'Outer diameter D must be strictly greater than inner diameter d, and εr >= 1.' };
      }
      var z0 = (138 / Math.sqrt(er)) * Math.log10(D / d);
      var c_pf_m = (24.15 * er) / Math.log10(D / d);
      var vf = (1 / Math.sqrt(er)) * 100;
      var fc_ghz = (190 / (Math.sqrt(er) * (d + D)));
      var out = 'COAXIAL CABLE GEOMETRY & IMPEDANCE ANALYSIS\n';
      out += '============================================\n';
      out += 'Inner Diameter (d)     : ' + d + ' mm\n';
      out += 'Outer Diameter (D)     : ' + D + ' mm\n';
      out += 'Dielectric Const (εr)  : ' + er + '\n\n';
      out += 'RESULTS:\n';
      out += 'Characteristic Impedance (Z0): ' + z0.toFixed(2) + ' Ω\n';
      out += 'Capacitance per meter  : ' + c_pf_m.toFixed(2) + ' pF/m\n';
      out += 'Velocity Factor (VF)   : ' + vf.toFixed(2) + '% of c\n';
      out += 'TE11 Cutoff Frequency  : ' + fc_ghz.toFixed(2) + ' GHz';
      return { out: out, msg: 'Coaxial cable parameters computed successfully.' };
    
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
    var inputs = ['d', 'D', 'er'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
