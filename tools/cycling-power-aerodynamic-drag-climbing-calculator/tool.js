(() => {
  'use strict';
  const spdEl = document.getElementById('cyc-spd'), grdEl = document.getElementById('cyc-grd');
  const wtEl = document.getElementById('cyc-wt'), posEl = document.getElementById('cyc-pos');
  const wResEl = document.getElementById('cyc-res-watts'), spResEl = document.getElementById('cyc-res-split');

  const g = 9.80665;
  const rho_air = 1.225;
  const Crr = 0.004; // quality road bike tire rolling resistance coefficient

  function update() {
    const spdKmh = parseFloat(spdEl.value), gradePct = parseFloat(grdEl.value);
    const totalMass = parseFloat(wtEl.value), CdA = parseFloat(posEl.value);

    if (isNaN(spdKmh) || isNaN(gradePct) || isNaN(totalMass) || isNaN(CdA) || spdKmh <= 0 || totalMass <= 0) return;

    // Convert speed to m/s
    const v = spdKmh / 3.6;

    // Aerodynamic power P_aero = 0.5 * rho * CdA * v^3
    const Paero = 0.5 * rho_air * CdA * Math.pow(v, 3);

    // Rolling resistance power P_roll = Crr * m * g * v * cos(theta)
    const slopeAngle = Math.atan(gradePct / 100);
    const Proll = Crr * totalMass * g * v * Math.cos(slopeAngle);

    // Climbing gravitational power P_climb = m * g * v * sin(theta)
    const Pclimb = totalMass * g * v * Math.sin(slopeAngle);

    // Total mechanical power = P_aero + P_roll + P_climb
    const Ptotal = Paero + Proll + Pclimb;
    const wKg = Ptotal / (totalMass - 8); // normalized to rider body weight (assuming 8kg bike)

    wResEl.textContent = Ptotal.toFixed(1) + ' Watts (' + (wKg > 0 ? wKg.toFixed(2) + ' W/kg' : '0 W/kg') + ')';
    spResEl.textContent = 'Aero: ' + Paero.toFixed(1) + ' W (' + ((Paero/Ptotal)*100).toFixed(1) + '%) | Rolling: ' + Proll.toFixed(1) + ' W | Gravity: ' + Pclimb.toFixed(1) + ' W';
  }

  [spdEl, grdEl, wtEl].forEach(el => el.addEventListener('input', update));
  posEl.addEventListener('change', update);
  update();
})();