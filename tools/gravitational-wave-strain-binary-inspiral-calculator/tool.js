(() => {
  'use strict';
  const m1El = document.getElementById('gw-m1'), m2El = document.getElementById('gw-m2');
  const fEl = document.getElementById('gw-f'), dEl = document.getElementById('gw-dist');
  const hResEl = document.getElementById('gw-res-h'), mcResEl = document.getElementById('gw-res-mc');

  const G = 6.67430e-11;
  const c = 2.99792458e8;
  const M_sun = 1.989e30;

  function update() {
    const m1_sol = parseFloat(m1El.value), m2_sol = parseFloat(m2El.value);
    const fgw = parseFloat(fEl.value), rMpc = parseFloat(dEl.value);

    if (isNaN(m1_sol) || isNaN(m2_sol) || isNaN(fgw) || isNaN(rMpc) || m1_sol <= 0 || m2_sol <= 0 || fgw <= 0 || rMpc <= 0) return;

    const m1 = m1_sol * M_sun;
    const m2 = m2_sol * M_sun;
    const r_meters = rMpc * 3.085677581e22;

    const Mc = Math.pow(m1 * m2, 3/5) / Math.pow(m1 + m2, 1/5);
    const Mc_solar = Mc / M_sun;

    const term1 = 4 / r_meters;
    const term2 = Math.pow((G * Mc) / Math.pow(c, 2), 5/3);
    const term3 = Math.pow((Math.PI * fgw) / c, 2/3);
    const h = term1 * term2 * term3;

    const deltaL = h * 4000;

    hResEl.textContent = 'h ≈ ' + h.toExponential(2) + ' Strain (ΔL/L)';
    mcResEl.textContent = 'Chirp Mass M_c = ' + Mc_solar.toFixed(1) + ' M_☉ (LIGO 4km Arm Shift ΔL ≈ ' + deltaL.toExponential(2) + ' m, ~1/1000th Proton Size)';
  }

  [m1El, m2El, fEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();