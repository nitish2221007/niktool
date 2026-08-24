(() => {
  'use strict';
  const hvEl = document.getElementById('hd-hv');
  const hrcResEl = document.getElementById('hd-res-hrc'), utsResEl = document.getElementById('hd-res-uts');

  function update() {
    const HV = parseFloat(hvEl.value);
    if (isNaN(HV) || HV <= 0) return;

    // Empirical ASTM E140 steel hardness conversion approximations:
    // HRC approx = 110 - ( 1450 / sqrt(HV) )  valid for HV > 220
    let HRC = 0, HBW = 0;
    if (HV >= 220) {
      HRC = 110.0 - (1450.0 / Math.sqrt(HV));
      HBW = HV * 0.95;
    } else {
      HRC = 0;
      HBW = HV * 0.95;
    }

    // Ultimate Tensile Strength approx (for steels): UTS (MPa) approx 3.2 * HV approx 3.45 * HBW
    const UTS_MPa = HV * 3.2;

    hrcResEl.textContent = 'Rockwell HRC = ' + (HRC > 0 ? HRC.toFixed(1) : '< 20 HRC (Use HRB)') + ' | Brinell HBW = ' + Math.round(HBW);
    utsResEl.textContent = 'Estimated Tensile UTS ≈ ' + Math.round(UTS_MPa).toLocaleString() + ' MPa (' + Math.round(UTS_MPa / 6.895).toLocaleString() + ' ksi @ ' + HV + ' HV)';
  }

  hvEl.addEventListener('input', update);
  update();
})();