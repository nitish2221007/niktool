(() => {
  'use strict';
  const n0El = document.getElementById('bg-n0'), nEl = document.getElementById('bg-n'), tEl = document.getElementById('bg-time');
  const gResEl = document.getElementById('bg-res-g'), genResEl = document.getElementById('bg-res-gen'), muResEl = document.getElementById('bg-res-mu');

  function update() {
    const N0 = parseFloat(n0El.value), N = parseFloat(nEl.value), tMins = parseFloat(tEl.value);
    if (isNaN(N0) || isNaN(N) || isNaN(tMins) || N0 <= 0 || N <= N0 || tMins <= 0) return;

    // n = (log10(N) - log10(N0)) / log10(2) = 3.3219 * log10(N / N0)
    const n = Math.log2(N / N0);
    // Doubling time g = t / n
    const g = tMins / n;
    // Specific growth rate mu = ln(2) / (g in hours)
    const gHours = g / 60;
    const mu = Math.LN2 / gHours;

    gResEl.textContent = g.toFixed(1) + ' Minutes';
    genResEl.textContent = n.toFixed(1) + ' Generations (n)';
    muResEl.textContent = 'μ = ' + mu.toFixed(2) + ' hr⁻¹';
  }

  [n0El, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();