(function() {
  'use strict';
  var slug = 'cylinder-calculator';
  var rEl = document.getElementById(slug + '-r');
  var hEl = document.getElementById(slug + '-h');
  var piEl = document.getElementById(slug + '-pi');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var r = parseFloat(rEl.value), h = parseFloat(hEl.value);
    if (isNaN(r) || isNaN(h)) { setMsg('Please enter both radius and height.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (r <= 0 || h <= 0) { setMsg('Radius and height must be positive.', true); return; }
    var pi = piEl.value === '22/7' ? 22/7 : 3.14159265;
    var piLabel = piEl.value === '22/7' ? '22/7' : '3.14159265';
    var csa = 2 * pi * r * h;
    var tsa = 2 * pi * r * (r + h);
    var vol = pi * r * r * h;
    var out = 'Cylinder Calculations (r = ' + r + ', h = ' + h + ', pi = ' + piLabel + ')\n';
    out += '='.repeat(45) + '\n\n';
    out += 'Curved Surface Area (CSA) = 2πrh\n';
    out += 'CSA = ' + csa.toFixed(4) + ' sq units\n\n';
    out += 'Total Surface Area (TSA) = 2πr(r+h)\n';
    out += 'TSA = ' + tsa.toFixed(4) + ' sq units\n\n';
    out += 'Volume = πr²h\n';
    out += 'Volume = ' + vol.toFixed(4) + ' cubic units';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Cylinder calculations complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { rEl.value=''; hEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
