(() => {
  'use strict';
  const gEl = document.getElementById('cr-gape'), cEl = document.getElementById('cr-css'), fEl = document.getElementById('cr-f80');
  const rResEl = document.getElementById('cr-res-ratio'), pResEl = document.getElementById('cr-res-p80');

  function update() {
    const gapeMm = parseFloat(gEl.value), cssMm = parseFloat(cEl.value), f80Mm = parseFloat(fEl.value);
    if (isNaN(gapeMm) || isNaN(cssMm) || isNaN(f80Mm) || gapeMm <= 0 || cssMm <= 0 || f80Mm <= 0) return;

    // For standard jaw crusher, product P80 is approximately equal to Closed Side Setting (CSS)
    const p80Mm = cssMm;
    const reductionRatio = f80Mm / p80Mm;

    // Maximum safe feed size rule of thumb: 80% of gape
    const maxFeedSafe = gapeMm * 0.80;

    rResEl.textContent = reductionRatio.toFixed(2) + ' : 1 Reduction Ratio';

    let feedCheck = '';
    if (f80Mm <= maxFeedSafe) {
      feedCheck = 'SAFE: Feed size ' + f80Mm + ' mm is within 80% Gape limit (' + maxFeedSafe.toFixed(0) + ' mm)';
      pResEl.style.color = '#22543d';
    } else {
      feedCheck = 'OVERSIZE: Feed size ' + f80Mm + ' mm exceeds 80% Gape (' + maxFeedSafe.toFixed(0) + ' mm) - Risk of Bridging!';
      pResEl.style.color = '#c53030';
    }
    pResEl.textContent = 'P₈₀ ≈ ' + p80Mm + ' mm | ' + feedCheck;
  }

  [gEl, cEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();