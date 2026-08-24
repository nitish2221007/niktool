(() => {
  'use strict';
  const thEl = document.getElementById('ri-theta'), dtEl = document.getElementById('ri-dtdz'), duEl = document.getElementById('ri-dudz');
  const riResEl = document.getElementById('ri-res-val'), catResEl = document.getElementById('ri-res-cat');

  const g = 9.80665;

  function update() {
    const theta = parseFloat(thEl.value), dtheta_km = parseFloat(dtEl.value), du_km = parseFloat(duEl.value);
    if (isNaN(theta) || isNaN(dtheta_km) || isNaN(du_km) || theta <= 0 || du_km <= 0) return;

    // Convert gradients per km to per meter: divide by 1000
    const dtheta_dz = dtheta_km / 1000.0;
    const du_dz = du_km / 1000.0;

    // Brunt-Vaisala frequency squared N^2 = (g / theta) * dtheta_dz  [s^-2]
    const N2 = (g / theta) * dtheta_dz;
    // Wind shear squared S^2 = (du_dz)^2  [s^-2]
    const S2 = Math.pow(du_dz, 2);

    // Richardson number Ri = N^2 / S^2
    const Ri = N2 / S2;

    let status = '';
    let color = '#22543d';

    if (Ri < 0) {
      status = 'STATICALLY UNSTABLE (Ri < 0: Buoyancy driven convective overturning & thermal plumes)';
      color = '#c53030';
    } else if (Ri <= 0.25) {
      status = 'ACTIVE CLEAR AIR TURBULENCE (Ri ≤ 0.25: Kelvin-Helmholtz billow waves break into severe turbulence!)';
      color = '#c53030';
    } else if (Ri <= 1.0) {
      status = 'MARGINALLY STABLE (0.25 < Ri ≤ 1.0: Existing turbulence may persist)';
      color = '#d97706';
    } else {
      status = 'LAMINAR / STABLE AIR (Ri > 1.0: Strong thermal stratification completely suppresses turbulence)';
      color = '#22543d';
    }

    riResEl.textContent = 'Ri = ' + Ri.toFixed(3) + ' (' + (Ri <= 0.25 ? 'Turbulent' : 'Stable') + ')';
    riResEl.style.color = color;
    catResEl.textContent = status + ' | N² = ' + N2.toExponential(2) + ' s⁻², Shear S = ' + du_dz.toFixed(3) + ' s⁻¹';
    catResEl.style.color = color;
  }

  [thEl, dtEl, duEl].forEach(el => el.addEventListener('input', update));
  update();
})();