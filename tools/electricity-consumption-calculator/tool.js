(function() {
  'use strict';
  var slug = 'electricity-consumption-calculator';
  var wEl = document.getElementById(slug + '-w');
  var hEl = document.getElementById(slug + '-h');
  var dEl = document.getElementById(slug + '-d');
  var rEl = document.getElementById(slug + '-r');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var w = parseFloat(wEl.value), h = parseFloat(hEl.value), d = parseFloat(dEl.value), r = parseFloat(rEl.value);
    if (isNaN(w) || isNaN(h) || isNaN(d)) { setMsg('Please enter wattage, hours, and days.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (w < 0 || h < 0 || d < 0) { setMsg('Values cannot be negative.', true); return; }
    var wh = w * h * d;
    var kwh = wh / 1000;
    var out = 'Appliance Power: ' + w + ' W\n';
    out += 'Daily Usage: ' + h + ' hours\n';
    out += 'Total Days: ' + d + '\n\n';
    out += 'Total Watt-hours (Wh): ' + wh.toFixed(2) + ' Wh\n';
    out += 'Total Units Consumed (kWh): ' + kwh.toFixed(3) + ' units\n';
    if (!isNaN(r) && r >= 0) {
      var cost = kwh * r;
      out += '\nEstimated Cost: ' + cost.toFixed(2) + ' (at ' + r + ' per unit)\n\n';
      out += 'Note: Actual bills may include fixed charges, taxes, and slab-based tariffs.';
    } else {
      out += '\nEnter a tariff rate to see the estimated cost.';
    }
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Consumption calculated.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { wEl.value=''; hEl.value=''; dEl.value=''; rEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
