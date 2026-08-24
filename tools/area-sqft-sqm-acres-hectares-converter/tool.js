(() => {
  'use strict';
  const acEl = document.getElementById('ar-acres'), sqftEl = document.getElementById('ar-sqft');
  const sqmEl = document.getElementById('ar-sqm'), haEl = document.getElementById('ar-ha');

  function updateFromAcres(ac) {
    sqftEl.value = (ac * 43560).toFixed(0);
    sqmEl.value = (ac * 4046.856).toFixed(1);
    haEl.value = (ac * 0.404686).toFixed(4);
  }

  acEl.addEventListener('input', () => {
    const v = parseFloat(acEl.value);
    if (!isNaN(v)) updateFromAcres(v);
  });

  sqftEl.addEventListener('input', () => {
    const v = parseFloat(sqftEl.value);
    if (!isNaN(v)) {
      const ac = v / 43560;
      acEl.value = ac.toFixed(4);
      sqmEl.value = (ac * 4046.856).toFixed(1);
      haEl.value = (ac * 0.404686).toFixed(4);
    }
  });

  updateFromAcres(1.0);
})();