(() => {
  'use strict';
  const nEl = document.getElementById('spt-n'), erEl = document.getElementById('spt-er');
  const sigEl = document.getElementById('spt-sig'), rodEl = document.getElementById('spt-rod');
  const n60ResEl = document.getElementById('spt-res-n60'), phiResEl = document.getElementById('spt-res-phi');

  function update() {
    const N_field = parseFloat(nEl.value), ER = parseFloat(erEl.value);
    const sigma_v = parseFloat(sigEl.value), rodLen = parseFloat(rodEl.value);

    if (isNaN(N_field) || isNaN(ER) || isNaN(sigma_v) || isNaN(rodLen) || N_field <= 0 || ER <= 0 || sigma_v <= 0) return;

    // Energy correction: C_E = ER / 60
    const C_E = ER / 60.0;

    // Rod length correction C_R:
    let C_R = 1.0;
    if (rodLen < 4.0) C_R = 0.75;
    else if (rodLen < 6.0) C_R = 0.85;
    else if (rodLen < 10.0) C_R = 0.95;
    else C_R = 1.00;

    // N60 = N_field * C_E * C_R (assuming standard borehole CB=1.0, liner CS=1.0)
    const N60 = N_field * C_E * C_R;

    // Overburden correction factor C_N = sqrt( 100 / sigma_v ) [Liao & Whitman 1986] capped at 2.0
    const C_N = Math.min(2.0, Math.sqrt(100.0 / sigma_v));
    const N1_60 = N60 * C_N;

    const roundN60 = Math.round(N60);
    const roundN160 = Math.round(N1_60);

    // Empirical Peck-Hanson friction angle: phi approx = 27.1 + 0.3 * N1_60 - 0.00054 * N1_60^2
    const phi = Math.min(45.0, 27.1 + (0.3 * N1_60) - (0.00054 * Math.pow(N1_60, 2)));

    let density = '';
    if (roundN160 < 4) density = 'Very Loose Sand (High Liquefaction Risk)';
    else if (roundN160 < 10) density = 'Loose Sand';
    else if (roundN160 < 30) density = 'Medium Dense Sand';
    else if (roundN160 < 50) density = 'Dense Sand';
    else density = 'Very Dense Sand / Hard Clay';

    n60ResEl.textContent = 'N₆₀ = ' + roundN60 + ' | (N₁)₆₀ = ' + roundN160 + ' (' + density + ')';
    phiResEl.textContent = 'Estimated Friction Angle φ' ≈ ' + phi.toFixed(1) + '° | Overburden C_N = ' + C_N.toFixed(2) + ' (C_E = ' + C_E.toFixed(2) + ', C_R = ' + C_R + ')';
  }

  [nEl, erEl, sigEl, rodEl].forEach(el => el.addEventListener('input', update));
  update();
})();