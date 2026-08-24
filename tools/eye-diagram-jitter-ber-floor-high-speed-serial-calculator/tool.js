(function() {
  'use strict';
  var slug = 'eye-diagram-jitter-ber-floor-high-speed-serial-calculator';

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

      var dr = parseFloat(el('data-rate-gbps').value);
      var tj = parseFloat(el('tj-ps').value);
      var eh = parseFloat(el('eye-height-mv').value);
      if (isNaN(dr) || dr <= 0 || isNaN(tj) || tj < 0 || isNaN(eh) || eh <= 0) {
        return { err: 'Please enter valid positive values for data rate, jitter, and eye height.' };
      }
      var ui_ps = 1000 / dr;
      var eye_width_ps = ui_ps - tj;
      var eye_width_ui = eye_width_ps / ui_ps;
      var eye_open_pct = Math.max(0, eye_width_ui * 100);
      var out = 'HIGH-SPEED SERIAL LINK EYE DIAGRAM ANALYSIS\n';
      out += '===========================================\n';
      out += 'Data Rate             : ' + dr + ' Gbps\n';
      out += 'Unit Interval (UI)    : ' + ui_ps.toFixed(2) + ' ps\n';
      out += 'Total Jitter (TJ)     : ' + tj + ' ps\n';
      out += 'Vertical Eye Height   : ' + eh + ' mV\n\n';
      out += 'RESULTS:\n';
      out += 'Horizontal Eye Opening: ' + eye_width_ps.toFixed(2) + ' ps (' + eye_width_ui.toFixed(3) + ' UI)\n';
      out += 'Eye Opening Percentage: ' + eye_open_pct.toFixed(2) + '%\n';
      out += 'Link Status           : ' + (eye_open_pct > 50 ? 'PASS (Open Eye)' : 'FAIL (Eye Closed / High BER)');
      return { out: out, msg: 'Eye diagram parameters evaluated successfully.' };
    
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
    var inputs = ['data-rate-gbps', 'tj-ps', 'eye-height-mv'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
