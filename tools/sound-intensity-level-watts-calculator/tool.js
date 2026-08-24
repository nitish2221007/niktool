(() => {
  'use strict';
  const wEl = document.getElementById('sil-watts');
  const dbEl = document.getElementById('sil-res-db'), descEl = document.getElementById('sil-res-desc');

  const I0 = 1e-12; // Reference threshold of human hearing (10^-12 W/m^2)

  function update() {
    const I = parseFloat(wEl.value);
    if (isNaN(I) || I <= 0) return;

    // SIL = 10 * log10(I / I0)
    const sil = 10 * Math.log10(I / I0);
    dbEl.textContent = sil.toFixed(1) + ' dB';

    if (sil < 20) descEl.textContent = 'Faint (Whisper / Rustling Leaves)';
    else if (sil < 50) descEl.textContent = 'Quiet (Quiet Library / Bedroom)';
    else if (sil < 70) descEl.textContent = 'Moderate (Normal Conversation)';
    else if (sil < 85) descEl.textContent = 'Loud (Busy Street / Vacuum)';
    else if (sil < 110) descEl.textContent = 'Very Loud (Power Tools / Nightclub - Hearing Risk)';
    else if (sil < 130) descEl.textContent = 'Extremely Dangerous (Rock Concert / Jet Engine)';
    else descEl.textContent = 'Threshold of Pain (Permanent Hearing Damage)';
  }

  wEl.addEventListener('input', update);
  update();
})();