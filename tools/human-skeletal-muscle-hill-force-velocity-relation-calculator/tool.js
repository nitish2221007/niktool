(() => {
  'use strict';
  const fEl = document.getElementById('hm-f'), f0El = document.getElementById('hm-f0'), vmEl = document.getElementById('hm-vmax');
  const pwResEl = document.getElementById('hm-res-pwr'), spResEl = document.getElementById('hm-res-speed');

  function update() {
    const F = parseFloat(fEl.value), F0 = parseFloat(f0El.value), vmax = parseFloat(vmEl.value);
    if (isNaN(F) || isNaN(F0) || isNaN(vmax) || F < 0 || F > F0 || F0 <= 0 || vmax <= 0) return;

    // Hill characteristic constants (standard physiological a/F0 = 0.25):
    const a = 0.25 * F0;
    const b = (a * vmax) / F0; // b = 0.25 * vmax

    // Hill velocity equation: v = b * (F0 - F) / (F + a)  [m / s]
    const v = (b * (F0 - F)) / (F + a);
    const v_pct = (v / vmax) * 100.0;

    // Power output: P = F * v  [Watts]
    const Power_W = F * v;

    // Peak theoretical muscle power (occurs near F/F0 ~ 0.31, v/vmax ~ 0.31):
    const P_max_theoretical = 0.10 * F0 * vmax * 1.25;

    pwResEl.textContent = 'Mechanical Power P = ' + Power_W.toFixed(1) + ' Watts (' + (Power_W * 1.341e-3).toFixed(2) + ' hp)';
    spResEl.textContent = 'Shortening Speed v = ' + v.toFixed(3) + ' m/s (' + v_pct.toFixed(1) + '% v_max) | Max Power = ' + P_max_theoretical.toFixed(1) + ' W (F/F₀ = ' + (F/F0).toFixed(2) + ')';
  }

  [fEl, f0El, vmEl].forEach(el => el.addEventListener('input', update));
  update();
})();