(function() {
  'use strict';
  var slug = 'shannon-hartley-channel-capacity-snr-bandwidth-calculator';

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

      var B_mhz = parseFloat(el('bw-mhz').value);
      var snr_db = parseFloat(el('snr-db').value);
      if (isNaN(B_mhz) || B_mhz <= 0 || isNaN(snr_db)) {
        return { err: 'Please enter a positive bandwidth and valid SNR in dB.' };
      }
      var snr_lin = Math.pow(10, snr_db / 10);
      var cap_mbps = B_mhz * Math.log2(1 + snr_lin);
      var eff = cap_mbps / B_mhz;
      var out = 'SHANNON-HARTLEY CHANNEL CAPACITY ANALYSIS\n';
      out += '=========================================\n';
      out += 'Channel Bandwidth (B) : ' + B_mhz + ' MHz\n';
      out += 'SNR                   : ' + snr_db + ' dB (Linear: ' + snr_lin.toFixed(2) + ')\n\n';
      out += 'RESULTS:\n';
      out += 'Spectral Efficiency   : ' + eff.toFixed(3) + ' bits/sec/Hz\n';
      out += 'Theoretical Max Rate  : ' + cap_mbps.toFixed(2) + ' Mbps (' + (cap_mbps/1000).toFixed(3) + ' Gbps)';
      return { out: out, msg: 'Shannon channel capacity calculated successfully.' };
    
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
    var inputs = ['bw-mhz', 'snr-db'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
