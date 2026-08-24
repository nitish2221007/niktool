(() => {
  'use strict';
  const lEl = document.getElementById('sh-l'), bEl = document.getElementById('sh-b');
  const tEl = document.getElementById('sh-t'), tpEl = document.getElementById('sh-type');
  const dsResEl = document.getElementById('sh-res-disp'), vlResEl = document.getElementById('sh-res-vol');

  const rho_seawater = 1.025; // metric tons / m^3

  function update() {
    const L = parseFloat(lEl.value), B = parseFloat(bEl.value), T = parseFloat(tEl.value);
    const C_b = parseFloat(tpEl.value);

    if (isNaN(L) || isNaN(B) || isNaN(T) || L <= 0 || B <= 0 || T <= 0) return;

    // Bounding box volume: V_box = L * B * T  [m^3]
    const V_box = L * B * T;

    // Submerged volumetric displacement: nabla = C_b * L * B * T  [m^3]
    const nabla = C_b * V_box;

    // Seawater displacement tonnage: Delta = nabla * 1.025  [metric tons]
    const Delta_tons = nabla * rho_seawater;

    dsResEl.textContent = 'Displacement Δ = ' + Math.round(Delta_tons).toLocaleString() + ' Metric Tons';
    vlResEl.textContent = 'Submerged Volume ∇ = ' + Math.round(nabla).toLocaleString() + ' m³ (Box: ' + Math.round(V_box).toLocaleString() + ' m³ | C_b = ' + C_b + ')';
  }

  [lEl, bEl, tEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();