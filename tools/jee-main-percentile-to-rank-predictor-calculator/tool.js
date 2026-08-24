(() => {
  'use strict';
  const pEl = document.getElementById('jee-p'), cEl = document.getElementById('jee-cands');
  const rResEl = document.getElementById('jee-res-rank'), elResEl = document.getElementById('jee-res-elig');

  function update() {
    const P = parseFloat(pEl.value), N_total = parseFloat(cEl.value);
    if (isNaN(P) || isNaN(N_total) || P <= 0 || P > 100 || N_total <= 0) return;

    // Rank formula: AIR = Math.floor( ( (100 - P) / 100 ) * N_total ) + 1
    const raw_rank = (((100.0 - P) / 100.0) * N_total) + 1;
    const AIR = Math.max(1, Math.round(raw_rank));
    const topPct = (100.0 - P).toFixed(2);

    let status = '';
    let color = '#22543d';

    if (P >= 99.0) {
      status = 'TOP TIER: Eligible for Top NIT Trichy/Surathkal/Warangal CSE & Prime JEE Advanced Qualification';
      color = '#22543d';
    } else if (P >= 93.0) {
      status = 'JEE ADVANCED QUALIFIED (General Cutoff ~91-93%): Eligible for State NITs, IIITs, and Top GFTIs';
      color = '#22543d';
    } else if (P >= 75.0) {
      status = 'OBC/EWS/SC/ST Category Cutoff Cleared | Eligible for State Engineering Colleges';
      color = '#2563eb';
    } else {
      status = 'BELOW GENERAL ADVANCED CUTOFF: Consider State CETs, BITSAT, or Private University Entrances';
      color = '#d97706';
    }

    rResEl.textContent = 'AIR ≈ ' + AIR.toLocaleString() + ' (Top ' + topPct + '%)';
    rResEl.style.color = color;
    elResEl.textContent = status + ' (Based on ' + Math.round(N_total/100000) + ' Lakh Unique Test Takers)';
    elResEl.style.color = color;
  }

  pEl.addEventListener('input', update);
  cEl.addEventListener('input', update);
  update();
})();