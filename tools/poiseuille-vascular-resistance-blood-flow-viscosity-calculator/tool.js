(() => {
  'use strict';
  const dpEl = document.getElementById('ps-dp'), rEl = document.getElementById('ps-r');
  const lEl = document.getElementById('ps-l'), etEl = document.getElementById('ps-eta');
  const qResEl = document.getElementById('ps-res-q'), snResEl = document.getElementById('ps-res-sens');

  function update() {
    const dP_mmHg = parseFloat(dpEl.value), r_mm = parseFloat(rEl.value);
    const L_cm = parseFloat(lEl.value), eta_cP = parseFloat(etEl.value);

    if (isNaN(dP_mmHg) || isNaN(r_mm) || isNaN(L_cm) || isNaN(eta_cP) || dP_mmHg <= 0 || r_mm <= 0 || L_cm <= 0 || eta_cP <= 0) return;

    // Convert to SI units:
    // 1 mmHg = 133.322 Pa
    const dP_Pa = dP_mmHg * 133.322;
    // r in meters: 1 mm = 1e-3 m
    const r_m = r_mm * 1e-3;
    // L in meters: 1 cm = 1e-2 m
    const L_m = L_cm * 1e-2;
    // Viscosity in Pa*s: 1 cP = 1e-3 Pa*s
    const eta_Pas = eta_cP * 1e-3;

    // Hagen-Poiseuille flow Q in m^3 / s:
    // Q = ( pi * r^4 * dP ) / ( 8 * eta * L )
    const Q_m3_s = (Math.PI * Math.pow(r_m, 4) * dP_Pa) / (8.0 * eta_Pas * L_m);

    // Convert Q to mL / min: 1 m^3/s = 1e6 mL/s = 6e7 mL/min
    const Q_mL_min = Q_m3_s * 6e7;

    // Vascular resistance in mmHg * min / mL:
    const R_vasc = dP_mmHg / Q_mL_min;

    qResEl.textContent = 'Blood Flow Q = ' + Math.round(Q_mL_min).toLocaleString() + ' mL / min';
    snResEl.textContent = 'Vascular Resistance R = ' + R_vasc.toExponential(2) + ' mmHg·min/mL | Halving radius (r/2) increases resistance by 16× (r⁴ = ' + Math.pow(r_mm, 4).toFixed(2) + ' mm⁴)';
  }

  [dpEl, rEl, lEl, etEl].forEach(el => el.addEventListener('input', update));
  update();
})();