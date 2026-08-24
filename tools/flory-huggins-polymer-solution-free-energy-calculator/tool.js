(() => {
  'use strict';
  const phiEl = document.getElementById('fh-phi'), nEl = document.getElementById('fh-n'), chiEl = document.getElementById('fh-chi');
  const dgResEl = document.getElementById('fh-res-dg'), crResEl = document.getElementById('fh-res-crit');

  function update() {
    const phi2 = parseFloat(phiEl.value), N = parseFloat(nEl.value), chi = parseFloat(chiEl.value);
    if (isNaN(phi2) || isNaN(N) || isNaN(chi) || phi2 <= 0 || phi2 >= 1.0 || N <= 1) return;

    const phi1 = 1.0 - phi2;

    // Flory-Huggins lattice model:
    // delta_G_m / (N_sites * R * T) = phi1 * ln(phi1) + (phi2 / N) * ln(phi2) + chi * phi1 * phi2
    const termEntropy = (phi1 * Math.log(phi1)) + ((phi2 / N) * Math.log(phi2));
    const termEnthalpy = chi * phi1 * phi2;
    const deltaG = termEntropy + termEnthalpy;

    // Critical Flory parameter chi_crit = 0.5 * ( 1 + 1/sqrt(N) )^2
    const chiCrit = 0.5 * Math.pow(1 + (1 / Math.sqrt(N)), 2);

    let miscible = '';
    let color = '#22543d';

    if (chi < chiCrit) {
      miscible = 'χ = ' + chi.toFixed(2) + ' < χ_crit (' + chiCrit.toFixed(3) + '): HOMOGENEOUS MISCIBLE SOLUTION';
      color = '#22543d';
    } else {
      miscible = 'χ = ' + chi.toFixed(2) + ' > χ_crit (' + chiCrit.toFixed(3) + '): PHASE SEPARATION (Cloud Point Demixing)';
      color = '#c53030';
    }

    dgResEl.textContent = 'ΔG_m / RT = ' + deltaG.toFixed(4) + ' (Entropy: ' + termEntropy.toFixed(4) + ', Enthalpy: +' + termEnthalpy.toFixed(4) + ')';
    crResEl.textContent = miscible;
    crResEl.style.color = color;
  }

  [phiEl, nEl, chiEl].forEach(el => el.addEventListener('input', update));
  update();
})();