(() => {
  'use strict';
  const csEl = document.getElementById('fk-cs'), c0El = document.getElementById('fk-c0');
  const xEl = document.getElementById('fk-x'), dEl = document.getElementById('fk-d'), tEl = document.getElementById('fk-time');
  const cxResEl = document.getElementById('fk-res-cx'), zResEl = document.getElementById('fk-res-z');

  // Approximation for erf(z) (Abramowitz & Stegun):
  function erf(z) {
    const t = 1.0 / (1.0 + 0.3275911 * Math.abs(z));
    const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
    const ans = 1.0 - poly * Math.exp(-z * z);
    return z >= 0 ? ans : -ans;
  }

  function update() {
    const Cs = parseFloat(csEl.value), C0 = parseFloat(c0El.value);
    const x_mm = parseFloat(xEl.value), D = parseFloat(dEl.value), t_hr = parseFloat(tEl.value);

    if (isNaN(Cs) || isNaN(C0) || isNaN(x_mm) || isNaN(D) || isNaN(t_hr) || x_mm < 0 || D <= 0 || t_hr <= 0) return;

    const x_m = x_mm * 1e-3;
    const t_sec = t_hr * 3600.0;

    // Characteristic diffusion length: 2 * sqrt(D * t)
    const diff_length_m = 2.0 * Math.sqrt(D * t_sec);
    const diff_length_mm = diff_length_m * 1000.0;

    // Dimensionless parameter: z = x / (2 * sqrt(D * t))
    const z = x_m / diff_length_m;

    // erfc(z) = 1 - erf(z)
    const erf_val = erf(z);
    const erfc_val = 1.0 - erf_val;

    // Concentration: C(x,t) = Cs - (Cs - C0) * erf(z) = C0 + (Cs - C0) * erfc(z)
    const Cx = C0 + (Cs - C0) * erfc_val;

    cxResEl.textContent = 'Conc C(x, t) = ' + Cx.toFixed(3) + '%';
    zResEl.textContent = 'Diffusion Length 2√(Dt) = ' + diff_length_mm.toFixed(2) + ' mm | z = ' + z.toFixed(3) + ' (erfc(z) = ' + erfc_val.toFixed(3) + ' @ ' + t_hr + ' hrs)';
  }

  [csEl, c0El, xEl, dEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();