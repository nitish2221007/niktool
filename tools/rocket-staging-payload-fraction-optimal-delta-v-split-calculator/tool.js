(() => {
  'use strict';
  const dvEl = document.getElementById('rs-dv'), is1El = document.getElementById('rs-isp1');
  const is2El = document.getElementById('rs-isp2'), epEl = document.getElementById('rs-eps');
  const plResEl = document.getElementById('rs-res-pl'), spResEl = document.getElementById('rs-res-split');

  const g0 = 9.80665;

  function update() {
    const total_dv = parseFloat(dvEl.value), Isp1 = parseFloat(is1El.value);
    const Isp2 = parseFloat(is2El.value), eps = parseFloat(epEl.value);

    if (isNaN(total_dv) || isNaN(Isp1) || isNaN(Isp2) || isNaN(eps) || total_dv <= 0 || Isp1 <= 0 || Isp2 <= 0 || eps <= 0 || eps >= 0.5) return;

    const c1 = Isp1 * g0;
    const c2 = Isp2 * g0;

    // Optimal 2-stage split approx: higher Isp stage takes slightly higher delta-v
    const dv1 = total_dv * (c1 / (c1 + c2)) * 0.95;
    const dv2 = total_dv - dv1;

    // Mass ratios: R1 = exp(dv1 / c1), R2 = exp(dv2 / c2)
    const R1 = Math.exp(dv1 / c1);
    const R2 = Math.exp(dv2 / c2);

    // Payload fraction per stage: lambda_i = (1 - eps*R) / R  (if 1 - eps*R > 0)
    const lam1 = (1.0 - (eps * R1)) / R1;
    const lam2 = (1.0 - (eps * R2)) / R2;

    if (lam1 <= 0 || lam2 <= 0) {
      plResEl.textContent = 'STAGING INFEASIBLE (Single-stage payload negative)';
      plResEl.style.color = '#c53030';
      spResEl.textContent = 'Target Δv=' + total_dv + ' m/s exceeds physical limits with structural factor ε=' + eps + ' (Decrease Δv or structural mass)';
      return;
    }

    const total_payload_fraction = lam1 * lam2;
    const payload_pct = total_payload_fraction * 100.0;
    const payload_100t = Math.round(total_payload_fraction * 100000.0);

    plResEl.textContent = 'Payload Fraction λ = ' + payload_pct.toFixed(2) + '% (' + payload_100t.toLocaleString() + ' kg / 100t)';
    plResEl.style.color = '#22543d';
    spResEl.textContent = 'Stage 1 Δv₁ = ' + Math.round(dv1).toLocaleString() + ' m/s | Stage 2 Δv₂ = ' + Math.round(dv2).toLocaleString() + ' m/s (R₁=' + R1.toFixed(2) + ', R₂=' + R2.toFixed(2) + ')';
  }

  [dvEl, is1El, is2El, epEl].forEach(el => el.addEventListener('input', update));
  update();
})();