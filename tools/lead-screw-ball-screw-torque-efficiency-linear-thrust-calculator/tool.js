(() => {
  'use strict';
  const ldEl = document.getElementById('ls-lead'), dEl = document.getElementById('ls-d');
  const tqEl = document.getElementById('ls-torque'), tpEl = document.getElementById('ls-type');
  const fcResEl = document.getElementById('ls-res-force'), laResEl = document.getElementById('ls-res-leadang');

  function update() {
    const L_mm = parseFloat(ldEl.value), d_mm = parseFloat(dEl.value);
    const T = parseFloat(tqEl.value), eta = parseFloat(tpEl.value);

    if (isNaN(L_mm) || isNaN(d_mm) || isNaN(T) || isNaN(eta) || L_mm <= 0 || d_mm <= 0 || T <= 0) return;

    const L_m = L_mm * 1e-3;

    // Linear thrust force: F = ( 2 * pi * eta * T ) / L_m  [Newtons]
    const F_N = (2.0 * Math.PI * eta * T) / L_m;
    const F_kN = F_N / 1000.0;
    const F_lbf = F_N * 0.224809;

    // Helix lead angle: tan(lambda) = L / (pi * d)
    const tan_lambda = L_mm / (Math.PI * d_mm);
    const lambda_deg = (Math.atan(tan_lambda) * 180.0) / Math.PI;

    // Linear feed at 1000 RPM: (1000 / 60) * L_mm mm/s
    const feed_1000_rpm = (1000.0 / 60.0) * L_mm;

    fcResEl.textContent = 'Thrust Force F = ' + Math.round(F_N).toLocaleString() + ' N (' + F_kN.toFixed(2) + ' kN / ' + Math.round(F_lbf) + ' lbf)';
    laResEl.textContent = 'Helix Angle λ = ' + lambda_deg.toFixed(2) + '° | Feed at 1000 RPM = ' + feed_1000_rpm.toFixed(1) + ' mm/s (η = ' + (eta * 100).toFixed(0) + '%)';
  }

  [ldEl, dEl, tqEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();