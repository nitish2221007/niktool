(() => {
  'use strict';
  const lEl = document.getElementById('mei-l'), iEl = document.getElementById('mei-i');
  const eResEl = document.getElementById('mei-res-energy'), fResEl = document.getElementById('mei-res-flux');

  function update() {
    const lMh = parseFloat(lEl.value), I = parseFloat(iEl.value);
    if (isNaN(lMh) || isNaN(I) || lMh <= 0 || I <= 0) return;

    const L = lMh * 1e-3;
    // Energy E = 0.5 * L * I^2 (Joules)
    const energy = 0.5 * L * Math.pow(I, 2);
    const energyMj = energy * 1000;
    const fluxLinkage = L * I;

    eResEl.textContent = energy >= 1.0 ? energy.toFixed(3) + ' Joules' : energyMj.toFixed(1) + ' mJ (' + energy.toFixed(4) + ' J)';
    fResEl.textContent = fluxLinkage.toFixed(3) + ' Wb-turns';
  }

  lEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();