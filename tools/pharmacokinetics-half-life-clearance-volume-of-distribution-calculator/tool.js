(() => {
  'use strict';
  const vdEl = document.getElementById('pk-vd'), clEl = document.getElementById('pk-cl'), r0El = document.getElementById('pk-r0');
  const thResEl = document.getElementById('pk-res-thalf'), csResEl = document.getElementById('pk-res-css');

  function update() {
    const V_d = parseFloat(vdEl.value), CL = parseFloat(clEl.value), R0 = parseFloat(r0El.value);
    if (isNaN(V_d) || isNaN(CL) || isNaN(R0) || V_d <= 0 || CL <= 0 || R0 <= 0) return;

    // Elimination rate constant: k_el = CL / V_d  [hr^-1]
    const k_el = CL / V_d;

    // Half-life: t_1/2 = 0.693147 / k_el = (0.693147 * V_d) / CL  [hours]
    const t_half = (0.693147 * V_d) / CL;

    // Steady state concentration: C_ss = R0 / CL  [mg / L]
    const C_ss = R0 / CL;

    // Time to 5 half lives (96.875% steady state):
    const time_5thalf = 5.0 * t_half;

    thResEl.textContent = 'Half-Life t_½ = ' + t_half.toFixed(2) + ' Hours';
    csResEl.textContent = 'Steady State C_ss = ' + C_ss.toFixed(1) + ' mg/L | 5 Half-Lives = ' + time_5thalf.toFixed(1) + ' Hours (k_el = ' + k_el.toFixed(3) + ' hr⁻¹)';
  }

  [vdEl, clEl, r0El].forEach(el => el.addEventListener('input', update));
  update();
})();