(() => {
  'use strict';
  const niEl = document.getElementById('bohr-ni'), nfEl = document.getElementById('bohr-nf');
  const lResEl = document.getElementById('bohr-res-lambda'), eResEl = document.getElementById('bohr-res-energy'), sResEl = document.getElementById('bohr-res-series');

  const R_inf = 1.0973731568508e7; // Rydberg constant m^-1

  function update() {
    const ni = parseInt(niEl.value, 10), nf = parseInt(nfEl.value, 10);
    if (isNaN(ni) || isNaN(nf) || ni <= nf || nf < 1) {
      lResEl.textContent = 'Ensure n_i > n_f ≥ 1';
      return;
    }

    // Rydberg: 1/lambda = R_inf * (1/nf^2 - 1/ni^2)
    const invLambda = R_inf * ((1 / Math.pow(nf, 2)) - (1 / Math.pow(ni, 2)));
    const lambdaM = 1 / invLambda;
    const lambdaNm = lambdaM * 1e9;

    // Delta E = 13.6 * (1/nf^2 - 1/ni^2) eV
    const deltaE = 13.605693 * ((1 / Math.pow(nf, 2)) - (1 / Math.pow(ni, 2)));

    let colorName = '';
    if (nf === 1) colorName = ' (Lyman UV)';
    else if (nf === 2) {
      if (ni === 3) colorName = ' (Red H-α 656nm)';
      else if (ni === 4) colorName = ' (Cyan H-β 486nm)';
      else if (ni === 5) colorName = ' (Blue H-γ 434nm)';
      else colorName = ' (Violet H-δ)';
    } else if (nf === 3) colorName = ' (Paschen Infrared)';
    else colorName = ' (Infrared)';

    lResEl.textContent = lambdaNm.toFixed(1) + ' nm' + colorName;
    eResEl.textContent = deltaE.toFixed(3) + ' eV (' + (deltaE * 1.60218e-19).toExponential(2) + ' J)';

    if (nf === 1) sResEl.textContent = 'Lyman Series (Ultraviolet)';
    else if (nf === 2) sResEl.textContent = 'Balmer Series (Visible Spectrum)';
    else if (nf === 3) sResEl.textContent = 'Paschen Series (Near Infrared)';
    else sResEl.textContent = 'Brackett / Pfund Series (Far Infrared)';
  }

  niEl.addEventListener('input', update);
  nfEl.addEventListener('input', update);
  update();
})();