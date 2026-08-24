(() => {
  'use strict';
  const pEl = document.getElementById('cg-p'), vEl = document.getElementById('cg-v');
  const tEl = document.getElementById('cg-t'), tmEl = document.getElementById('cg-temp');
  const gResEl = document.getElementById('cg-res-g'), gtResEl = document.getElementById('cg-res-gt');

  function update() {
    const P_watts = parseFloat(pEl.value), V_m3 = parseFloat(vEl.value);
    const t_sec = parseFloat(tEl.value), T_C = parseFloat(tmEl.value);

    if (isNaN(P_watts) || isNaN(V_m3) || isNaN(t_sec) || isNaN(T_C) || P_watts <= 0 || V_m3 <= 0 || t_sec <= 0) return;

    // Water dynamic viscosity: mu = 1.002e-3 Pa*s @ 20°C
    const mu = (1.787 / (1.0 + 0.0337 * T_C + 0.000221 * Math.pow(T_C, 2))) * 1e-3;

    // Camp velocity gradient: G = sqrt( P / (mu * V) )  [s^-1]
    const G = Math.sqrt(P_watts / (mu * V_m3));

    // Camp dimensionless number: G * t
    const G_t = G * t_sec;

    let regime = '', color = '#22543d';
    if (G >= 500.0) {
      regime = 'RAPID MIX FLASH COAGULATION (G = 600 - 1000 s⁻¹: Alum/Ferric dispersion ✓)';
      color = '#22543d';
    } else if (G >= 50.0 && G <= 100.0) {
      regime = 'STAGE 1 FLOCCULATION (G = 50 - 100 s⁻¹: Gentle floc growth)';
      color = '#22543d';
    } else if (G >= 20.0 && G < 50.0) {
      regime = 'STAGE 2/3 FLOCCULATION (G = 20 - 50 s⁻¹: Prevents floc shear breakup)';
      color = '#22543d';
    } else {
      regime = 'VERY SLOW MIXING (G < 20 s⁻¹)';
      color = '#ea580c';
    }

    gResEl.textContent = 'Velocity Gradient G = ' + Math.round(G).toLocaleString() + ' s⁻¹';
    gtResEl.textContent = 'Camp G·t = ' + Math.round(G_t).toLocaleString() + ' (' + regime.split(' (')[0] + ' @ μ=' + (mu*1000).toFixed(3) + ' mPa·s)';
    gtResEl.style.color = color;
  }

  [pEl, vEl, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();