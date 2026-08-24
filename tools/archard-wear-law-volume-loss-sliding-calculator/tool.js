(() => {
  'use strict';
  const wEl = document.getElementById('ach-w'), sEl = document.getElementById('ach-s');
  const hEl = document.getElementById('ach-h'), kEl = document.getElementById('ach-k');
  const vResEl = document.getElementById('ach-res-vol'), rResEl = document.getElementById('ach-res-rate');

  function update() {
    const W_N = parseFloat(wEl.value), s_km = parseFloat(sEl.value);
    const H_hv = parseFloat(hEl.value), K_factor = parseFloat(kEl.value);

    if (isNaN(W_N) || isNaN(s_km) || isNaN(H_hv) || isNaN(K_factor) || W_N <= 0 || s_km <= 0 || H_hv <= 0 || K_factor <= 0) return;

    // Convert sliding distance km to meters: s * 1000
    const s_m = s_km * 1000.0;
    // Convert Vickers Hardness HV to MPa: H_pa = H_hv * 9.80665 * 1e6 Pa
    const H_mpa = H_hv * 9.80665;
    const H_pa = H_mpa * 1e6;

    const K = K_factor * 1e-5; // dimensionless Archard wear coefficient

    // Archard Volume V = (K * W * s) / H  [m^3 -> mm^3]
    const V_m3 = (K * W_N * s_m) / H_pa;
    const V_mm3 = V_m3 * 1e9;

    // Specific dimensional wear rate k_spec = V_mm3 / (W_N * s_m)  [mm^3 / (N * m)]
    const k_spec = V_mm3 / (W_N * s_m);

    // Approximate mass loss for steel (rho = 7850 kg/m^3 -> 7.85 mg/mm^3)
    const massLossMg = V_mm3 * 7.85;

    vResEl.textContent = 'V = ' + V_mm3.toFixed(2) + ' mm³ (' + massLossMg.toFixed(1) + ' mg Material Removed)';
    rResEl.textContent = 'Specific Wear Rate k = ' + k_spec.toExponential(2) + ' mm³/(N·m) (W = ' + W_N + ' N, s = ' + s_km + ' km @ ' + H_hv + ' HV)';
  }

  [wEl, sEl, hEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();