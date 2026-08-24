(() => {
  'use strict';
  const mEl = document.getElementById('pg-m'), cl0El = document.getElementById('pg-cl0');
  const pgResEl = document.getElementById('pg-res-pg'), clResEl = document.getElementById('pg-res-cl');

  function update() {
    const M = parseFloat(mEl.value), CL0 = parseFloat(cl0El.value);
    if (isNaN(M) || isNaN(CL0) || M <= 0 || M >= 0.88 || CL0 <= 0) return;

    const beta = Math.sqrt(1 - Math.pow(M, 2));
    const pgFactor = 1 / beta;
    const CL_comp = CL0 * pgFactor;
    const boostPct = (pgFactor - 1) * 100;

    pgResEl.textContent = pgFactor.toFixed(3) + '× Prandtl-Glauert Factor';
    clResEl.textContent = 'C_L = ' + CL_comp.toFixed(3) + ' (+' + boostPct.toFixed(1) + '% High-Speed Lift Boost @ Mach ' + M.toFixed(2) + ')';
  }

  mEl.addEventListener('input', update);
  cl0El.addEventListener('input', update);
  update();
})();