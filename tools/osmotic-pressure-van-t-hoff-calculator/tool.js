(() => {
  'use strict';
  const mEl = document.getElementById('osm-m'), iEl = document.getElementById('osm-i'), tEl = document.getElementById('osm-t');
  const piResEl = document.getElementById('osm-res-pi'), kpaResEl = document.getElementById('osm-res-kpa');

  const R_gas_atm = 0.082057338; // L * atm / (mol * K)

  function update() {
    const M = parseFloat(mEl.value), iFactor = parseFloat(iEl.value), tC = parseFloat(tEl.value);
    if (isNaN(M) || isNaN(iFactor) || isNaN(tC) || M <= 0 || iFactor < 1) return;

    const T_K = tC + 273.15;
    // Pi = i * M * R * T (atm)
    const Pi_atm = iFactor * M * R_gas_atm * T_K;
    const Pi_kPa = Pi_atm * 101.325;
    const Pi_bar = Pi_atm * 1.01325;

    piResEl.textContent = Pi_atm.toFixed(2) + ' atm';
    kpaResEl.textContent = Pi_kPa.toFixed(1) + ' kPa (' + Pi_bar.toFixed(2) + ' bar / ' + (Pi_atm * 14.696).toFixed(1) + ' psi)';
  }

  [mEl, iEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();