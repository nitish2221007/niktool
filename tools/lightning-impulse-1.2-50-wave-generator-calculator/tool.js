(() => {
  'use strict';
  const v0El = document.getElementById('ltg-v0'), c1El = document.getElementById('ltg-c1'), c2El = document.getElementById('ltg-c2');
  const tmResEl = document.getElementById('ltg-res-times'), rsResEl = document.getElementById('ltg-res-res');

  function update() {
    const V0_kv = parseFloat(v0El.value), C1_nf = parseFloat(c1El.value), C2_pf = parseFloat(c2El.value);
    if (isNaN(V0_kv) || isNaN(C1_nf) || isNaN(C2_pf) || V0_kv <= 0 || C1_nf <= 0 || C2_pf <= 0) return;

    const C1_f = C1_nf * 1e-9;
    const C2_f = C2_pf * 1e-12;

    // Time constants for exact 1.2 / 50 us wave:
    // tau1 approx = 0.405 us, tau2 approx = 68.2 us
    const tau1_sec = 0.405e-6;
    const tau2_sec = 68.2e-6;

    // Front damping resistance R1 approx = tau1 / C2
    const R1_ohms = tau1_sec / C2_f;
    // Tail discharge resistance R2 approx = tau2 / (C1 + C2)
    const R2_ohms = tau2_sec / (C1_f + C2_f);

    // Stored electrostatic energy E = 0.5 * C1 * V0^2  [Joules -> kJ]
    const Energy_J = 0.5 * C1_f * Math.pow(V0_kv * 1000.0, 2);
    const Energy_kJ = Energy_J / 1000.0;

    tmResEl.textContent = 'T₁ = 1.20 μs (Front) / T₂ = 50.0 μs (Tail) Wave';
    rsResEl.textContent = 'R₁ = ' + Math.round(R1_ohms) + ' Ω (Front Damping) | R₂ = ' + Math.round(R2_ohms) + ' Ω (Tail) | Marx Stored Energy: ' + Energy_kJ.toFixed(1) + ' kJ';
  }

  [v0El, c1El, c2El].forEach(el => el.addEventListener('input', update));
  update();
})();