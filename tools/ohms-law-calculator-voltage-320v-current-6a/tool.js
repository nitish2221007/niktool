(function() {
  'use strict';
  var slug = 'ohms-law-calculator-voltage-320v-current-6a';
  var subType = 'ee_ohms';
  var config = {"volt":320,"current":6,"resistance":"53.33","power":"1920.0"};

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
      if (subType === 'ee_ohms') {
        res = 'Voltage (V): ' + config.volt + ' V\nCurrent (I): ' + config.current + ' A\nResistance (R): ' + config.resistance + ' Ω\nElectric Power (P): ' + config.power + ' W';
      } else if (subType === 'mech_torque') {
        res = 'Power: ' + config.powerKw + ' kW\nSpeed: ' + config.rpm + ' RPM\nCalculated Torque: ' + config.torqueNm + ' N·m';
      } else if (subType === 'civil_beam') {
        res = 'Span: ' + config.spanM + ' m\nLoad: ' + config.loadKnM + ' kN/m\nMax Bending Moment: ' + config.maxBmMoment + ' kN·m';
      } else if (subType === 'cs_download') {
        res = 'File Size: ' + config.fileSizeGb + ' GB\nSpeed: ' + config.speedMbps + ' Mbps\nDownload Time: ' + config.downloadSeconds + ' seconds';
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
