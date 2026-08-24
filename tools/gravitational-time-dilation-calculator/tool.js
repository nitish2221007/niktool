(() => {
  'use strict';
  const bEl = document.getElementById('gtd-body'), tEl = document.getElementById('gtd-time');
  const locEl = document.getElementById('gtd-res-local'), offEl = document.getElementById('gtd-res-offset');

  const G = 6.6743e-11;
  const c = 299792458;
  const M_SUN = 1.98847e30;

  const PRESETS = {
    earth: { m: 5.9722e24, r: 6371e3 },
    sun: { m: M_SUN, r: 696340e3 },
    white_dwarf: { m: M_SUN, r: 7000e3 },
    neutron_star: { m: 1.4 * M_SUN, r: 12e3 }
  };

  function update() {
    const body = PRESETS[bEl.value] || PRESETS.earth;
    const tInf = parseFloat(tEl.value);
    if (isNaN(tInf) || tInf <= 0) return;

    // factor = sqrt(1 - 2*G*M / (r * c^2))
    const rs = (2 * G * body.m) / Math.pow(c, 2);
    if (rs >= body.r) return;

    const factor = Math.sqrt(1 - (rs / body.r));
    const tLocal = tInf * factor;
    const diffSecPerYear = (1 - factor) * 31557600;

    locEl.textContent = (tLocal).toFixed(8) + ' Years';
    if (diffSecPerYear < 1) {
      offEl.textContent = '-' + (diffSecPerYear * 1000).toFixed(1) + ' ms / yr';
    } else {
      offEl.textContent = '-' + (diffSecPerYear).toFixed(2) + ' seconds / yr';
    }
  }

  bEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();