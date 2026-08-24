(() => {
  'use strict';
  const dEl = document.getElementById('wt-diam'), vEl = document.getElementById('wt-v');
  const cpEl = document.getElementById('wt-cp'), effEl = document.getElementById('wt-eff');
  const pgResEl = document.getElementById('wt-res-pgen'), bzResEl = document.getElementById('wt-res-betz');

  const rhoAir = 1.225; // kg / m^3 (Sea level air density)
  const betzMax = 16 / 27; // ~0.5926

  function update() {
    const diamM = parseFloat(dEl.value), vMs = parseFloat(vEl.value);
    const Cp = parseFloat(cpEl.value), effPct = parseFloat(effEl.value);

    if (isNaN(diamM) || isNaN(vMs) || isNaN(Cp) || isNaN(effPct) || diamM <= 0 || vMs <= 0 || Cp <= 0 || Cp > betzMax) return;

    const radius = diamM / 2;
    const sweptArea = Math.PI * Math.pow(radius, 2);

    // Total wind kinetic flux P_wind = 0.5 * rho * A * v^3 (Watts)
    const pWind = 0.5 * rhoAir * sweptArea * Math.pow(vMs, 3);
    const pBetz = betzMax * pWind;
    const pAero = Cp * pWind;
    const pElec = pAero * (effPct / 100);

    const pElecKw = pElec / 1000;
    const pElecMw = pElecKw / 1000;
    const pBetzKw = pBetz / 1000;

    pgResEl.textContent = pElecMw >= 1.0 ? pElecMw.toFixed(2) + ' MW (' + Math.round(pElecKw).toLocaleString() + ' kW)' : Math.round(pElecKw) + ' kW';
    bzResEl.textContent = (pBetzKw >= 1000 ? (pBetzKw / 1000).toFixed(2) + ' MW' : Math.round(pBetzKw) + ' kW') + ' (Swept ' + Math.round(sweptArea).toLocaleString() + ' m²)';
  }

  [dEl, vEl, cpEl, effEl].forEach(el => el.addEventListener('input', update));
  update();
})();