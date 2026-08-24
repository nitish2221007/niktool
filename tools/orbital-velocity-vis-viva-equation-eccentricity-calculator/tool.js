(() => {
  'use strict';
  const rEl = document.getElementById('vv-r'), aEl = document.getElementById('vv-a'), muEl = document.getElementById('vv-mu');
  const vResEl = document.getElementById('vv-res-v'), esResEl = document.getElementById('vv-res-esc');

  function update() {
    const r = parseFloat(rEl.value), a = parseFloat(aEl.value), mu = parseFloat(muEl.value);
    if (isNaN(r) || isNaN(a) || isNaN(mu) || r <= 0 || a <= 0 || mu <= 0) return;

    const term = (2.0 / r) - (1.0 / a);
    if (term <= 0) return;

    const v_kms = Math.sqrt(mu * term);
    const v_kmh = v_kms * 3600.0;
    const v_circ = Math.sqrt(mu / r);
    const v_esc = Math.sqrt(2.0 * mu / r);
    const T_s = 2.0 * Math.PI * Math.sqrt(Math.pow(a, 3) / mu);
    const T_min = T_s / 60.0;

    vResEl.textContent = 'Orbital Velocity v = ' + v_kms.toFixed(3) + ' km / s (' + Math.round(v_kmh).toLocaleString() + ' km/h)';
    esResEl.textContent = 'Escape v_esc = ' + v_esc.toFixed(3) + ' km/s | Period T = ' + T_min.toFixed(2) + ' Min (' + (T_min/60).toFixed(2) + ' hr | v_circ = ' + v_circ.toFixed(3) + ' km/s @ r=' + r + ' km)';
  }

  [rEl, aEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();