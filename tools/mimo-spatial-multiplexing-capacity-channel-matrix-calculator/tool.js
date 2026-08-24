(function() {
  'use strict';
  var slug = 'mimo-spatial-multiplexing-capacity-channel-matrix-calculator';

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

      var Nt = parseInt(el('nt').value, 10);
      var Nr = parseInt(el('nr').value, 10);
      var snr_db = parseFloat(el('snr-db').value);
      var bw_mhz = parseFloat(el('bw-mhz').value);
      if (isNaN(Nt) || Nt <= 0 || isNaN(Nr) || Nr <= 0 || isNaN(snr_db) || isNaN(bw_mhz) || bw_mhz <= 0) {
        return { err: 'Please enter valid positive numbers for antennas, SNR, and bandwidth.' };
      }
      var min_n = Math.min(Nt, Nr);
      var snr_lin = Math.pow(10, snr_db / 10);
      var spectral_eff = min_n * Math.log2(1 + (snr_lin / Nt));
      var cap_mbps = spectral_eff * bw_mhz;
      var out = 'MIMO SPATIAL MULTIPLEXING CAPACITY ANALYSIS\n';
      out += '============================================\n';
      out += 'Tx Antennas (Nt)      : ' + Nt + '\n';
      out += 'Rx Antennas (Nr)      : ' + Nr + ' (Spatial Streams = ' + min_n + ')\n';
      out += 'Average SNR           : ' + snr_db + ' dB\n';
      out += 'Bandwidth             : ' + bw_mhz + ' MHz\n\n';
      out += 'RESULTS:\n';
      out += 'Spectral Efficiency   : ' + spectral_eff.toFixed(2) + ' bps/Hz\n';
      out += 'MIMO Channel Capacity : ' + cap_mbps.toFixed(2) + ' Mbps (' + (cap_mbps/1000).toFixed(3) + ' Gbps)';
      return { out: out, msg: 'MIMO capacity calculated successfully.' };
    
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
    var inputs = ['nt', 'nr', 'snr-db', 'bw-mhz'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
