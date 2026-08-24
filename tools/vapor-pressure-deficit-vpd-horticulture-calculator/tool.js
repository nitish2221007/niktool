(() => {
  'use strict';
  const aEl = document.getElementById('vpd-air'), lEl = document.getElementById('vpd-leaf'), rhEl = document.getElementById('vpd-rh');
  const kpaResEl = document.getElementById('vpd-res-kpa'), stResEl = document.getElementById('vpd-res-stage');

  // Tetens equation for saturation vapor pressure in kPa: VP_sat = 0.61078 * exp((17.27 * T) / (T + 237.3))
  function vpSat(tC) {
    return 0.61078 * Math.exp((17.27 * tC) / (tC + 237.3));
  }

  function update() {
    const airT = parseFloat(aEl.value), offsetT = parseFloat(lEl.value), rh = parseFloat(rhEl.value);
    if (isNaN(airT) || isNaN(offsetT) || isNaN(rh) || rh < 0 || rh > 100) return;

    const leafT = airT + offsetT;
    const vpLeafSat = vpSat(leafT);
    const vpAirSat = vpSat(airT);
    const vpAirActual = vpAirSat * (rh / 100);

    // Leaf VPD = VP_leaf_sat - VP_air_actual
    const vpd = vpLeafSat - vpAirActual;

    kpaResEl.textContent = vpd.toFixed(2) + ' kPa';

    if (vpd < 0.4) {
      stResEl.textContent = 'Too Low (< 0.4 kPa: Fungal Mildew & Stagnation Risk)';
      stResEl.style.color = '#c53030';
    } else if (vpd <= 0.8) {
      stResEl.textContent = 'Ideal Propagation / Rooting Zone (0.4 - 0.8 kPa)';
      stResEl.style.color = '#2563eb';
    } else if (vpd <= 1.2) {
      stResEl.textContent = 'Optimal Vegetative / Early Flower (0.8 - 1.2 kPa)';
      stResEl.style.color = '#22543d';
    } else if (vpd <= 1.6) {
      stResEl.textContent = 'Late Flowering / Ripening Zone (1.2 - 1.6 kPa)';
      stResEl.style.color = '#22543d';
    } else {
      stResEl.textContent = 'Too High (> 1.6 kPa: Plant Water Stress / Closed Stomata)';
      stResEl.style.color = '#c53030';
    }
  }

  [aEl, lEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();