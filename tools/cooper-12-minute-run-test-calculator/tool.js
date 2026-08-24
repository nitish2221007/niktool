(() => {
  'use strict';
  const dEl = document.getElementById('coop-dist');
  const vEl = document.getElementById('coop-res-vo2'), rEl = document.getElementById('coop-res-rating');

  function update() {
    const distM = parseFloat(dEl.value);
    if (isNaN(distM) || distM < 505) return;

    // Cooper Formula: VO2_max = (Distance_m - 504.9) / 44.73
    const vo2 = (distM - 504.9) / 44.73;

    vEl.textContent = vo2.toFixed(1) + ' mL/kg/min';

    if (distM >= 2800) {
      rEl.textContent = 'Superior / Elite (2,800m+)';
      rEl.style.color = '#22543d';
    } else if (distM >= 2400) {
      rEl.textContent = 'Excellent Aerobic Conditioning (2,400m - 2,799m)';
      rEl.style.color = '#22543d';
    } else if (distM >= 2000) {
      rEl.textContent = 'Average / Good Fitness (2,000m - 2,399m)';
      rEl.style.color = '#2563eb';
    } else {
      rEl.textContent = 'Below Average (< 2,000m)';
      rEl.style.color = '#c53030';
    }
  }

  dEl.addEventListener('input', update);
  update();
})();