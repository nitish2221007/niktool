(() => {
  'use strict';
  const fa0El = document.getElementById('pfr-fa0'), ca0El = document.getElementById('pfr-ca0');
  const xEl = document.getElementById('pfr-x'), kEl = document.getElementById('pfr-k');
  const vResEl = document.getElementById('pfr-res-vol'), cResEl = document.getElementById('pfr-res-cmp');

  function update() {
    const Fa0 = parseFloat(fa0El.value), Ca0 = parseFloat(ca0El.value);
    const X = parseFloat(xEl.value), k = parseFloat(kEl.value);

    if (isNaN(Fa0) || isNaN(Ca0) || isNaN(X) || isNaN(k) || Fa0 <= 0 || Ca0 <= 0 || X <= 0 || X >= 1.0 || k <= 0) return;

    // PFR 1st-order: V_pfr = (Fa0 / (k * Ca0)) * ln( 1 / (1 - X) )
    const V_pfr = (Fa0 / (k * Ca0)) * Math.log(1 / (1 - X));

    // CSTR for same conversion: V_cstr = (Fa0 * X) / (k * Ca0 * (1 - X))
    const V_cstr = (Fa0 * X) / (k * Ca0 * (1 - X));
    const savingsPct = ((V_cstr - V_pfr) / V_cstr) * 100;

    const Q = Fa0 / Ca0;
    const tau_pfr = V_pfr / Q;

    vResEl.textContent = V_pfr.toFixed(1) + ' Liters (PFR Space Time τ = ' + tau_pfr.toFixed(1) + ' s)';
    cResEl.textContent = savingsPct.toFixed(1) + '% Volume Savings vs CSTR (PFR: ' + V_pfr.toFixed(1) + ' L vs CSTR: ' + V_cstr.toFixed(1) + ' L @ ' + (X*100) + '% Conv)';
  }

  [fa0El, ca0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();