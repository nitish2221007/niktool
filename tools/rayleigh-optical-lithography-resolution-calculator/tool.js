(() => {
  'use strict';
  const lamEl = document.getElementById('lit-lambda'), naEl = document.getElementById('lit-na'), k1El = document.getElementById('lit-k1');
  const cdResEl = document.getElementById('lit-res-cd'), dofResEl = document.getElementById('lit-res-dof');

  function update() {
    const lambda = parseFloat(lamEl.value), NA = parseFloat(naEl.value), k1 = parseFloat(k1El.value);
    if (isNaN(lambda) || isNaN(NA) || isNaN(k1) || lambda <= 0 || NA <= 0 || k1 <= 0) return;

    // CD = k1 * lambda / NA  [nm]
    const CD = (k1 * lambda) / NA;

    // DOF = k2 * lambda / NA^2 where assume k2 = 0.50
    const k2 = 0.50;
    const DOF = (k2 * lambda) / Math.pow(NA, 2);

    cdResEl.textContent = 'CD = ' + CD.toFixed(2) + ' nm Minimum Feature';
    dofResEl.textContent = 'Depth of Focus DOF = ' + DOF.toFixed(1) + ' nm (k₁ = ' + k1.toFixed(2) + ', NA = ' + NA.toFixed(2) + ')';
  }

  lamEl.addEventListener('change', () => {
    if (lamEl.value === '13.5') naEl.value = '0.55';
    else if (lamEl.value === '193.0') naEl.value = '1.35';
    else naEl.value = '0.85';
    update();
  });
  naEl.addEventListener('input', update);
  k1El.addEventListener('input', update);
  update();
})();