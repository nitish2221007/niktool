(() => {
  'use strict';
  const ordEl = document.getElementById('rk-ord'), kEl = document.getElementById('rk-k');
  const a0El = document.getElementById('rk-a0'), tEl = document.getElementById('rk-t');
  const t12ResEl = document.getElementById('rk-res-t12'), atResEl = document.getElementById('rk-res-at');

  function update() {
    const order = parseInt(ordEl.value, 10);
    const k = parseFloat(kEl.value), A0 = parseFloat(a0El.value), t = parseFloat(tEl.value);

    if (isNaN(k) || isNaN(A0) || isNaN(t) || k <= 0 || A0 <= 0 || t < 0) return;

    let t_half = 0, At = 0, formulaDesc = '';

    if (order === 1) {
      // 1st order: t_1/2 = ln(2) / k, [A]_t = [A]_0 * exp(-k*t)
      t_half = Math.LN2 / k;
      At = A0 * Math.exp(-k * t);
      formulaDesc = '1st Order: [A]_t = [A]₀·e^(-kt)';
    } else if (order === 2) {
      // 2nd order: t_1/2 = 1 / (k * [A]_0), 1/[A]_t = 1/[A]_0 + k*t
      t_half = 1.0 / (k * A0);
      At = 1.0 / ((1.0 / A0) + (k * t));
      formulaDesc = '2nd Order: 1/[A]_t = 1/[A]₀ + kt';
    } else if (order === 0) {
      // Zero order: t_1/2 = [A]_0 / (2*k), [A]_t = [A]_0 - k*t
      t_half = A0 / (2.0 * k);
      At = Math.max(0, A0 - (k * t));
      formulaDesc = 'Zero Order: [A]_t = [A]₀ - kt';
    }

    const pctRemaining = (At / A0) * 100.0;

    t12ResEl.textContent = 'Half-Life t_½ = ' + t_half.toFixed(2) + ' s';
    atResEl.textContent = 'Remaining [A]_t = ' + At.toFixed(3) + ' M (' + pctRemaining.toFixed(1) + '% remaining | ' + formulaDesc + ')';
  }

  [ordEl, kEl, a0El, tEl].forEach(el => el.addEventListener('input', update));
  ordEl.addEventListener('change', update);
  update();
})();