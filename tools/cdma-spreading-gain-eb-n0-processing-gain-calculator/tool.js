(function() {
  'use strict';
  var slug = 'cdma-spreading-gain-eb-n0-processing-gain-calculator';

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

      var Rc = parseFloat(el('rc').value) * 1e6;
      var Rb = parseFloat(el('rb').value) * 1e3;
      var ebn0 = parseFloat(el('ebn0').value);
      if (isNaN(Rc) || Rc <= 0 || isNaN(Rb) || Rb <= 0 || isNaN(ebn0)) {
        return { err: 'Please enter valid numbers for chip rate, data rate, and Eb/N0.' };
      }
      var sf = Rc / Rb;
      var gp_db = 10 * Math.log10(sf);
      var snr_req_db = ebn0 - gp_db;
      var out = 'CDMA SPREADING & PROCESSING GAIN ANALYSIS\n';
      out += '=========================================\n';
      out += 'Chip Rate (Rc)         : ' + (Rc/1e6).toFixed(3) + ' Mcps\n';
      out += 'Data Rate (Rb)         : ' + (Rb/1e3).toFixed(2) + ' kbps\n';
      out += 'Required Eb/N0         : ' + ebn0.toFixed(2) + ' dB\n\n';
      out += 'RESULTS:\n';
      out += 'Spreading Factor (SF)  : ' + sf.toFixed(2) + ' chips/bit\n';
      out += 'Processing Gain (Gp)   : ' + gp_db.toFixed(2) + ' dB\n';
      out += 'Required System SNR    : ' + snr_req_db.toFixed(2) + ' dB';
      return { out: out, msg: 'CDMA processing gain computed successfully.' };
    
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
    var inputs = ['rc', 'rb', 'ebn0'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
