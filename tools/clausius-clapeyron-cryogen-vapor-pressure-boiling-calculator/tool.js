(() => {
  'use strict';
  const cryoEl = document.getElementById('clp-cryo'), p2El = document.getElementById('clp-p2');
  const t2ResEl = document.getElementById('clp-res-t2'), dpResEl = document.getElementById('clp-res-drop');

  const R = 8.314462; // J / mol * K

  const CRYOS = {
    'ln2': { t1_k: 77.36, dh_j_mol: 5570.0, name: 'Liquid Nitrogen (LN₂)' },
    'lhe': { t1_k: 4.22,  dh_j_mol: 83.0,   name: 'Liquid Helium (LHe)' },
    'lh2': { t1_k: 20.28, dh_j_mol: 900.0,  name: 'Liquid Hydrogen (LH₂)' },
    'lox': { t1_k: 90.19, dh_j_mol: 6820.0, name: 'Liquid Oxygen (LOX)' }
  };

  function update() {
    const c = CRYOS[cryoEl.value];
    const P2_mbar = parseFloat(p2El.value);

    if (isNaN(P2_mbar) || P2_mbar <= 0) return;

    const P1_mbar = 1013.25; // 1 atm reference

    // Clausius-Clapeyron equation:
    // ln(P2 / P1) = -(deltaH / R) * ( 1/T2 - 1/T1 )
    // 1/T2 = 1/T1 - (R / deltaH) * ln(P2 / P1)
    const invT2 = (1.0 / c.t1_k) - ((R / c.dh_j_mol) * Math.log(P2_mbar / P1_mbar));
    const T2_k = 1.0 / invT2;
    const T2_c = T2_k - 273.15;

    const deltaT = T2_k - c.t1_k;

    t2ResEl.textContent = 'T₂ = ' + T2_k.toFixed(2) + ' K (' + T2_c.toFixed(1) + ' °C Boiling Point)';
    dpResEl.textContent = (deltaT >= 0 ? '+' : '') + deltaT.toFixed(2) + ' K Temperature Shift (' + c.name + ' @ ' + P2_mbar + ' mbar vs 1 atm ' + c.t1_k.toFixed(1) + ' K)';
  }

  cryoEl.addEventListener('change', update);
  p2El.addEventListener('input', update);
  update();
})();