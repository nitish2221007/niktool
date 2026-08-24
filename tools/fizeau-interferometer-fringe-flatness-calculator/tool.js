(() => {
  'use strict';
  const lEl = document.getElementById('fiz-lam'), nEl = document.getElementById('fiz-n');
  const nmResEl = document.getElementById('fiz-res-nm'), grResEl = document.getElementById('fiz-res-grade');

  function update() {
    const lamNm = parseFloat(lEl.value), N = parseFloat(nEl.value);
    if (isNaN(lamNm) || isNaN(N) || lamNm <= 0 || N < 0) return;

    // In reflection Fizeau interferometry: 1 fringe = lambda / 2 surface height
    const pvNm = N * (lamNm / 2);
    const lambdaFrac = N * 0.5;
    const invFrac = lambdaFrac > 0 ? (1 / lambdaFrac) : 0;

    nmResEl.textContent = pvNm.toFixed(2) + ' nm (λ / ' + invFrac.toFixed(1) + ' @ ' + lamNm + ' nm)';

    if (pvNm <= 32) {
      grResEl.textContent = 'Ultra-Precision Laser Optics (λ/20 Flatness: High-Power Mirrors)';
      grResEl.style.color = '#22543d';
    } else if (pvNm <= 65) {
      grResEl.textContent = 'Precision Optical Grade (λ/10 Flatness: Research Mirrors)';
      grResEl.style.color = '#22543d';
    } else if (pvNm <= 160) {
      grResEl.textContent = 'Standard Commercial Optics (λ/4 Flatness)';
      grResEl.style.color = '#2563eb';
    } else {
      grResEl.textContent = 'Commercial Window Glass (> λ/4 Flatness)';
      grResEl.style.color = '#d97706';
    }
  }

  lEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();