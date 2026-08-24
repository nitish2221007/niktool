(() => {
  'use strict';
  const reEl = document.getElementById('sh-re'), scEl = document.getElementById('sh-sc');
  const daEl = document.getElementById('sh-dab'), dEl = document.getElementById('sh-d');
  const shResEl = document.getElementById('sh-res-sh'), kcResEl = document.getElementById('sh-res-kc');

  function update() {
    const Re = parseFloat(reEl.value), Sc = parseFloat(scEl.value);
    const Dab = parseFloat(daEl.value), D = parseFloat(dEl.value);

    if (isNaN(Re) || isNaN(Sc) || isNaN(Dab) || isNaN(D) || Re <= 0 || Sc <= 0 || Dab <= 0 || D <= 0) return;

    // Gilliland-Sherwood correlation: Sh = 0.023 * (Re^0.83) * (Sc^0.33)
    const Sh = 0.023 * Math.pow(Re, 0.83) * Math.pow(Sc, 0.33);

    // Mass transfer coefficient: k_c = Sh * Dab / D  [m / s]
    const k_c = (Sh * Dab) / D;

    shResEl.textContent = 'Sherwood Sh = ' + Math.round(Sh).toLocaleString();
    kcResEl.textContent = 'Mass Transfer k_c = ' + k_c.toExponential(2) + ' m/s (' + (k_c * 3600).toFixed(3) + ' m/hr @ D=' + (D*1000) + ' mm)';
  }

  [reEl, scEl, daEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();