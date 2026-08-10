(function() {
  'use strict';
  var slug = 'unit-converter';
  var valueEl = document.getElementById(slug + '-input');
  var catEl = document.getElementById(slug + '-category');
  var fromEl = document.getElementById(slug + '-from');
  var toEl = document.getElementById(slug + '-to');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  var units = {
    length: { 'metre': 1, 'kilometre': 1000, 'centimetre': 0.01, 'millimetre': 0.001, 'mile': 1609.344, 'yard': 0.9144, 'foot': 0.3048, 'inch': 0.0254 },
    mass: { 'kilogram': 1, 'gram': 0.001, 'milligram': 0.000001, 'tonne': 1000, 'pound': 0.453592, 'ounce': 0.0283495 },
    speed: { 'm/s': 1, 'km/h': 0.277778, 'mph': 0.44704, 'knot': 0.514444 },
    area: { 'sq metre': 1, 'sq kilometre': 1000000, 'sq foot': 0.092903, 'sq yard': 0.836127, 'acre': 4046.86, 'hectare': 10000 },
    volume: { 'litre': 1, 'millilitre': 0.001, 'cubic metre': 1000, 'gallon (US)': 3.78541, 'cubic foot': 28.3168 }
  };

  function populateUnits() {
    var cat = catEl.value;
    fromEl.innerHTML = '';
    toEl.innerHTML = '';
    var unitNames = Object.keys(units[cat]);
    unitNames.forEach(function(u) {
      fromEl.innerHTML += '<option value="' + u + '">' + u + '</option>';
      toEl.innerHTML += '<option value="' + u + '">' + u + '</option>';
    });
    if (unitNames.length > 1) toEl.selectedIndex = 1;
  }

  catEl.addEventListener('change', populateUnits);
  populateUnits();

  btn.addEventListener('click', function() {
    var val = parseFloat(valueEl.value);
    if (isNaN(val)) { setMsg('Please enter a valid number.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var cat = catEl.value;
    var from = fromEl.value;
    var to = toEl.value;
    var baseValue = val * units[cat][from];
    var result = baseValue / units[cat][to];
    var out = 'Category: ' + cat.charAt(0).toUpperCase() + cat.slice(1) + '\n';
    out += val + ' ' + from + ' = ' + result.toFixed(6) + ' ' + to + '\n\n';
    out += 'Conversion factor: 1 ' + from + ' = ' + (units[cat][from] / units[cat][to]).toFixed(6) + ' ' + to;
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Conversion complete.');
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
