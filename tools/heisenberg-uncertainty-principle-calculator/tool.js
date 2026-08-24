(() => {
  'use strict';
  const pEl = document.getElementById('hup-part'), dxEl = document.getElementById('hup-dx');
  const dvResEl = document.getElementById('hup-res-dv'), dpResEl = document.getElementById('hup-res-dp');

  const hBar = 1.054571817e-34; // J*s (h / 2pi)

  function update() {
    const mKg = parseFloat(pEl.value), dxAng = parseFloat(dxEl.value);
    if (isNaN(mKg) || isNaN(dxAng) || mKg <= 0 || dxAng <= 0) return;

    const dxM = dxAng * 1e-10;
    // Delta_p >= hBar / (2 * Delta_x)
    const dp = hBar / (2 * dxM);
    // Delta_v = Delta_p / m
    const dv = dp / mKg;
    const dvKms = dv / 1000;

    dvResEl.textContent = dvKms >= 1.0 ? dvKms.toFixed(1) + ' km/s (' + (dv / 299792.458 * 100).toFixed(2) + '% c)' : dv.toFixed(1) + ' m/s';
    dpResEl.textContent = dp.toExponential(2) + ' kg·m/s';
  }

  pEl.addEventListener('change', update);
  dxEl.addEventListener('input', update);
  update();
})();