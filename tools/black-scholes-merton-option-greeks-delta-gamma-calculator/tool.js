(() => {
  'use strict';
  const sEl = document.getElementById('bs-s'), kEl = document.getElementById('bs-k');
  const tEl = document.getElementById('bs-t'), volEl = document.getElementById('bs-vol'), rEl = document.getElementById('bs-r');
  const pResEl = document.getElementById('bs-res-price'), gResEl = document.getElementById('bs-res-greeks');

  // Standard normal cumulative distribution N(x) approximation (Hart formula)
  function CND(x) {
    const a1 = 0.31938153, a2 = -0.356563782, a3 = 1.781477937, a4 = -1.821255978, a5 = 1.330274429;
    const L = Math.abs(x);
    const K = 1.0 / (1.0 + (0.2316419 * L));
    let cnd = 1.0 - (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * L * L) * (a1 * K + a2 * Math.pow(K, 2) + a3 * Math.pow(K, 3) + a4 * Math.pow(K, 4) + a5 * Math.pow(K, 5));
    if (x < 0) cnd = 1.0 - cnd;
    return cnd;
  }

  function PDF(x) {
    return (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
  }

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const T = parseFloat(tEl.value), volPct = parseFloat(volEl.value), rPct = parseFloat(rEl.value);

    if (isNaN(S) || isNaN(K) || isNaN(T) || isNaN(volPct) || isNaN(rPct) || S <= 0 || K <= 0 || T <= 0 || volPct <= 0) return;

    const sigma = volPct / 100;
    const r = rPct / 100;

    // d1 = ( ln(S/K) + (r + sigma^2/2)*T ) / ( sigma * sqrt(T) )
    const sqrtT = Math.sqrt(T);
    const d1 = (Math.log(S / K) + ((r + (Math.pow(sigma, 2) / 2)) * T)) / (sigma * sqrtT);
    const d2 = d1 - (sigma * sqrtT);

    const Nd1 = CND(d1);
    const Nd2 = CND(d2);
    const N_minus_d1 = CND(-d1);
    const N_minus_d2 = CND(-d2);
    const pdf_d1 = PDF(d1);

    // Call = S*N(d1) - K*exp(-r*T)*N(d2)
    const callPrice = (S * Nd1) - (K * Math.exp(-r * T) * Nd2);
    // Put = K*exp(-r*T)*N(-d2) - S*N(-d1)
    const putPrice = (K * Math.exp(-r * T) * N_minus_d2) - (S * N_minus_d1);

    // Greeks:
    const deltaCall = Nd1;
    const deltaPut = Nd1 - 1.0;
    const gamma = pdf_d1 / (S * sigma * sqrtT);
    const vega = (S * sqrtT * pdf_d1) / 100; // per 1% change in vol
    const thetaCallPerDay = (-( (S * pdf_d1 * sigma) / (2 * sqrtT) ) - (r * K * Math.exp(-r * T) * Nd2)) / 365;

    pResEl.textContent = 'Call: $' + callPrice.toFixed(2) + ' | Put: $' + putPrice.toFixed(2);
    gResEl.textContent = 'Δ_call: +' + deltaCall.toFixed(3) + ' (Put Δ: ' + deltaPut.toFixed(3) + ') | Γ: ' + gamma.toFixed(4) + ' | Vega: $' + vega.toFixed(3) + '/% | Θ: -$' + Math.abs(thetaCallPerDay).toFixed(3) + '/day';
  }

  [sEl, kEl, tEl, volEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();