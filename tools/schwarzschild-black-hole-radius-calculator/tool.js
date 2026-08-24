(() => {
  'use strict';
  const preEl = document.getElementById('bh-preset');
  const rsEl = document.getElementById('bh-res-rs'), diaEl = document.getElementById('bh-res-dia');

  const G = 6.6743e-11;
  const c = 299792458;
  const M_SUN = 1.98847e30;

  const MASSES = {
    earth: 5.9722e24,
    sun: M_SUN,
    sag_a: 4.15e6 * M_SUN,
    m87: 6.5e9 * M_SUN
  };

  function update() {
    const m = MASSES[preEl.value] || M_SUN;
    // r_s = (2 * G * M) / c^2
    const rs = (2 * G * m) / Math.pow(c, 2);
    const dia = rs * 2;

    if (rs < 0.01) {
      rsEl.textContent = (rs * 1000).toFixed(2) + ' mm';
      diaEl.textContent = (dia * 1000).toFixed(2) + ' mm';
    } else if (rs < 1000) {
      rsEl.textContent = rs.toFixed(2) + ' meters';
      diaEl.textContent = dia.toFixed(2) + ' meters';
    } else if (rs < 1e6) {
      rsEl.textContent = (rs / 1000).toFixed(2) + ' km';
      diaEl.textContent = (dia / 1000).toFixed(2) + ' km';
    } else {
      rsEl.textContent = (rs / 1.496e11).toFixed(2) + ' AU (' + (rs / 1e9).toFixed(2) + ' Million km)';
      diaEl.textContent = (dia / 1.496e11).toFixed(2) + ' AU';
    }
  }

  preEl.addEventListener('change', update);
  update();
})();