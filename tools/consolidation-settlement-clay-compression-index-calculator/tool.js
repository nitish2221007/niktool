(() => {
  'use strict';
  const hEl = document.getElementById('cs-h'), e0El = document.getElementById('cs-e0');
  const ccEl = document.getElementById('cs-cc'), s0El = document.getElementById('cs-s0'), dsEl = document.getElementById('cs-ds');
  const scResEl = document.getElementById('cs-res-sc'), rtResEl = document.getElementById('cs-res-ratio');

  function update() {
    const H = parseFloat(hEl.value), e0 = parseFloat(e0El.value);
    const Cc = parseFloat(ccEl.value), sigma0 = parseFloat(s0El.value), deltaSigma = parseFloat(dsEl.value);

    if (isNaN(H) || isNaN(e0) || isNaN(Cc) || isNaN(sigma0) || isNaN(deltaSigma) || H <= 0 || e0 <= 0 || Cc <= 0 || sigma0 <= 0 || deltaSigma <= 0) return;

    // Stress ratio: ( sigma0 + deltaSigma ) / sigma0
    const stressRatio = (sigma0 + deltaSigma) / sigma0;

    // Void ratio change: Delta_e = Cc * log10( stressRatio )
    const delta_e = Cc * Math.log10(stressRatio);

    // Primary settlement: S_c = ( H * 1000 ) * ( delta_e / (1 + e0) )  [mm]
    const S_c_mm = (H * 1000.0) * (delta_e / (1.0 + e0));
    const S_c_in = S_c_mm / 25.4;

    scResEl.textContent = 'Settlement S_c = ' + S_c_mm.toFixed(1) + ' mm (' + S_c_in.toFixed(2) + ' in)';
    rtResEl.textContent = 'Stress Ratio = ' + stressRatio.toFixed(2) + ' | Δe = ' + delta_e.toFixed(3) + ' (Final e = ' + (e0 - delta_e).toFixed(3) + ' @ H = ' + H + ' m, C_c = ' + Cc + ')';
  }

  [hEl, e0El, ccEl, s0El, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();