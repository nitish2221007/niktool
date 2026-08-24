(() => {
  'use strict';
  const thEl = document.getElementById('bs-theta'), phEl = document.getElementById('bs-phi');
  const prResEl = document.getElementById('bs-res-prob'), vcResEl = document.getElementById('bs-res-vec');

  function update() {
    const theta_deg = parseFloat(thEl.value), phi_deg = parseFloat(phEl.value);
    if (isNaN(theta_deg) || isNaN(phi_deg) || theta_deg < 0 || theta_deg > 180) return;

    const th = (theta_deg * Math.PI) / 180.0;
    const ph = (phi_deg * Math.PI) / 180.0;

    // State amplitudes:
    // alpha = cos(theta / 2)
    // beta = exp(i*phi) * sin(theta / 2)
    const p0 = Math.pow(Math.cos(th / 2.0), 2);
    const p1 = Math.pow(Math.sin(th / 2.0), 2);

    // Bloch vector coordinates:
    // x = sin(theta) * cos(phi)
    // y = sin(theta) * sin(phi)
    // z = cos(theta)
    const x = Math.sin(th) * Math.cos(ph);
    const y = Math.sin(th) * Math.sin(ph);
    const z = Math.cos(th);

    let state_name = '';
    if (theta_deg === 0) state_name = 'North Pole |0⟩ Ground State';
    else if (theta_deg === 180) state_name = 'South Pole |1⟩ Excited State';
    else if (theta_deg === 90 && phi_deg === 0) state_name = 'Hadamard |+⟩ State (1/√2 (|0⟩ + |1⟩))';
    else if (theta_deg === 90 && phi_deg === 180) state_name = 'Hadamard |-⟩ State (1/√2 (|0⟩ - |1⟩))';
    else if (theta_deg === 90 && phi_deg === 90) state_name = '|+i⟩ Circular State';
    else state_name = 'Superposition State';

    prResEl.textContent = 'P(|0⟩) = ' + (p0 * 100).toFixed(1) + '% | P(|1⟩) = ' + (p1 * 100).toFixed(1) + '%';
    vcResEl.textContent = 'Bloch: [x=' + x.toFixed(3) + ', y=' + y.toFixed(3) + ', z=' + z.toFixed(3) + '] | ' + state_name;
  }

  thEl.addEventListener('input', update);
  phEl.addEventListener('input', update);
  update();
})();