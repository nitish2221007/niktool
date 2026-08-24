(() => {
  'use strict';
  const degEl = document.getElementById('qt-deg'), uxEl = document.getElementById('qt-ux');
  const uyEl = document.getElementById('qt-uy'), uzEl = document.getElementById('qt-uz');
  const qtResEl = document.getElementById('qt-res-quat'), nmResEl = document.getElementById('qt-res-norm');

  function update() {
    const deg = parseFloat(degEl.value);
    let ux = parseFloat(uxEl.value), uy = parseFloat(uyEl.value), uz = parseFloat(uzEl.value);

    if (isNaN(deg) || isNaN(ux) || isNaN(uy) || isNaN(uz)) return;

    // Normalize axis vector:
    const len = Math.sqrt(ux*ux + uy*uy + uz*uz);
    if (len === 0) return;
    ux /= len; uy /= len; uz /= len;

    // Quaternion for rotation theta around axis u:
    // q = cos(theta / 2) + u * sin(theta / 2)
    const theta_rad = (deg * Math.PI) / 180.0;
    const w = Math.cos(theta_rad / 2.0);
    const s = Math.sin(theta_rad / 2.0);
    const x = ux * s;
    const y = uy * s;
    const z = uz * s;

    const norm = Math.sqrt(w*w + x*x + y*y + z*z);

    qtResEl.textContent = 'q = ' + w.toFixed(3) + (x>=0?' + ':' - ') + Math.abs(x).toFixed(3) + 'i' + (y>=0?' + ':' - ') + Math.abs(y).toFixed(3) + 'j' + (z>=0?' + ':' - ') + Math.abs(z).toFixed(3) + 'k';
    nmResEl.textContent = 'Norm ||q|| = ' + norm.toFixed(4) + ' | θ = ' + deg + '° around axis [' + ux.toFixed(2) + ', ' + uy.toFixed(2) + ', ' + uz.toFixed(2) + '] (No Gimbal Lock)';
  }

  [degEl, uxEl, uyEl, uzEl].forEach(el => el.addEventListener('input', update));
  update();
})();