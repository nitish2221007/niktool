(() => {
  'use strict';
  const uEl = document.getElementById('trb-u'), iEl = document.getElementById('trb-i'), dhEl = document.getElementById('trb-dh');
  const kResEl = document.getElementById('trb-res-k'), omResEl = document.getElementById('trb-res-om');

  const C_mu = 0.09;

  function update() {
    const U = parseFloat(uEl.value), IPct = parseFloat(iEl.value), Dh = parseFloat(dhEl.value);
    if (isNaN(U) || isNaN(IPct) || isNaN(Dh) || U <= 0 || IPct <= 0 || Dh <= 0) return;

    const I = IPct / 100;

    // Turbulent kinetic energy k = 1.5 * (U * I)^2  [m^2 / s^2]
    const k = 1.5 * Math.pow(U * I, 2);

    // Turbulent length scale l approx = 0.07 * Dh  [meters]
    const l_m = 0.07 * Dh;
    const l_mm = l_m * 1000;

    // Dissipation rate epsilon = (C_mu^0.75 * k^1.5) / l  [m^2 / s^3]
    const epsilon = (Math.pow(C_mu, 0.75) * Math.pow(k, 1.5)) / l_m;

    // Specific dissipation rate omega = k^0.5 / (C_mu^0.25 * l) = epsilon / (C_mu * k)  [s^-1]
    const omega = epsilon / (C_mu * k);

    // Eddy viscosity ratio (nu_t / nu)
    const nu_t = k / omega; // m^2 / s

    kResEl.textContent = 'k = ' + k.toFixed(3) + ' m² / s² (Turbulent Energy)';
    omResEl.textContent = 'ω = ' + omega.toFixed(1) + ' s⁻¹ | ε = ' + epsilon.toFixed(2) + ' m²/s³ (Length Scale l = ' + l_mm.toFixed(1) + ' mm, ν_t = ' + (nu_t * 1e4).toFixed(1) + ' cm²/s)';
  }

  [uEl, iEl, dhEl].forEach(el => el.addEventListener('input', update));
  update();
})();