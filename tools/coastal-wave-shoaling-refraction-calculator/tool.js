(() => {
  'use strict';
  const h0El = document.getElementById('sh-h0'), tEl = document.getElementById('sh-t'), d2El = document.getElementById('sh-d2');
  const h2ResEl = document.getElementById('sh-res-h2'), ksResEl = document.getElementById('sh-res-ks');

  const g = 9.80665;

  function update() {
    const H0 = parseFloat(h0El.value), T = parseFloat(tEl.value), d2 = parseFloat(d2El.value);
    if (isNaN(H0) || isNaN(T) || isNaN(d2) || H0 <= 0 || T <= 0 || d2 <= 0) return;

    const Cg0 = 0.5 * ((g * T) / (2 * Math.PI));
    const L0 = (g * Math.pow(T, 2)) / (2 * Math.PI);
    let L2 = L0;
    for (let i = 0; i < 20; i++) {
      L2 = L0 * Math.tanh((2 * Math.PI * d2) / L2);
    }
    const c2 = L2 / T;
    const k2 = (2 * Math.PI) / L2;
    const n2 = 0.5 * (1 + ((2 * k2 * d2) / Math.sinh(2 * k2 * d2)));
    const Cg2 = n2 * c2;

    const Ks = Math.sqrt(Cg0 / Cg2);
    const H2 = H0 * Ks;
    const ampPct = (Ks - 1) * 100;

    h2ResEl.textContent = H2.toFixed(2) + ' m Inshore Height';
    ksResEl.textContent = 'K_s = ' + Ks.toFixed(2) + ' (' + (ampPct >= 0 ? '+' : '') + ampPct.toFixed(1) + '% Energy Compression, L₂ = ' + L2.toFixed(1) + ' m)';
  }

  [h0El, tEl, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();