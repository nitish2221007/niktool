(() => {
  'use strict';
  const rEl = document.getElementById('cor-r'), dEl = document.getElementById('cor-d');
  const mEl = document.getElementById('cor-m0'), deltaEl = document.getElementById('cor-delta');
  const evResEl = document.getElementById('cor-res-ev'), vdResEl = document.getElementById('cor-res-vd');

  const g0_kv_cm = 21.2; // kV_rms / cm (30 kV_peak / cm breakdown strength of clean air)

  function update() {
    const r_cm = parseFloat(rEl.value), D_m = parseFloat(dEl.value);
    const m0 = parseFloat(mEl.value), delta = parseFloat(deltaEl.value);

    if (isNaN(r_cm) || isNaN(D_m) || isNaN(m0) || isNaN(delta) || r_cm <= 0 || D_m <= 0 || m0 <= 0 || delta <= 0) return;

    const D_cm = D_m * 100.0;

    // Peek's formula for visual critical electric field:
    // E_v = m0 * g0 * delta * ( 1 + 0.301 / sqrt(delta * r_cm) )  [kV_rms / cm]
    const E_v = m0 * g0_kv_cm * delta * (1.0 + (0.301 / Math.sqrt(delta * r_cm)));

    // Critical disruptive voltage (line to neutral rms):
    // V_d = m0 * g0 * delta * r_cm * ln( D_cm / r_cm )  [kV_rms]
    const V_d_ln = m0 * g0_kv_cm * delta * r_cm * Math.log(D_cm / r_cm);
    const V_LL_d = V_d_ln * Math.sqrt(3.0); // Line-to-line rms

    evResEl.textContent = 'E_v = ' + E_v.toFixed(1) + ' kV / cm Inception Field';
    vdResEl.textContent = 'Critical Disruptive V_LL = ' + V_LL_d.toFixed(1) + ' kV RMS (Line-to-Ground: ' + V_d_ln.toFixed(1) + ' kV @ Spacing D = ' + D_m + ' m)';
  }

  [rEl, dEl, mEl, deltaEl].forEach(el => el.addEventListener('input', update));
  update();
})();