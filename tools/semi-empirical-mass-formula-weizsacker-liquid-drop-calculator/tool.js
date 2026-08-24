(() => {
  'use strict';
  const aEl = document.getElementById('ld-a'), zEl = document.getElementById('ld-z');
  const bResEl = document.getElementById('ld-res-b'), trResEl = document.getElementById('ld-res-terms');

  // Standard Weizsäcker coefficients in MeV:
  const a_v = 15.67; // Volume
  const a_s = 17.23; // Surface
  const a_c = 0.714; // Coulomb
  const a_a = 23.28; // Asymmetry
  const a_p = 12.00; // Pairing

  function update() {
    const A = parseInt(aEl.value, 10), Z = parseInt(zEl.value, 10);
    if (isNaN(A) || isNaN(Z) || A <= 0 || Z <= 0 || Z > A) return;

    const N = A - Z;

    // Terms:
    const E_vol = a_v * A;
    const E_surf = - a_s * Math.pow(A, 2.0 / 3.0);
    const E_coul = - a_c * (Z * (Z - 1)) / Math.pow(A, 1.0 / 3.0);
    const E_asym = - a_a * Math.pow(A - (2.0 * Z), 2) / A;

    // Pairing term delta:
    let delta = 0;
    if (Z % 2 === 0 && N % 2 === 0) delta = + a_p / Math.sqrt(A); // Even-even
    else if (Z % 2 !== 0 && N % 2 !== 0) delta = - a_p / Math.sqrt(A); // Odd-odd
    else delta = 0.0; // Even-odd

    const B_MeV = E_vol + E_surf + E_coul + E_asym + delta;
    const BE_A = B_MeV / A;

    bResEl.textContent = 'Binding Energy B = ' + B_MeV.toFixed(1) + ' MeV (' + BE_A.toFixed(2) + ' MeV/Nucleon)';
    trResEl.textContent = 'Vol: +' + E_vol.toFixed(1) + ' | Surf: ' + E_surf.toFixed(1) + ' | Coul: ' + E_coul.toFixed(1) + ' | Asym: ' + E_asym.toFixed(1) + ' | Pair: ' + (delta >= 0 ? '+' : '') + delta.toFixed(1) + ' MeV';
  }

  aEl.addEventListener('input', update);
  zEl.addEventListener('input', update);
  update();
})();