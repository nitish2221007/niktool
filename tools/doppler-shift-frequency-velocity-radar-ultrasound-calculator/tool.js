(function() {
  'use strict';
  var slug = 'doppler-shift-frequency-velocity-radar-ultrasound-calculator';

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

      var f0_ghz = parseFloat(el('freq-ghz').value);
      var v_kmh = parseFloat(el('velocity-kmh').value);
      var theta_deg = parseFloat(el('angle-deg').value);
      if (isNaN(f0_ghz) || f0_ghz <= 0 || isNaN(v_kmh) || isNaN(theta_deg)) {
        return { err: 'Please enter valid numerical values for carrier frequency, velocity, and angle.' };
      }
      var c = 3e8;
      var f0 = f0_ghz * 1e9;
      var v_ms = v_kmh / 3.6;
      var theta_rad = theta_deg * Math.PI / 180;
      var delta_f = (2 * v_ms * f0 * Math.cos(theta_rad)) / c;
      var out = 'RADAR & ULTRASOUND DOPPLER SHIFT ANALYSIS\n';
      out += '=========================================\n';
      out += 'Carrier Frequency (f0): ' + f0_ghz + ' GHz\n';
      out += 'Target Velocity (v)   : ' + v_kmh + ' km/h (' + v_ms.toFixed(2) + ' m/s)\n';
      out += 'Observation Angle (θ) : ' + theta_deg + '°\n\n';
      out += 'RESULTS:\n';
      out += 'Doppler Shift (Δf)    : ' + delta_f.toFixed(2) + ' Hz (' + (delta_f/1000).toFixed(4) + ' kHz)\n';
      out += 'Radial Velocity Component: ' + (v_ms * Math.cos(theta_rad)).toFixed(2) + ' m/s\n';
      out += 'Target Direction      : ' + (delta_f >= 0 ? 'Approaching (+ shift)' : 'Receding (- shift)');
      return { out: out, msg: 'Doppler frequency shift computed successfully.' };
    
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
    var inputs = ['freq-ghz', 'velocity-kmh', 'angle-deg'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
