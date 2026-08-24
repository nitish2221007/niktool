(() => {
  'use strict';
  const t0El = document.getElementById('rf-t0'), xEl = document.getElementById('rf-x'), vEl = document.getElementById('rf-v');
  const nmResEl = document.getElementById('rf-res-nmo'), dpResEl = document.getElementById('rf-res-depth');

  function update() {
    const t0 = parseFloat(t0El.value), x = parseFloat(xEl.value), v_rms = parseFloat(vEl.value);
    if (isNaN(t0) || isNaN(x) || isNaN(v_rms) || t0 <= 0 || x < 0 || v_rms <= 0) return;

    // Hyperbolic travel time: t(x) = sqrt( t0^2 + (x / v_rms)^2 )
    const t_x = Math.sqrt(Math.pow(t0, 2) + Math.pow(x / v_rms, 2));

    // NMO correction: Delta_t_NMO = t(x) - t0  [seconds -> ms]
    const delta_t_s = t_x - t0;
    const delta_t_ms = delta_t_s * 1000.0;

    // Reflector depth: z0 = 0.5 * v_rms * t0  [meters]
    const z0_m = 0.5 * v_rms * t0;

    nmResEl.textContent = 'NMO Moveout Δt = ' + delta_t_ms.toFixed(1) + ' ms (t(x) = ' + t_x.toFixed(3) + ' s)';
    dpResEl.textContent = 'Reflector Depth z₀ = ' + Math.round(z0_m).toLocaleString() + ' m (' + (z0_m / 1000).toFixed(2) + ' km @ v_rms=' + v_rms + ' m/s, x=' + x + ' m)';
  }

  [t0El, xEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();