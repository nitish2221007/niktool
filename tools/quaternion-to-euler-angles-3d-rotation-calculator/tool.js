(() => {
  'use strict';
  const wEl = document.getElementById('qt-w'), xEl = document.getElementById('qt-x');
  const yEl = document.getElementById('qt-y'), zEl = document.getElementById('qt-z');
  const euResEl = document.getElementById('qt-res-eul'), nmResEl = document.getElementById('qt-res-norm');

  function update() {
    let w = parseFloat(wEl.value), x = parseFloat(xEl.value);
    let y = parseFloat(yEl.value), z = parseFloat(zEl.value);

    if (isNaN(w) || isNaN(x) || isNaN(y) || isNaN(z)) return;

    const mag = Math.sqrt(w*w + x*x + y*y + z*z);
    if (mag === 0) return;
    w /= mag; x /= mag; y /= mag; z /= mag;

    const sinr_cosp = 2 * (w * x + y * z);
    const cosr_cosp = 1 - 2 * (x * x + y * y);
    const rollRad = Math.atan2(sinr_cosp, cosr_cosp);
    const rollDeg = (rollRad * 180) / Math.PI;

    const sinp = 2 * (w * y - z * x);
    let pitchRad = 0;
    if (Math.abs(sinp) >= 1) {
      pitchRad = Math.sign(sinp) * (Math.PI / 2);
    } else {
      pitchRad = Math.asin(sinp);
    }
    const pitchDeg = (pitchRad * 180) / Math.PI;

    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    const yawRad = Math.atan2(siny_cosp, cosy_cosp);
    const yawDeg = (yawRad * 180) / Math.PI;

    euResEl.textContent = 'Roll: ' + rollDeg.toFixed(1) + '° | Pitch: ' + pitchDeg.toFixed(1) + '° | Yaw: ' + yawDeg.toFixed(1) + '°';
    nmResEl.textContent = 'Norm: |q| = ' + mag.toFixed(4) + ' (Roll: ' + rollRad.toFixed(2) + ' rad, Pitch: ' + pitchRad.toFixed(2) + ' rad, Yaw: ' + yawRad.toFixed(2) + ' rad)';
  }

  [wEl, xEl, yEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();