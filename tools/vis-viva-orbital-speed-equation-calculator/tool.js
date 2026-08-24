(() => {
  'use strict';
  const bEl = document.getElementById('vv-body'), rEl = document.getElementById('vv-r'), aEl = document.getElementById('vv-a');
  const vResEl = document.getElementById('vv-res-v'), escResEl = document.getElementById('vv-res-esc');

  function update() {
    const parts = bEl.value.split('_');
    const mu = parseFloat(parts[0]);
    const R_planet = parseFloat(parts[1]);

    const r = parseFloat(rEl.value), a = parseFloat(aEl.value);
    if (isNaN(r) || isNaN(a) || r <= 0 || a <= 0) return;

    const term = (2.0 / r) - (1.0 / a);
    if (term <= 0) return;

    const v_kms = Math.sqrt(mu * term);
    const v_kmh = v_kms * 3600.0;
    const v_esc_kms = Math.sqrt((2.0 * mu) / r);
    const v_esc_kmh = v_esc_kms * 3600.0;
    const alt_km = r - R_planet;

    vResEl.textContent = 'Orbital Speed v = ' + v_kms.toFixed(2) + ' km / s (' + Math.round(v_kmh).toLocaleString() + ' km/h)';
    escResEl.textContent = 'Escape Velocity v_esc = ' + v_esc_kms.toFixed(2) + ' km / s (' + Math.round(v_esc_kmh).toLocaleString() + ' km/h @ Alt = ' + Math.round(alt_km) + ' km)';
  }

  [bEl, rEl, aEl].forEach(el => el.addEventListener('input', update));
  bEl.addEventListener('change', update);
  update();
})();