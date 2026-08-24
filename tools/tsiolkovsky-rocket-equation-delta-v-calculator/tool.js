(() => {
  'use strict';
  const ispEl = document.getElementById('rk-isp'), m0El = document.getElementById('rk-m0'), mfEl = document.getElementById('rk-mf');
  const dvResEl = document.getElementById('rk-res-dv'), msResEl = document.getElementById('rk-res-mass');

  const g0 = 9.80665;

  function update() {
    const Isp = parseFloat(ispEl.value), m0 = parseFloat(m0El.value), mf = parseFloat(mfEl.value);
    if (isNaN(Isp) || isNaN(m0) || isNaN(mf) || Isp <= 0 || m0 <= 0 || mf <= 0 || mf >= m0) return;

    const ve = Isp * g0;
    const deltaV = ve * Math.log(m0 / mf);
    const deltaV_kms = deltaV / 1000;

    const massRatio = m0 / mf;
    const propMass = m0 - mf;
    const propFractionPct = (propMass / m0) * 100;

    dvResEl.textContent = deltaV_kms.toFixed(2) + ' km / s (' + Math.round(deltaV).toLocaleString() + ' m/s Δv)';
    msResEl.textContent = 'Mass Ratio: ' + massRatio.toFixed(2) + ' : 1 (' + propFractionPct.toFixed(1) + '% Propellant, v_e = ' + Math.round(ve) + ' m/s)';
  }

  [ispEl, m0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();