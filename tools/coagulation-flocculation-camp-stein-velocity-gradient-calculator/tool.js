(() => {
  'use strict';
  const pEl = document.getElementById('cmp-p'), vEl = document.getElementById('cmp-v');
  const tEl = document.getElementById('cmp-temp'), tmEl = document.getElementById('cmp-t');
  const gResEl = document.getElementById('cmp-res-g'), gtResEl = document.getElementById('cmp-res-gt');

  function update() {
    const P = parseFloat(pEl.value), V = parseFloat(vEl.value);
    const Tc = parseFloat(tEl.value), tSec = parseFloat(tmEl.value);

    if (isNaN(P) || isNaN(V) || isNaN(Tc) || isNaN(tSec) || P <= 0 || V <= 0 || tSec <= 0) return;

    // Dynamic viscosity of water as function of temperature approx: mu = 0.00179 / ( 1 + 0.03368*T + 0.000221*T^2 )  [Pa * s]
    const mu = 0.00179 / (1.0 + (0.03368 * Tc) + (0.000221 * Math.pow(Tc, 2)));

    // Camp-Stein velocity gradient G = sqrt( P / (mu * V) )  [s^-1]
    const G = Math.sqrt(P / (mu * V));

    // Camp number G * t (dimensionless)
    const Gt = G * tSec;

    let stageDesc = '';
    let color = '#22543d';

    if (G > 500) {
      stageDesc = 'RAPID FLASH COAGULATION (G = 600 - 1000 s⁻¹, t < 60s: Micro-floc nucleation & charge neutralization)';
      color = '#22543d';
    } else if (G >= 20 && G <= 80) {
      stageDesc = 'SLOW FLOCCULATION BASIN (G = 20 - 70 s⁻¹, G·t = 20,000 - 100,000: Gentle collision growth without shear breakup)';
      color = '#2563eb';
    } else {
      stageDesc = 'TRANSITIONAL MIXING STAGE';
      color = '#d97706';
    }

    gResEl.textContent = 'G = ' + G.toFixed(1) + ' s⁻¹ (Velocity Gradient)';
    gtResEl.textContent = 'Camp Number G·t = ' + Math.round(Gt).toLocaleString() + ' | ' + stageDesc;
    gtResEl.style.color = color;
  }

  [pEl, vEl, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();