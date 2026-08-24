(() => {
  'use strict';
  const tg1El = document.getElementById('fox-tg1'), w1El = document.getElementById('fox-w1'), tg2El = document.getElementById('fox-tg2');
  const cResEl = document.getElementById('fox-res-c'), sResEl = document.getElementById('fox-res-state');

  function update() {
    const tg1C = parseFloat(tg1El.value), w1 = parseFloat(w1El.value), tg2C = parseFloat(tg2El.value);
    if (isNaN(tg1C) || isNaN(w1) || isNaN(tg2C) || w1 <= 0 || w1 >= 1) return;

    const w2 = 1.0 - w1;
    const tg1K = tg1C + 273.15;
    const tg2K = tg2C + 273.15;

    if (tg1K <= 0 || tg2K <= 0) return;

    // Fox Equation: 1 / Tg = (w1 / Tg1) + (w2 / Tg2)
    const invTg = (w1 / tg1K) + (w2 / tg2K);
    const tgBlendK = 1 / invTg;
    const tgBlendC = tgBlendK - 273.15;

    cResEl.textContent = tgBlendC.toFixed(1) + ' °C (' + tgBlendK.toFixed(1) + ' K)';

    if (tgBlendC > 40) {
      sResEl.textContent = 'Rigid Glassy Thermoplastic (T_g > Room Temp)';
      sResEl.style.color = '#22543d';
    } else if (tgBlendC >= 15 && tgBlendC <= 40) {
      sResEl.textContent = 'Leathery / Semi-Rigid Transition Zone';
      sResEl.style.color = '#2563eb';
    } else {
      sResEl.textContent = 'Rubbery / Highly Flexible Elastomer (T_g < Room Temp)';
      sResEl.style.color = '#d97706';
    }
  }

  [tg1El, w1El, tg2El].forEach(el => el.addEventListener('input', update));
  update();
})();