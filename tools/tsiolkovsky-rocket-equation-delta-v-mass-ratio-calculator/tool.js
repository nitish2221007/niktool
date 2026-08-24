(() => {
  'use strict';
  const ispEl = document.getElementById('ts-isp'), m0El = document.getElementById('ts-m0'), mfEl = document.getElementById('ts-mf');
  const dvResEl = document.getElementById('ts-res-dv'), frResEl = document.getElementById('ts-res-frac');

  const g0 = 9.80665;

  function update() {
    const Isp_s = parseFloat(ispEl.value), m0_kg = parseFloat(m0El.value), mf_kg = parseFloat(mfEl.value);
    if (isNaN(Isp_s) || isNaN(m0_kg) || isNaN(mf_kg) || Isp_s <= 0 || m0_kg <= mf_kg || mf_kg <= 0) return;

    const mass_ratio = m0_kg / mf_kg;
    const c_mps = Isp_s * g0;
    const delta_v_mps = c_mps * Math.log(mass_ratio);
    const delta_v_kms = delta_v_mps / 1000.0;
    const prop_mass_kg = m0_kg - mf_kg;
    const prop_fraction_pct = (prop_mass_kg / m0_kg) * 100.0;

    dvResEl.textContent = 'Mission Δv = ' + Math.round(delta_v_mps).toLocaleString() + ' m/s (' + delta_v_kms.toFixed(2) + ' km/s)';
    frResEl.textContent = 'Mass Ratio = ' + mass_ratio.toFixed(2) + ' | Propellant = ' + prop_fraction_pct.toFixed(1) + '% (' + Math.round(prop_mass_kg).toLocaleString() + ' kg Fuel | Exhaust c = ' + Math.round(c_mps) + ' m/s)';
  }

  [ispEl, m0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();