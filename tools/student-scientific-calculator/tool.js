(function() {
  'use strict';
  var slug = 'student-scientific-calculator';
  var inputEl = document.getElementById(slug + '-input');
  var modeEl = document.getElementById(slug + '-mode');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  function safeEval(expr, angleMode) {
    var toRad = angleMode === 'deg' ? '(Math.PI/180)*' : '';
    var fromRad = angleMode === 'deg' ? '(180/Math.PI)*' : '';
    var s = expr;
    s = s.replace(/\bPI\b/gi, 'Math.PI');
    s = s.replace(/\bE\b/g, 'Math.E');
    s = s.replace(/\bsin\(/gi, 'Math.sin(' + toRad + '(');
    s = s.replace(/\bcos\(/gi, 'Math.cos(' + toRad + '(');
    s = s.replace(/\btan\(/gi, 'Math.tan(' + toRad + '(');
    s = s.replace(/\basin\(/gi, fromRad + 'Math.asin(');
    s = s.replace(/\bacos\(/gi, fromRad + 'Math.acos(');
    s = s.replace(/\batan\(/gi, fromRad + 'Math.atan(');
    s = s.replace(/\bsqrt\(/gi, 'Math.sqrt(');
    s = s.replace(/\babs\(/gi, 'Math.abs(');
    s = s.replace(/\blog\(/gi, 'Math.log10(');
    s = s.replace(/\bln\(/gi, 'Math.log(');
    s = s.replace(/\bexp\(/gi, 'Math.exp(');
    s = s.replace(/\bpow\(/gi, 'Math.pow(');
    s = s.replace(/\bmin\(/gi, 'Math.min(');
    s = s.replace(/\bmax\(/gi, 'Math.max(');
    s = s.replace(/\^/g, '**');
    if (/[^0-9+\-*/().,%\s]/.test(s.replace(/Math\.\w+/g, ''))) {
      throw new Error('Invalid characters in expression.');
    }
    try {
      var result = new Function('return (' + s + ')')();
      if (typeof result !== 'number' || isNaN(result)) throw new Error('Result is not a valid number.');
      return result;
    } catch(e) {
      throw new Error('Could not evaluate expression. Check syntax.');
    }
  }

  btn.addEventListener('click', function() {
    var expr = inputEl.value.trim();
    if (!expr) { setMsg('Please enter an expression.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    try {
      var result = safeEval(expr, modeEl.value);
      var out = 'Expression: ' + expr + '\n';
      out += 'Angle Mode: ' + (modeEl.value === 'deg' ? 'Degrees' : 'Radians') + '\n\n';
      out += 'Result: ' + result + '\n';
      out += 'Rounded (4 dp): ' + result.toFixed(4);
      outputEl.value = out;
      copyBtn.disabled = false;
      setMsg('Calculation complete.');
    } catch(e) {
      setMsg('Error: ' + e.message, true);
      outputEl.value = '';
      copyBtn.disabled = true;
    }
  });

  inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
  });

  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
