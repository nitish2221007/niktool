(() => {
  'use strict';
  const rpEl = document.getElementById('sor-rp'), rfEl = document.getElementById('sor-rf'), ddEl = document.getElementById('sor-dd');
  const rResEl = document.getElementById('sor-res-ratio'), eResEl = document.getElementById('sor-res-eval');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value), dd = parseFloat(ddEl.value);
    if (isNaN(Rp) || isNaN(Rf) || isNaN(dd) || dd <= 0) return;

    // Sortino Ratio = (Rp - Rf) / sigma_downside
    const excess = Rp - Rf;
    const sortino = excess / dd;

    rResEl.textContent = sortino.toFixed(3);

    if (sortino >= 2.0) {
      eResEl.textContent = 'Excellent (> 2.0: Minimal Drawdown with High Alpha)';
      eResEl.style.color = '#22543d';
    } else if (sortino >= 1.2) {
      eResEl.textContent = 'Strong Performance (1.2 to 2.0: High Downside Protection)';
      eResEl.style.color = '#22543d';
    } else if (sortino >= 0.7) {
      eResEl.textContent = 'Moderate Performance (0.7 to 1.2)';
      eResEl.style.color = '#2563eb';
    } else {
      eResEl.textContent = 'High Downside Tail Risk Exposure';
      eResEl.style.color = '#c53030';
    }
  }

  [rpEl, rfEl, ddEl].forEach(el => el.addEventListener('input', update));
  update();
})();