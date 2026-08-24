(() => {
  'use strict';
  const uEl = document.getElementById('suv-u'), aEl = document.getElementById('suv-a'), tEl = document.getElementById('suv-t');
  const vResEl = document.getElementById('suv-res-v'), sResEl = document.getElementById('suv-res-s');

  function update() {
    const u = parseFloat(uEl.value), a = parseFloat(aEl.value), t = parseFloat(tEl.value);
    if (isNaN(u) || isNaN(a) || isNaN(t) || t < 0) return;

    // v = u + at
    const v = u + (a * t);
    const v_kmh = v * 3.6;

    // s = u*t + 0.5*a*t^2
    const s = (u * t) + (0.5 * a * Math.pow(t, 2));

    // v^2 = u^2 + 2*a*s
    const v2 = Math.pow(u, 2) + (2.0 * a * s);

    vResEl.textContent = 'v = ' + v.toFixed(2) + ' m/s (' + v_kmh.toFixed(1) + ' km/h)';
    sResEl.textContent = 'Displacement s = ' + s.toFixed(2) + ' m | v² = u² + 2as = ' + v2.toFixed(1) + ' m²/s² (u = ' + u + ', a = ' + a + ' @ t = ' + t + 's)';
  }

  [uEl, aEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();