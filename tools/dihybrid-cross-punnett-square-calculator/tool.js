(() => {
  'use strict';
  const p1El = document.getElementById('ps-p1'), p2El = document.getElementById('ps-p2');
  const ratResEl = document.getElementById('ps-res-ratio'), domResEl = document.getElementById('ps-res-domdom');

  function update() {
    const p1 = p1El.value, p2 = p2El.value;

    if (p1 === 'AaBb' && p2 === 'AaBb') {
      ratResEl.textContent = '9 : 3 : 3 : 1';
      domResEl.textContent = '56.25% (9/16) Dominant / Dominant';
    } else if ((p1 === 'AaBb' && p2 === 'aabb') || (p1 === 'aabb' && p2 === 'AaBb')) {
      ratResEl.textContent = '1 : 1 : 1 : 1 (Test Cross)';
      domResEl.textContent = '25.0% (1/4) Dominant / Dominant';
    } else {
      ratResEl.textContent = '100% Dominant (16/16)';
      domResEl.textContent = '100% Phenotypic Dominance';
    }
  }

  p1El.addEventListener('change', update);
  p2El.addEventListener('change', update);
  update();
})();