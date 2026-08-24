(() => {
  'use strict';
  const qEl = document.getElementById('per-q'), lEl = document.getElementById('per-l');
  const aEl = document.getElementById('per-a'), hEl = document.getElementById('per-h'), tEl = document.getElementById('per-t');
  const kResEl = document.getElementById('per-res-k'), typResEl = document.getElementById('per-res-type');

  function update() {
    const Q = parseFloat(qEl.value), L = parseFloat(lEl.value);
    const A = parseFloat(aEl.value), h = parseFloat(hEl.value), t = parseFloat(tEl.value);

    if (isNaN(Q) || isNaN(L) || isNaN(A) || isNaN(h) || isNaN(t) || Q <= 0 || L <= 0 || A <= 0 || h <= 0 || t <= 0) return;

    const k_cm_s = (Q * L) / (A * h * t);
    const k_m_s = k_cm_s * 1e-2;
    const k_m_day = k_m_s * 86400;

    kResEl.textContent = k_cm_s.toExponential(2) + ' cm / s (' + k_m_day.toFixed(1) + ' m/day)';

    if (k_cm_s >= 1e-1) {
      typResEl.textContent = 'Clean Gravel / Coarse Aggregate (k > 0.1 cm/s: Excellent Drainage)';
      typResEl.style.color = '#22543d';
    } else if (k_cm_s >= 1e-3) {
      typResEl.textContent = 'Clean Sand / Medium Sand (10⁻³ to 10⁻¹ cm/s: Good Drainage)';
      typResEl.style.color = '#22543d';
    } else if (k_cm_s >= 1e-5) {
      typResEl.textContent = 'Fine Sand / Silty Sand (10⁻⁵ to 10⁻³ cm/s: Poor Drainage)';
      typResEl.style.color = '#2563eb';
    } else {
      typResEl.textContent = 'Dense Silt / Clay (k < 10⁻⁵ cm/s: Practically Impermeable)';
      typResEl.style.color = '#d97706';
    }
  }

  [qEl, lEl, aEl, hEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();