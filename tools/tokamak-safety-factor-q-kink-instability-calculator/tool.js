(() => {
  'use strict';
  const rEl = document.getElementById('q-r'), aEl = document.getElementById('q-a');
  const btEl = document.getElementById('q-bt'), ipEl = document.getElementById('q-ip'), kEl = document.getElementById('q-kappa');
  const qaResEl = document.getElementById('q-res-qa'), stResEl = document.getElementById('q-res-stat');

  const mu0 = 4.0 * Math.PI * 1e-7;

  function update() {
    const R = parseFloat(rEl.value), a = parseFloat(aEl.value);
    const B_T = parseFloat(btEl.value), I_p_MA = parseFloat(ipEl.value), kappa = parseFloat(kEl.value);

    if (isNaN(R) || isNaN(a) || isNaN(B_T) || isNaN(I_p_MA) || isNaN(kappa) || R <= a || a <= 0 || B_T <= 0 || I_p_MA <= 0 || kappa <= 0) return;

    const I_p_Amps = I_p_MA * 1e6;

    // Poloidal field at edge B_p = (mu0 * I_p) / ( 2 * pi * a * sqrt( (1 + kappa^2)/2 ) )
    const shapeFactor = (1.0 + Math.pow(kappa, 2)) / 2.0;

    // Standard cylindrical edge safety factor q_a:
    // q_a = ( 2 * pi * a^2 * B_T ) / ( mu0 * I_p * R ) * shapeFactor
    const q_a = ((2.0 * Math.PI * Math.pow(a, 2) * B_T) / (mu0 * I_p_Amps * R)) * shapeFactor;

    let status = '';
    let color = '#22543d';

    if (q_a >= 3.0) {
      status = 'STABLE (q ≥ 3.0: Standard baseline tokamak operating regime, high disruption margin)';
      color = '#22543d';
    } else if (q_a >= 2.0) {
      status = 'MARGINALLY STABLE (2.0 ≤ q < 3.0: High performance but susceptible to neoclassical tearing modes)';
      color = '#d97706';
    } else {
      status = 'KRUSKAL-SHAFRANOV DISRUPTION (q < 2.0: Catastrophic m=1, n=1 external kink dumps plasma into wall!)';
      color = '#c53030';
    }

    qaResEl.textContent = 'q_a = ' + q_a.toFixed(2) + ' (Aspect Ratio R/a = ' + (R/a).toFixed(2) + ')';
    qaResEl.style.color = color;
    stResEl.textContent = status + ' | ITER Parameters: B_T = ' + B_T + ' T, I_p = ' + I_p_MA + ' MA, κ = ' + kappa;
    stResEl.style.color = color;
  }

  [rEl, aEl, btEl, ipEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();