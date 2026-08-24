(() => {
  'use strict';
  const v1El = document.getElementById('thd-v1'), v3El = document.getElementById('thd-v3');
  const v5El = document.getElementById('thd-v5'), v7El = document.getElementById('thd-v7');
  const pctResEl = document.getElementById('thd-res-pct'), ieeeResEl = document.getElementById('thd-res-ieee');

  function update() {
    const V1 = parseFloat(v1El.value), V3 = parseFloat(v3El.value);
    const V5 = parseFloat(v5El.value), V7 = parseFloat(v7El.value);

    if (isNaN(V1) || isNaN(V3) || isNaN(V5) || isNaN(V7) || V1 <= 0 || V3 < 0 || V5 < 0 || V7 < 0) return;

    const sumHarmonicsSq = Math.pow(V3, 2) + Math.pow(V5, 2) + Math.pow(V7, 2);
    const rmsHarmonics = Math.sqrt(sumHarmonicsSq);
    const thdPct = (rmsHarmonics / V1) * 100;

    pctResEl.textContent = thdPct.toFixed(2) + '% THD (Harmonic RMS: ' + rmsHarmonics.toFixed(2) + ' V)';

    if (thdPct <= 5.0) {
      ieeeResEl.textContent = 'PASSES IEEE 519 Grid Interconnect (THD ≤ 5.0% Clean Pure Sine)';
      ieeeResEl.style.color = '#22543d';
    } else if (thdPct <= 8.0) {
      ieeeResEl.textContent = 'ACCEPTABLE for General Industrial Loads (5% < THD ≤ 8%)';
      ieeeResEl.style.color = '#d97706';
    } else {
      ieeeResEl.textContent = 'EXCEEDS IEEE LIMITS (THD > 8%: Filter Inductor/Capacitor Required)';
      ieeeResEl.style.color = '#c53030';
    }
  }

  [v1El, v3El, v5El, v7El].forEach(el => el.addEventListener('input', update));
  update();
})();