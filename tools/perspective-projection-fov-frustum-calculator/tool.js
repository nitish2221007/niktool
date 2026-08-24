(() => {
  'use strict';
  const fovEl = document.getElementById('cam-fov'), aspEl = document.getElementById('cam-asp');
  const nEl = document.getElementById('cam-near'), fEl = document.getElementById('cam-far');
  const fcResEl = document.getElementById('cam-res-foc'), hfResEl = document.getElementById('cam-res-hfov');

  function update() {
    const fovVDeg = parseFloat(fovEl.value), aspect = parseFloat(aspEl.value);
    const zNear = parseFloat(nEl.value), zFar = parseFloat(fEl.value);

    if (isNaN(fovVDeg) || isNaN(aspect) || isNaN(zNear) || isNaN(zFar) || fovVDeg <= 0 || fovVDeg >= 180 || zNear <= 0 || zFar <= zNear) return;

    const fovVRad = (fovVDeg * Math.PI) / 180;
    const focalLength = 1 / Math.tan(fovVRad / 2);

    const fovHRad = 2 * Math.atan(Math.tan(fovVRad / 2) * aspect);
    const fovHDeg = (fovHRad * 180) / Math.PI;

    const farHeight = 2 * zFar * Math.tan(fovVRad / 2);
    const farWidth = farHeight * aspect;

    fcResEl.textContent = 'f = ' + focalLength.toFixed(3) + ' (cot(FOV/2))';
    hfResEl.textContent = 'Horizontal FOV: ' + fovHDeg.toFixed(1) + '° (Far Plane: ' + Math.round(farWidth).toLocaleString() + 'm × ' + Math.round(farHeight).toLocaleString() + 'm)';
  }

  [fovEl, nEl, fEl].forEach(el => el.addEventListener('input', update));
  aspEl.addEventListener('change', update);
  update();
})();