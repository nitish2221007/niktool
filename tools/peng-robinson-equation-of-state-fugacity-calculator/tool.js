(() => {
  'use strict';
  const tcEl = document.getElementById('pr-tc'), pcEl = document.getElementById('pr-pc');
  const omEl = document.getElementById('pr-omega'), tEl = document.getElementById('pr-t'), pEl = document.getElementById('pr-p');
  const zprResEl = document.getElementById('pr-res-zpr'), abResEl = document.getElementById('pr-res-ab');

  const R = 0.08314462618; // L * bar / (mol * K)

  function update() {
    const Tc = parseFloat(tcEl.value), Pc = parseFloat(pcEl.value);
    const omega = parseFloat(omEl.value), T = parseFloat(tEl.value), P = parseFloat(pEl.value);

    if (isNaN(Tc) || isNaN(Pc) || isNaN(omega) || isNaN(T) || isNaN(P) || Tc <= 0 || Pc <= 0 || T <= 0 || P <= 0) return;

    const Tr = T / Tc;
    const Pr = P / Pc;

    // Peng-Robinson alpha function:
    // kappa = 0.37464 + 1.54226 * omega - 0.26992 * omega^2
    const kappa = 0.37464 + (1.54226 * omega) - (0.26992 * Math.pow(omega, 2));
    const alpha = Math.pow(1.0 + kappa * (1.0 - Math.sqrt(Tr)), 2);

    // EOS parameters a and b:
    const a_c = 0.45724 * Math.pow(R * Tc, 2) / Pc;
    const a_T = a_c * alpha;
    const b = 0.07780 * (R * Tc) / Pc;

    // Dimensionless A and B:
    const A = (a_T * P) / Math.pow(R * T, 2);
    const B = (b * P) / (R * T);

    // Cubic equation in Z: Z^3 - (1 - B)*Z^2 + (A - 2B - 3B^2)*Z - (AB - B^2 - B^3) = 0
    // Approximate vapor root Z for superheated gas:
    const Z_approx = 1.0 - B + A - (3.0 * B);
    const Z_clamped = Math.max(0.2, Math.min(1.2, 1.0 - (A - B) * 0.5));
    const Z = 1.0 - B * (1.0 - A / (1.0 + 2.0 * B));

    // Molar volume V_m = Z * R * T / P  [L / mol]
    const V_m = (Z * R * T) / P;

    zprResEl.textContent = 'Compressibility Z ≈ ' + Z.toFixed(3) + ' (V_m = ' + V_m.toFixed(3) + ' L/mol)';
    abResEl.textContent = 'A = ' + A.toFixed(4) + ' | B = ' + B.toFixed(4) + ' | α(T_r, ω) = ' + alpha.toFixed(3) + ' (T_r = ' + Tr.toFixed(3) + ', P_r = ' + Pr.toFixed(3) + ')';
  }

  [tcEl, pcEl, omEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();