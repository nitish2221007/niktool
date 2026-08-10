(function() {
  'use strict';
  var slug = 'temperature-converter';
  var valueEl = document.getElementById(slug + '-input');
  var fromEl = document.getElementById(slug + '-from');
  var toEl = document.getElementById(slug + '-to');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  function toCelsius(val, unit) {
    if (unit === 'C') return val;
    if (unit === 'F') return (val - 32) * 5 / 9;
    if (unit === 'K') return val - 273.15;
    return val;
  }
  function fromCelsius(val, unit) {
    if (unit === 'C') return val;
    if (unit === 'F') return val * 9 / 5 + 32;
    if (unit === 'K') return val + 273.15;
    return val;
  }

  btn.addEventListener('click', function() {
    var val = parseFloat(valueEl.value);
    if (isNaN(val)) { setMsg('Please enter a valid temperature.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var from = fromEl.value;
    var to = toEl.value;
    if (from === 'K' && val < 0) { setMsg('Kelvin cannot be negative.', true); return; }
    var celsius = toCelsius(val, from);
    var result = fromCelsius(celsius, to);
    var symbols = { C: '°C', F: '°F', K: 'K' };
    var out = val + ' ' + symbols[from] + ' = ' + result.toFixed(2) + ' ' + symbols[to] + '\n\n';
    out += 'All three scales:\n';
    out += 'Celsius: ' + celsius.toFixed(2) + ' °C\n';
    out += 'Fahrenheit: ' + fromCelsius(celsius, 'F').toFixed(2) + ' °F\n';
    out += 'Kelvin: ' + fromCelsius(celsius, 'K').toFixed(2) + ' K';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Temperature converted.');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied.');
  });
  clearBtn.addEventListener('click', function() {
    valueEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared.');
  });
})();
