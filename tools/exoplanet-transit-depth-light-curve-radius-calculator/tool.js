(() => {
  'use strict';
  const rpEl = document.getElementById('tr-rp'), unEl = document.getElementById('tr-runit'), rsEl = document.getElementById('tr-rstar');
  const dpResEl = document.getElementById('tr-res-depth'), dtResEl = document.getElementById('tr-res-detect');

  const R_sun_km = 696340.0;
  const R_earth_km = 6371.0;
  const R_jup_km = 71492.0;

  function update() {
    const R_p_input = parseFloat(rpEl.value), isEarth = unEl.value === 'earth';
    const R_star_sun = parseFloat(rsEl.value);

    if (isNaN(R_p_input) || isNaN(R_star_sun) || R_p_input <= 0 || R_star_sun <= 0) return;

    // Convert planet radius to km:
    const R_p_km = isEarth ? R_p_input * R_earth_km : R_p_input * R_jup_km;
    const R_star_km = R_star_sun * R_sun_km;

    // Transit depth: Delta_F / F = ( R_p / R_star )^2
    const depth_fraction = Math.pow(R_p_km / R_star_km, 2);
    const depth_pct = depth_fraction * 100.0;
    const depth_ppm = depth_fraction * 1e6;

    let detStatus = '', color = '#22543d';
    if (depth_ppm >= 10000) {
      detStatus = 'HOT JUPITER TRANSIT (≥ 10,000 ppm / 1%: Easily detectable with amateur ground telescopes)';
      color = '#22543d';
    } else if (depth_ppm >= 1000) {
      detStatus = 'SUPER-EARTH / NEPTUNE (1,000 - 10,000 ppm: Detectable with professional ground surveys)';
      color = '#22543d';
    } else {
      detStatus = 'EARTH-ANALOG TRANSIT (80 - 500 ppm: Requires space telescopes like Kepler, TESS, PLATO)';
      color = '#2563eb';
    }

    dpResEl.textContent = 'Transit Depth = ' + depth_pct.toFixed(4) + '% (' + Math.round(depth_ppm).toLocaleString() + ' ppm)';
    dtResEl.textContent = detStatus;
    dtResEl.style.color = color;
  }

  [rpEl, rsEl].forEach(el => el.addEventListener('input', update));
  unEl.addEventListener('change', update);
  update();
})();