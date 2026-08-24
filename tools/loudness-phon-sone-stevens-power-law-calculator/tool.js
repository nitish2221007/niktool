(() => {
  'use strict';
  const phEl = document.getElementById('ph-val');
  const sResEl = document.getElementById('ph-res-sone'), cResEl = document.getElementById('ph-res-comp');

  function update() {
    const phons = parseFloat(phEl.value);
    if (isNaN(phons) || phons < 0) return;

    // Sones = 2^( (Phons - 40) / 10 )
    let sones = 0;
    if (phons >= 40) {
      sones = Math.pow(2, (phons - 40) / 10);
    } else {
      // Sub-40 phon threshold power approximation: sones = (phons / 40)^2.642
      sones = Math.pow(phons / 40, 2.642);
    }

    sResEl.textContent = sones.toFixed(2) + ' Sones (Linear Loudness)';
    cResEl.textContent = sones.toFixed(2) + '× Perceived Subjective Loudness compared to 1.0 Sone (40 Phon Reference)';
  }

  phEl.addEventListener('input', update);
  update();
})();