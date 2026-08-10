(function() {
  'use strict';
  var slug = 'hemisphere-calculator';
  var rEl = document.getElementById(slug + '-input');
  var piEl = document.getElementById(slug + '-pi');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var r = parseFloat(rEl.value);
    if (isNaN(r)) { setMsg('Please enter a valid radius.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (r <= 0) { setMsg('Radius must be positive.', true); return; }
    var pi = piEl.value === '22/7' ? 22/7 : 3.14159265;
    var piLabel = piEl.value === '22/7' ? '22/7' : '3.14159265';
    var csa = 2 * pi * r * r;
    var tsa = 3 * pi * r * r;
    var vol = (2/3) * pi * r * r * r;
    var out = 'Hemisphere Calculations (r = ' + r + ', pi = ' + piLabel + ')\n';
    out += '='.repeat(45) + '\n\n';
    out += 'Curved Surface Area (CSA) = 2πr²\n';
    out += 'CSA = ' + csa.toFixed(4) + ' sq units\n\n';
    out += 'Total Surface Area (TSA) = 3πr²\n';
    out += 'TSA = ' + tsa.toFixed(4) + ' sq units\n\n';
    out += 'Volume = (2/3)πr³\n';
    out += 'Volume = ' + vol.toFixed(4) + ' cubic units';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Hemisphere calculations complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { rEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
