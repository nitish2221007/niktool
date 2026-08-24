(() => {
  'use strict';
  const ttEl = document.getElementById('bg-two-theta'), lmEl = document.getElementById('bg-lambda'), nEl = document.getElementById('bg-n');
  const dResEl = document.getElementById('bg-res-d'), fcResEl = document.getElementById('bg-res-fcc');

  function update() {
    const two_theta = parseFloat(ttEl.value), lambda_A = parseFloat(lmEl.value), n = parseFloat(nEl.value);
    if (isNaN(two_theta) || isNaN(lambda_A) || isNaN(n) || two_theta <= 0 || two_theta >= 180 || lambda_A <= 0 || n <= 0) return;

    // Bragg angle theta in degrees and radians:
    const theta_deg = two_theta / 2.0;
    const theta_rad = (theta_deg * Math.PI) / 180.0;

    // Bragg's Law: d = n * lambda / (2 * sin(theta))  [Angstroms]
    const d_spacing_A = (n * lambda_A) / (2.0 * Math.sin(theta_rad));
    const d_spacing_nm = d_spacing_A / 10.0;

    // Assuming (111) reflection in FCC: a = d * sqrt(h^2 + k^2 + l^2) = d * sqrt(3)
    const a_lattice_A = d_spacing_A * Math.sqrt(3.0);

    dResEl.textContent = 'Interplanar d = ' + d_spacing_A.toFixed(3) + ' Å (' + d_spacing_nm.toFixed(4) + ' nm)';
    fcResEl.textContent = 'Bragg θ = ' + theta_deg.toFixed(2) + '° | FCC (111) Lattice a = ' + a_lattice_A.toFixed(3) + ' Å (Cu Kα λ=' + lambda_A + ' Å @ 2θ=' + two_theta + '°)';
  }

  [ttEl, lmEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();