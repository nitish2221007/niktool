(() => {
  'use strict';
  const matEl = document.getElementById('bcs-mat'), tEl = document.getElementById('bcs-t');
  const gResEl = document.getElementById('bcs-res-gap'), hcResEl = document.getElementById('bcs-res-hc');

  const kB_ev = 8.617333262e-5; // eV / K

  const SUPERS = {
    'nbti':  { tc: 9.2,  hc0: 14.5, name: 'Niobium-Titanium (NbTi)' },
    'nb3sn': { tc: 18.3, hc0: 28.0, name: 'Niobium-Tin (Nb₃Sn)' },
    'pb':    { tc: 7.2,  hc0: 0.08, name: 'Lead (Pb Type I)' },
    'mgb2':  { tc: 39.0, hc0: 30.0, name: 'Magnesium Diboride (MgB₂)' },
    'ybco':  { tc: 93.0, hc0: 120.0,name: 'YBCO High-Temperature' }
  };

  function update() {
    const s = SUPERS[matEl.value];
    const T = parseFloat(tEl.value);

    if (isNaN(T) || T < 0) return;

    // BCS Zero-temperature energy gap: Delta_0 = 1.764 * kB * Tc  [eV -> meV]
    const delta0_ev = 1.764 * kB_ev * s.tc;
    const delta0_mev = delta0_ev * 1000;
    const fullGapMev = 2 * delta0_mev; // 2*Delta is the photon Cooper pair breakup energy

    if (T >= s.tc) {
      gResEl.textContent = 'NORMAL STATE (T ≥ T_c = ' + s.tc + ' K)';
      hcResEl.textContent = 'Superconductivity Destroyed by Thermal Energy (Zero Critical Field)';
      gResEl.style.color = '#c53030';
      return;
    }
    gResEl.style.color = '#22543d';

    // Critical magnetic field: H_c(T) = H_c(0) * [ 1 - (T / T_c)^2 ]  [Tesla]
    const Hc_T = s.hc0 * (1.0 - Math.pow(T / s.tc, 2));
    const fieldPct = (Hc_T / s.hc0) * 100;

    gResEl.textContent = '2Δ₀ = ' + fullGapMev.toFixed(2) + ' meV (Single Gap Δ₀ = ' + delta0_mev.toFixed(2) + ' meV)';
    hcResEl.textContent = 'H_c(' + T + ' K) = ' + Hc_T.toFixed(2) + ' Tesla (' + fieldPct.toFixed(1) + '% of H_c(0) = ' + s.hc0 + ' T in ' + s.name + ')';
  }

  matEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();