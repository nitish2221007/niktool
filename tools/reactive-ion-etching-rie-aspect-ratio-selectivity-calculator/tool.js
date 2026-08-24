(() => {
  'use strict';
  const rvEl = document.getElementById('rie-rv'), rlEl = document.getElementById('rie-rl'), rmEl = document.getElementById('rie-rmask');
  const aResEl = document.getElementById('rie-res-aniso'), sResEl = document.getElementById('rie-res-sel');

  function update() {
    const Rv = parseFloat(rvEl.value), Rl = parseFloat(rlEl.value), Rmask = parseFloat(rmEl.value);
    if (isNaN(Rv) || isNaN(Rl) || isNaN(Rmask) || Rv <= 0 || Rl < 0 || Rmask <= 0) return;

    // Anisotropy A = 1 - (Rl / Rv)
    const A = Math.max(0, 1 - (Rl / Rv));
    const APct = A * 100;

    // Selectivity S = Rv / Rmask
    const S = Rv / Rmask;

    aResEl.textContent = 'Anisotropy A = ' + A.toFixed(3) + ' (' + APct.toFixed(1) + '% Vertical Directionality)';
    sResEl.textContent = 'Selectivity S = ' + S.toFixed(1) + ' : 1 (Etches ' + S.toFixed(1) + '× Faster than Mask)';
  }

  [rvEl, rlEl, rmEl].forEach(el => el.addEventListener('input', update));
  update();
})();