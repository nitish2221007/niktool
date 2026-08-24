(() => {
  'use strict';
  const rEl = document.getElementById('sph-r'), thEl = document.getElementById('sph-theta'), phEl = document.getElementById('sph-phi');
  const xyzEl = document.getElementById('sph-res-xyz'), rxyEl = document.getElementById('sph-res-rxy');

  function update() {
    const r = parseFloat(rEl.value), thDeg = parseFloat(thEl.value), phDeg = parseFloat(phEl.value);
    if (isNaN(r) || isNaN(thDeg) || isNaN(phDeg) || r < 0) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phRad = (phDeg * Math.PI) / 180;

    // x = r * sin(theta) * cos(phi)
    // y = r * sin(theta) * sin(phi)
    // z = r * cos(theta)
    const x = r * Math.sin(thRad) * Math.cos(phRad);
    const y = r * Math.sin(thRad) * Math.sin(phRad);
    const z = r * Math.cos(thRad);
    const rXy = r * Math.sin(thRad);

    xyzEl.textContent = '(' + x.toFixed(3) + ', ' + y.toFixed(3) + ', ' + z.toFixed(3) + ')';
    rxyEl.textContent = 'r_xy = ' + rXy.toFixed(3);
  }

  [rEl, thEl, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();