(() => {
  'use strict';
  const ispEl = document.getElementById('rk-isp'), m0El = document.getElementById('rk-m0'), mfEl = document.getElementById('rk-mf');
  const dvResEl = document.getElementById('rk-res-dv'), propResEl = document.getElementById('rk-res-prop');

  const g0 = 9.80665; // Standard gravity m/s^2

  function update() {
    const isp = parseFloat(ispEl.value), m0 = parseFloat(m0El.value), mf = parseFloat(mfEl.value);
    if (isNaN(isp) || isNaN(m0) || isNaN(mf) || isp <= 0 || m0 <= mf || mf <= 0) return;

    // Effective exhaust velocity v_e = Isp * g0
    const ve = isp * g0;
    // Delta_v = ve * ln(m0 / mf) (m/s)
    const dvMs = ve * Math.log(m0 / mf);
    const dvKms = dvMs / 1000;

    const propKg = m0 - mf;
    const propPct = (propKg / m0) * 100;
    const propTons = propKg / 1000;

    dvResEl.textContent = dvKms.toFixed(3) + ' km / s (' + Math.round(dvMs).toLocaleString() + ' m/s)';
    propResEl.textContent = propPct.toFixed(1) + '% Propellant (' + propTons.toFixed(1) + ' metric tons fuel)';
  }

  [ispEl, m0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();