(function() {
  'use strict';
  var slug = 'chemical-formula-builder';
  var csEl = document.getElementById(slug + '-cs');
  var cvEl = document.getElementById(slug + '-cv');
  var asEl = document.getElementById(slug + '-as');
  var avEl = document.getElementById(slug + '-av');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function gcd(a, b) { a=Math.abs(a); b=Math.abs(b); while(b){var t=b;b=a%b;a=t;} return a; }
  btn.addEventListener('click', function() {
    var cs = csEl.value.trim(), cv = parseInt(cvEl.value, 10);
    var as = asEl.value.trim(), av = parseInt(avEl.value, 10);
    if (!cs || !as || isNaN(cv) || isNaN(av)) { setMsg('Please enter both symbols and valencies.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (cv <= 0 || av <= 0) { setMsg('Valencies must be positive integers.', true); return; }
    var cSub = av, aSub = cv;
    var g = gcd(cSub, aSub);
    cSub /= g; aSub /= g;
    var cStr = cSub === 1 ? '' : cSub.toString();
    var aStr = aSub === 1 ? '' : aSub.toString();
    var formula = cs + cStr + as + aStr;
    var out = 'Cation: ' + cs + ' (Valency ' + cv + ')\n';
    out += 'Anion: ' + as + ' (Valency ' + av + ')\n\n';
    out += 'Cross-over Method:\n';
    out += 'Initial subscripts: ' + cs + av + ' ' + as + cv + '\n';
    if (g > 1) out += 'Simplified by dividing by ' + g + '\n';
    out += '\nFinal Chemical Formula:\n' + formula;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Formula built successfully.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { csEl.value=''; cvEl.value=''; asEl.value=''; avEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
