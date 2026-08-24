(() => {
  'use strict';
  const eaEl = document.getElementById('arr-ea'), tEl = document.getElementById('arr-t'), aEl = document.getElementById('arr-a');
  const kResEl = document.getElementById('arr-res-k'), qResEl = document.getElementById('arr-res-q10');

  const R = 8.314462618; // J / mol * K

  function update() {
    const Ea_kj = parseFloat(eaEl.value), Tc = parseFloat(tEl.value), A = parseFloat(aEl.value);
    if (isNaN(Ea_kj) || isNaN(Tc) || isNaN(A) || Ea_kj <= 0 || A <= 0 || Tc < -273.15) return;

    const Tk = Tc + 273.15;
    const Ea_j = Ea_kj * 1000;

    // k = A * exp( -Ea / (R * T) )
    const k = A * Math.exp(-Ea_j / (R * Tk));

    // Rate constant at T + 10°C
    const Tk_plus10 = Tk + 10;
    const k_plus10 = A * Math.exp(-Ea_j / (R * Tk_plus10));
    const Q10 = k_plus10 / k;

    kResEl.textContent = 'k = ' + k.toExponential(3) + ' s⁻¹';
    qResEl.textContent = 'Q₁₀ = ' + Q10.toFixed(2) + '× Rate Acceleration per +10°C (T = ' + Tk.toFixed(1) + ' K, E_a = ' + Ea_kj + ' kJ/mol)';
  }

  [eaEl, tEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();