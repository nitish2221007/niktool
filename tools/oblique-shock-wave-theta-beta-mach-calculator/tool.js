(() => {
  'use strict';
  const m1El = document.getElementById('obs-m1'), bEl = document.getElementById('obs-beta');
  const thResEl = document.getElementById('obs-res-theta'), m2ResEl = document.getElementById('obs-res-m2');

  const gamma = 1.40;

  function update() {
    const M1 = parseFloat(m1El.value), beta_deg = parseFloat(bEl.value);
    if (isNaN(M1) || isNaN(beta_deg) || M1 <= 1.0 || beta_deg <= 0 || beta_deg >= 90) return;

    const beta_rad = (beta_deg * Math.PI) / 180.0;
    const sin_b = Math.sin(beta_rad);
    const cos_b = Math.cos(beta_rad);
    const cot_b = 1.0 / Math.tan(beta_rad);

    // Normal Mach number upstream: M_n1 = M1 * sin(beta)
    const M_n1 = M1 * sin_b;
    if (M_n1 <= 1.0) {
      thResEl.textContent = 'NO SHOCK (M_n1 = M₁·sin β ≤ 1.0)';
      m2ResEl.textContent = 'M₁·sin β must exceed 1.0 for an oblique shock';
      return;
    }

    // Theta-Beta-M relation:
    // tan(theta) = 2 * cot(beta) * [ (M1^2 * sin^2(beta) - 1) / ( M1^2 * (gamma + cos(2*beta)) + 2 ) ]
    const num = Math.pow(M1, 2) * Math.pow(sin_b, 2) - 1.0;
    const den = Math.pow(M1, 2) * (gamma + Math.cos(2.0 * beta_rad)) + 2.0;
    const tan_theta = 2.0 * cot_b * (num / den);

    const theta_rad = Math.atan(tan_theta);
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    // Normal Mach downstream:
    const M_n2 = Math.sqrt((Math.pow(M_n1, 2) + 2.0 / (gamma - 1.0)) / ((2.0 * gamma / (gamma - 1.0)) * Math.pow(M_n1, 2) - 1.0));
    // Downstream total Mach M2 = M_n2 / sin(beta - theta)
    const M2 = M_n2 / Math.sin(beta_rad - theta_rad);

    // Static pressure ratio P2 / P1 = 1 + (2*gamma / (gamma+1)) * (M_n1^2 - 1)
    const p_ratio = 1.0 + ((2.0 * gamma) / (gamma + 1.0)) * (Math.pow(M_n1, 2) - 1.0);

    thResEl.textContent = 'Wedge Deflection θ = ' + theta_deg.toFixed(2) + '°';
    m2ResEl.textContent = 'Downstream Mach M₂ = ' + M2.toFixed(2) + ' | P₂/P₁ = ' + p_ratio.toFixed(2) + ' (M_n1 = ' + M_n1.toFixed(2) + ')';
  }

  [m1El, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();