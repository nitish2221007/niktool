(() => {
  'use strict';
  const molEl = document.getElementById('mol-moles'), kgEl = document.getElementById('mol-kg');
  const resEl = document.getElementById('mol-res-val');

  function update() {
    const moles = parseFloat(molEl.value), kg = parseFloat(kgEl.value);
    if (isNaN(moles) || isNaN(kg) || moles <= 0 || kg <= 0) return;

    const m = moles / kg;
    resEl.textContent = m.toFixed(3) + ' mol/kg (m)';
  }

  molEl.addEventListener('input', update);
  kgEl.addEventListener('input', update);
  update();
})();