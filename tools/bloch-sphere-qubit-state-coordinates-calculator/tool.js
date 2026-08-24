(() => {
  'use strict';
  const thEl = document.getElementById('bl-th'), phiEl = document.getElementById('bl-phi');
  const cResEl = document.getElementById('bl-res-coord'), pResEl = document.getElementById('bl-res-prob');

  function update() {
    const thDeg = parseFloat(thEl.value), phiDeg = parseFloat(phiEl.value);
    if (isNaN(thDeg) || isNaN(phiDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phiRad = (phiDeg * Math.PI) / 180;

    const x = Math.sin(thRad) * Math.cos(phiRad);
    const y = Math.sin(thRad) * Math.sin(phiRad);
    const z = Math.cos(thRad);

    const p0 = Math.pow(Math.cos(thRad / 2), 2) * 100;
    const p1 = Math.pow(Math.sin(thRad / 2), 2) * 100;

    let stateName = '';
    if (thDeg === 0) stateName = 'Ground State |0⟩';
    else if (thDeg === 180) stateName = 'Excited State |1⟩';
    else if (thDeg === 90 && phiDeg === 0) stateName = '|+⟩ State (Hadamard)';
    else if (thDeg === 90 && phiDeg === 180) stateName = '|-⟩ State';
    else if (thDeg === 90 && phiDeg === 90) stateName = '|i+⟩ State';
    else stateName = 'Superposition State';

    cResEl.textContent = '(x=' + x.toFixed(2) + ', y=' + y.toFixed(2) + ', z=' + z.toFixed(2) + ')';
    pResEl.textContent = 'P(|0⟩) = ' + p0.toFixed(1) + '% | P(|1⟩) = ' + p1.toFixed(1) + '% (' + stateName + ')';
  }

  thEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();