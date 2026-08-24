(() => {
  'use strict';
  const vEl = document.getElementById('sq-v'), cbEl = document.getElementById('sq-cb');
  const ukcEl = document.getElementById('sq-ukc'), chEl = document.getElementById('sq-chan');
  const sqResEl = document.getElementById('sq-res-squat'), ukcResEl = document.getElementById('sq-res-netukc');

  function update() {
    const v_kts = parseFloat(vEl.value), C_b = parseFloat(cbEl.value);
    const static_UKC = parseFloat(ukcEl.value), isConfined = chEl.value === 'confined';

    if (isNaN(v_kts) || isNaN(C_b) || isNaN(static_UKC) || v_kts < 0 || C_b <= 0 || static_UKC < 0) return;

    // Barrass empirical squat formula:
    // Open shallow water: S_b = ( C_b * v^2 ) / 100  [meters]
    // Confined canal: S_b = ( 2 * C_b * v^2 ) / 100  [meters]
    const factor = isConfined ? 2.0 : 1.0;
    const S_b = (factor * C_b * Math.pow(v_kts, 2)) / 100.0;

    const net_UKC = static_UKC - S_b;

    let status = '', color = '#22543d';
    if (net_UKC >= 1.0) {
      status = 'SAFE NAVIGATION (Net UKC ≥ 1.0 m: Ample seabed margin)';
      color = '#22543d';
    } else if (net_UKC > 0) {
      status = 'CRITICAL MARGIN (Net UKC < 1.0 m: Reduce transit speed immediately!)';
      color = '#ea580c';
    } else {
      status = 'GROUNDING COLLISION (Net UKC ≤ 0 m: Keel strikes canal seabed!)';
      color = '#c53030';
    }

    sqResEl.textContent = 'Squat Sinkage S_b = ' + S_b.toFixed(2) + ' m';
    sqResEl.style.color = color;
    ukcResEl.textContent = 'Net UKC = ' + net_UKC.toFixed(2) + ' m (' + status.split(' (')[0] + ' @ ' + v_kts + ' kts in ' + (isConfined ? 'Canal' : 'Open water') + ')';
    ukcResEl.style.color = color;
  }

  [vEl, cbEl, ukcEl].forEach(el => el.addEventListener('input', update));
  chEl.addEventListener('change', update);
  update();
})();