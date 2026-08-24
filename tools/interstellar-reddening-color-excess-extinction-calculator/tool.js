(() => {
  'use strict';
  const obsEl = document.getElementById('rd-bvobs'), b0El = document.getElementById('rd-bv0'), rvEl = document.getElementById('rd-rv');
  const avResEl = document.getElementById('rd-res-av'), ebResEl = document.getElementById('rd-res-ebv');

  function update() {
    const BV_obs = parseFloat(obsEl.value), BV_0 = parseFloat(b0El.value), R_V = parseFloat(rvEl.value);
    if (isNaN(BV_obs) || isNaN(BV_0) || isNaN(R_V) || R_V <= 0) return;

    // Color excess: E(B - V) = (B - V)_obs - (B - V)_0  [magnitudes]
    const E_BV = BV_obs - BV_0;

    // Visual extinction: A_V = R_V * E(B - V)  [magnitudes]
    const A_V = R_V * E_BV;

    // Light dimming factor: 10^(0.4 * A_V)
    const dim_factor = Math.pow(10.0, 0.4 * A_V);

    avResEl.textContent = 'Visual Extinction A_V = ' + A_V.toFixed(2) + ' Magnitudes';
    ebResEl.textContent = 'Color Excess E(B - V) = ' + E_BV.toFixed(2) + ' mag | Star dimmed by ' + dim_factor.toFixed(2) + '× (True mag = V_obs - ' + A_V.toFixed(2) + ')';
  }

  [obsEl, b0El, rvEl].forEach(el => el.addEventListener('input', update));
  update();
})();