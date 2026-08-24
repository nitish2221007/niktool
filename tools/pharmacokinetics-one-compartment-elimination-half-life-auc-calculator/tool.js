(() => {
  'use strict';
  const doseEl = document.getElementById('pk-dose'), c0El = document.getElementById('pk-c0');
  const keEl = document.getElementById('pk-ke'), tEl = document.getElementById('pk-t');
  const ctResEl = document.getElementById('pk-res-ct'), pkResEl = document.getElementById('pk-res-pk');

  function update() {
    const Dose_mg = parseFloat(doseEl.value), C0_mg_L = parseFloat(c0El.value);
    const ke_hr = parseFloat(keEl.value), t_hr = parseFloat(tEl.value);

    if (isNaN(Dose_mg) || isNaN(C0_mg_L) || isNaN(ke_hr) || isNaN(t_hr) || Dose_mg <= 0 || C0_mg_L <= 0 || ke_hr <= 0 || t_hr < 0) return;

    // Elimination half-life: t_1/2 = ln(2) / ke
    const t_half_hr = Math.LN2 / ke_hr;

    // Plasma drug concentration at time t: C(t) = C0 * exp( - ke * t )
    const C_t = C0_mg_L * Math.exp(- ke_hr * t_hr);
    const pct_C0 = (C_t / C0_mg_L) * 100.0;

    // Volume of distribution: V_d = Dose / C0  [Liters]
    const V_d_L = Dose_mg / C0_mg_L;

    // Total body clearance: CL = ke * V_d  [L / hr]
    const CL_L_hr = ke_hr * V_d_L;

    // Area under the curve: AUC = C0 / ke  [mg * hr / L]
    const AUC = C0_mg_L / ke_hr;

    ctResEl.textContent = 'Concentration C(' + t_hr + 'h) = ' + C_t.toFixed(2) + ' mg / L (' + pct_C0.toFixed(1) + '% Peak)';
    pkResEl.textContent = 'Half-Life t_1/2 = ' + t_half_hr.toFixed(2) + ' hr | Clearance CL = ' + CL_L_hr.toFixed(2) + ' L/hr | V_d = ' + V_d_L.toFixed(1) + ' L (AUC = ' + AUC.toFixed(1) + ' mg·hr/L)';
  }

  [doseEl, c0El, keEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();