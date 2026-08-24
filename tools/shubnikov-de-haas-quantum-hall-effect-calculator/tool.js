(() => {
  'use strict';
  const nEl = document.getElementById('sdh-n2d'), nuEl = document.getElementById('sdh-nu');
  const rhResEl = document.getElementById('sdh-res-rh'), bResEl = document.getElementById('sdh-res-b');

  const R_K = 25812.80745; // Ohms (exact von Klitzing constant h/e^2)
  const hbar = 1.054571817e-34;
  const e_charge = 1.602176634e-19;

  function update() {
    const nFactor = parseFloat(nEl.value), nu = parseInt(nuEl.value, 10);
    if (isNaN(nFactor) || isNaN(nu) || nFactor <= 0 || nu < 1) return;

    // Convert 10^11 cm^-2 to m^-2: nFactor * 1e11 * 1e4 = nFactor * 1e15 m^-2
    const n_2D_m2 = nFactor * 1e15;

    // Quantized Hall resistance R_H = R_K / nu  [Ohms]
    const R_H = R_K / nu;

    // SdH period in 1/B: Delta(1/B) = ( 2 * e ) / ( hbar * n_2D ) = ( 4 * pi * e ) / ( h * n_2D )  [T^-1]
    const delta_inv_B = (2.0 * e_charge) / (hbar * n_2D_m2);

    // Magnetic field corresponding to filling factor nu: B = ( h * n_2D ) / ( e * nu )  [Tesla]
    const B_nu = (2.0 * Math.PI * hbar * n_2D_m2) / (e_charge * nu);

    rhResEl.textContent = 'R_H = ' + R_H.toFixed(2) + ' Ω (ν = ' + nu + ')';
    bResEl.textContent = 'B_ν=' + nu + ' = ' + B_nu.toFixed(2) + ' Tesla (SdH Period Δ(1/B) = ' + delta_inv_B.toFixed(3) + ' T⁻¹ | n_2D = ' + nFactor + ' × 10¹¹ cm⁻²)';
  }

  nEl.addEventListener('input', update);
  nuEl.addEventListener('change', update);
  update();
})();