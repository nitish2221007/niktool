(() => {
  'use strict';
  const eaEl = document.getElementById('ar-ea'), aEl = document.getElementById('ar-a'), tEl = document.getElementById('ar-t');
  const kResEl = document.getElementById('ar-res-k'), q10ResEl = document.getElementById('ar-res-q10');

  const R = 8.314462; // J / (mol * K)

  function update() {
    const Ea_kJ = parseFloat(eaEl.value), A = parseFloat(aEl.value), T = parseFloat(tEl.value);
    if (isNaN(Ea_kJ) || isNaN(A) || isNaN(T) || Ea_kJ < 0 || A <= 0 || T <= 0) return;

    const Ea_J = Ea_kJ * 1000.0;

    // Arrhenius equation: k = A * exp( -Ea / (R * T) )
    const exponent = -Ea_J / (R * T);
    const k = A * Math.exp(exponent);

    // Q10 acceleration ratio for a 10 K rise:
    const T_plus_10 = T + 10.0;
    const exponent_plus_10 = -Ea_J / (R * T_plus_10);
    const k_plus_10 = A * Math.exp(exponent_plus_10);
    const ratio = k > 0 ? (k_plus_10 / k) : 0;

    kResEl.textContent = 'k = ' + k.toExponential(2) + ' s⁻¹';
    q10ResEl.textContent = '+10°C Temp Boost (' + (T - 273.15).toFixed(0) + '°C -> ' + (T - 263.15).toFixed(0) + '°C): Speed increases by ' + ratio.toFixed(2) + '× (E_a = ' + Ea_kJ + ' kJ/mol)';
  }

  [eaEl, aEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();