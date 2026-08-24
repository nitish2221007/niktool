(() => {
  'use strict';
  const p0El = document.getElementById('tc-p0'), atEl = document.getElementById('tc-at');
  const cfEl = document.getElementById('tc-cf'), mdEl = document.getElementById('tc-mdot');
  const fResEl = document.getElementById('tc-res-f'), spResEl = document.getElementById('tc-res-isp');

  const g0 = 9.80665;

  function update() {
    const p0_bar = parseFloat(p0El.value), At_cm2 = parseFloat(atEl.value);
    const C_F = parseFloat(cfEl.value), mdot_kg_s = parseFloat(mdEl.value);

    if (isNaN(p0_bar) || isNaN(At_cm2) || isNaN(C_F) || isNaN(mdot_kg_s) || p0_bar <= 0 || At_cm2 <= 0 || C_F <= 0 || mdot_kg_s <= 0) return;

    const p0_Pa = p0_bar * 1e5;
    const At_m2 = At_cm2 * 1e-4;
    const F_N = C_F * p0_Pa * At_m2;
    const F_kN = F_N / 1000.0;
    const F_lbf = F_N * 0.224809;
    const c_mps = F_N / mdot_kg_s;
    const Isp_s = c_mps / g0;
    const c_star_mps = (p0_Pa * At_m2) / mdot_kg_s;

    fResEl.textContent = 'Thrust F = ' + F_kN.toFixed(1) + ' kN (' + Math.round(F_lbf).toLocaleString() + ' lbf)';
    spResEl.textContent = 'Specific Impulse I_sp = ' + Isp_s.toFixed(1) + ' s | Exhaust c = ' + Math.round(c_mps) + ' m/s | c* = ' + Math.round(c_star_mps) + ' m/s (C_F=' + C_F + ')';
  }

  [p0El, atEl, cfEl, mdEl].forEach(el => el.addEventListener('input', update));
  update();
})();