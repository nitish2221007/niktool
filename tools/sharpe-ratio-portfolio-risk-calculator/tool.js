(() => {
  'use strict';
  const rpEl = document.getElementById('shp-rp'), rfEl = document.getElementById('shp-rf'), vEl = document.getElementById('shp-vol');
  const rResEl = document.getElementById('shp-res-ratio'), eResEl = document.getElementById('shp-res-eval');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value), vol = parseFloat(vEl.value);
    if (isNaN(Rp) || isNaN(Rf) || isNaN(vol) || vol <= 0) return;

    // Sharpe Ratio = (Rp - Rf) / vol
    const excess = Rp - Rf;
    const sharpe = excess / vol;

    rResEl.textContent = sharpe.toFixed(3) + ' (Excess: +' + excess.toFixed(1) + '%)';

    if (sharpe >= 2.0) {
      eResEl.textContent = 'Exceptional (> 2.0: Top-Tier Hedge Fund Alpha)';
      eResEl.style.color = '#22543d';
    } else if (sharpe >= 1.0) {
      eResEl.textContent = 'Very Good (1.0 to 2.0: Strong Outperformance)';
      eResEl.style.color = '#22543d';
    } else if (sharpe >= 0.5) {
      eResEl.textContent = 'Good (0.5 to 1.0: Acceptable Market Benchmark)';
      eResEl.style.color = '#2563eb';
    } else if (sharpe > 0) {
      eResEl.textContent = 'Sub-Optimal (< 0.5: Insufficient Return for Risk Taken)';
      eResEl.style.color = '#d97706';
    } else {
      eResEl.textContent = 'Negative Return (Underperformed Risk-Free Cash)';
      eResEl.style.color = '#c53030';
    }
  }

  [rpEl, rfEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();