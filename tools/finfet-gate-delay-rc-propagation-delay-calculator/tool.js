(() => {
  'use strict';
  const ronEl = document.getElementById('ff-ron'), nfEl = document.getElementById('ff-nfins'), clEl = document.getElementById('ff-cl');
  const tpResEl = document.getElementById('ff-res-tpd'), fmResEl = document.getElementById('ff-res-fmax');

  function update() {
    const Ron_kohm = parseFloat(ronEl.value), Nfins = parseInt(nfEl.value, 10), C_L_fF = parseFloat(clEl.value);
    if (isNaN(Ron_kohm) || isNaN(Nfins) || isNaN(C_L_fF) || Ron_kohm <= 0 || Nfins <= 0 || C_L_fF <= 0) return;

    // Effective resistance: R_eff = Ron / Nfins  [kOhms]
    const R_eff_kohm = Ron_kohm / Nfins;
    const R_eff_ohm = R_eff_kohm * 1000.0;
    const C_L_F = C_L_fF * 1e-15;

    // Elmore propagation delay: t_pd = ln(2) * R_eff * C_L = 0.693147 * R_eff * C_L  [seconds -> ps]
    const t_pd_s = Math.LN2 * R_eff_ohm * C_L_F;
    const t_pd_ps = t_pd_s * 1e12;

    // Maximum theoretical toggle frequency: f_max = 1 / (2 * t_pd)  [Hz -> GHz]
    const f_max_GHz = (1.0 / (2.0 * t_pd_s)) * 1e-9;

    tpResEl.textContent = 'Gate Delay t_pd = ' + t_pd_ps.toFixed(2) + ' ps';
    fmResEl.textContent = 'Max Toggle f_max = ' + f_max_GHz.toFixed(1) + ' GHz | R_eff = ' + R_eff_kohm.toFixed(2) + ' kΩ (' + Nfins + ' Fins @ C_L=' + C_L_fF + ' fF)';
  }

  [ronEl, nfEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();