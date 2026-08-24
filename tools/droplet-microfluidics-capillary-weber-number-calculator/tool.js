(() => {
  'use strict';
  const vEl = document.getElementById('drp-v'), muEl = document.getElementById('drp-mu');
  const gamEl = document.getElementById('drp-gam'), wEl = document.getElementById('drp-w');
  const caResEl = document.getElementById('drp-res-ca'), rgResEl = document.getElementById('drp-res-reg');

  const rho_oil = 850.0; // kg / m^3

  function update() {
    const vMs = parseFloat(vEl.value), muMpaS = parseFloat(muEl.value);
    const gamMnm = parseFloat(gamEl.value), wUm = parseFloat(wEl.value);

    if (isNaN(vMs) || isNaN(muMpaS) || isNaN(gamMnm) || isNaN(wUm) || vMs <= 0 || muMpaS <= 0 || gamMnm <= 0 || wUm <= 0) return;

    const muPaS = muMpaS * 1e-3;
    const gamNm = gamMnm * 1e-3;
    const wM = wUm * 1e-6;

    // Capillary number Ca = (mu * v) / gamma
    const Ca = (muPaS * vMs) / gamNm;

    // Weber number We = (rho * v^2 * w) / gamma
    const We = (rho_oil * Math.pow(vMs, 2) * wM) / gamNm;

    caResEl.textContent = 'Ca = ' + Ca.toFixed(3) + ' (Capillary Number)';

    let regime = '';
    let color = '#22543d';

    if (Ca < 0.01) {
      regime = 'SQUEEZING REGIME (Ca << 1: Droplets fill channel cross-section, volume governed by flow ratio)';
      color = '#2563eb';
    } else if (Ca <= 0.10) {
      regime = 'DRIPPING REGIME (0.01 < Ca < 0.1: Highly Monodisperse Spherical Droplets, CV < 2%)';
      color = '#22543d';
    } else {
      regime = 'JETTING REGIME (Ca > 0.10: Unstable Long Filament Jet, Polydisperse Droplet Breakup)';
      color = '#c53030';
    }

    rgResEl.textContent = regime + ' | We = ' + We.toExponential(2);
    rgResEl.style.color = color;
  }

  [vEl, muEl, gamEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();