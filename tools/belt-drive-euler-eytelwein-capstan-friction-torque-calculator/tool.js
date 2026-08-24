(() => {
  'use strict';
  const t1El = document.getElementById('bt-t1'), muEl = document.getElementById('bt-mu');
  const bEl = document.getElementById('bt-beta'), rEl = document.getElementById('bt-rad');
  const rtResEl = document.getElementById('bt-res-ratio'), tqResEl = document.getElementById('bt-res-tq');

  function update() {
    const T1 = parseFloat(t1El.value), mu = parseFloat(muEl.value);
    const beta_deg = parseFloat(bEl.value), R = parseFloat(rEl.value);

    if (isNaN(T1) || isNaN(mu) || isNaN(beta_deg) || isNaN(R) || T1 <= 0 || mu <= 0 || beta_deg <= 0 || R <= 0) return;

    const beta_rad = (beta_deg * Math.PI) / 180.0;

    // Euler-Eytelwein Capstan Equation: T1 / T2 = exp( mu * beta )
    const ratio = Math.exp(mu * beta_rad);
    const T2 = T1 / ratio;

    // Effective driving force: F_net = T1 - T2  [N]
    const F_net = T1 - T2;

    // Max torque: Torque = F_net * R  [N * m]
    const Torque_Nm = F_net * R;

    rtResEl.textContent = 'Tension Ratio T₁ / T₂ = ' + ratio.toFixed(2);
    tqResEl.textContent = 'Max Torque = ' + Torque_Nm.toFixed(1) + ' N·m | Slack T₂ = ' + Math.round(T2) + ' N (Net Force: ' + Math.round(F_net) + ' N @ β = ' + beta_deg + '°)';
  }

  [t1El, muEl, bEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();