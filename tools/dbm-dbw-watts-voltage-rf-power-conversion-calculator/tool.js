(function() {
  'use strict';
  var slug = 'dbm-dbw-watts-voltage-rf-power-conversion-calculator';

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

      var v = parseFloat(el('val').value);
      var unit = el('unit').value;
      if (isNaN(v)) return { err: 'Please enter a valid numerical value.' };
      var dbm = 0;
      if (unit === 'dbm') dbm = v;
      else if (unit === 'dbw') dbm = v + 30;
      else if (unit === 'w') {
        if (v <= 0) return { err: 'Watts must be greater than zero.' };
        dbm = 10 * Math.log10(v) + 30;
      } else if (unit === 'mw') {
        if (v <= 0) return { err: 'Milliwatts must be greater than zero.' };
        dbm = 10 * Math.log10(v);
      } else if (unit === 'vrms') {
        if (v <= 0) return { err: 'Voltage must be greater than zero.' };
        var p_w = (v * v) / 50;
        dbm = 10 * Math.log10(p_w) + 30;
      }
      var dbw = dbm - 30;
      var mw = Math.pow(10, dbm / 10);
      var w = mw / 1000;
      var vrms = Math.sqrt(w * 50);
      var vpp = vrms * 2 * Math.sqrt(2);
      var out = 'RF POWER & VOLTAGE EQUIVALENTS (50 Ω Load)\n';
      out += '============================================\n';
      out += 'Input: ' + v + ' ' + unit.toUpperCase() + '\n\n';
      out += 'RESULTS:\n';
      out += 'dBm                   : ' + dbm.toFixed(2) + ' dBm\n';
      out += 'dBW                   : ' + dbw.toFixed(2) + ' dBW\n';
      out += 'Watts (W)             : ' + (w >= 0.001 ? w.toFixed(4) : w.toExponential(4)) + ' W\n';
      out += 'Milliwatts (mW)       : ' + (mw >= 0.01 ? mw.toFixed(4) : mw.toExponential(4)) + ' mW\n';
      out += 'Voltage (Vrms @ 50 Ω) : ' + vrms.toFixed(4) + ' V\n';
      out += 'Peak-to-Peak (Vpp @ 50Ω): ' + vpp.toFixed(4) + ' Vpp';
      return { out: out, msg: 'RF power units converted successfully.' };
    
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
    var inputs = ['val', 'unit'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
