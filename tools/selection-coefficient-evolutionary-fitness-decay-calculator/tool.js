(() => {
  'use strict';
  const p0El = document.getElementById('sel-p0'), sEl = document.getElementById('sel-s'), genEl = document.getElementById('sel-gen');
  const ptResEl = document.getElementById('sel-res-pt'), fxResEl = document.getElementById('sel-res-fix');

  function update() {
    const p0 = parseFloat(p0El.value), s = parseFloat(sEl.value), tGen = parseInt(genEl.value, 10);
    if (isNaN(p0) || isNaN(s) || isNaN(tGen) || p0 <= 0 || p0 >= 1.0 || tGen < 0) return;

    // Discrete generation simulation of natural selection for dominant/haploid allele:
    // p_(t+1) = p_t * (1 + s) / ( 1 + s * p_t )
    let p_curr = p0;
    for (let g = 1; g <= tGen; g++) {
      p_curr = (p_curr * (1.0 + s)) / (1.0 + (s * p_curr));
    }

    // Time to 99% fixation approximation: t_fix approx = (2 / s) * ln( (1 - p0) / p0 )
    let t_fix_str = '';
    if (s > 0) {
      const t_fix = (1.0 / s) * Math.log((0.99 / (1.0 - 0.99)) / (p0 / (1.0 - p0)));
      t_fix_str = '~' + Math.round(t_fix) + ' Generations to reach 99% Selective Fixation';
    } else if (s < 0) {
      t_fix_str = 'Negative Selection: Allele purged toward extinction (p -> 0)';
    } else {
      t_fix_str = 'Neutral Evolution (s = 0): Governed purely by genetic drift';
    }

    ptResEl.textContent = 'p(' + tGen + ') = ' + p_curr.toFixed(3) + ' (' + (p_curr * 100).toFixed(1) + '% Frequency)';
    fxResEl.textContent = t_fix_str + ' (Relative Fitness W = ' + (1 + s).toFixed(2) + ' vs Baseline 1.00)';
  }

  [p0El, sEl, genEl].forEach(el => el.addEventListener('input', update));
  update();
})();