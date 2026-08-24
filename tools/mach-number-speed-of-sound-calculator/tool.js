(() => {
  'use strict';
  const spdEl = document.getElementById('mach-spd'), unitEl = document.getElementById('mach-unit'), altEl = document.getElementById('mach-alt');
  const mValEl = document.getElementById('mach-res-val'), regEl = document.getElementById('mach-res-regime'), sndEl = document.getElementById('mach-res-sound');

  function update() {
    const rawSpd = parseFloat(spdEl.value), unit = unitEl.value, altM = parseFloat(altEl.value) || 0;
    if (isNaN(rawSpd) || rawSpd <= 0) return;

    let spdMs = rawSpd;
    if (unit === 'kmh') spdMs = rawSpd / 3.6;
    else if (unit === 'mph') spdMs = rawSpd * 0.44704;
    else if (unit === 'knots') spdMs = rawSpd * 0.514444;

    // ISA standard atmosphere temperature at altitude: T = 15 - 0.0065 * h (up to 11,000m)
    let tempC = 15 - 0.0065 * Math.min(11000, altM);
    if (altM > 11000) tempC = -56.5; // Stratosphere constant
    const tempK = tempC + 273.15;
    // Speed of sound in dry air: c = sqrt(gamma * R * T) = sqrt(1.4 * 287.05 * T)
    const cMs = Math.sqrt(1.4 * 287.05 * tempK);
    const mach = spdMs / cMs;

    mValEl.textContent = 'Mach ' + mach.toFixed(2);
    sndEl.textContent = Math.round(cMs * 3.6) + ' km/h (' + Math.round(cMs) + ' m/s)';

    if (mach < 0.8) {
      regEl.textContent = 'Subsonic Flight (M < 0.8)';
      regEl.style.color = '#22543d';
    } else if (mach <= 1.2) {
      regEl.textContent = 'Transonic Regime (0.8 ≤ M ≤ 1.2)';
      regEl.style.color = '#d97706';
    } else if (mach < 5.0) {
      regEl.textContent = 'Supersonic Flight (1.2 < M < 5.0)';
      regEl.style.color = '#c53030';
    } else {
      regEl.textContent = 'Hypersonic Flight (M ≥ 5.0)';
      regEl.style.color = '#7c3aed';
    }
  }

  [spdEl, unitEl, altEl].forEach(el => el.addEventListener('input', update));
  update();
})();