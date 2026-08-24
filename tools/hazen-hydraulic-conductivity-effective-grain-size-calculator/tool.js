(() => {
  'use strict';
  const d10El = document.getElementById('hz-d10'), cEl = document.getElementById('hz-c'), tEl = document.getElementById('hz-temp');
  const kResEl = document.getElementById('hz-res-k'), dsResEl = document.getElementById('hz-res-desc');

  function update() {
    const d10_mm = parseFloat(d10El.value), C = parseFloat(cEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(d10_mm) || isNaN(C) || isNaN(T_C) || d10_mm <= 0 || C <= 0) return;

    // Hazen equation: K = C * (d10)^2  [cm / s @ 20°C]
    // Temperature viscosity correction: (0.70 + 0.03 * T)
    const temp_factor = 0.70 + (0.03 * T_C);
    const K_cm_s = C * Math.pow(d10_mm, 2) * (temp_factor / 1.30);
    const K_m_s = K_cm_s * 1e-2;
    const K_m_day = K_m_s * 86400.0;

    kResEl.textContent = 'K = ' + K_cm_s.toFixed(4) + ' cm/s (' + K_m_day.toFixed(1) + ' m/day)';
    dsResEl.textContent = 'K = ' + K_m_s.toExponential(2) + ' m/s (C = ' + C + ' for d₁₀ = ' + d10_mm + ' mm @ ' + T_C + '°C)';
  }

  [d10El, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();