(() => {
  'use strict';
  const qEl = document.getElementById('bg-q'), mEl = document.getElementById('bg-mass'), spEl = document.getElementById('bg-sp');
  const dResEl = document.getElementById('bg-res-dose'), gResEl = document.getElementById('bg-res-gas');

  const W_e = 33.97; // J / C (average energy required to produce an ion pair in dry air)

  function update() {
    const Q_nc = parseFloat(qEl.value), massMg = parseFloat(mEl.value), sRatio = parseFloat(spEl.value);
    if (isNaN(Q_nc) || isNaN(massMg) || isNaN(sRatio) || Q_nc <= 0 || massMg <= 0 || sRatio <= 0) return;

    const Q_c = Q_nc * 1e-9;
    const massKg = massMg * 1e-6;

    // Dose to cavity gas D_gas = (Q / m) * (W / e)  [Joules/kg = Gray]
    const D_gas = (Q_c / massKg) * W_e;

    // Bragg-Gray cavity relation: D_med = D_gas * (S / rho)_gas^med  [Gray]
    const D_med = D_gas * sRatio;

    dResEl.textContent = 'D_water = ' + D_med.toFixed(3) + ' Gy (' + (D_med * 100).toFixed(1) + ' cGy)';
    gResEl.textContent = 'D_gas: ' + D_gas.toFixed(3) + ' Gy | Specific Charge: ' + (Q_nc/massMg).toFixed(2) + ' nC/mg (AAPM TG-51 / IAEA TRS-398 Reference)';
  }

  [qEl, mEl, spEl].forEach(el => el.addEventListener('input', update));
  update();
})();