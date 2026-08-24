(() => {
  'use strict';
  const qEl = document.getElementById('av-q'), dhEl = document.getElementById('av-dh'), dpEl = document.getElementById('av-dp');
  const avResEl = document.getElementById('av-res-av'), clResEl = document.getElementById('av-res-clean');

  function update() {
    const Q = parseFloat(qEl.value), Dh = parseFloat(dhEl.value), Dp = parseFloat(dpEl.value);
    if (isNaN(Q) || isNaN(Dh) || isNaN(Dp) || Q <= 0 || Dh <= Dp || Dp <= 0) return;

    // AV (ft / min) = (24.5 * Q) / (Dh^2 - Dp^2)
    const areaDiff = Math.pow(Dh, 2) - Math.pow(Dp, 2);
    const AV_ft_min = (24.5 * Q) / areaDiff;
    const AV_m_min = AV_ft_min * 0.3048;

    avResEl.textContent = AV_ft_min.toFixed(1) + ' ft / min (' + AV_m_min.toFixed(1) + ' m/min)';

    if (AV_ft_min >= 150) {
      clResEl.textContent = 'EXCELLENT Hole Cleaning (AV ≥ 150 ft/min: Cuttings Cleared)';
      clResEl.style.color = '#22543d';
    } else if (AV_ft_min >= 100) {
      clResEl.textContent = 'ACCEPTABLE for Vertical Holes (AV 100 - 150 ft/min)';
      clResEl.style.color = '#2563eb';
    } else {
      clResEl.textContent = 'WARNING: Low Annular Velocity (AV < 100 ft/min: Risk of Stuck Pipe)';
      clResEl.style.color = '#c53030';
    }
  }

  [qEl, dhEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();