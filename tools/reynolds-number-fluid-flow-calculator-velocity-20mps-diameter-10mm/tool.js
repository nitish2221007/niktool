(function() {
  'use strict';
  var slug = 'reynolds-number-fluid-flow-calculator-velocity-20mps-diameter-10mm';
  var subType = 'mech_reynolds';
  var config = {"velocityMps":20,"diaMm":10,"reynolds":200000,"flowType":"Turbulent"};

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
      } else if (subType === 'ee_resistor') {
        res = 'R1: ' + config.r1 + ' Ω, R2: ' + config.r2 + ' Ω\nSeries Equivalent: ' + config.series + ' Ω\nParallel Equivalent: ' + config.parallel + ' Ω';
      } else if (subType === 'mech_torque') {
        res = 'Power: ' + config.powerKw + ' kW\nSpeed: ' + config.rpm + ' RPM\nCalculated Torque: ' + config.torqueNm + ' N·m';
      } else if (subType === 'civil_concrete') {
        res = 'Volume: ' + config.volumeM3 + ' m³ (' + config.grade + ')\nCement Bags Needed: ~' + config.cementBags + ' bags';
      } else if (subType === 'civil_rebar') {
        res = 'Rebar Dia: ' + config.diaMm + ' mm\nLength: ' + config.lengthM + ' m\nTotal Weight: ' + config.weightKg + ' kg';
      } else if (subType === 'cs_download') {
        res = 'File Size: ' + config.fileSizeGb + ' GB\nBandwidth Speed: ' + config.speedMbps + ' Mbps\nEstimated Download Time: ' + config.downloadSeconds + ' seconds';
      } else if (subType === 'aero_mach') {
        res = 'Airspeed: ' + config.velocityMps + ' m/s\nMach Number: Mach ' + config.machNumber + '\nFlight Regime: ' + config.flightRegime;
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
