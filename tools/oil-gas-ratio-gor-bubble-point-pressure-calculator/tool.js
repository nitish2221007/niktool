(() => {
  'use strict';
  const rsEl = document.getElementById('pb-rs'), ggEl = document.getElementById('pb-gg');
  const apiEl = document.getElementById('pb-api'), tEl = document.getElementById('pb-temp');
  const pResEl = document.getElementById('pb-res-val'), sResEl = document.getElementById('pb-res-state');

  function update() {
    const Rs = parseFloat(rsEl.value), gamma_g = parseFloat(ggEl.value);
    const api = parseFloat(apiEl.value), Tf = parseFloat(tEl.value);

    if (isNaN(Rs) || isNaN(gamma_g) || isNaN(api) || isNaN(Tf) || Rs <= 0 || gamma_g <= 0 || api <= 0 || Tf <= 0) return;

    // Standing 1947 Bubble Point Equation:
    // a = 0.00091 * T_f - 0.0125 * API
    // P_b = 18.2 * [ (Rs / gamma_g)^0.83 * 10^a - 1.4 ]
    const a = (0.00091 * Tf) - (0.0125 * api);
    const term = Math.pow(Rs / gamma_g, 0.83) * Math.pow(10, a);
    const Pb = 18.2 * (term - 1.4);

    pResEl.textContent = 'P_b = ' + Math.round(Pb).toLocaleString() + ' psi (' + (Pb * 0.0689476).toFixed(1) + ' bar)';
    sResEl.textContent = 'Standing PVT Correlation | If P_reservoir > ' + Math.round(Pb) + ' psi: Undersaturated Oil (No Free Gas Cap)';
  }

  [rsEl, ggEl, apiEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();