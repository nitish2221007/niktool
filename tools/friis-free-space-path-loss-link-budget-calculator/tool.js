(function() {
  'use strict';
  var slug = 'friis-free-space-path-loss-link-budget-calculator';

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

      var f_ghz = parseFloat(el('freq-ghz').value);
      var d_km = parseFloat(el('dist-km').value);
      var gt = parseFloat(el('gt-dbi').value);
      var gr = parseFloat(el('gr-dbi').value);
      var pt = parseFloat(el('pt-dbm').value);
      if (isNaN(f_ghz) || f_ghz <= 0 || isNaN(d_km) || d_km <= 0 || isNaN(gt) || isNaN(gr) || isNaN(pt)) {
        return { err: 'Please enter valid positive numbers for frequency and distance.' };
      }
      var fspl_db = 20 * Math.log10(d_km) + 20 * Math.log10(f_ghz) + 92.45;
      var eirp_dbm = pt + gt;
      var pr_dbm = pt + gt + gr - fspl_db;
      var pr_mw = Math.pow(10, pr_dbm / 10);
      var out = 'FRIIS TRANSMISSION & RF LINK BUDGET ANALYSIS\n';
      out += '============================================\n';
      out += 'Frequency (f)         : ' + f_ghz + ' GHz\n';
      out += 'Distance (d)          : ' + d_km + ' km\n';
      out += 'Tx Power (Pt)         : ' + pt + ' dBm\n';
      out += 'Tx Antenna Gain (Gt)  : ' + gt + ' dBi (EIRP = ' + eirp_dbm.toFixed(2) + ' dBm)\n';
      out += 'Rx Antenna Gain (Gr)  : ' + gr + ' dBi\n\n';
      out += 'RESULTS:\n';
      out += 'Free-Space Path Loss  : ' + fspl_db.toFixed(2) + ' dB\n';
      out += 'Received Power (Pr)   : ' + pr_dbm.toFixed(2) + ' dBm (' + (pr_mw*1e6).toExponential(4) + ' µW)';
      return { out: out, msg: 'Friis link budget computed successfully.' };
    
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
    var inputs = ['freq-ghz', 'dist-km', 'gt-dbi', 'gr-dbi', 'pt-dbm'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
