(() => {
  'use strict';
  const phEl = document.getElementById('ph-val');
  const sResEl = document.getElementById('ph-res-sone'), dResEl = document.getElementById('ph-res-desc');

  function update() {
    const phons = parseFloat(phEl.value);
    if (isNaN(phons) || phons < 0) return;

    // Sones = 2^( (Phons - 40) / 10 )
    const sones = Math.pow(2, (phons - 40) / 10);

    sResEl.textContent = sones >= 1.0 ? sones.toFixed(2) + ' Sones' : sones.toFixed(3) + ' Sones';
    dResEl.textContent = (sones).toFixed(1) + 'x as loud as reference 40 Phons (1 kHz @ 40 dB SPL)';
  }

  phEl.addEventListener('input', update);
  update();
})();