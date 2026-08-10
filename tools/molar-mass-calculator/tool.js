(function() {
  'use strict';
  var slug = 'molar-mass-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  var MASS = {H:1.008,He:4.003,Li:6.941,Be:9.012,B:10.81,C:12.011,N:14.007,O:15.999,F:18.998,Ne:20.180,Na:22.990,Mg:24.305,Al:26.982,Si:28.086,P:30.974,S:32.06,Cl:35.45,Ar:39.948,K:39.098,Ca:40.078,Ti:47.867,Cr:51.996,Mn:54.938,Fe:55.845,Co:58.933,Ni:58.693,Cu:63.546,Zn:65.38,Br:79.904,Ag:107.868,I:126.904,Au:196.967,Pb:207.2};
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function parseFormula(formula) {
    var counts = {};
    var i = 0;
    function parseGroup(mult) {
      while (i < formula.length) {
        var ch = formula[i];
        if (ch === '(') {
          i++;
          parseGroup(mult);
        } else if (ch === ')') {
          i++;
          var numStr = '';
          while (i < formula.length && /\d/.test(formula[i])) { numStr += formula[i]; i++; }
          var num = numStr ? parseInt(numStr, 10) : 1;
          mult *= num;
          return;
        } else if (/[A-Z]/.test(ch)) {
          var symbol = ch; i++;
          while (i < formula.length && /[a-z]/.test(formula[i])) { symbol += formula[i]; i++; }
          var numStr2 = '';
          while (i < formula.length && /\d/.test(formula[i])) { numStr2 += formula[i]; i++; }
          var count = numStr2 ? parseInt(numStr2, 10) : 1;
          if (!MASS[symbol]) { throw new Error('Unknown element: ' + symbol); }
          counts[symbol] = (counts[symbol] || 0) + count * mult;
        } else {
          i++;
        }
      }
    }
    parseGroup(1);
    return counts;
  }
  btn.addEventListener('click', function() {
    var formula = inputEl.value.trim();
    if (!formula) { setMsg('Please enter a chemical formula.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    try {
      var counts = parseFormula(formula);
      var total = 0, lines = [];
      for (var el in counts) {
        var mass = MASS[el] * counts[el];
        total += mass;
        lines.push(el + ': ' + counts[el] + ' x ' + MASS[el] + ' = ' + mass.toFixed(3));
      }
      var out = 'Formula: ' + formula + '\n\n' + lines.join('\n') + '\n\nMolar Mass = ' + total.toFixed(3) + ' g/mol';
      outputEl.value = out;
      copyBtn.disabled = false;
      setMsg('Molar mass calculated successfully.');
    } catch(e) {
      setMsg('Error: ' + e.message, true);
      outputEl.value = '';
      copyBtn.disabled = true;
    }
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter a chemical formula above.');
  });
})();
