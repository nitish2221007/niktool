(() => {
  'use strict';
  const rEl = document.getElementById('qk-r'), aEl = document.getElementById('qk-a');
  const btEl = document.getElementById('qk-bt'), ipEl = document.getElementById('qk-ip'), kpEl = document.getElementById('qk-kap');
  const qResEl = document.getElementById('qk-res-q'), evResEl = document.getElementById('qk-res-eval');

  const mu_0 = 4.0 * Math.PI * 1e-7;

  function update() {
    const R = parseFloat(rEl.value), a = parseFloat(aEl.value);
    const B_T = parseFloat(btEl.value), I_p_MA = parseFloat(ipEl.value), kappa = parseFloat(kpEl.value);

    if (isNaN(R) || isNaN(a) || isNaN(B_T) || isNaN(I_p_MA) || isNaN(kappa) || R <= a || a <= 0 || B_T <= 0 || I_p_MA <= 0 || kappa <= 0) return;

    const I_p = I_p_MA * 1e6; // Amperes

    // Cylindrical / Shaped safety factor formula (Wesson standard):
    // q_cyl = ( 5 * a^2 * B_T ) / ( R * I_p_MA ) * ( (1 + kappa^2) / 2 )
    const shaping_factor = (1.0 + Math.pow(kappa, 2)) / 2.0;
    const q_edge = ((5.0 * Math.pow(a, 2) * B_T) / (R * I_p_MA)) * shaping_factor;

    const aspect_ratio = R / a;

    let status = '', color = '#22543d';
    if (q_edge >= 3.0) {
      status = 'MHD STABLE BASELINE (q_95 ≥ 3.0: Protected against m=2/n=1 external kink disruptions ✓)';
      color = '#22543d';
    } else if (q_edge >= 2.0) {
      status = 'MARGINAL STABILITY (2.0 ≤ q < 3.0: High current operation, disruption risk)';
      color = '#ea580c';
    } else {
      status = 'UNSTABLE: VIOLATES KRUSKAL-SHAFRANOV LIMIT (q < 2.0: Catastrophic major disruption ✗)';
      color = '#c53030';
    }

    qResEl.textContent = 'Safety Factor q_95 = ' + q_edge.toFixed(2) + ' (' + status.split(' (')[0] + ')';
    qResEl.style.color = color;
    evResEl.textContent = status + ' [Aspect Ratio R/a = ' + aspect_ratio.toFixed(2) + ', Elongation κ = ' + kappa + ' @ I_p=' + I_p_MA + ' MA]';
  }

  [rEl, aEl, btEl, ipEl, kpEl].forEach(el => el.addEventListener('input', update));
  update();
})();