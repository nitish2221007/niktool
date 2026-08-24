(function() {
  'use strict';
  var slug = 'korean-salary-net-takehome-calculator-440-man-won';
  var subType = 'kr_salary';
  var config = {"grossMan":440,"approxNet":3874420};

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
      if (subType === 'kr_pyung') {
        res = config.pyung + ' 평 (Pyung) = ' + config.sqMeters + ' m² (Square Meters)';
      } else if (subType === 'kr_don') {
        res = config.don + ' 돈 (Don) = ' + config.grams + ' g (Grams Gold Weight)';
      } else if (subType === 'kr_geun') {
        res = config.geun + ' 근 (Geun) = ' + config.grams + ' g (Grams Meat Weight)';
      } else if (subType === 'kr_age') {
        res = 'Birth Year: ' + config.birthYear + '\nOfficial Korean Civil Age (만 나이): ' + config.officialAge + ' years old';
      } else if (subType === 'kr_salary') {
        res = 'Gross Monthly Salary: ₩' + (config.grossMan * 10000).toLocaleString() + ' KRW\nEstimated Net Take-Home Pay (실수령액): ₩' + config.approxNet.toLocaleString() + ' KRW\n(After 4 Major Insurances 4대보험 & Income Tax)';
      } else if (subType === 'kr_military') {
        res = 'Branch: ' + config.branch + '\nService Duration: ' + config.months + ' months\nDischarge D-Day Countdown Ready.';
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
