(() => {
  'use strict';
  const dhEl = document.getElementById('vth-dh'), t1El = document.getElementById('vth-t1'), t2El = document.getElementById('vth-t2'), k1El = document.getElementById('vth-k1');
  const k2ResEl = document.getElementById('vth-res-k2'), shResEl = document.getElementById('vth-res-shift');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const dhKj = parseFloat(dhEl.value), t1C = parseFloat(t1El.value), t2C = parseFloat(t2El.value), k1 = parseFloat(k1El.value);
    if (isNaN(dhKj) || isNaN(t1C) || isNaN(t2C) || isNaN(k1) || k1 <= 0 || t1C === t2C) return;

    const T1 = t1C + 273.15;
    const T2 = t2C + 273.15;
    const dhJoules = dhKj * 1000;

    // ln(K2 / K1) = -(dH / R) * (1/T2 - 1/T1)
    const lnRatio = -(dhJoules / R) * ((1 / T2) - (1 / T1));
    const k2 = k1 * Math.exp(lnRatio);

    k2ResEl.textContent = (k2 >= 0.01 && k2 <= 1000) ? k2.toFixed(3) : k2.toExponential(2);

    if (k2 > k1) {
      shResEl.textContent = 'Equilibrium Shifts Right (Favors Products)';
      shResEl.style.color = '#22543d';
    } else {
      shResEl.textContent = 'Equilibrium Shifts Left (Favors Reactants)';
      shResEl.style.color = '#c53030';
    }
  }

  [dhEl, t1El, t2El, k1El].forEach(el => el.addEventListener('input', update));
  update();
})();