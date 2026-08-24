(() => {
  'use strict';
  const sEl = document.getElementById('sol-s'), nEl = document.getElementById('sol-n');
  const dEl = document.getElementById('sol-del'), alEl = document.getElementById('sol-al');
  const kResEl = document.getElementById('sol-res-kstar'), cResEl = document.getElementById('sol-res-cstar');

  function update() {
    const s_pct = parseFloat(sEl.value), n_pct = parseFloat(nEl.value);
    const del_pct = parseFloat(dEl.value), alpha = parseFloat(alEl.value);

    if (isNaN(s_pct) || isNaN(n_pct) || isNaN(del_pct) || isNaN(alpha) || s_pct <= 0 || del_pct <= 0 || alpha <= 0 || alpha >= 1) return;

    const s = s_pct / 100.0;
    const n = n_pct / 100.0;
    const delta = del_pct / 100.0;
    const breakeven = n + delta; // Effective depreciation rate

    // Steady-state capital per worker: s * k^alpha = breakeven * k => k^(1-alpha) = s / breakeven
    // k* = ( s / breakeven )^( 1 / (1 - alpha) )
    const k_star = Math.pow(s / breakeven, 1.0 / (1.0 - alpha));
    const y_star = Math.pow(k_star, alpha);
    const c_star = (1.0 - s) * y_star;

    // Golden Rule savings rate equals capital share alpha (s_gold = alpha)
    const s_gold_pct = alpha * 100.0;

    kResEl.textContent = 'Steady-State k* = ' + k_star.toFixed(2) + ' | Output y* = ' + y_star.toFixed(2);
    cResEl.textContent = 'Consumption c* = ' + c_star.toFixed(2) + ' | Golden Rule Savings s_gold = ' + s_gold_pct.toFixed(1) + '% (' + (s_pct < s_gold_pct ? 'Below Golden Rule' : 'Above Golden Rule') + ')';
  }

  [sEl, nEl, dEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();