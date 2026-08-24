(() => {
  'use strict';
  const vmEl = document.getElementById('vw-vm'), tEl = document.getElementById('vw-temp');
  const aEl = document.getElementById('vw-a'), bEl = document.getElementById('vw-b');
  const pResEl = document.getElementById('vw-res-p'), zResEl = document.getElementById('vw-res-z');

  const R_L_bar = 0.08314462618; // L * bar / (mol * K)

  function update() {
    const V_m = parseFloat(vmEl.value), T_C = parseFloat(tEl.value);
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);

    if (isNaN(V_m) || isNaN(T_C) || isNaN(a) || isNaN(b) || V_m <= b || T_C < -273.15 || a < 0 || b < 0) return;

    const T_K = T_C + 273.15;

    // Van der Waals equation: P = (R * T) / (V_m - b) - (a / V_m^2)  [bar]
    const P_repulsive = (R_L_bar * T_K) / (V_m - b);
    const P_attractive = a / Math.pow(V_m, 2);
    const P_vdw = P_repulsive - P_attractive;

    // Ideal gas pressure: P_ideal = R * T / V_m
    const P_ideal = (R_L_bar * T_K) / V_m;

    // Compressibility factor Z = P_vdw * V_m / (R * T)
    const Z = (P_vdw * V_m) / (R_L_bar * T_K);

    pResEl.textContent = 'Real Pressure P = ' + P_vdw.toFixed(2) + ' bar';
    zResEl.textContent = 'Ideal P = ' + P_ideal.toFixed(2) + ' bar | Z = ' + Z.toFixed(3) + ' (a/V² attraction reduces P by ' + P_attractive.toFixed(2) + ' bar @ ' + T_C + '°C)';
  }

  [vmEl, tEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();