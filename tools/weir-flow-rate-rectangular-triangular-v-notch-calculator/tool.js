(() => {
  'use strict';
  const typeEl = document.getElementById('wr-type'), hEl = document.getElementById('wr-h'), bEl = document.getElementById('wr-b');
  const qResEl = document.getElementById('wr-res-q'), rtResEl = document.getElementById('wr-res-rate');

  function update() {
    const isVNotch = typeEl.value === 'vnotch';
    const H = parseFloat(hEl.value), b = parseFloat(bEl.value);

    if (isNaN(H) || H <= 0) return;

    let Q_m3s = 0;
    if (isVNotch) {
      // 90° V-notch formula (Thomson): Q = (8/15) * Cd * sqrt(2*g) * tan(theta/2) * H^(5/2) approx 1.38 * H^(2.5)
      Q_m3s = 1.38 * Math.pow(H, 2.5);
    } else {
      // Francis rectangular weir: Q = 1.84 * ( b - 0.2*H ) * H^(1.5)
      if (isNaN(b) || b <= 0) return;
      const b_eff = Math.max(0.1, b - 0.2 * H);
      Q_m3s = 1.84 * b_eff * Math.pow(H, 1.5);
    }

    const Q_Ls = Q_m3s * 1000.0;
    const Q_m3_day = Q_m3s * 86400.0;

    qResEl.textContent = 'Discharge Q = ' + (Q_Ls >= 1000 ? Q_m3s.toFixed(3) + ' m³ / s' : Q_Ls.toFixed(1) + ' L / s');
    rtResEl.textContent = 'Daily Runoff = ' + Math.round(Q_m3_day).toLocaleString() + ' m³/day (' + (Q_m3s * 3600).toFixed(1) + ' m³/h @ Head H = ' + H.toFixed(2) + ' m)';
  }

  [typeEl, hEl, bEl].forEach(el => el.addEventListener('input', update));
  typeEl.addEventListener('change', update);
  update();
})();