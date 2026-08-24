(() => {
  'use strict';
  const p1El = document.getElementById('bn-p1'), v1El = document.getElementById('bn-v1');
  const v2El = document.getElementById('bn-v2'), dzEl = document.getElementById('bn-dz'), hlEl = document.getElementById('bn-hl');
  const p2ResEl = document.getElementById('bn-res-p2'), hdResEl = document.getElementById('bn-res-heads');

  const g = 9.80665; // m/s^2
  const rho = 1000.0; // kg/m^3 (water)

  function update() {
    const P1_kPa = parseFloat(p1El.value), v1 = parseFloat(v1El.value);
    const v2 = parseFloat(v2El.value), dz = parseFloat(dzEl.value), hL = parseFloat(hlEl.value);

    if (isNaN(P1_kPa) || isNaN(v1) || isNaN(v2) || isNaN(dz) || isNaN(hL)) return;

    const P1_Pa = P1_kPa * 1000.0;

    // Extended Bernoulli: P2 = P1 + 0.5*rho*(v1^2 - v2^2) - rho*g*dz - rho*g*hL
    const delta_kinetic = 0.5 * rho * (Math.pow(v1, 2) - Math.pow(v2, 2));
    const delta_potential = -rho * g * dz;
    const delta_friction = -rho * g * hL;

    const P2_Pa = P1_Pa + delta_kinetic + delta_potential + delta_friction;
    const P2_kPa = P2_Pa / 1000.0;

    p2ResEl.textContent = 'Delivered P₂ = ' + P2_kPa.toFixed(1) + ' kPa';
    hdResEl.textContent = 'Elev Δz Drop: ' + (delta_potential/1000).toFixed(1) + ' kPa | Kinetic: ' + (delta_kinetic/1000).toFixed(1) + ' kPa | Friction: ' + (delta_friction/1000).toFixed(1) + ' kPa (h_L=' + hL + 'm)';
  }

  [p1El, v1El, v2El, dzEl, hlEl].forEach(el => el.addEventListener('input', update));
  update();
})();