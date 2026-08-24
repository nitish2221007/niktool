(() => {
  'use strict';
  const t1El = document.getElementById('dec-t1'), tpEl = document.getElementById('dec-tphi'), tEl = document.getElementById('dec-t');
  const t2ResEl = document.getElementById('dec-res-t2'), fdResEl = document.getElementById('dec-res-fid');

  function update() {
    const T1 = parseFloat(t1El.value), Tphi = parseFloat(tpEl.value), t = parseFloat(tEl.value);
    if (isNaN(T1) || isNaN(Tphi) || isNaN(t) || T1 <= 0 || Tphi <= 0 || t < 0) return;

    const invT2 = (1 / (2 * T1)) + (1 / Tphi);
    const T2 = 1 / invT2;
    const p1_survive = Math.exp(-t / T1) * 100;
    const coh_survive = Math.exp(-t / T2) * 100;

    t2ResEl.textContent = 'T₂ = ' + T2.toFixed(1) + ' μs (Theoretical Max 2·T₁ = ' + (2*T1).toFixed(1) + ' μs)';
    fdResEl.textContent = 'Population |1⟩: ' + p1_survive.toFixed(1) + '% | Phase Coherence: ' + coh_survive.toFixed(1) + '% @ t = ' + t + ' μs';
  }

  [t1El, tpEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();