(function() {
  'use strict';
  var slug = 'trigonometry-ratio-calculator';
  var angleEl = document.getElementById(slug + '-input');
  var unitEl = document.getElementById(slug + '-unit');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function fmt(v) {
    if (!isFinite(v)) return 'Undefined';
    var r = Math.round(v * 1e6) / 1e6;
    if (Math.abs(r) < 1e-9) r = 0;
    return r.toFixed(6).replace(/\.?0+$/, '');
  }
  btn.addEventListener('click', function() {
    var angle = parseFloat(angleEl.value);
    if (isNaN(angle)) { setMsg('Please enter a valid angle.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var rad = unitEl.value === 'deg' ? angle * Math.PI / 180 : angle;
    var sin = Math.sin(rad), cos = Math.cos(rad), tan = Math.tan(rad);
    var out = 'Angle: ' + angle + ' ' + (unitEl.value === 'deg' ? 'degrees' : 'radians') + '\n\n';
    out += 'sin = ' + fmt(sin) + '\n';
    out += 'cos = ' + fmt(cos) + '\n';
    out += 'tan = ' + fmt(Math.abs(cos) < 1e-12 ? Infinity : tan) + '\n\n';
    out += 'cosec = ' + fmt(Math.abs(sin) < 1e-12 ? Infinity : 1/sin) + '\n';
    out += 'sec = ' + fmt(Math.abs(cos) < 1e-12 ? Infinity : 1/cos) + '\n';
    out += 'cot = ' + fmt(Math.abs(sin) < 1e-12 ? Infinity : 1/tan);
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Trigonometric ratios calculated.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    angleEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter an angle above.');
  });
})();
