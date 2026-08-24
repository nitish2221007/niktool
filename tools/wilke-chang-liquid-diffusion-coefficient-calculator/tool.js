(() => {
  'use strict';
  const mbEl = document.getElementById('wc-mb'), phiEl = document.getElementById('wc-phi');
  const vaEl = document.getElementById('wc-va'), muEl = document.getElementById('wc-mu'), tEl = document.getElementById('wc-temp');
  const dabResEl = document.getElementById('wc-res-dab'), dsResEl = document.getElementById('wc-res-desc');

  function update() {
    const M_B = parseFloat(mbEl.value), phi = parseFloat(phiEl.value);
    const V_A = parseFloat(vaEl.value), mu = parseFloat(muEl.value), T_C = parseFloat(tEl.value);

    if (isNaN(M_B) || isNaN(phi) || isNaN(V_A) || isNaN(mu) || isNaN(T_C) || M_B <= 0 || phi <= 0 || V_A <= 0 || mu <= 0 || T_C < -273.15) return;

    const T_K = T_C + 273.15;

    // Wilke-Chang equation: D_AB = 7.4e-8 * ( sqrt(phi * M_B) * T_K ) / ( mu * (V_A^0.6) )  [cm^2 / s]
    const num = 7.4e-8 * Math.sqrt(phi * M_B) * T_K;
    const den = mu * Math.pow(V_A, 0.6);
    const D_AB_cm2_s = num / den;
    const D_AB_m2_s = D_AB_cm2_s * 1e-4;

    // Stokes-Einstein radius approx: r = k_B * T / (6 * pi * mu * D_AB)
    const k_B = 1.380649e-23;
    const mu_Pa_s = mu * 1e-3;
    const r_m = (k_B * T_K) / (6.0 * Math.PI * mu_Pa_s * D_AB_m2_s);
    const r_Angstrom = r_m * 1e10;

    dabResEl.textContent = 'D_AB = ' + D_AB_cm2_s.toExponential(2) + ' cm²/s (' + D_AB_m2_s.toExponential(2) + ' m²/s)';
    dsResEl.textContent = 'Stokes-Einstein Radius r_H ≈ ' + r_Angstrom.toFixed(2) + ' Å | Temp = ' + T_C + '°C, μ = ' + mu + ' cP (φ=' + phi + ' for solvent M_B=' + M_B + ')';
  }

  [mbEl, phiEl, vaEl, muEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();