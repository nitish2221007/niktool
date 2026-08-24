(() => {
  'use strict';
  const hrcEl = document.getElementById('rc-hrc');
  const hvResEl = document.getElementById('rc-res-hv'), hbResEl = document.getElementById('rc-res-hb'), utsResEl = document.getElementById('rc-res-uts');

  // ASTM E140 steel hardness conversion polynomial fit
  function update() {
    const HRC = parseFloat(hrcEl.value);
    if (isNaN(HRC) || HRC < 20 || HRC > 68) return;

    // Polynomial approximations for steel
    const HV = Math.round(145 + 5.2 * HRC + 0.055 * Math.pow(HRC, 2) + 0.00075 * Math.pow(HRC, 3));
    const HB = Math.round(150 + 4.8 * HRC + 0.048 * Math.pow(HRC, 2));
    const utsMpa = Math.round(350 + 17.5 * HRC + 0.22 * Math.pow(HRC, 2));
    const utsKsi = (utsMpa / 6.89476).toFixed(1);

    hvResEl.textContent = HV + ' HV';
    hbResEl.textContent = HB + ' HBW';
    utsResEl.textContent = utsMpa.toLocaleString() + ' MPa (' + utsKsi + ' ksi UTS)';
  }

  hrcEl.addEventListener('input', update);
  update();
})();