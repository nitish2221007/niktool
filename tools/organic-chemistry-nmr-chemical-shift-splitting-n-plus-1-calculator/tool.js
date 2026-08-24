(() => {
  'use strict';
  const nEl = document.getElementById('nmr-n'), shEl = document.getElementById('nmr-shift');
  const mResEl = document.getElementById('nmr-res-mult'), rResEl = document.getElementById('nmr-res-ratio');

  const NAMES = ['Singlet', 'Doublet', 'Triplet', 'Quartet', 'Quintet', 'Sextet', 'Septet', 'Octet', 'Nonet'];
  const PASCAL = [
    '1',
    '1 : 1',
    '1 : 2 : 1',
    '1 : 3 : 3 : 1',
    '1 : 4 : 6 : 4 : 1',
    '1 : 5 : 10 : 10 : 5 : 1',
    '1 : 6 : 15 : 20 : 15 : 6 : 1',
    '1 : 7 : 21 : 35 : 35 : 21 : 7 : 1'
  ];

  function update() {
    const N = parseInt(nEl.value, 10);
    const shift = parseFloat(shEl.value) || 0;

    if (isNaN(N) || N < 0) return;

    const peaks = N + 1;
    const name = (N < NAMES.length) ? NAMES[N] : (N + 1) + '-Multiplet';
    const ratio = (N < PASCAL.length) ? PASCAL[N] : 'Binomial Coefficients';

    let substructure = '';
    if (N === 0) substructure = 'Isolated proton (e.g. -OCH₃, -C(CH₃)₃ t-butyl singlet, aromatic)';
    else if (N === 1) substructure = 'Coupled to 1 adjacent CH proton (e.g. Isopropyl -CH(CH₃)₂ doublet)';
    else if (N === 2) substructure = 'Coupled to adjacent -CH₂- methylene group (e.g. -CH₂-CH₃ triplet)';
    else if (N === 3) substructure = 'Coupled to adjacent -CH₃ methyl group (e.g. -O-CH₂-CH₃ quartet @ δ = ' + shift + ' ppm)';
    else if (N === 6) substructure = 'Coupled to 2 equivalent methyl groups (e.g. Isopropyl -CH(CH₃)₂ septet)';
    else substructure = 'Complex alkyl chain multiplet';

    mResEl.textContent = name.toUpperCase() + ' (' + peaks + ' Peaks)';
    rResEl.textContent = 'Ratio: ' + ratio + ' | ' + substructure;
  }

  nEl.addEventListener('input', update);
  shEl.addEventListener('input', update);
  update();
})();