(() => {
  'use strict';
  const lamEl = document.getElementById('mich-lam'), frEl = document.getElementById('mich-fringes'), clEl = document.getElementById('mich-cell');
  const dlResEl = document.getElementById('mich-res-dl'), idxResEl = document.getElementById('mich-res-idx');

  function update() {
    const lamNm = parseFloat(lamEl.value), deltaM = parseFloat(frEl.value), cellCm = parseFloat(clEl.value);
    if (isNaN(lamNm) || isNaN(deltaM) || isNaN(cellCm) || lamNm <= 0 || deltaM <= 0 || cellCm <= 0) return;

    const lamM = lamNm * 1e-9;
    const cellM = cellCm * 1e-2;

    // Physical mirror displacement Delta_L = ( Delta_m * lambda ) / 2  [meters]
    const deltaL_m = (deltaM * lamM) / 2.0;
    const deltaL_um = deltaL_m * 1e6;

    // Gas refractive index difference: Delta_n = ( Delta_m * lambda ) / ( 2 * L_cell )
    const delta_n = (deltaM * lamM) / (2.0 * cellM);
    const n_gas = 1.0 + delta_n;

    dlResEl.textContent = 'Mirror ΔL = ' + deltaL_um.toFixed(3) + ' μm (' + (deltaL_m * 1e9).toFixed(1) + ' nm)';
    idxResEl.textContent = 'Gas n = ' + n_gas.toFixed(6) + ' (Δn = ' + delta_n.toExponential(3) + ' @ ' + cellCm + ' cm Cell Length, λ = ' + lamNm + ' nm)';
  }

  [lamEl, frEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();