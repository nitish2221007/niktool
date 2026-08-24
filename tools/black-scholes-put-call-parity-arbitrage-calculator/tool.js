(() => {
  'use strict';
  const sEl = document.getElementById('pc-s'), kEl = document.getElementById('pc-k');
  const rEl = document.getElementById('pc-r'), tEl = document.getElementById('pc-t');
  const cEl = document.getElementById('pc-call'), pEl = document.getElementById('pc-put');
  const dfResEl = document.getElementById('pc-res-diff'), arResEl = document.getElementById('pc-res-arb');

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const r_pct = parseFloat(rEl.value), T = parseFloat(tEl.value);
    const C = parseFloat(cEl.value), P = parseFloat(pEl.value);

    if (isNaN(S) || isNaN(K) || isNaN(r_pct) || isNaN(T) || isNaN(C) || isNaN(P) || S <= 0 || K <= 0 || T <= 0) return;

    const r = r_pct / 100.0;
    // Present value of strike K * exp(-r*T)
    const PV_K = K * Math.exp(-r * T);

    // Theoretical Put-Call Parity: C - P = S - PV_K  => P_theory = C - S + PV_K
    const P_theory = C - S + PV_K;
    const C_theory = P + S - PV_K;

    const diff = (C - P) - (S - PV_K);

    let arb = '';
    let color = '#22543d';

    if (Math.abs(diff) < 0.05) {
      arb = 'NO-ARBITRAGE EQUILIBRIUM: Prices conform to parity (Theoretical Put P = $' + P_theory.toFixed(2) + ')';
      color = '#22543d';
    } else if (diff > 0.05) {
      arb = 'CONVERSIONS ARBITRAGE: Call is OVERVALUED relative to Put -> Short Call, Long Put, Buy Stock, Borrow PV(K)';
      color = '#2563eb';
    } else {
      arb = 'REVERSALS ARBITRAGE: Put is OVERVALUED relative to Call -> Long Call, Short Put, Short Stock, Lend PV(K)';
      color = '#2563eb';
    }

    dfResEl.textContent = 'Parity Discrepancy: ' + (diff >= 0 ? '+$' : '-$') + Math.abs(diff).toFixed(2);
    dfResEl.style.color = Math.abs(diff) < 0.05 ? '#22543d' : '#2563eb';
    arResEl.textContent = arb + ' | PV(K) = $' + PV_K.toFixed(2);
    arResEl.style.color = color;
  }

  [sEl, kEl, rEl, tEl, cEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();