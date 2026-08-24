(() => {
  'use strict';
  const cEl = document.getElementById('bor-cryo'), qEl = document.getElementById('bor-q');
  const rResEl = document.getElementById('bor-res-rate'), mResEl = document.getElementById('bor-res-mass');

  const CRYOS = {
    'ln2': { dh_vap: 199.0, rho: 808.0, name: 'Liquid Nitrogen LN₂' },
    'lhe': { dh_vap: 20.9,  rho: 125.0, name: 'Liquid Helium LHe' },
    'lh2': { dh_vap: 446.0, rho: 71.0,  name: 'Liquid Hydrogen LH₂' },
    'lox': { dh_vap: 213.0, rho: 1141.0,name: 'Liquid Oxygen LOX' },
    'lng': { dh_vap: 510.0, rho: 422.0, name: 'Liquid Methane LNG' }
  };

  function update() {
    const c = CRYOS[cEl.value];
    const Q_watts = parseFloat(qEl.value);

    if (isNaN(Q_watts) || Q_watts <= 0) return;

    // Heat of vaporization in Joules / kg: dh_vap * 1000
    const dh_J_kg = c.dh_vap * 1000;

    // Boil-off mass rate m_dot = Q / dh_vap  [kg / second]
    const m_dot_kg_s = Q_watts / dh_J_kg;
    const m_dot_kg_h = m_dot_kg_s * 3600;
    const m_dot_kg_day = m_dot_kg_h * 24;

    // Volumetric loss rate V_dot = m_dot / rho  [m^3 / s -> Liters / day]
    const v_dot_liters_day = (m_dot_kg_day / c.rho) * 1000;

    rResEl.textContent = v_dot_liters_day.toFixed(2) + ' Liters / Day Boil-Off';
    mResEl.textContent = 'Mass Loss: ' + m_dot_kg_h.toFixed(3) + ' kg/h (' + m_dot_kg_day.toFixed(2) + ' kg/d @ Q = ' + Q_watts + ' W Inleak into ' + c.name + ')';
  }

  cEl.addEventListener('change', update);
  qEl.addEventListener('input', update);
  update();
})();