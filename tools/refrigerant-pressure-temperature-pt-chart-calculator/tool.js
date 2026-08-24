(() => {
  'use strict';
  const rEl = document.getElementById('pt-ref'), tEl = document.getElementById('pt-temp');
  const pResEl = document.getElementById('pt-res-psig'), aResEl = document.getElementById('pt-res-psia');

  // Antoine saturation vapor pressure fit: ln(P_psia) = A - B / (T_F + C)
  const COEFFS = {
    'R410A': { A: 10.35, B: 3450, C: 430 },
    'R134a': { A: 9.85, B: 3520, C: 410 },
    'R32':   { A: 10.42, B: 3500, C: 435 },
    'R404A': { A: 10.20, B: 3380, C: 425 }
  };

  function update() {
    const ref = rEl.value, tF = parseFloat(tEl.value);
    if (isNaN(tF)) return;

    const c = COEFFS[ref];
    const lnP = c.A - (c.B / (tF + c.C));
    const psia = Math.exp(lnP);
    const psig = psia - 14.696;
    const barGauge = psig * 0.0689476;

    pResEl.textContent = (psig >= 0 ? psig.toFixed(1) + ' psig' : (psig * 2.036).toFixed(1) + ' in.Hg vacuum') + ' (' + (barGauge).toFixed(2) + ' bar)';
    aResEl.textContent = psia.toFixed(1) + ' psia (' + (psia * 6.89476).toFixed(1) + ' kPa abs)';
  }

  rEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();