(() => {
  'use strict';
  const dvtEl = document.getElementById('wp-dvt'), altEl = document.getElementById('wp-alt');
  const hrEl = document.getElementById('wp-hr'), immEl = document.getElementById('wp-imm');
  const priEl = document.getElementById('wp-prior'), hemEl = document.getElementById('wp-hem');
  const canEl = document.getElementById('wp-can');
  const scResEl = document.getElementById('wp-res-score'), stResEl = document.getElementById('wp-res-strat');

  function update() {
    let score = 0;
    if (dvtEl.checked) score += 3.0;
    if (altEl.checked) score += 3.0;
    if (hrEl.checked) score += 1.5;
    if (immEl.checked) score += 1.5;
    if (priEl.checked) score += 1.5;
    if (hemEl.checked) score += 1.0;
    if (canEl.checked) score += 1.0;

    let strat = '', color = '#22543d';
    if (score <= 4.0) {
      strat = 'PE UNLIKELY (Score ≤ 4.0 / ~12% Prevalence: Order D-dimer to rule out PE without CT scan)';
      color = '#22543d';
    } else {
      strat = 'PE LIKELY (Score > 4.0 / ~37% Prevalence: Order urgent CT Pulmonary Angiogram CTPA)';
      color = '#c53030';
    }

    scResEl.textContent = 'Wells PE Score = ' + score.toFixed(1);
    scResEl.style.color = color;
    stResEl.textContent = strat;
    stResEl.style.color = color;
  }

  [dvtEl, altEl, hrEl, immEl, priEl, hemEl, canEl].forEach(el => el.addEventListener('change', update));
  update();
})();