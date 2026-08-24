(function() {
  'use strict';
  var slug = 'optical-fiber-attenuation-power-budget-link-calculator';

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

      var L = parseFloat(el('len-km').value);
      var alpha = parseFloat(el('alpha-db-km').value);
      var conn = parseFloat(el('conn-loss-db').value);
      var ptx = parseFloat(el('ptx-dbm').value);
      var prx = parseFloat(el('prx-sens-dbm').value);
      if (isNaN(L) || L <= 0 || isNaN(alpha) || alpha < 0 || isNaN(conn) || isNaN(ptx) || isNaN(prx)) {
        return { err: 'Please enter valid numerical values for fiber link parameters.' };
      }
      var total_fiber_loss = L * alpha;
      var total_attenuation = total_fiber_loss + conn;
      var avail_budget = ptx - prx;
      var margin_db = avail_budget - total_attenuation;
      var max_dist_km = (avail_budget - conn) / alpha;
      var out = 'FIBER OPTIC LINK POWER BUDGET ANALYSIS\n';
      out += '======================================\n';
      out += 'Link Distance (L)     : ' + L + ' km\n';
      out += 'Fiber Attenuation (α) : ' + alpha + ' dB/km\n';
      out += 'Connectors/Splices    : ' + conn + ' dB\n';
      out += 'Transmitter Power     : ' + ptx + ' dBm\n';
      out += 'Receiver Sensitivity  : ' + prx + ' dBm\n\n';
      out += 'RESULTS:\n';
      out += 'Total Attenuation     : ' + total_attenuation.toFixed(2) + ' dB\n';
      out += 'Available Power Budget: ' + avail_budget.toFixed(2) + ' dB\n';
      out += 'Link Power Margin     : ' + margin_db.toFixed(2) + ' dB\n';
      out += 'Max Distance @ 3dB Margin: ' + ((avail_budget - conn - 3) / alpha).toFixed(2) + ' km\n';
      out += 'Link Status           : ' + (margin_db >= 3 ? 'PASS (Good Power Margin >= 3dB)' : (margin_db >= 0 ? 'WARNING (Low Margin < 3dB)' : 'FAIL (Insufficient Power)'));
      return { out: out, msg: 'Fiber optic link budget calculated successfully.' };
    
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
    var inputs = ['len-km', 'alpha-db-km', 'conn-loss-db', 'ptx-dbm', 'prx-sens-dbm'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
