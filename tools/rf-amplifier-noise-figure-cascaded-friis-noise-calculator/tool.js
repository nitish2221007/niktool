(function() {
  'use strict';
  var slug = 'rf-amplifier-noise-figure-cascaded-friis-noise-calculator';

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

      var g1 = parseFloat(el('g1-db').value);
      var nf1 = parseFloat(el('nf1-db').value);
      var g2 = parseFloat(el('g2-db').value);
      var nf2 = parseFloat(el('nf2-db').value);
      var g3 = parseFloat(el('g3-db').value);
      var nf3 = parseFloat(el('nf3-db').value);
      if ([g1, nf1, g2, nf2, g3, nf3].some(isNaN)) {
        return { err: 'Please enter valid numerical values for all stage gains and noise figures.' };
      }
      var f1 = Math.pow(10, nf1 / 10);
      var f2 = Math.pow(10, nf2 / 10);
      var f3 = Math.pow(10, nf3 / 10);
      var g1_lin = Math.pow(10, g1 / 10);
      var g2_lin = Math.pow(10, g2 / 10);
      var f_sys = f1 + ((f2 - 1) / g1_lin) + ((f3 - 1) / (g1_lin * g2_lin));
      var nf_sys = 10 * Math.log10(f_sys);
      var g_sys = g1 + g2 + g3;
      var out = 'CASCADED RF NOISE FIGURE (FRIIS FORMULA) ANALYSIS\n';
      out += '================================================\n';
      out += 'Stage 1: Gain = ' + g1 + ' dB, NF = ' + nf1 + ' dB\n';
      out += 'Stage 2: Gain = ' + g2 + ' dB, NF = ' + nf2 + ' dB\n';
      out += 'Stage 3: Gain = ' + g3 + ' dB, NF = ' + nf3 + ' dB\n\n';
      out += 'RESULTS:\n';
      out += 'Overall System Gain   : ' + g_sys.toFixed(2) + ' dB\n';
      out += 'Cascaded Noise Factor : ' + f_sys.toFixed(4) + '\n';
      out += 'Cascaded Noise Figure : ' + nf_sys.toFixed(2) + ' dB';
      return { out: out, msg: 'Cascaded noise figure computed successfully.' };
    
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
    var inputs = ['g1-db', 'nf1-db', 'g2-db', 'nf2-db', 'g3-db', 'nf3-db'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
