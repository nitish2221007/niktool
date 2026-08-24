(() => {
  'use strict';
  const sEl = document.getElementById('bs-s'), kEl = document.getElementById('bs-k');
  const tEl = document.getElementById('bs-t'), volEl = document.getElementById('bs-vol'), rEl = document.getElementById('bs-r');
  const cResEl = document.getElementById('bs-res-call'), pResEl = document.getElementById('bs-res-put');

  // Standard Normal Cumulative Distribution Function N(x) approximation
  function stdNormCdf(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x) / Math.SQRT2;
    const t = 1.0 / (1.0 + p * absX);
    const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
    return 0.5 * (1.0 + sign * erf);
  }

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const T = parseFloat(tEl.value), volPct = parseFloat(volEl.value), rPct = parseFloat(rEl.value);

    if (isNaN(S) || isNaN(K) || isNaN(T) || isNaN(volPct) || isNaN(rPct) || S <= 0 || K <= 0 || T <= 0 || volPct <= 0) return;

    const sigma = volPct / 100;
    const r = rPct / 100;

    // d1 = ( ln(S/K) + (r + sigma^2 / 2) * T ) / ( sigma * sqrt(T) )
    const d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * T) / (sigma * Math.sqrt(T));
    // d2 = d1 - sigma * sqrt(T)
    const d2 = d1 - (sigma * Math.sqrt(T));

    const Nd1 = stdNormCdf(d1);
    const Nd2 = stdNormCdf(d2);
    const N_minus_d1 = stdNormCdf(-d1);
    const N_minus_d2 = stdNormCdf(-d2);

    // Call = S * Nd1 - K * exp(-r*T) * Nd2
    const callPrice = (S * Nd1) - (K * Math.exp(-r * T) * Nd2);
    // Put = K * exp(-r*T) * N(-d2) - S * N(-d1)
    const putPrice = (K * Math.exp(-r * T) * N_minus_d2) - (S * N_minus_d1);

    cResEl.textContent = '$' + callPrice.toFixed(2) + ' Call (Delta = ' + Nd1.toFixed(3) + ')';
    pResEl.textContent = '$' + putPrice.toFixed(2) + ' Put (Delta = ' + (Nd1 - 1).toFixed(3) + ')';
  }

  [sEl, kEl, tEl, volEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();