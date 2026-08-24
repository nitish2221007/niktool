(() => {
  'use strict';
  const hdEl = document.getElementById('ix-hard'), vrEl = document.getElementById('ix-vr'), cpEl = document.getElementById('ix-cap');
  const vlResEl = document.getElementById('ix-res-vol'), stResEl = document.getElementById('ix-res-salt');

  function update() {
    const hardness_mg_L = parseFloat(hdEl.value), V_resin_L = parseFloat(vrEl.value), cap_eq_L = parseFloat(cpEl.value);
    if (isNaN(hardness_mg_L) || isNaN(V_resin_L) || isNaN(cap_eq_L) || hardness_mg_L <= 0 || V_resin_L <= 0 || cap_eq_L <= 0) return;

    // Hardness in meq/L: 1 meq/L CaCO3 = 50.045 mg/L CaCO3
    const hardness_eq_L = hardness_mg_L / 50045.0;

    // Total resin exchange capacity in equivalents:
    const total_capacity_eq = V_resin_L * cap_eq_L;
    const total_capacity_g_caco3 = total_capacity_eq * 50.045;

    // Total water treated volume in Liters:
    const treated_volume_L = total_capacity_eq / hardness_eq_L;
    const treated_volume_m3 = treated_volume_L / 1000.0;
    const bed_volumes = treated_volume_L / V_resin_L;

    // Regeneration NaCl salt required (typically ~120 g NaCl per equivalent of capacity):
    const salt_kg = (total_capacity_eq * 120.0) / 1000.0;

    vlResEl.textContent = 'Treated Water = ' + treated_volume_m3.toFixed(1) + ' m³ (' + Math.round(treated_volume_L).toLocaleString() + ' L / ' + Math.round(bed_volumes) + ' BV)';
    stResEl.textContent = 'Capacity = ' + total_capacity_eq.toFixed(0) + ' eq (' + Math.round(total_capacity_g_caco3) + ' g CaCO₃) | Regen NaCl Salt = ' + salt_kg.toFixed(1) + ' kg (' + (hardness_mg_L/17.1).toFixed(1) + ' gpg)';
  }

  [hdEl, vrEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();