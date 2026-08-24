(() => {
  'use strict';
  const wtEl = document.getElementById('orm-weight'), repEl = document.getElementById('orm-reps');
  const epleyEl = document.getElementById('orm-res-1rm'), brzEl = document.getElementById('orm-res-brzycki');

  function update() {
    const w = parseFloat(wtEl.value);
    const r = parseInt(repEl.value, 10);
    if (isNaN(w) || isNaN(r) || w <= 0 || r < 1 || r > 15) return;

    if (r === 1) {
      epleyEl.textContent = w + ' kg';
      brzEl.textContent = w + ' kg';
      return;
    }

    // Epley: 1RM = w * (1 + r / 30)
    const epley = w * (1 + r / 30);
    // Brzycki: 1RM = w * (36 / (37 - r))
    const brzycki = w * (36 / (37 - r));

    epleyEl.textContent = Math.round(epley) + ' units';
    brzEl.textContent = Math.round(brzycki) + ' units';
  }

  wtEl.addEventListener('input', update);
  repEl.addEventListener('input', update);
  update();
})();