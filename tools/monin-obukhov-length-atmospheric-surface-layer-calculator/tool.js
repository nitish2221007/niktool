(() => {
  'use strict';
  const usEl = document.getElementById('mo-ustar'), flxEl = document.getElementById('mo-flux'), thvEl = document.getElementById('mo-thetav');
  const lResEl = document.getElementById('mo-res-l'), regResEl = document.getElementById('mo-res-reg');

  const g = 9.80665;
  const vonKarman = 0.40; // kappa

  function update() {
    const u_star = parseFloat(usEl.value), w_theta = parseFloat(flxEl.value), theta_v = parseFloat(thvEl.value);
    if (isNaN(u_star) || isNaN(w_theta) || isNaN(theta_v) || u_star <= 0 || theta_v <= 0) return;

    if (Math.abs(w_theta) < 1e-5) {
      lResEl.textContent = 'L = ∞ (Neutral)';
      regResEl.textContent = 'NEUTRAL STABILITY (|L| -> ∞: Pure mechanical shear turbulence, overcast / windy)';
      return;
    }

    // Monin-Obukhov length: L = - ( u_star^3 * theta_v ) / ( vonKarman * g * w_theta )  [meters]
    const L = -(Math.pow(u_star, 3) * theta_v) / (vonKarman * g * w_theta);

    let regime = '';
    let color = '#22543d';

    if (L < 0) {
      regime = 'UNSTABLE CONVECTIVE (L < 0: Upward heat flux, thermal buoyancy dominates shear above z = ' + Math.abs(L).toFixed(1) + ' m)';
      color = '#22543d';
    } else {
      regime = 'STABLE NOCTURNAL (L > 0: Downward heat flux, surface cooling suppresses turbulence)';
      color = '#2563eb';
    }

    lResEl.textContent = 'L = ' + (L > 0 ? '+' : '') + L.toFixed(1) + ' m';
    lResEl.style.color = color;
    regResEl.textContent = regime + ' | Sensible Heat Flux: ' + (w_theta * 1200).toFixed(0) + ' W/m²';
    regResEl.style.color = color;
  }

  [usEl, flxEl, thvEl].forEach(el => el.addEventListener('input', update));
  update();
})();