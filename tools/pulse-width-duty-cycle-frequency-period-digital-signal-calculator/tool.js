(function() {
  'use strict';
  var slug = 'pulse-width-duty-cycle-frequency-period-digital-signal-calculator';

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

      var f_khz = parseFloat(el('freq-khz').value);
      var duty = parseFloat(el('duty-pct').value);
      if (isNaN(f_khz) || f_khz <= 0 || isNaN(duty) || duty <= 0 || duty >= 100) {
        return { err: 'Frequency must be > 0 and Duty Cycle between 0% and 100%.' };
      }
      var f_hz = f_khz * 1000;
      var T_sec = 1 / f_hz;
      var T_ms = T_sec * 1000;
      var T_us = T_sec * 1e6;
      var Thigh_ms = T_ms * (duty / 100);
      var Tlow_ms = T_ms - Thigh_ms;
      var out = 'DIGITAL SIGNAL & PWM TIMING ANALYSIS\n';
      out += '====================================\n';
      out += 'Frequency (f)         : ' + f_khz + ' kHz (' + f_hz + ' Hz)\n';
      out += 'Duty Cycle (D)        : ' + duty + '%\n\n';
      out += 'RESULTS:\n';
      out += 'Total Period (T)      : ' + T_ms.toFixed(4) + ' ms (' + T_us.toFixed(2) + ' µs)\n';
      out += 'High Pulse Width (Thigh): ' + Thigh_ms.toFixed(4) + ' ms (' + (Thigh_ms*1000).toFixed(2) + ' µs)\n';
      out += 'Low Pulse Width (Tlow) : ' + Tlow_ms.toFixed(4) + ' ms (' + (Tlow_ms*1000).toFixed(2) + ' µs)';
      return { out: out, msg: 'PWM signal timing calculated successfully.' };
    
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
    var inputs = ['freq-khz', 'duty-pct'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
