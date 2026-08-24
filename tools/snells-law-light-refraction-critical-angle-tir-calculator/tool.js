(() => {
  'use strict';
  const n1El = document.getElementById('sn-n1'), th1El = document.getElementById('sn-th1'), n2El = document.getElementById('sn-n2');
  const th2ResEl = document.getElementById('sn-res-th2'), crResEl = document.getElementById('sn-res-crit');

  function update() {
    const n1 = parseFloat(n1El.value), theta1_deg = parseFloat(th1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(theta1_deg) || isNaN(n2) || n1 <= 0 || n2 <= 0 || theta1_deg < 0 || theta1_deg > 90) return;

    const theta1_rad = (theta1_deg * Math.PI) / 180.0;
    const sin_theta2 = (n1 / n2) * Math.sin(theta1_rad);

    let th2Text = '', color = '#22543d';

    if (sin_theta2 > 1.0) {
      th2Text = 'TOTAL INTERNAL REFLECTION (TIR: 100% Light Reflected Back into Medium 1)';
      color = '#2563eb';
    } else {
      const theta2_rad = Math.asin(sin_theta2);
      const theta2_deg = (theta2_rad * 180.0) / Math.PI;
      th2Text = 'Refraction Angle θ₂ = ' + theta2_deg.toFixed(2) + '°';
      color = '#22543d';
    }

    // Critical angle if n1 > n2:
    let critText = '';
    if (n1 > n2) {
      const crit_rad = Math.asin(n2 / n1);
      const crit_deg = (crit_rad * 180.0) / Math.PI;
      const brewster_deg = (Math.atan(n2 / n1) * 180.0) / Math.PI;
      critText = 'Critical Angle θ_c = ' + crit_deg.toFixed(2) + '° | Brewster Angle θ_B = ' + brewster_deg.toFixed(2) + '° (TIR if θ₁ > ' + crit_deg.toFixed(1) + '°)';
    } else {
      critText = 'No Critical Angle (Light entering denser medium: n₁ < n₂ bends toward normal)';
    }

    th2ResEl.textContent = th2Text;
    th2ResEl.style.color = color;
    crResEl.textContent = critText;
  }

  [n1El, th1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();