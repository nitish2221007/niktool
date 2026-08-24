(() => {
  'use strict';
  const vEl = document.getElementById('dub-v'), dEl = document.getElementById('dub-delta'), lEl = document.getElementById('dub-l');
  const rResEl = document.getElementById('dub-res-rmin'), rtResEl = document.getElementById('dub-res-rate');

  function update() {
    const v = parseFloat(vEl.value), deltaDeg = parseFloat(dEl.value), L = parseFloat(lEl.value);
    if (isNaN(v) || isNaN(deltaDeg) || isNaN(L) || v <= 0 || deltaDeg <= 0 || deltaDeg >= 90 || L <= 0) return;

    const deltaRad = (deltaDeg * Math.PI) / 180;

    // Minimum turning radius R_min = L / tan(delta_max)  [meters]
    const R_min = L / Math.tan(deltaRad);

    // Maximum yaw rate omega_max = v / R_min  [rad / s]
    const omega_max = v / R_min;
    const omega_deg_s = (omega_max * 180) / Math.PI;

    // Lateral acceleration a_lat = v^2 / R_min  [m / s^2]
    const a_lat = Math.pow(v, 2) / R_min;
    const a_lat_g = a_lat / 9.80665;

    rResEl.textContent = 'R_min = ' + R_min.toFixed(2) + ' m (Wall-to-Wall Radius: ' + (R_min + 0.9).toFixed(2) + ' m)';
    rtResEl.textContent = 'Max Yaw Rate: ' + omega_max.toFixed(2) + ' rad/s (' + omega_deg_s.toFixed(1) + '°/s) | a_lat = ' + a_lat.toFixed(1) + ' m/s² (' + a_lat_g.toFixed(2) + 'g @ ' + (v*3.6).toFixed(0) + ' km/h)';
  }

  [vEl, dEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();