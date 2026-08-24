(() => {
  'use strict';
  const tempEl = document.getElementById('f0-temp'), timeEl = document.getElementById('f0-time'), zEl = document.getElementById('f0-z');
  const f0ResEl = document.getElementById('f0-res-val'), sfResEl = document.getElementById('f0-res-safe');

  function update() {
    const T = parseFloat(tempEl.value), dt = parseFloat(timeEl.value), z = parseFloat(zEl.value);
    if (isNaN(T) || isNaN(dt) || isNaN(z) || dt <= 0 || z <= 0) return;

    // Lethal Rate L = 10^( (T - 121.1) / z )
    const L = Math.pow(10, (T - 121.11) / z);
    // F0 = dt * L (equivalent minutes at 121.1°C / 250°F)
    const F0 = dt * L;

    f0ResEl.textContent = F0.toFixed(2) + ' F₀ Minutes (Lethal Rate L = ' + L.toFixed(2) + 'x)';

    if (F0 >= 12.0) {
      sfResEl.textContent = 'EXCEEDS 12-D "Botulinum Cook" (F₀ ≥ 12 min: Maximum Commercial Shelf Life)';
      sfResEl.style.color = '#22543d';
    } else if (F0 >= 3.0) {
      sfResEl.textContent = 'SAFE Commercial Sterility (F₀ ≥ 3.0 min: Minimum Safe Canning Threshold)';
      sfResEl.style.color = '#22543d';
    } else {
      sfResEl.textContent = 'UNSAFE INSUFFICIENT STERILITY (F₀ < 3.0 min: Spore Survival Risk)';
      sfResEl.style.color = '#c53030';
    }
  }

  [tempEl, timeEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();