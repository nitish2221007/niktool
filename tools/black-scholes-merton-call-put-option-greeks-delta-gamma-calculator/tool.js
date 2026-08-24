(() => {
  'use strict';
  const sEl = document.getElementById('gk-s'), kEl = document.getElementById('gk-k');
  const volEl = document.getElementById('gk-vol'), dEl = document.getElementById('gk-days'), rEl = document.getElementById('gk-r');
  const dlResEl = document.getElementById('gk-res-delta'), otResEl = document.getElementById('gk-res-other');

  function stdNormCdf(x) {
    return 0.5 * (1.0 + Math.sign(x) * Math.sqrt(1.0 - Math.exp(-2.0 * Math.pow(x, 2) / Math.PI)));
  }

  function stdNormPdf(x) {
    return (1.0 / Math.sqrt(2.0 * Math.PI)) * Math.exp(-0.5 * Math.pow(x, 2));
  }

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const sigma = parseFloat(volEl.value) / 100.0;
    const T = parseFloat(dEl.value) / 365.25;
    const r = parseFloat(rEl.value) / 100.0;

    if (isNaN(S) || isNaN(K) || isNaN(sigma) || isNaN(T) || isNaN(r) || S <= 0 || K <= 0 || sigma <= 0 || T <= 0) return;

    const d1 = (Math.log(S / K) + (r + 0.5 * Math.pow(sigma, 2)) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - (sigma * Math.sqrt(T));

    const N_d1 = stdNormCdf(d1);
    const N_prime_d1 = stdNormPdf(d1);

    // Call Delta = N(d1), Put Delta = N(d1) - 1
    const call_delta = N_d1;
    const put_delta = N_d1 - 1.0;

    // Gamma = N'(d1) / (S * sigma * sqrt(T))
    const gamma = N_prime_d1 / (S * sigma * Math.sqrt(T));

    // Vega = S * N'(d1) * sqrt(T) / 100  [per 1% vol change]
    const vega_1pct = (S * N_prime_d1 * Math.sqrt(T)) / 100.0;

    // Theta (Call) per calendar day:
    const theta_call_annual = -( (S * N_prime_d1 * sigma) / (2.0 * Math.sqrt(T)) ) - ( r * K * Math.exp(-r * T) * stdNormCdf(d2) );
    const theta_call_day = theta_call_annual / 365.25;

    dlResEl.textContent = 'Call Delta Δ = +' + call_delta.toFixed(2) + ' | Put Delta Δ = ' + put_delta.toFixed(2);
    otResEl.textContent = 'Gamma Γ = ' + gamma.toFixed(3) + ' | Theta Θ = $' + theta_call_day.toFixed(3) + '/day | Vega ν = $' + vega_1pct.toFixed(3) + '/% vol';
  }

  [sEl, kEl, volEl, dEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();