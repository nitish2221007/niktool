(() => {
  'use strict';
  const pEl = document.getElementById('rl-poles'), zEl = document.getElementById('rl-zeros');
  const ctResEl = document.getElementById('rl-res-cent'), anResEl = document.getElementById('rl-res-angles');

  function parseNumbers(str) {
    if (!str || !str.trim()) return [];
    return str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  }

  function update() {
    const poles = parseNumbers(pEl.value);
    const zeros = parseNumbers(zEl.value);

    const n = poles.length;
    const m = zeros.length;

    if (n === 0 || n <= m) {
      ctResEl.textContent = 'Invalid (System must have more poles than zeros n > m)';
      anResEl.textContent = 'Enter poles e.g. 0, -2, -4 and zeros e.g. -1';
      return;
    }

    const num_asymptotes = n - m;

    // Sum of poles and sum of zeros:
    const sum_p = poles.reduce((a, b) => a + b, 0);
    const sum_z = zeros.reduce((a, b) => a + b, 0);

    // Centroid: sigma_a = ( sum(p) - sum(z) ) / ( n - m )
    const sigma_a = (sum_p - sum_z) / num_asymptotes;

    // Asymptote angles: theta_k = (2k + 1) * 180 / (n - m)
    const angles = [];
    for (let k = 0; k < num_asymptotes; k++) {
      const ang = ((2 * k + 1) * 180.0) / num_asymptotes;
      angles.push(ang.toFixed(1) + '°');
    }

    ctResEl.textContent = 'Centroid σ_a = ' + sigma_a.toFixed(2);
    anResEl.textContent = num_asymptotes + ' Asymptotes at [' + angles.join(', ') + '] (Poles n=' + n + ', Zeros m=' + m + ')';
  }

  [pEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();