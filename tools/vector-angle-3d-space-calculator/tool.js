(() => {
  'use strict';
  const u1El = document.getElementById('v-u1'), u2El = document.getElementById('v-u2'), u3El = document.getElementById('v-u3');
  const v1El = document.getElementById('v-v1'), v2El = document.getElementById('v-v2'), v3El = document.getElementById('v-v3');
  const degEl = document.getElementById('vang-res-deg'), radEl = document.getElementById('vang-res-rad'), dotEl = document.getElementById('vang-res-dot');

  function update() {
    const u1 = parseFloat(u1El.value), u2 = parseFloat(u2El.value), u3 = parseFloat(u3El.value);
    const v1 = parseFloat(v1El.value), v2 = parseFloat(v2El.value), v3 = parseFloat(v3El.value);

    if (isNaN(u1) || isNaN(u2) || isNaN(u3) || isNaN(v1) || isNaN(v2) || isNaN(v3)) return;

    const dot = (u1 * v1) + (u2 * v2) + (u3 * v3);
    const magU = Math.sqrt(u1*u1 + u2*u2 + u3*u3);
    const magV = Math.sqrt(v1*v1 + v2*v2 + v3*v3);

    if (magU === 0 || magV === 0) return;

    let cosTheta = dot / (magU * magV);
    if (cosTheta > 1) cosTheta = 1;
    if (cosTheta < -1) cosTheta = -1;

    const rad = Math.acos(cosTheta);
    const deg = (rad * 180) / Math.PI;

    degEl.textContent = deg.toFixed(2) + '°';
    radEl.textContent = rad.toFixed(3) + ' Radians';
    dotEl.textContent = 'u · v = ' + dot.toFixed(2);
  }

  [u1El, u2El, u3El, v1El, v2El, v3El].forEach(el => el.addEventListener('input', update));
  update();
})();