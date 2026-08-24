(() => {
  'use strict';
  const thEl = document.getElementById('bl-th'), phiEl = document.getElementById('bl-phi');
  const vResEl = document.getElementById('bl-res-vec'), pResEl = document.getElementById('bl-res-prob');

  function update() {
    const thDeg = parseFloat(thEl.value), phiDeg = parseFloat(phiEl.value);
    if (isNaN(thDeg) || isNaN(phiDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phiRad = (phiDeg * Math.PI) / 180;

    // Bloch sphere cartesian coordinates:
    // x = sin(theta) * cos(phi)
    // y = sin(theta) * sin(phi)
    // z = cos(theta)
    const x = Math.sin(thRad) * Math.cos(phiRad);
    const y = Math.sin(thRad) * Math.sin(phiRad);
    const z = Math.cos(thRad);

    // Basis state probabilities:
    // P(|0>) = cos^2(theta / 2)
    // P(|1>) = sin^2(theta / 2)
    const p0 = Math.pow(Math.cos(thRad / 2.0), 2);
    const p1 = Math.pow(Math.sin(thRad / 2.0), 2);

    let stateName = '';
    if (Math.abs(z - 1.0) < 0.01) stateName = '|0⟩ Ground State';
    else if (Math.abs(z + 1.0) < 0.01) stateName = '|1⟩ Excited State';
    else if (Math.abs(x - 1.0) < 0.01) stateName = '|+⟩ = (|0⟩+|1⟩)/√2';
    else if (Math.abs(x + 1.0) < 0.01) stateName = '|-⟩ = (|0⟩-|1⟩)/√2';
    else if (Math.abs(y - 1.0) < 0.01) stateName = '|i+⟩ = (|0⟩+i|1⟩)/√2';
    else if (Math.abs(y + 1.0) < 0.01) stateName = '|i-⟩ = (|0⟩-i|1⟩)/√2';
    else stateName = 'General Superposition State';

    vResEl.textContent = '(x=' + x.toFixed(2) + ', y=' + y.toFixed(2) + ', z=' + z.toFixed(2) + ') = ' + stateName;
    pResEl.textContent = 'P(|0⟩) = ' + (p0 * 100).toFixed(1) + '% | P(|1⟩) = ' + (p1 * 100).toFixed(1) + '% (θ = ' + thDeg + '°, φ = ' + phiDeg + '°)';
  }

  thEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();