(() => {
  'use strict';
  const mEl = document.getElementById('dn-m'), vEl = document.getElementById('dn-v');
  const rResEl = document.getElementById('dn-res-rho'), sResEl = document.getElementById('dn-res-sink');

  function update() {
    const m_g = parseFloat(mEl.value), v_cm3 = parseFloat(vEl.value);
    if (isNaN(m_g) || isNaN(v_cm3) || m_g <= 0 || v_cm3 <= 0) return;

    // Density rho = m / V  [g / cm^3]
    const rho_g_cm3 = m_g / v_cm3;
    const rho_kg_m3 = rho_g_cm3 * 1000.0;

    let mat = '';
    let color = '#22543d';

    if (Math.abs(rho_g_cm3 - 19.3) < 0.5) mat = 'PURE GOLD (19.3 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 11.3) < 0.5) mat = 'LEAD (11.3 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 8.9) < 0.5) mat = 'COPPER (8.9 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 7.8) < 0.5) mat = 'IRON / STEEL (7.8 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 2.7) < 0.3) mat = 'ALUMINUM (2.7 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 1.0) < 0.05) mat = 'LIQUID WATER (1.00 g/cm³)';
    else if (rho_g_cm3 < 1.0) mat = 'FLOATS IN WATER (ρ < 1.00 g/cm³ - e.g. Wood / Oil / Ice)';
    else mat = 'SINKS IN WATER (ρ > 1.00 g/cm³)';

    rResEl.textContent = 'ρ = ' + rho_g_cm3.toFixed(2) + ' g/cm³ (' + Math.round(rho_kg_m3).toLocaleString() + ' kg/m³)';
    sResEl.textContent = mat + ' | Specific Gravity SG = ' + rho_g_cm3.toFixed(2);
    sResEl.style.color = color;
  }

  mEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();