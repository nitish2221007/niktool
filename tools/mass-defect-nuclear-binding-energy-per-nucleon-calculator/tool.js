(() => {
  'use strict';
  const zEl = document.getElementById('md-z'), nEl = document.getElementById('md-n'), mEl = document.getElementById('md-mass');
  const baResEl = document.getElementById('md-res-bea'), ttResEl = document.getElementById('md-res-tot');

  // Masses in atomic mass units (u):
  const m_H1 = 1.007825032; // Hydrogen-1 atom (proton + electron)
  const m_n = 1.008664916; // Free neutron
  const u_to_MeV = 931.49410242; // MeV / u

  function update() {
    const Z = parseInt(zEl.value, 10), N = parseInt(nEl.value, 10), M_atom = parseFloat(mEl.value);
    if (isNaN(Z) || isNaN(N) || isNaN(M_atom) || Z <= 0 || N < 0 || M_atom <= 0) return;

    const A = Z + N;

    // Mass defect in atomic mass units:
    // Delta_m = Z * m_H1 + N * m_n - M_atom  [u]
    const constituent_mass = (Z * m_H1) + (N * m_n);
    const delta_m_u = constituent_mass - M_atom;

    if (delta_m_u <= 0) return;

    // Total binding energy: E_B = Delta_m * 931.494 MeV
    const E_B_MeV = delta_m_u * u_to_MeV;

    // Binding energy per nucleon:
    const BE_A_MeV = E_B_MeV / A;

    baResEl.textContent = 'BE / A = ' + BE_A_MeV.toFixed(3) + ' MeV / Nucleon';
    ttResEl.textContent = 'Total E_B = ' + E_B_MeV.toFixed(2) + ' MeV | Mass Defect Δm = ' + delta_m_u.toFixed(5) + ' u (A=' + A + ', Z=' + Z + ', N=' + N + ')';
  }

  zEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();