(function() {
  'use strict';
  var slug = 'bmi-calculator-height-186cm-weight-45kg';
  var subType = 'health_bmi';
  var config = {"heightCm":186,"weightKg":45,"bmi":"13.0"};

  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) {
    msgEl.textContent = t;
    msgEl.classList.toggle('is-error', !!err);
  }

  function process() {
    var raw = inputEl.value;
    try {
      var res = '';
      if (subType === 'health_bmi') {
        res = 'Height: ' + config.heightCm + ' cm\nWeight: ' + config.weightKg + ' kg\nCalculated BMI: ' + config.bmi;
      } else if (subType === 'health_bmr') {
        res = 'Age: ' + config.age + ' years (' + config.gender + ')\nBasal Metabolic Rate: ' + config.bmr + ' kcal/day';
      } else if (subType === 'travel_fuel') {
        res = 'Distance: ' + config.distanceKm + ' km\nMileage: ' + config.mileageKmpl + ' km/l\nFuel Needed: ' + config.fuelLiters + ' Liters\nEstimated Cost: ₹' + config.costRs;
      } else if (subType === 'time_age') {
        res = 'Birth Year: ' + config.birthYear + '\nAge in 2026: ' + config.ageYears + ' years old';
      } else if (subType === 'unit_conv') {
        var v = parseFloat(raw) || config.val;
        res = v + ' ' + config.from + ' = ' + config.res;
      } else {
        res = raw ? 'Processed: ' + raw : 'Result calculated.';
      }

      outputEl.value = res;
      setMsg('Processed successfully.');
    } catch(e) {
      setMsg('Error: ' + e.message, true);
    }
  }

  btn.addEventListener('click', process);

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outputEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = '';
    setMsg('Cleared. Enter input above.');
  });
})();
