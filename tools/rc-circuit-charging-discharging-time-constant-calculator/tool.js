(() => {
  'use strict';
  const rEl = document.getElementById('rc-r'), cEl = document.getElementById('rc-c');
  const v0El = document.getElementById('rc-v0'), tEl = document.getElementById('rc-t');
  const tauResEl = document.getElementById('rc-res-tau'), vtResEl = document.getElementById('rc-res-vt');

  function update() {
    const R_k = parseFloat(rEl.value), C_uF = parseFloat(cEl.value);
    const V0 = parseFloat(v0El.value), t_s = parseFloat(tEl.value);

    if (isNaN(R_k) || isNaN(C_uF) || isNaN(V0) || isNaN(t_s) || R_k <= 0 || C_uF <= 0 || V0 <= 0 || t_s < 0) return;

    const R = R_k * 1000.0;
    const C = C_uF * 1e-6;

    // Time constant tau = R * C  [seconds]
    const tau = R * C;

    // Charging voltage: V_charge(t) = V0 * ( 1 - exp(-t / tau) )
    const V_charge = V0 * (1.0 - Math.exp(-t_s / tau));
    const pct_charge = (V_charge / V0) * 100.0;

    // Discharging voltage: V_discharge(t) = V0 * exp(-t / tau)
    const V_discharge = V0 * Math.exp(-t_s / tau);

    tauResEl.textContent = 'Time Constant τ = ' + (tau >= 1 ? tau.toFixed(3) + ' s' : (tau * 1000).toFixed(1) + ' ms');
    vtResEl.textContent = 'Charging V(t) = ' + V_charge.toFixed(2) + ' V (' + pct_charge.toFixed(1) + '% V₀) | Discharging V(t) = ' + V_discharge.toFixed(2) + ' V (Fully settled at 5τ = ' + (5 * tau).toFixed(2) + ' s)';
  }

  [rEl, cEl, v0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();