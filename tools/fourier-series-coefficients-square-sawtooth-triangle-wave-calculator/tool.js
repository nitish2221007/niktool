(() => {
  'use strict';
  const wEl = document.getElementById('fs-wave'), aEl = document.getElementById('fs-amp');
  const hResEl = document.getElementById('fs-res-harm'), spResEl = document.getElementById('fs-res-spec');

  function update() {
    const wave = wEl.value, A = parseFloat(aEl.value);
    if (isNaN(A) || A <= 0) return;

    let b1 = 0, b3 = 0, b5 = 0, formula = '', desc = '';

    if (wave === 'square') {
      // Square wave: b_n = (4 * A) / (n * pi) for odd n
      b1 = (4.0 * A) / (1.0 * Math.PI);
      b3 = (4.0 * A) / (3.0 * Math.PI);
      b5 = (4.0 * A) / (5.0 * Math.PI);
      formula = 'f(t) = ' + b1.toFixed(2) + '·sin(ωt) + ' + b3.toFixed(2) + '·sin(3ωt) + ' + b5.toFixed(2) + '·sin(5ωt)';
      desc = 'Fundamental b₁ = ' + b1.toFixed(2) + 'V (100%) | 3rd b₃ = ' + b3.toFixed(2) + 'V (33.3%) | 5th b₅ = ' + b5.toFixed(2) + 'V (20.0%)';
    } else if (wave === 'sawtooth') {
      // Sawtooth: b_n = (2 * A) / (n * pi) * (-1)^(n+1)
      b1 = (2.0 * A) / (1.0 * Math.PI);
      b3 = (2.0 * A) / (2.0 * Math.PI);
      b5 = (2.0 * A) / (3.0 * Math.PI);
      formula = 'f(t) = ' + b1.toFixed(2) + '·sin(ωt) - ' + b3.toFixed(2) + '·sin(2ωt) + ' + b5.toFixed(2) + '·sin(3ωt)';
      desc = 'Fundamental b₁ = ' + b1.toFixed(2) + 'V | 2nd Harmonic b₂ = ' + b3.toFixed(2) + 'V | 3rd Harmonic b₃ = ' + b5.toFixed(2) + 'V (1/n decay)';
    } else if (wave === 'triangle') {
      // Triangle: b_n = (8 * A) / (pi^2 * n^2) for odd n with alternating signs
      b1 = (8.0 * A) / (Math.pow(Math.PI, 2) * 1.0);
      b3 = (8.0 * A) / (Math.pow(Math.PI, 2) * 9.0);
      b5 = (8.0 * A) / (Math.pow(Math.PI, 2) * 25.0);
      formula = 'f(t) = ' + b1.toFixed(2) + '·sin(ωt) - ' + b3.toFixed(2) + '·sin(3ωt) + ' + b5.toFixed(2) + '·sin(5ωt)';
      desc = 'Fundamental b₁ = ' + b1.toFixed(2) + 'V (100%) | 3rd b₃ = ' + b3.toFixed(2) + 'V (11.1%) | 5th b₅ = ' + b5.toFixed(2) + 'V (4.0%) (1/n² rapid decay)';
    }

    hResEl.textContent = formula;
    spResEl.textContent = desc;
  }

  wEl.addEventListener('change', update);
  aEl.addEventListener('input', update);
  update();
})();