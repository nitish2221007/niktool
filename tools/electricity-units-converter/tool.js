(function() {
  'use strict';
  var slug = 'electricity-units-converter';
  var valueEl = document.getElementById(slug + '-input');
  var fromEl = document.getElementById(slug + '-from');
  var toEl = document.getElementById(slug + '-to');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  // Convert everything to a base unit for comparison
  // Power units: W, kW, MW (power)
  // Energy units: J, kJ, kWh (energy)
  // We separate power and energy to avoid invalid conversions
  var powerUnits = { W: 1, kW: 1000, MW: 1000000 };
  var energyUnits = { J: 1, kJ: 1000, kWh: 3600000 };

  btn.addEventListener('click', function() {
    var val = parseFloat(valueEl.value);
    if (isNaN(val)) { setMsg('Please enter a valid number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var from = fromEl.value, to = toEl.value;
    var isFromPower = from in powerUnits;
    var isToPower = to in powerUnits;
    var isFromEnergy = from in energyUnits;
    var isToEnergy = to in energyUnits;

    if ((isFromPower && isToEnergy) || (isFromEnergy && isToPower)) {
      setMsg('Cannot convert between power (W/kW/MW) and energy (J/kJ/kWh) directly. They measure different things.', true);
      outputEl.value = '';
      copyBtn.disabled = true;
      return;
    }

    var result;
    if (isFromPower && isToPower) {
      var baseW = val * powerUnits[from];
      result = baseW / powerUnits[to];
    } else {
      var baseJ = val * energyUnits[from];
      result = baseJ / energyUnits[to];
    }

    var out = val + ' ' + from + ' = ' + result.toFixed(6) + ' ' + to + '\n\n';
    out += 'All equivalents:\n';
    if (isFromPower) {
      var w = val * powerUnits[from];
      out += 'Watts: ' + (w / powerUnits.W).toFixed(4) + ' W\n';
      out += 'Kilowatts: ' + (w / powerUnits.kW).toFixed(6) + ' kW\n';
      out += 'Megawatts: ' + (w / powerUnits.MW).toFixed(9) + ' MW';
    } else {
      var j = val * energyUnits[from];
      out += 'Joules: ' + (j / energyUnits.J).toFixed(2) + ' J\n';
      out += 'Kilojoules: ' + (j / energyUnits.kJ).toFixed(4) + ' kJ\n';
      out += 'Kilowatt-hours: ' + (j / energyUnits.kWh).toFixed(6) + ' kWh';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Conversion complete.');
  });

  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { valueEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
