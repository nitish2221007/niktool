(() => {
  'use strict';
  const d1El = document.getElementById('vt-d1'), d2El = document.getElementById('vt-d2');
  const dpEl = document.getElementById('vt-dp'), rhoEl = document.getElementById('vt-rho');
  const qResEl = document.getElementById('vt-res-q'), velResEl = document.getElementById('vt-res-vel');

  function update() {
    const D1_mm = parseFloat(d1El.value), D2_mm = parseFloat(d2El.value);
    const dp_kPa = parseFloat(dpEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(D1_mm) || isNaN(D2_mm) || isNaN(dp_kPa) || isNaN(rho) || D1_mm <= D2_mm || D2_mm <= 0 || dp_kPa <= 0 || rho <= 0) return;

    const D1 = D1_mm / 1000.0;
    const D2 = D2_mm / 1000.0;
    const dp_Pa = dp_kPa * 1000.0;

    const A1 = (Math.PI / 4.0) * Math.pow(D1, 2);
    const A2 = (Math.PI / 4.0) * Math.pow(D2, 2);

    // Venturi flow rate formula (assuming discharge coefficient Cd = 0.98):
    // Q = Cd * A2 * sqrt( (2 * deltaP) / ( rho * (1 - (A2/A1)^2) ) )
    const Cd = 0.98;
    const beta = A2 / A1;
    const Q_m3s = Cd * A2 * Math.sqrt((2.0 * dp_Pa) / (rho * (1.0 - Math.pow(beta, 2))));

    const Q_Ls = Q_m3s * 1000.0;
    const Q_m3h = Q_m3s * 3600.0;

    const v1 = Q_m3s / A1;
    const v2 = Q_m3s / A2;

    qResEl.textContent = 'Q = ' + Q_Ls.toFixed(2) + ' L / s (' + Q_m3h.toFixed(1) + ' m³/h)';
    velResEl.textContent = 'Throat v₂ = ' + v2.toFixed(2) + ' m/s | Inlet v₁ = ' + v1.toFixed(2) + ' m/s (ΔP = ' + dp_kPa + ' kPa @ D₁=' + D1_mm + 'mm / D₂=' + D2_mm + 'mm)';
  }

  [d1El, d2El, dpEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();