(() => {
  'use strict';
  const rEl = document.getElementById('dep-r'), cmEl = document.getElementById('dep-cm'), grEl = document.getElementById('dep-grad');
  const fResEl = document.getElementById('dep-res-f'), dResEl = document.getElementById('dep-res-dir');

  const eps0 = 8.854187817e-12; // F / m
  const eps_r_water = 78.5; // aqueous medium relative permittivity

  function update() {
    const rUm = parseFloat(rEl.value), ReK = parseFloat(cmEl.value), gradE2 = parseFloat(grEl.value);
    if (isNaN(rUm) || isNaN(ReK) || isNaN(gradE2) || rUm <= 0 || gradE2 <= 0) return;

    const rM = rUm * 1e-6;
    const eps_m = eps_r_water * eps0;

    // F_DEP = 2 * pi * eps_m * r^3 * Re[K] * grad(|E|^2)  [Newtons]
    const F_dep_N = 2 * Math.PI * eps_m * Math.pow(rM, 3) * ReK * gradE2;
    const F_dep_pN = F_dep_N * 1e12; // Newtons to piconewtons

    let dirText = '';
    let color = '#22543d';

    if (ReK > 0) {
      dirText = 'POSITIVE pDEP (Re[K] > 0): Cells pulled toward microelectrode edges (High Electric Field Gradients)';
      color = '#22543d';
    } else if (ReK < 0) {
      dirText = 'NEGATIVE nDEP (Re[K] < 0): Cells repelled away from electrodes toward channel center field nulls';
      color = '#2563eb';
    } else {
      dirText = 'CROSSOVER FREQUENCY (Re[K] = 0): Zero DEP net force on cell';
      color = '#d97706';
    }

    fResEl.textContent = 'F_DEP = ' + (F_dep_pN >= 0 ? '+' : '') + Math.round(F_dep_pN).toLocaleString() + ' pN (' + (F_dep_pN > 0 ? 'Attraction' : 'Repulsion') + ')';
    dResEl.textContent = dirText;
    dResEl.style.color = color;
  }

  [rEl, cmEl, grEl].forEach(el => el.addEventListener('input', update));
  update();
})();