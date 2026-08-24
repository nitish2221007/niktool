(() => {
  'use strict';
  const saEl = document.getElementById('gm-sa'), smEl = document.getElementById('gm-sm');
  const seEl = document.getElementById('gm-se'), sutEl = document.getElementById('gm-sut');
  const gdResEl = document.getElementById('gm-res-goodman'), cpResEl = document.getElementById('gm-res-comp');

  function update() {
    const sigma_a = parseFloat(saEl.value), sigma_m = parseFloat(smEl.value);
    const Se = parseFloat(seEl.value), Sut = parseFloat(sutEl.value);

    if (isNaN(sigma_a) || isNaN(sigma_m) || isNaN(Se) || isNaN(Sut) || sigma_a < 0 || Se <= 0 || Sut <= 0) return;

    // Modified Goodman factor: 1 / n = (sigma_a / Se) + (sigma_m / Sut)
    const goodman_denom = (sigma_a / Se) + (sigma_m / Sut);
    const n_goodman = goodman_denom > 0 ? 1.0 / goodman_denom : 1.0;

    // Soderberg factor using Sy approx 0.8 * Sut:
    const Sy = 0.8 * Sut;
    const soderberg_denom = (sigma_a / Se) + (sigma_m / Sy);
    const n_soderberg = soderberg_denom > 0 ? 1.0 / soderberg_denom : 1.0;

    // Gerber factor: 1/n = (sigma_a / Se) + (sigma_m / Sut)^2 -> Solve quadratic for n:
    // n * (sigma_a / Se) + n^2 * (sigma_m / Sut)^2 = 1
    let n_gerber = 1.0;
    const A = Math.pow(sigma_m / Sut, 2);
    const B = sigma_a / Se;
    if (A > 0) {
      n_gerber = (-B + Math.sqrt(Math.pow(B, 2) + 4.0 * A)) / (2.0 * A);
    } else if (B > 0) {
      n_gerber = 1.0 / B;
    }

    gdResEl.textContent = 'Goodman Factor N = ' + n_goodman.toFixed(2) + ' (' + (n_goodman >= 1.0 ? 'SAFE ✓' : 'FATIGUE FAILURE ✗') + ')';
    gdResEl.style.color = n_goodman >= 1.0 ? '#22543d' : '#c53030';
    cpResEl.textContent = 'Gerber N = ' + n_gerber.toFixed(2) + ' | Soderberg N = ' + n_soderberg.toFixed(2) + ' (σ_a = ' + sigma_a + ' MPa, σ_m = ' + sigma_m + ' MPa)';
  }

  [saEl, smEl, seEl, sutEl].forEach(el => el.addEventListener('input', update));
  update();
})();