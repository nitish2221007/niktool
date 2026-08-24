(() => {
  'use strict';
  const dpEl = document.getElementById('pt-dp'), rEl = document.getElementById('pt-rho');
  const spdResEl = document.getElementById('pt-res-spd'), dynResEl = document.getElementById('pt-res-dyn');

  function update() {
    const dp_hPa = parseFloat(dpEl.value), rho = parseFloat(rEl.value);
    if (isNaN(dp_hPa) || isNaN(rho) || dp_hPa <= 0 || rho <= 0) return;

    const deltaP_Pa = dp_hPa * 100.0;

    // Bernoulli: deltaP = 0.5 * rho * v^2 => v = sqrt( 2 * deltaP / rho )  [m / s]
    const v_mps = Math.sqrt((2.0 * deltaP_Pa) / rho);
    const v_kts = v_mps * 1.94384;
    const v_kmh = v_mps * 3.6;

    spdResEl.textContent = 'Airspeed v = ' + v_kts.toFixed(1) + ' Knots (' + v_kmh.toFixed(1) + ' km/h)';
    dynResEl.textContent = 'Dynamic Pressure q = ' + Math.round(deltaP_Pa).toLocaleString() + ' Pa (' + dp_hPa.toFixed(1) + ' hPa | Velocity = ' + v_mps.toFixed(2) + ' m/s @ ρ = ' + rho + ' kg/m³)';
  }

  [dpEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();