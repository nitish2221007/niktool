(() => {
  'use strict';
  const fpEl = document.getElementById('rw-fp'), vEl = document.getElementById('rw-v');
  const tnResEl = document.getElementById('rw-res-tune'), tmResEl = document.getElementById('rw-res-time');

  function update() {
    const f_p = parseFloat(fpEl.value), v = parseFloat(vEl.value);
    if (isNaN(f_p) || isNaN(v) || f_p <= 0 || v <= 0) return;

    // Dominant seismic wavelength: lambda = v / f_p  [m]
    const lambda = v / f_p;

    // Rayleigh quarter-wavelength tuning thickness limit: z_tune = lambda / 4 = v / (4 * f_p)
    const z_tune = lambda / 4.0;

    // Ricker wavelet peak-to-trough time separation: Delta_t = sqrt(6) / (2 * pi * f_p)  [s -> ms]
    const delta_t_s = Math.sqrt(6.0) / (2.0 * Math.PI * f_p);
    const delta_t_ms = delta_t_s * 1000.0;

    tnResEl.textContent = 'Tuning Limit = ' + z_tune.toFixed(1) + ' m (λ / 4)';
    tmResEl.textContent = 'Wavelength λ = ' + lambda.toFixed(1) + ' m | Peak-to-Trough Δt = ' + delta_t_ms.toFixed(1) + ' ms (f_p = ' + f_p + ' Hz @ ' + v + ' m/s)';
  }

  fpEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();