(() => {
  'use strict';
  const vmEl = document.getElementById('lb-vmax'), kmEl = document.getElementById('lb-km');
  const slEl = document.getElementById('lb-res-slope'), yEl = document.getElementById('lb-res-yint'), xEl = document.getElementById('lb-res-xint');

  function update() {
    const Vmax = parseFloat(vmEl.value), Km = parseFloat(kmEl.value);
    if (isNaN(Vmax) || isNaN(Km) || Vmax <= 0 || Km <= 0) return;

    // 1/v = (Km/Vmax) * (1/[S]) + (1/Vmax)
    const slope = Km / Vmax;
    const yInt = 1 / Vmax;
    const xInt = -1 / Km;

    slEl.textContent = 'Slope = ' + slope.toFixed(4);
    yEl.textContent = 'y-int = ' + yInt.toFixed(4) + ' (1/V_max)';
    xEl.textContent = xInt.toFixed(4) + ' mM⁻¹ (-1/K_m)';
  }

  vmEl.addEventListener('input', update);
  kmEl.addEventListener('input', update);
  update();
})();