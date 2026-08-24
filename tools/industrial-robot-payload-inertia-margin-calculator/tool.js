(() => {
  'use strict';
  const mEl = document.getElementById('rb-mass'), cgEl = document.getElementById('rb-cg');
  const mmEl = document.getElementById('rb-maxm'), mjEl = document.getElementById('rb-maxj');
  const jResEl = document.getElementById('rb-res-j'), stResEl = document.getElementById('rb-res-stat');

  function update() {
    const mass = parseFloat(mEl.value), dMm = parseFloat(cgEl.value);
    const maxMass = parseFloat(mmEl.value), maxJ = parseFloat(mjEl.value);

    if (isNaN(mass) || isNaN(dMm) || isNaN(maxMass) || isNaN(maxJ) || mass <= 0 || dMm <= 0 || maxMass <= 0 || maxJ <= 0) return;

    const dM = dMm / 1000;
    // Approximating rectangular gripper intrinsic inertia J_cg approx = (1/12)*m*(w^2 + h^2)
    const J_cg = (1 / 12) * mass * (Math.pow(0.12, 2) + Math.pow(0.12, 2));

    // Parallel axis theorem: J_total = J_cg + m * d^2
    const J_total = J_cg + (mass * Math.pow(dM, 2));

    const massPct = (mass / maxMass) * 100;
    const jPct = (J_total / maxJ) * 100;

    jResEl.textContent = 'J = ' + J_total.toFixed(3) + ' kg · m²';

    if (mass <= maxMass && J_total <= maxJ) {
      stResEl.textContent = 'SAFE: Within Rating (Mass: ' + massPct.toFixed(1) + '%, Inertia: ' + jPct.toFixed(1) + '% of Wrist Capacity)';
      stResEl.style.color = '#22543d';
    } else if (mass > maxMass && J_total <= maxJ) {
      stResEl.textContent = 'OVERLOAD: Mass Exceeds ' + maxMass + ' kg Limit (' + massPct.toFixed(1) + '%)';
      stResEl.style.color = '#c53030';
    } else if (mass <= maxMass && J_total > maxJ) {
      stResEl.textContent = 'INERTIA OVERLOAD: Moment of Inertia Exceeds ' + maxJ + ' kg·m² (' + jPct.toFixed(1) + '%) - Reduce Acceleration';
      stResEl.style.color = '#c53030';
    } else {
      stResEl.textContent = 'SEVERE OVERLOAD: Both Mass & Inertia Exceed Limits';
      stResEl.style.color = '#c53030';
    }
  }

  [mEl, cgEl, mmEl, mjEl].forEach(el => el.addEventListener('input', update));
  update();
})();