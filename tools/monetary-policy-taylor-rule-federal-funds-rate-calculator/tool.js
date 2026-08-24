(() => {
  'use strict';
  const infEl = document.getElementById('tr-inf'), itgtEl = document.getElementById('tr-inftgt');
  const rEl = document.getElementById('tr-rstar'), gapEl = document.getElementById('tr-gap');
  const rtResEl = document.getElementById('tr-res-rate'), stResEl = document.getElementById('tr-res-stance');

  function update() {
    const pi = parseFloat(infEl.value), pi_tgt = parseFloat(itgtEl.value);
    const r_star = parseFloat(rEl.value), gap = parseFloat(gapEl.value);

    if (isNaN(pi) || isNaN(pi_tgt) || isNaN(r_star) || isNaN(gap)) return;

    // Classic Taylor Rule formula (1993):
    // i = r* + pi + 0.5 * ( pi - pi* ) + 0.5 * gap
    const inflationGap = pi - pi_tgt;
    const targetRate = r_star + pi + (0.5 * inflationGap) + (0.5 * gap);

    let stance = '';
    let color = '#22543d';

    if (targetRate > (r_star + pi)) {
      stance = 'RESTRICTIVE POLICY HAWKISH (Rate above neutral: cools inflation gap of +' + inflationGap.toFixed(1) + '%)';
      color = '#22543d';
    } else if (targetRate < (r_star + pi)) {
      stance = 'ACCOMMODATIVE POLICY DOVISH (Rate below neutral: stimulates economic growth)';
      color = '#2563eb';
    } else {
      stance = 'NEUTRAL MONETARY STANCE (Economy in balance at target)';
      color = '#22543d';
    }

    rtResEl.textContent = 'Target Rate i = ' + targetRate.toFixed(2) + '%';
    stResEl.textContent = stance + ' | Inflation Gap: ' + (inflationGap >= 0 ? '+' : '') + inflationGap.toFixed(2) + '% | Output Gap: ' + (gap >= 0 ? '+' : '') + gap.toFixed(2) + '%';
    stResEl.style.color = color;
  }

  [infEl, itgtEl, rEl, gapEl].forEach(el => el.addEventListener('input', update));
  update();
})();