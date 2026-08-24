(() => {
  'use strict';
  const moxEl = document.getElementById('pb-mox'), rhooxEl = document.getElementById('pb-rhoox');
  const mmEl = document.getElementById('pb-mm'), rhomEl = document.getElementById('pb-rhom'), nEl = document.getElementById('pb-n');
  const pbrResEl = document.getElementById('pb-res-pbr'), evResEl = document.getElementById('pb-res-eval');

  function update() {
    const M_ox = parseFloat(moxEl.value), rho_ox = parseFloat(rhooxEl.value);
    const M_m = parseFloat(mmEl.value), rho_m = parseFloat(rhomEl.value), n = parseFloat(nEl.value);

    if (isNaN(M_ox) || isNaN(rho_ox) || isNaN(M_m) || isNaN(rho_m) || isNaN(n) || M_ox <= 0 || rho_ox <= 0 || M_m <= 0 || rho_m <= 0 || n <= 0) return;

    // PBR = ( M_ox * rho_m ) / ( n * M_m * rho_ox )
    const PBR = (M_ox * rho_m) / (n * M_m * rho_ox);

    let status = '', color = '#22543d';
    if (PBR >= 1.0 && PBR <= 2.0) {
      status = 'PROTECTIVE PASSIVATING FILM (1.0 ≤ PBR ≤ 2.0: Continuous, protective, adherent oxide)';
      color = '#22543d';
    } else if (PBR < 1.0) {
      status = 'POROUS / NON-PROTECTIVE (PBR < 1.0: Oxide volume insufficient, tensile cracks allow rapid oxidation, e.g. Mg, Na)';
      color = '#c53030';
    } else {
      status = 'COMPRESSIVE SPALLING / BUCKLING (PBR > 2.0: High compressive stresses cause oxide scale flaking, e.g. Fe, Cr)';
      color = '#ea580c';
    }

    pbrResEl.textContent = 'PBR = ' + PBR.toFixed(3);
    pbrResEl.style.color = color;
    evResEl.textContent = status;
    evResEl.style.color = color;
  }

  [moxEl, rhooxEl, mmEl, rhomEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();