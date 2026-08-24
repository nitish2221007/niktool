(() => {
  'use strict';
  const wEl = document.getElementById('qt-w'), xEl = document.getElementById('qt-x');
  const yEl = document.getElementById('qt-y'), zEl = document.getElementById('qt-z');
  const euResEl = document.getElementById('qt-res-euler'), nmResEl = document.getElementById('qt-res-norm');

  function update() {
    let w = parseFloat(wEl.value), x = parseFloat(xEl.value);
    let y = parseFloat(yEl.value), z = parseFloat(zEl.value);

    if (isNaN(w) || isNaN(x) || isNaN(y) || isNaN(z)) return;

    // Normalize quaternion:
    const norm = Math.sqrt(Math.pow(w, 2) + Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    if (norm === 0) return;
    w /= norm; x /= norm; y /= norm; z /= norm;

    // Roll (x-axis rotation): atan2(2*(w*x + y*z), 1 - 2*(x^2 + y^2))
    const sinr_cosp = 2.0 * ((w * x) + (y * z));
    const cosr_cosp = 1.0 - (2.0 * (Math.pow(x, 2) + Math.pow(y, 2)));
    const roll_rad = Math.atan2(sinr_cosp, cosr_cosp);

    // Pitch (y-axis rotation): asin(2*(w*y - z*x))
    const sinp = 2.0 * ((w * y) - (z * x));
    let pitch_rad = 0;
    if (Math.abs(sinp) >= 1) {
      pitch_rad = (Math.sign(sinp) * Math.PI) / 2.0; // Gimbal lock 90 deg
    } else {
      pitch_rad = Math.asin(sinp);
    }

    // Yaw (z-axis rotation): atan2(2*(w*z + x*y), 1 - 2*(y^2 + z^2))
    const siny_cosp = 2.0 * ((w * z) + (x * y));
    const cosy_cosp = 1.0 - (2.0 * (Math.pow(y, 2) + Math.pow(z, 2)));
    const yaw_rad = Math.atan2(siny_cosp, cosy_cosp);

    const roll_deg = (roll_rad * 180.0) / Math.PI;
    const pitch_deg = (pitch_rad * 180.0) / Math.PI;
    const yaw_deg = (yaw_rad * 180.0) / Math.PI;

    euResEl.textContent = 'Roll φ = ' + roll_deg.toFixed(1) + '° | Pitch θ = ' + pitch_deg.toFixed(1) + '° | Yaw ψ = ' + yaw_deg.toFixed(1) + '°';
    nmResEl.textContent = 'Norm |q| = ' + norm.toFixed(3) + ' (Normalized: [' + w.toFixed(3) + ', ' + x.toFixed(3) + ', ' + y.toFixed(3) + ', ' + z.toFixed(3) + '])';
  }

  [wEl, xEl, yEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();