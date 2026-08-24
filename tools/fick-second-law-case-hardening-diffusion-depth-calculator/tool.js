(() => {
  'use strict';
  const csEl = document.getElementById('fck-cs'), c0El = document.getElementById('fck-c0');
  const xEl = document.getElementById('fck-depth'), tEl = document.getElementById('fck-temp');
  const tmResEl = document.getElementById('fck-res-time'), dResEl = document.getElementById('fck-res-d');

  const R = 8.314;
  const D0 = 2.3e-5; // m^2 / s for carbon in FCC austenite iron
  const Qd_j = 148000; // 148 kJ/mol activation energy

  function update() {
    const Cs = parseFloat(csEl.value), C0 = parseFloat(c0El.value);
    const xMm = parseFloat(xEl.value), Tc = parseFloat(tEl.value);

    if (isNaN(Cs) || isNaN(C0) || isNaN(xMm) || isNaN(Tc) || Cs <= C0 || xMm <= 0 || Tc < 700) return;

    const Tk = Tc + 273.15;
    // Arrhenius diffusion coefficient D = D0 * exp(-Qd / RT)  [m^2 / s]
    const D = D0 * Math.exp(-Qd_j / (R * Tk));

    // Target case hardness carbon level C_x = (Cs + C0) / 2 = mid-level carbon concentration
    // (C_x - C_0) / (C_s - C_0) = 0.5 = 1 - erf(z)  => erf(z) = 0.5 => z approx = 0.4769
    const z = 0.476936;
    // z = x / (2 * sqrt(D * t))  =>  t = (x / (2 * z))^2 / D  [seconds]
    const xMeters = xMm / 1000;
    const tSeconds = Math.pow(xMeters / (2 * z), 2) / D;
    const tHours = tSeconds / 3600;

    tmResEl.textContent = tHours.toFixed(2) + ' Hours Furnace Time (' + Math.round(tSeconds/60) + ' Minutes)';
    dResEl.textContent = 'Diffusivity D = ' + D.toExponential(2) + ' m²/s @ ' + Tc + '°C (50% Carbon Case Depth = ' + xMm + ' mm)';
  }

  [csEl, c0El, xEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();