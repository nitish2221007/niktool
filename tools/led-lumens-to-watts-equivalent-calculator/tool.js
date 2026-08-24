(() => {
  'use strict';
  const lEl = document.getElementById('led-lumens');
  const ledEl = document.getElementById('led-res-led'), incEl = document.getElementById('led-res-inc'), cflEl = document.getElementById('led-res-cfl');

  function update() {
    const lumens = parseFloat(lEl.value);
    if (isNaN(lumens) || lumens <= 0) return;

    // Luminous Efficacy:
    // LED: ~90 lm/W
    // CFL: ~60 lm/W
    // Incandescent: ~14 lm/W
    const wattsLed = Math.round(lumens / 90);
    const wattsCfl = Math.round(lumens / 60);
    const wattsInc = Math.round(lumens / 14);

    ledEl.textContent = Math.max(1, wattsLed) + ' Watts LED';
    cflEl.textContent = Math.max(2, wattsCfl) + ' Watts CFL';
    incEl.textContent = Math.max(5, wattsInc) + ' Watts Incandescent';
  }

  lEl.addEventListener('input', update);
  update();
})();