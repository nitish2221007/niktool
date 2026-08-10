(function() {
  'use strict';
  var slug = 'fraction-calculator';
  var aEl = document.getElementById(slug + '-input');
  var opEl = document.getElementById(slug + '-op');
  var bEl = document.getElementById(slug + '-b');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function parseFraction(str) {
    var parts = str.trim().split('/');
    if (parts.length !== 2) return null;
    var num = parseFloat(parts[0]), den = parseFloat(parts[1]);
    if (isNaN(num) || isNaN(den)) return null;
    return { num: num, den: den };
  }
  function gcd(a, b) { a=Math.abs(a); b=Math.abs(b); while(b){var t=b;b=a%b;a=t;} return a; }
  function simplify(num, den) {
    if (den === 0) return null;
    if (num === 0) return { num: 0, den: 1 };
    var g = gcd(Math.abs(num), Math.abs(den));
    num = num / g; den = den / g;
    if (den < 0) { num = -num; den = -den; }
    return { num: num, den: den };
  }
  btn.addEventListener('click', function() {
    var a = parseFraction(aEl.value), b = parseFraction(bEl.value);
    if (!a) { setMsg('Enter Fraction A as numerator/denominator.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (!b) { setMsg('Enter Fraction B as numerator/denominator.', true); return; }
    if (a.den === 0 || b.den === 0) { setMsg('Denominator cannot be zero.', true); return; }
    var op = opEl.value;
    var rNum, rDen;
    if (op === '+') { rNum = a.num*b.den + b.num*a.den; rDen = a.den*b.den; }
    else if (op === '-') { rNum = a.num*b.den - b.num*a.den; rDen = a.den*b.den; }
    else if (op === '*') { rNum = a.num*b.num; rDen = a.den*b.den; }
    else {
      if (b.num === 0) { setMsg('Cannot divide by zero fraction.', true); return; }
      rNum = a.num*b.den; rDen = a.den*b.num;
    }
    var result = simplify(rNum, rDen);
    if (!result) { setMsg('Result has zero denominator.', true); return; }
    var opSymbol = op === '*' ? 'x' : op;
    var out = a.num + '/' + a.den + ' ' + opSymbol + ' ' + b.num + '/' + b.den + '\n\n';
    out += 'Raw result: ' + rNum + '/' + rDen + '\n';
    out += 'Simplified: ' + result.num + '/' + result.den + '\n';
    out += 'Decimal: ' + (result.num / result.den).toFixed(6) + '\n';
    if (Math.abs(result.num) > Math.abs(result.den) && result.den !== 1) {
      var whole = Math.floor(Math.abs(result.num) / Math.abs(result.den));
      var rem = Math.abs(result.num) % Math.abs(result.den);
      var sign = result.num < 0 ? '-' : '';
      out += 'Mixed number: ' + sign + whole + ' ' + rem + '/' + Math.abs(result.den);
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Fraction calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { aEl.value=''; bEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
