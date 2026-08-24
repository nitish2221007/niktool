(() => {
  'use strict';
  const v0El = document.getElementById('proj-v0');
  const angleEl = document.getElementById('proj-angle');
  const h0El = document.getElementById('proj-h0');
  const gEl = document.getElementById('proj-g');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('proj-res-card');

  const resRange = document.getElementById('proj-res-range');
  const resHeight = document.getElementById('proj-res-height');
  const resTime = document.getElementById('proj-res-time');
  const resVx = document.getElementById('proj-res-vx');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v0 = parseFloat(v0El.value);
    const deg = parseFloat(angleEl.value);
    const h0 = parseFloat(h0El.value) || 0;
    const g = parseFloat(gEl.value) || 9.80665;

    if (isNaN(v0) || isNaN(deg) || v0 <= 0 || deg < 0 || deg > 90 || g <= 0) {
      setMsg('Please enter valid positive values (Angle between 0° and 90°).', true);
      resCard.style.display = 'none';
      return;
    }

    const rad = (deg * Math.PI) / 180;
    const vx = v0 * Math.cos(rad);
    const vy = v0 * Math.sin(rad);

    // Max height
    const maxH = h0 + (vy * vy) / (2 * g);

    // Total flight time solving: -0.5*g*t^2 + vy*t + h0 = 0
    const discriminant = (vy * vy) + 2 * g * h0;
    const tFlight = (vy + Math.sqrt(discriminant)) / g;

    // Range
    const range = vx * tFlight;

    resRange.textContent = range.toFixed(2) + ' m';
    resHeight.textContent = maxH.toFixed(2) + ' m';
    resTime.textContent = tFlight.toFixed(2) + ' s';
    resVx.textContent = vx.toFixed(2) + ' m/s';

    resCard.style.display = 'block';
    setMsg('Trajectory calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    v0El.value = ''; angleEl.value = ''; h0El.value = '0';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();