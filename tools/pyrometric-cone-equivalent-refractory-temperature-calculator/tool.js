(() => {
  'use strict';
  const cEl = document.getElementById('pce-cone'), rEl = document.getElementById('pce-rate');
  const tResEl = document.getElementById('pce-res-temp'), uResEl = document.getElementById('pce-res-use');

  const CONES = {
    'c06': { base_c: 999,  name: 'Cone 06 (Low-Fire Earthenware Glaze)' },
    'c04': { base_c: 1060, name: 'Cone 04 (Standard Ceramic Bisque Firing)' },
    'c6':  { base_c: 1222, name: 'Cone 6 (Mid-Fire Stoneware & Vitrified Ceramics)' },
    'c10': { base_c: 1285, name: 'Cone 10 (High-Fire Gas Reduction Porcelain)' },
    'c32': { base_c: 1710, name: 'Cone 32 (ASTM C24 Fireclay Refractory Brick PCE)' },
    'c35': { base_c: 1785, name: 'Cone 35 (High-Alumina Industrial Refractory PCE)' },
    'c40': { base_c: 1885, name: 'Cone 40 (Super-Duty Zirconia Furnace Lining PCE)' }
  };

  function update() {
    const c = CONES[cEl.value];
    const isSlow = rEl.value === '60';

    // Slow 60°C/h soaking ramp softens cones at ~18°C lower end point:
    const tempC = isSlow ? c.base_c - 18 : c.base_c;
    const tempF = (tempC * 9.0 / 5.0) + 32.0;

    tResEl.textContent = tempC + ' °C (' + Math.round(tempF) + ' °F)';
    uResEl.textContent = c.name + ' | Ramp: ' + (isSlow ? '60°C/h Slow Soak' : '150°C/h Standard Fast');
  }

  cEl.addEventListener('change', update);
  rEl.addEventListener('change', update);
  update();
})();