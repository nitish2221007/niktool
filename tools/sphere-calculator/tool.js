(function() {
  'use strict';
  var slug = 'sphere-calculator';
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
    var area = 4 * pi * r * r;
    var vol = (4/3) * pi * r * r * r;
    var out = 'Sphere Calculations (r = ' + r + ', pi = ' + piLabel + ')\n';
    out += '='.repeat(40) + '\n\n';
    out += 'Surface Area = 4πr²\n';
    out += 'Surface Area = ' + area.toFixed(4) + ' sq units\n\n';
    out += 'Volume = (4/3)πr³\n';
    out += 'Volume = ' + vol.toFixed(4) + ' cubic units\n\n';
    out += 'Diameter = ' + (2*r).toFixed(4);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Sphere calculations complete.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { rEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
