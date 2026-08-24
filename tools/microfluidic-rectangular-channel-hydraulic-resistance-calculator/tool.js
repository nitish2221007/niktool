(() => {
  'use strict';
  const wEl = document.getElementById('mf-w'), hEl = document.getElementById('mf-h');
  const lEl = document.getElementById('mf-l'), qEl = document.getElementById('mf-q');
  const dpResEl = document.getElementById('mf-res-dp'), rhResEl = document.getElementById('mf-res-rh');

  const mu_water = 0.001; // Pa * s (dynamic viscosity of water at 20°C)

  function update() {
    let wUm = parseFloat(wEl.value), hUm = parseFloat(hEl.value);
    const lMm = parseFloat(lEl.value), qUlMin = parseFloat(qEl.value);

    if (isNaN(wUm) || isNaN(hUm) || isNaN(lMm) || isNaN(qUlMin) || wUm <= 0 || hUm <= 0 || lMm <= 0 || qUlMin <= 0) return;

    // Ensure h <= w for standard shallow rectangular aspect ratio formula
    if (hUm > wUm) {
      const temp = wUm;
      wUm = hUm;
      hUm = temp;
    }

    const wM = wUm * 1e-6;
    const hM = hUm * 1e-6;
    const lM = lMm * 1e-3;

    // Volumetric flow rate Q in m^3 / s: (qUlMin * 1e-9) / 60
    const Q_m3_s = (qUlMin * 1e-9) / 60;

    // Hydraulic resistance for rectangular channel (h < w):
    // R_h = (12 * mu * L) / ( w * h^3 * ( 1 - 0.63 * (h / w) ) )  [Pa * s / m^3]
    const Rh = (12 * mu_water * lM) / (wM * Math.pow(hM, 3) * (1 - (0.63 * (hM / wM))));

    // Pressure drop delta_P = Q * R_h  [Pa]
    const dP_Pa = Q_m3_s * Rh;
    const dP_kpa = dP_Pa / 1000;
    const dP_mbar = dP_Pa / 100;

    dpResEl.textContent = 'ΔP = ' + dP_kpa.toFixed(2) + ' kPa (' + dP_mbar.toFixed(1) + ' mbar)';
    rhResEl.textContent = 'R_h = ' + Rh.toExponential(2) + ' Pa·s/m³ (Fluidic Ohm's Law ΔP = Q·R_h | Velocity: ' + ((Q_m3_s/(wM*hM))*1000).toFixed(1) + ' mm/s)';
  }

  [wEl, hEl, lEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();