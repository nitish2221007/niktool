(() => {
  'use strict';
  const mpEl = document.getElementById('rv-mp'), unEl = document.getElementById('rv-unit');
  const msEl = document.getElementById('rv-mstar'), prEl = document.getElementById('rv-period');
  const kResEl = document.getElementById('rv-res-k'), dtResEl = document.getElementById('rv-res-det');

  const G = 6.67430e-11, M_sun_kg = 1.98847e30;
  const M_jup_kg = 1.89813e27, M_earth_kg = 5.972e24;

  function update() {
    const M_p_input = parseFloat(mpEl.value), isJup = unEl.value === 'jup';
    const M_star_sun = parseFloat(msEl.value), P_days = parseFloat(prEl.value);

    if (isNaN(M_p_input) || isNaN(M_star_sun) || isNaN(P_days) || M_p_input <= 0 || M_star_sun <= 0 || P_days <= 0) return;

    const M_p_kg = isJup ? M_p_input * M_jup_kg : M_p_input * M_earth_kg;
    const M_star_kg = M_star_sun * M_sun_kg;
    const P_sec = P_days * 86400.0;

    // Radial velocity semi-amplitude for circular edge-on orbit (i=90 deg, e=0):
    // K = ( (2 * pi * G) / P )^(1/3) * ( M_p / (M_star + M_p)^(2/3) )  [m / s]
    const term1 = Math.pow((2.0 * Math.PI * G) / P_sec, 1.0 / 3.0);
    const term2 = M_p_kg / Math.pow(M_star_kg + M_p_kg, 2.0 / 3.0);
    const K_mps = term1 * term2;

    let det = '', color = '#22543d';
    if (K_mps >= 10.0) {
      det = 'HOT JUPITER (K > 10 m/s: Detected by Mayor & Queloz 1995 on 51 Pegasi b)';
      color = '#22543d';
    } else if (K_mps >= 1.0) {
      det = 'NEPTUNE / GIANT PLANET (1 - 10 m/s: Readily detected by HARPS / Keck)';
      color = '#22543d';
    } else if (K_mps >= 0.1) {
      det = 'SUPER-EARTH (10 - 100 cm/s: At detection limit of ESPRESSO on VLT)';
      color = '#ea580c';
    } else {
      det = 'EARTH-ANALOG WOBBLE (K ≈ 9 cm/s: Challenged by stellar magnetic activity/granulation)';
      color = '#c53030';
    }

    kResEl.textContent = 'Doppler Semi-Amplitude K = ' + (K_mps < 1.0 ? (K_mps * 100.0).toFixed(1) + ' cm / s' : K_mps.toFixed(2) + ' m / s');
    kResEl.style.color = color;
    dtResEl.textContent = det;
    dtResEl.style.color = color;
  }

  [mpEl, msEl, prEl].forEach(el => el.addEventListener('input', update));
  unEl.addEventListener('change', update);
  update();
})();