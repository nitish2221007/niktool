(() => {
  'use strict';
  const rhoEl = document.getElementById('cyl-rho'), phiEl = document.getElementById('cyl-phi'), zEl = document.getElementById('cyl-z');
  const xyzEl = document.getElementById('cyl-res-xyz');

  function update() {
    const rho = parseFloat(rhoEl.value), phiDeg = parseFloat(phiEl.value), z = parseFloat(zEl.value);
    if (isNaN(rho) || isNaN(phiDeg) || isNaN(z) || rho < 0) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    // x = rho * cos(phi)
    // y = rho * sin(phi)
    // z = z
    const x = rho * Math.cos(phiRad);
    const y = rho * Math.sin(phiRad);

    xyzEl.textContent = '(' + x.toFixed(3) + ', ' + y.toFixed(3) + ', ' + z.toFixed(3) + ')';
  }

  [rhoEl, phiEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();