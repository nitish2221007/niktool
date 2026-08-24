(() => {
  'use strict';
  const s1El = document.getElementById('ds-s1'), t1El = document.getElementById('ds-t1');
  const s2El = document.getElementById('ds-s2'), t2El = document.getElementById('ds-t2');
  const phiResEl = document.getElementById('ds-res-phi'), cResEl = document.getElementById('ds-res-c');

  function update() {
    const s1 = parseFloat(s1El.value), t1 = parseFloat(t1El.value);
    const s2 = parseFloat(s2El.value), t2 = parseFloat(t2El.value);

    if (isNaN(s1) || isNaN(t1) || isNaN(s2) || isNaN(t2) || s1 <= 0 || s2 <= s1 || t1 <= 0 || t2 <= 0) return;

    // Linear regression slope = tan(phi) = (t2 - t1) / (s2 - s1)
    const tan_phi = (t2 - t1) / (s2 - s1);
    const phi_rad = Math.atan(tan_phi);
    const phi_deg = (phi_rad * 180.0) / Math.PI;

    // Cohesion intercept: c = t1 - s1 * tan(phi)
    const c = Math.max(0, t1 - (s1 * tan_phi));

    phiResEl.textContent = 'Friction Angle φ = ' + phi_deg.toFixed(2) + '°';
    cResEl.textContent = 'Cohesion c = ' + c.toFixed(2) + ' kPa | Envelope: τ = ' + c.toFixed(2) + ' + σ·tan(' + phi_deg.toFixed(1) + '°)';
  }

  [s1El, t1El, s2El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();