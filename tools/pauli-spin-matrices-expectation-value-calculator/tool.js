(() => {
  'use strict';
  const thEl = document.getElementById('pl-th'), phiEl = document.getElementById('pl-phi');
  const eResEl = document.getElementById('pl-res-exp'), pResEl = document.getElementById('pl-res-pur');

  function update() {
    const thDeg = parseFloat(thEl.value), phiDeg = parseFloat(phiEl.value);
    if (isNaN(thDeg) || isNaN(phiDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phiRad = (phiDeg * Math.PI) / 180;

    const sx = Math.sin(thRad) * Math.cos(phiRad);
    const sy = Math.sin(thRad) * Math.sin(phiRad);
    const sz = Math.cos(thRad);
    const norm = Math.sqrt(sx*sx + sy*sy + sz*sz);

    eResEl.textContent = '⟨σ_x⟩ = ' + sx.toFixed(3) + ' | ⟨σ_y⟩ = ' + sy.toFixed(3) + ' | ⟨σ_z⟩ = ' + sz.toFixed(3);
    pResEl.textContent = 'Purity Tr(ρ²) = 1.000 (Pure State, |r| = ' + norm.toFixed(3) + ', Energy Eigenstate Z-Bias: ' + sz.toFixed(3) + ')';
  }

  thEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();