(() => {
  'use strict';
  const spEl = document.getElementById('rig-spec'), ekEl = document.getElementById('rig-ek'), bEl = document.getElementById('rig-b');
  const brResEl = document.getElementById('rig-res-brho'), rhResEl = document.getElementById('rig-res-rho');

  const c = 2.99792458e8;

  function update() {
    const spec = spEl.value, EkGev = parseFloat(ekEl.value), B = parseFloat(bEl.value);
    if (isNaN(EkGev) || isNaN(B) || EkGev <= 0 || B <= 0) return;

    let m0Gev = 0.938272;
    let zCharge = 1;
    if (spec === 'electron') { m0Gev = 0.000511; zCharge = 1; }
    else if (spec === 'carbon') { m0Gev = 12 * 0.9315; zCharge = 6; }

    const Etot = EkGev + m0Gev;
    const pGev_c = Math.sqrt(Math.pow(Etot, 2) - Math.pow(m0Gev, 2));
    const Brho = (1e9 * pGev_c) / (zCharge * c);
    const rhoM = Brho / B;

    brResEl.textContent = Math.round(Brho).toLocaleString() + ' T·m (Rigidity)';
    rhResEl.textContent = 'ρ = ' + Math.round(rhoM).toLocaleString() + ' meters Radius (Total Momentum p = ' + Math.round(pGev_c).toLocaleString() + ' GeV/c)';
  }

  spEl.addEventListener('change', update);
  ekEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();