(() => {
  'use strict';
  const dhEl = document.getElementById('vh-dh'), k1El = document.getElementById('vh-k1');
  const t1El = document.getElementById('vh-t1'), t2El = document.getElementById('vh-t2');
  const k2ResEl = document.getElementById('vh-res-k2'), shResEl = document.getElementById('vh-res-shift');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const dH_kJ = parseFloat(dhEl.value), K1 = parseFloat(k1El.value);
    const T1_C = parseFloat(t1El.value), T2_C = parseFloat(t2El.value);

    if (isNaN(dH_kJ) || isNaN(K1) || isNaN(T1_C) || isNaN(T2_C) || K1 <= 0 || T1_C < -273.15 || T2_C < -273.15) return;

    const T1_K = T1_C + 273.15;
    const T2_K = T2_C + 273.15;
    const dH_J = dH_kJ * 1000.0;

    // Van 't Hoff isochore: ln(K2 / K1) = - (dH / R) * ( 1/T2 - 1/T1 )
    const delta_inv_T = (1.0 / T2_K) - (1.0 / T1_K);
    const ln_ratio = -(dH_J / R) * delta_inv_T;
    const ratio = Math.exp(ln_ratio);
    const K2 = K1 * ratio;

    let shift = '', color = '#22543d';
    if (dH_kJ < 0) {
      shift = 'EXOTHERMIC (ΔH° < 0): Heating from ' + T1_C + '°C to ' + T2_C + '°C shifts equilibrium LEFT (K dropped ' + (1/ratio).toExponential(2) + '×)';
      color = '#ea580c';
    } else if (dH_kJ > 0) {
      shift = 'ENDOTHERMIC (ΔH° > 0): Heating from ' + T1_C + '°C to ' + T2_C + '°C shifts equilibrium RIGHT (K increased ' + ratio.toExponential(2) + '×)';
      color = '#22543d';
    } else {
      shift = 'ATHERMIC (ΔH° = 0): Temperature has zero effect on equilibrium constant';
      color = '#2563eb';
    }

    k2ResEl.textContent = 'Target K₂ = ' + (K2 < 0.01 || K2 > 10000 ? K2.toExponential(2) : K2.toFixed(3));
    shResEl.textContent = shift;
    shResEl.style.color = color;
  }

  [dhEl, k1El, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();