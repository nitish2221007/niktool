(() => {
  'use strict';
  const altEl = document.getElementById('isa-alt'), unitEl = document.getElementById('isa-unit');
  const tResEl = document.getElementById('isa-res-temp'), rResEl = document.getElementById('isa-res-rho');

  const T0 = 288.15, P0 = 101325.0, rho0 = 1.225, L = 0.0065, g0 = 9.80665, R_air = 287.05287, gamma = 1.40;

  function update() {
    const isFeet = unitEl.value === 'feet';
    let h_input = parseFloat(altEl.value);
    if (isNaN(h_input) || h_input < 0) return;

    const h_m = isFeet ? h_input * 0.3048 : h_input;
    const h_ft = isFeet ? h_input : h_input / 0.3048;

    let T = 0, P = 0;
    if (h_m <= 11000.0) {
      T = T0 - (L * h_m);
      P = P0 * Math.pow(1.0 - (L * h_m) / T0, g0 / (R_air * L));
    } else if (h_m <= 20000.0) {
      const T11 = T0 - (L * 11000.0);
      P = P0 * Math.pow(1.0 - (L * 11000.0) / T0, g0 / (R_air * L)) * Math.exp((-g0 * (h_m - 11000.0)) / (R_air * T11));
      T = T11;
    } else {
      T = 216.65 + 0.001 * (h_m - 20000.0);
      P = 5474.89 * Math.exp(-0.00015 * (h_m - 20000.0));
    }

    const rho = P / (R_air * T);
    const sound_mps = Math.sqrt(gamma * R_air * T);
    const sound_kts = sound_mps * 1.94384;

    tResEl.textContent = 'T = ' + (T - 273.15).toFixed(1) + ' °C (' + T.toFixed(1) + ' K) | P = ' + (P/100).toFixed(1) + ' hPa (' + (P * 0.000145038).toFixed(2) + ' psi)';
    rResEl.textContent = 'Density ρ = ' + rho.toFixed(3) + ' kg/m³ (' + ((rho/rho0)*100).toFixed(1) + '% MSL) | Speed of Sound = ' + sound_kts.toFixed(1) + ' kts (' + sound_mps.toFixed(1) + ' m/s @ FL' + Math.round(h_ft/100) + ')';
  }

  altEl.addEventListener('input', update);
  unitEl.addEventListener('change', update);
  update();
})();