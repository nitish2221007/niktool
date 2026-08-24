(() => {
  'use strict';
  const wEl = document.getElementById('csp-w'), dEl = document.getElementById('csp-d');
  const lEl = document.getElementById('csp-len'), dniEl = document.getElementById('csp-dni');
  const pResEl = document.getElementById('csp-res-pwr'), crResEl = document.getElementById('csp-res-cr');

  const eta_optical = 0.75; // 75% optical efficiency (reflectivity * intercept * absorptivity)

  function update() {
    const W = parseFloat(wEl.value), D = parseFloat(dEl.value);
    const L = parseFloat(lEl.value), DNI = parseFloat(dniEl.value);

    if (isNaN(W) || isNaN(D) || isNaN(L) || isNaN(DNI) || W <= D || D <= 0 || L <= 0 || DNI <= 0) return;

    // Geometric concentration ratio C = (W - D) / (pi * D)
    const C = (W - D) / (Math.PI * D);

    // Total collector aperture area A_ap = W * L  [m^2]
    const A_ap = W * L;

    // Incident solar power = A_ap * DNI  [Watts]
    const P_solar_in = A_ap * DNI;

    // Useful thermal heat output Q_u = P_solar_in * eta_optical * thermal_eff (approx 90% at 390°C)
    const Q_u_watts = P_solar_in * eta_optical * 0.90;
    const Q_u_kw = Q_u_watts / 1000;

    pResEl.textContent = Q_u_kw.toFixed(1) + ' kW Thermal Heat (' + (Q_u_kw / A_ap * 1000).toFixed(0) + ' W/m² Collection)';
    crResEl.textContent = 'Concentration Ratio C = ' + C.toFixed(1) + '× (Aperture: ' + Math.round(A_ap) + ' m² | Optical η = ' + (eta_optical*100) + '%, DNI = ' + DNI + ' W/m²)';
  }

  [wEl, dEl, lEl, dniEl].forEach(el => el.addEventListener('input', update));
  update();
})();