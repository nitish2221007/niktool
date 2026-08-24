(() => {
  'use strict';
  const lEl = document.getElementById('qw-l'), mEl = document.getElementById('qw-m'), nEl = document.getElementById('qw-n');
  const enResEl = document.getElementById('qw-res-en'), trResEl = document.getElementById('qw-res-trans');

  const hbar = 1.054571817e-34; // J*s
  const m0 = 9.1093837e-31; // kg
  const q = 1.602176634e-19; // J/eV

  function update() {
    const L_nm = parseFloat(lEl.value), m_ratio = parseFloat(mEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(L_nm) || isNaN(m_ratio) || isNaN(n) || L_nm <= 0 || m_ratio <= 0 || n <= 0) return;

    const L_m = L_nm * 1e-9;
    const m_eff = m_ratio * m0;

    // E_n = ( n^2 * pi^2 * hbar^2 ) / ( 2 * m_eff * L^2 )  [Joules -> eV -> meV]
    const E1_J = (Math.pow(Math.PI, 2) * Math.pow(hbar, 2)) / (2.0 * m_eff * Math.pow(L_m, 2));
    const E1_eV = E1_J / q;
    const E1_meV = E1_eV * 1000.0;

    const En_meV = Math.pow(n, 2) * E1_meV;
    const En_eV = En_meV / 1000.0;

    // Subband transition E2 - E1:
    const delta_E21_meV = 3.0 * E1_meV;
    const delta_E21_eV = delta_E21_meV / 1000.0;
    const lambda_um = 1.23984 / delta_E21_eV;

    enResEl.textContent = 'State E' + n + ' = ' + En_meV.toFixed(2) + ' meV (' + En_eV.toFixed(4) + ' eV)';
    trResEl.textContent = 'E₂ = ' + (4.0 * E1_meV).toFixed(1) + ' meV | Transition ΔE₂₁ = ' + delta_E21_meV.toFixed(1) + ' meV (λ = ' + lambda_um.toFixed(2) + ' μm Mid-IR @ L=' + L_nm + ' nm)';
  }

  [lEl, mEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();