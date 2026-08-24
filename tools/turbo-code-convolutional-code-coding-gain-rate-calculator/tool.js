(function() {
  'use strict';
  var slug = 'turbo-code-convolutional-code-coding-gain-rate-calculator';

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

      var r = parseFloat(el('code-rate').value);
      var K = parseInt(el('constraint-k').value, 10);
      if (isNaN(r) || r <= 0 || r >= 1 || isNaN(K) || K < 3) {
        return { err: 'Code rate r must be between 0 and 1, and constraint length K >= 3.' };
      }
      var dfree = Math.max(5, 2 * (K - 1) + 1);
      var coding_gain_db = 10 * Math.log10(r * dfree);
      var bw_expand = 1 / r;
      var rate_penalty_db = -10 * Math.log10(r);
      var out = 'CONVOLUTIONAL & TURBO FEC CODING ANALYSIS\n';
      out += '==========================================\n';
      out += 'Code Rate (r)         : ' + r + ' (Rate 1/' + (1/r).toFixed(2) + ')\n';
      out += 'Constraint Length (K) : ' + K + '\n\n';
      out += 'RESULTS:\n';
      out += 'Approx Free Distance (dfree): ' + dfree + '\n';
      out += 'Asymptotic Coding Gain: ' + coding_gain_db.toFixed(2) + ' dB\n';
      out += 'Bandwidth Expansion   : ' + bw_expand.toFixed(2) + 'x\n';
      out += 'Spectral Penalty      : ' + rate_penalty_db.toFixed(2) + ' dB';
      return { out: out, msg: 'FEC coding gain calculated successfully.' };
    
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
    var inputs = ['code-rate', 'constraint-k'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
