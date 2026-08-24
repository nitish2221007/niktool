(() => {
  'use strict';
  const pEl = document.getElementById('z-ppr'), tEl = document.getElementById('z-tpr');
  const zResEl = document.getElementById('z-res-val'), dResEl = document.getElementById('z-res-dens');

  function update() {
    const Ppr = parseFloat(pEl.value), Tpr = parseFloat(tEl.value);
    if (isNaN(Ppr) || isNaN(Tpr) || Ppr <= 0 || Tpr <= 1.0) return;

    // Hall-Yarborough / Beggs-Brill analytical fit for Z-factor:
    // A = 1.39 * (Tpr - 0.92)^0.5 - 0.36 * Tpr - 0.10
    // B = (0.62 - 0.23*Tpr)*Ppr + ( (0.066 / (Tpr - 0.86)) - 0.037 ) * Ppr^2 + 0.32 * Ppr^6 / 10^(9*(Tpr-1))
    // C = 0.132 - 0.32*log10(Tpr)
    // D = 10^(0.3106 - 0.49*Tpr + 0.1824*Tpr^2)
    // Z = A + (1 - A) / exp(B) + C * Ppr^D
    const A = (1.39 * Math.pow(Math.max(0.01, Tpr - 0.92), 0.5)) - (0.36 * Tpr) - 0.10;
    const termB1 = (0.62 - (0.23 * Tpr)) * Ppr;
    const termB2 = ((0.066 / Math.max(0.01, Tpr - 0.86)) - 0.037) * Math.pow(Ppr, 2);
    const termB3 = (0.32 * Math.pow(Ppr, 6)) / Math.pow(10, 9 * (Tpr - 1));
    const B = termB1 + termB2 + termB3;
    const C = 0.132 - (0.32 * Math.log10(Tpr));
    const D = Math.pow(10, 0.3106 - (0.49 * Tpr) + (0.1824 * Math.pow(Tpr, 2)));

    const Z = A + ((1 - A) / Math.exp(Math.max(-50, Math.min(50, B)))) + (C * Math.pow(Ppr, D));

    zResEl.textContent = 'Z = ' + Z.toFixed(3) + ' (Real Gas Z-Factor)';
    dResEl.textContent = 'Compressibility: ' + (Z * 100).toFixed(1) + '% of Ideal Volume (Gas Expansion Factor B_g ∝ Z·T/P)';
  }

  pEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();