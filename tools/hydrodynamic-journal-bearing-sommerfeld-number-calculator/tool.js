(() => {
  'use strict';
  const rEl = document.getElementById('som-r'), cEl = document.getElementById('som-c');
  const muEl = document.getElementById('som-mu'), nEl = document.getElementById('som-n'), wEl = document.getElementById('som-w');
  const sResEl = document.getElementById('som-res-s'), h0ResEl = document.getElementById('som-res-h0');

  function update() {
    const rMm = parseFloat(rEl.value), cUm = parseFloat(cEl.value);
    const muCp = parseFloat(muEl.value), N_rps = parseFloat(nEl.value), W_kN = parseFloat(wEl.value);

    if (isNaN(rMm) || isNaN(cUm) || isNaN(muCp) || isNaN(N_rps) || isNaN(W_kN) || rMm <= 0 || cUm <= 0 || muCp <= 0 || N_rps <= 0 || W_kN <= 0) return;

    const r_m = rMm * 1e-3;
    const c_m = cUm * 1e-6;
    const D_m = 2.0 * r_m;
    const L_m = D_m; // Assuming square bearing L/D = 1.0

    // Projected bearing area A_proj = L * D  [m^2]
    const A_proj = L_m * D_m;
    // Specific bearing pressure P = W / A_proj  [Pa]
    const P_pa = (W_kN * 1000.0) / A_proj;

    const mu_pa_s = muCp * 1e-3;

    // Sommerfeld Number S = (r / c)^2 * ( mu * n / P )
    const clearanceRatio = r_m / c_m;
    const S = Math.pow(clearanceRatio, 2) * ((mu_pa_s * N_rps) / P_pa);

    // Raimondi-Boyd approximation for eccentricity ratio epsilon from Sommerfeld S (for L/D=1):
    // epsilon approx = 1 / (1 + 4*S^0.7)
    const epsilon = Math.max(0.05, Math.min(0.95, 1.0 / (1.0 + (3.8 * Math.pow(S, 0.7)))));

    // Minimum film thickness h0 = c * (1 - epsilon)  [um]
    const h0_um = cUm * (1.0 - epsilon);

    let safety = '';
    let color = '#22543d';

    if (h0_um >= 10.0) {
      safety = 'EXCELLENT LUBRICATION: h₀ ≥ 10 μm provides robust safety against particulate scoring';
      color = '#22543d';
    } else if (h0_um >= 5.0) {
      safety = 'SAFE OPERATION: h₀ = ' + h0_um.toFixed(1) + ' μm requires fine oil filtration (<10 μm)';
      color = '#2563eb';
    } else {
      safety = 'DANGER OF WIPING: h₀ < 5 μm risk of babbitt metal thermal wipe & seizure!';
      color = '#c53030';
    }

    sResEl.textContent = 'S = ' + S.toFixed(3) + ' (P = ' + (P_pa/1e6).toFixed(2) + ' MPa)';
    h0ResEl.textContent = 'Min Film h₀ = ' + h0_um.toFixed(1) + ' μm (ε = ' + epsilon.toFixed(2) + ') | ' + safety;
    h0ResEl.style.color = color;
  }

  [rEl, cEl, muEl, nEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();