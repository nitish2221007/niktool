(() => {
  'use strict';
  const lEl = document.getElementById('wh-l'), vEl = document.getElementById('wh-v');
  const cEl = document.getElementById('wh-c'), rhoEl = document.getElementById('wh-rho');
  const dpResEl = document.getElementById('wh-res-dp'), tcrResEl = document.getElementById('wh-res-tcr');

  const g = 9.80665;

  function update() {
    const L = parseFloat(lEl.value), v = parseFloat(vEl.value);
    const c = parseFloat(cEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(L) || isNaN(v) || isNaN(c) || isNaN(rho) || L <= 0 || v <= 0 || c <= 0 || rho <= 0) return;

    // Joukowsky Equation: deltaP = rho * c * delta_v  [Pascals]
    const deltaP_Pa = rho * c * v;
    const deltaP_bar = deltaP_Pa / 1e5;
    const deltaP_MPa = deltaP_Pa / 1e6;

    // Pressure head rise: deltaH = deltaP / (rho * g) = (c * v) / g  [meters]
    const deltaH_m = (c * v) / g;

    // Critical round-trip time: t_cr = 2 * L / c  [seconds]
    const t_cr = (2.0 * L) / c;

    dpResEl.textContent = 'Surge ΔP = ' + deltaP_bar.toFixed(2) + ' bar (' + deltaP_MPa.toFixed(2) + ' MPa / ' + deltaH_m.toFixed(1) + ' m Head)';
    tcrResEl.textContent = 'Critical Valve Time t_cr = ' + t_cr.toFixed(2) + ' s (Closing in less than ' + t_cr.toFixed(2) + ' s causes full 24 bar shock @ L = ' + L + ' m)';
  }

  [lEl, vEl, cEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();