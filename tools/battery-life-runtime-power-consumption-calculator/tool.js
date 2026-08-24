(function() {
  'use strict';
  var slug = 'battery-life-runtime-power-consumption-calculator';

  // Elements
  var capNum = document.getElementById('bat-cap-num');
  var capUnit = document.getElementById('bat-cap-unit');
  var capRange = document.getElementById('bat-cap-range');
  var badgeCap = document.getElementById('badge-cap');

  var voltNum = document.getElementById('bat-volt-num');
  var effNum = document.getElementById('bat-eff-num');
  var voltRange = document.getElementById('bat-volt-range');
  var badgeVolt = document.getElementById('badge-volt');

  var loadNum = document.getElementById('bat-load-num');
  var loadUnit = document.getElementById('bat-load-unit');
  var loadRange = document.getElementById('bat-load-range');
  var badgeLoad = document.getElementById('badge-load');

  var sleepNum = document.getElementById('bat-sleep-num');
  var dutyNum = document.getElementById('bat-duty-num');
  var dutyRange = document.getElementById('bat-duty-range');
  var badgeSleep = document.getElementById('badge-sleep');

  var heroRuntime = document.getElementById('battery-hero-runtime');
  var heroSub = document.getElementById('battery-hero-sub');
  var fillBar = document.getElementById('battery-fill-bar');

  var barDutyActive = document.getElementById('bar-duty-active');
  var barDutySleep = document.getElementById('bar-duty-sleep');
  var txtDutyActive = document.getElementById('txt-duty-active');
  var txtDutySleep = document.getElementById('txt-duty-sleep');
  var txtAvgCurrent = document.getElementById('txt-avg-current');

  var statRuntimeHrs = document.getElementById('stat-runtime-hrs');
  var statEnergyWh = document.getElementById('stat-energy-wh');
  var statUsableWh = document.getElementById('stat-usable-wh');
  var statAvgMw = document.getElementById('stat-avg-mw');

  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var calcBtn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  var presetChips = document.querySelectorAll('.preset-chip');

  var presets = {
    iot: { cap: 2500, capUnit: 'mah', volt: 3.7, eff: 85, load: 120, loadUnit: 'ma', sleep: 15, duty: 5 },
    phone: { cap: 4000, capUnit: 'mah', volt: 3.85, eff: 88, load: 450, loadUnit: 'ma', sleep: 25, duty: 40 },
    laptop: { cap: 60, capUnit: 'wh', volt: 11.4, eff: 90, load: 15, loadUnit: 'w', sleep: 50, duty: 70 },
    drone: { cap: 1500, capUnit: 'mah', volt: 14.8, eff: 82, load: 25, loadUnit: 'a', sleep: 0, duty: 100 },
    solar: { cap: 100, capUnit: 'ah', volt: 12.8, eff: 92, load: 100, loadUnit: 'w', sleep: 5, duty: 50 }
  };

  function setMsg(txt, err) {
    msgEl.textContent = txt;
    msgEl.classList.toggle('is-error', !!err);
  }

  function fmtTime(totalHrs) {
    if (isNaN(totalHrs) || totalHrs <= 0) return '0 Hours';
    if (totalHrs < 1) return (totalHrs * 60).toFixed(1) + ' Minutes';
    if (totalHrs < 48) return totalHrs.toFixed(1) + ' Hours';
    var days = Math.floor(totalHrs / 24);
    var remHrs = totalHrs % 24;
    if (days < 365) return days + 'd ' + remHrs.toFixed(1) + 'h (' + totalHrs.toFixed(1) + ' hrs)';
    var yrs = (days / 365.25).toFixed(2);
    return yrs + ' Years (' + totalHrs.toFixed(0) + ' hrs)';
  }

  function calculate() {
    var cVal = parseFloat(capNum.value);
    var cUnit = capUnit.value;
    var vVal = parseFloat(voltNum.value);
    var eff = parseFloat(effNum.value) / 100;
    var lVal = parseFloat(loadNum.value);
    var lUnit = loadUnit.value;
    var sleepUA = parseFloat(sleepNum.value) || 0;
    var dutyActivePct = parseFloat(dutyNum.value) || 100;

    if (isNaN(cVal) || cVal <= 0 || isNaN(vVal) || vVal <= 0 || isNaN(lVal) || lVal < 0) {
      setMsg('Please enter valid positive battery and load parameters.', true);
      return;
    }

    // Convert capacity to mAh & Wh
    var capMAh = 0;
    var capWh = 0;
    if (cUnit === 'mah') {
      capMAh = cVal;
      capWh = (cVal * vVal) / 1000;
    } else if (cUnit === 'wh') {
      capWh = cVal;
      capMAh = (cVal * 1000) / vVal;
    } else if (cUnit === 'ah') {
      capMAh = cVal * 1000;
      capWh = cVal * vVal;
    }

    // Convert active load to mA
    var activeMA = 0;
    if (lUnit === 'ma') activeMA = lVal;
    else if (lUnit === 'a') activeMA = lVal * 1000;
    else if (lUnit === 'w') activeMA = (lVal / vVal) * 1000;
    else if (lUnit === 'mw') activeMA = ((lVal / 1000) / vVal) * 1000;

    var sleepMA = sleepUA / 1000;
    var activeRatio = Math.min(100, Math.max(0, dutyActivePct)) / 100;
    var sleepRatio = 1 - activeRatio;

    // Weighted Average Current Draw (mA)
    var avgMA = (activeMA * activeRatio) + (sleepMA * sleepRatio);
    if (avgMA <= 0) avgMA = 0.0001;

    // Usable capacity considering efficiency
    var usableMAh = capMAh * eff;
    var usableWh = capWh * eff;
    var totalHrs = usableMAh / avgMA;
    var avgPowerMW = avgMA * vVal;

    // Update Badges & Sliders
    badgeCap.textContent = cVal + ' ' + cUnit.toUpperCase();
    badgeVolt.textContent = vVal + 'V / ' + Math.round(eff * 100) + '% Eff';
    badgeLoad.textContent = lVal + ' ' + lUnit;
    badgeSleep.textContent = sleepUA + ' µA / ' + dutyActivePct + '% Duty';

    // Update Hero UI
    heroRuntime.textContent = fmtTime(totalHrs);
    heroSub.textContent = 'Nominal Energy: ' + capWh.toFixed(2) + ' Wh | Usable Energy: ' + usableWh.toFixed(2) + ' Wh @ ' + Math.round(eff*100) + '% efficiency';
    
    // Battery Visual Fill Level
    var fillPct = Math.min(100, Math.max(15, Math.round(eff * 100)));
    fillBar.style.width = fillPct + '%';
    fillBar.textContent = fillPct + '% Usable';

    // Update Duty Bar UI
    barDutyActive.style.width = (activeRatio * 100) + '%';
    barDutySleep.style.width = (sleepRatio * 100) + '%';
    txtDutyActive.textContent = (activeRatio * 100).toFixed(1) + '% (' + activeMA.toFixed(2) + ' mA)';
    txtDutySleep.textContent = (sleepRatio * 100).toFixed(1) + '% (' + sleepMA.toFixed(3) + ' mA)';
    txtAvgCurrent.textContent = avgMA.toFixed(3) + ' mA';

    // Update Stat Cards
    statRuntimeHrs.textContent = totalHrs >= 100 ? totalHrs.toFixed(1) + ' h' : totalHrs.toFixed(2) + ' h';
    statEnergyWh.textContent = capWh.toFixed(2) + ' Wh';
    statUsableWh.textContent = usableWh.toFixed(2) + ' Wh';
    statAvgMw.textContent = avgPowerMW >= 1000 ? (avgPowerMW / 1000).toFixed(2) + ' W' : avgPowerMW.toFixed(2) + ' mW';

    // Build Report Output Text
    var report = 'BATTERY LIFE & POWER CONSUMPTION EXECUTION REPORT\n';
    report += '==================================================\n';
    report += 'Battery Specification : ' + cVal + ' ' + cUnit.toUpperCase() + ' (' + capWh.toFixed(2) + ' Wh) @ ' + vVal + 'V\n';
    report += 'Discharge Efficiency  : ' + Math.round(eff * 100) + '% (Usable Energy: ' + usableWh.toFixed(2) + ' Wh)\n';
    report += 'Active Mode Load      : ' + lVal + ' ' + lUnit + ' (' + activeMA.toFixed(2) + ' mA)\n';
    report += 'Sleep Mode Current    : ' + sleepUA + ' µA (' + sleepMA.toFixed(4) + ' mA)\n';
    report += 'Active Duty Cycle     : ' + (activeRatio * 100).toFixed(1) + '% Active / ' + (sleepRatio * 100).toFixed(1) + '% Sleep\n';
    report += 'Weighted Avg Current  : ' + avgMA.toFixed(4) + ' mA\n';
    report += 'Average Power Draw    : ' + avgPowerMW.toFixed(2) + ' mW (' + (avgPowerMW/1000).toFixed(4) + ' W)\n\n';
    report += 'ESTIMATED BATTERY RUNTIME:\n';
    report += '-> ' + totalHrs.toFixed(2) + ' Hours (' + (totalHrs / 24).toFixed(2) + ' Days / ' + fmtTime(totalHrs) + ')';

    outputEl.value = report;
    copyBtn.disabled = false;
    setMsg('Battery runtime calculated successfully.');
  }

  // Event Listeners for Two-Way Range/Number Bindings
  capRange.addEventListener('input', function() { capNum.value = capRange.value; calculate(); });
  capNum.addEventListener('input', function() { capRange.value = capNum.value; calculate(); });
  capUnit.addEventListener('change', calculate);

  voltRange.addEventListener('input', function() { voltNum.value = voltRange.value; calculate(); });
  voltNum.addEventListener('input', function() { voltRange.value = voltNum.value; calculate(); });
  effNum.addEventListener('input', calculate);

  loadRange.addEventListener('input', function() { loadNum.value = loadRange.value; calculate(); });
  loadNum.addEventListener('input', function() { loadRange.value = loadNum.value; calculate(); });
  loadUnit.addEventListener('change', calculate);

  dutyRange.addEventListener('input', function() { dutyNum.value = dutyRange.value; calculate(); });
  dutyNum.addEventListener('input', function() { dutyRange.value = dutyNum.value; calculate(); });
  sleepNum.addEventListener('input', calculate);

  calcBtn.addEventListener('click', calculate);

  // Preset Handler
  presetChips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      presetChips.forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');

      var pKey = chip.getAttribute('data-preset');
      var p = presets[pKey];
      if (p) {
        capNum.value = p.cap;
        capRange.value = p.cap;
        capUnit.value = p.capUnit;

        voltNum.value = p.volt;
        voltRange.value = p.volt;
        effNum.value = p.eff;

        loadNum.value = p.load;
        loadRange.value = p.load;
        loadUnit.value = p.loadUnit;

        sleepNum.value = p.sleep;
        dutyNum.value = p.duty;
        dutyRange.value = p.duty;

        calculate();
      }
    });
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outputEl.value);
    }
    setMsg('Report copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    presetChips[0].click();
    setMsg('Reset to default IoT preset.');
  });

  // Initial Calculate
  calculate();
})();
