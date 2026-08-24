(() => {
  'use strict';
  const r1El = document.getElementById('be-r1'), r2El = document.getElementById('be-r2');
  const rbEl = document.getElementById('be-rb'), muEl = document.getElementById('be-mu');
  const dvResEl = document.getElementById('be-res-dv'), cpResEl = document.getElementById('be-res-comp');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    const rb = parseFloat(rbEl.value), mu = parseFloat(muEl.value);

    if (isNaN(r1) || isNaN(r2) || isNaN(rb) || isNaN(mu) || r1 <= 0 || r2 <= 0 || rb <= r2 || mu <= 0) return;

    const v_circ_1 = Math.sqrt(mu / r1);
    const v_circ_2 = Math.sqrt(mu / r2);
    const a1 = (r1 + rb) / 2.0;
    const v_1a = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a1)));
    const v_1b = Math.sqrt(mu * ((2.0 / rb) - (1.0 / a1)));
    const delta_v1 = v_1a - v_circ_1;
    const a2 = (r2 + rb) / 2.0;
    const v_2b = Math.sqrt(mu * ((2.0 / rb) - (1.0 / a2)));
    const v_2r2 = Math.sqrt(mu * ((2.0 / r2) - (1.0 / a2)));
    const delta_v2 = Math.abs(v_2b - v_1b);
    const delta_v3 = Math.abs(v_circ_2 - v_2r2);
    const bi_elliptic_dv = delta_v1 + delta_v2 + delta_v3;

    const a_hoh = (r1 + r2) / 2.0;
    const hoh_v1 = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a_hoh))) - v_circ_1;
    const hoh_v2 = v_circ_2 - Math.sqrt(mu * ((2.0 / r2) - (1.0 / a_hoh)));
    const hohmann_dv = hoh_v1 + hoh_v2;
    const ratio = r2 / r1;
    const diff_mps = (hohmann_dv - bi_elliptic_dv) * 100.0;

    let qual = '', color = '#22543d';
    if (diff_mps > 0) {
      qual = 'BI-ELLIPTIC IS MORE EFFICIENT (Saves ' + Math.round(diff_mps) + ' m/s over Hohmann ✓)';
      color = '#22543d';
    } else {
      qual = 'HOHMANN IS MORE EFFICIENT (Hohmann saves ' + Math.round(-diff_mps) + ' m/s)';
      color = '#ea580c';
    }

    dvResEl.textContent = 'Bi-Elliptic Δv = ' + bi_elliptic_dv.toFixed(3) + ' km / s';
    dvResEl.style.color = color;
    cpResEl.textContent = 'Hohmann Δv = ' + hohmann_dv.toFixed(3) + ' km/s | ' + qual + ' (r₂/r₁ = ' + ratio.toFixed(2) + ' @ r_b = ' + rb.toLocaleString() + ' km)';
  }

  [r1El, r2El, rbEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();