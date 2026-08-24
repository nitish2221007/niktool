(() => {
  'use strict';
  const sEl = document.getElementById('sat-in'), aEl = document.getElementById('act-in');
  const actResEl = document.getElementById('sat-res-act'), trResEl = document.getElementById('sat-res-tier');

  // Official College Board / ACT Concordance Table lookup:
  const SAT_TO_ACT = [
    { sat: 1570, act: 36, pct: 99.9 },
    { sat: 1530, act: 35, pct: 99.5 },
    { sat: 1490, act: 34, pct: 99.0 },
    { sat: 1450, act: 33, pct: 98.0 },
    { sat: 1420, act: 32, pct: 97.0 },
    { sat: 1390, act: 31, pct: 95.0 },
    { sat: 1350, act: 30, pct: 93.0 },
    { sat: 1310, act: 29, pct: 90.0 },
    { sat: 1270, act: 28, pct: 88.0 },
    { sat: 1230, act: 27, pct: 84.0 },
    { sat: 1190, act: 26, pct: 81.0 },
    { sat: 1150, act: 25, pct: 77.0 },
    { sat: 1110, act: 24, pct: 72.0 },
    { sat: 1070, act: 23, pct: 67.0 },
    { sat: 1030, act: 22, pct: 62.0 },
    { sat: 990,  act: 21, pct: 56.0 },
    { sat: 950,  act: 20, pct: 50.0 },
    { sat: 900,  act: 19, pct: 44.0 }
  ];

  function convertSat() {
    const sat = parseInt(sEl.value, 10);
    if (isNaN(sat) || sat < 400 || sat > 1600) return;

    let match = SAT_TO_ACT[SAT_TO_ACT.length - 1];
    for (const entry of SAT_TO_ACT) {
      if (sat >= entry.sat) { match = entry; break; }
    }

    aEl.value = match.act;

    let tier = '';
    let color = '#22543d';

    if (sat >= 1500) {
      tier = 'IVY LEAGUE / MIT / STANFORD (Top 1% Nationally: Highly Competitive for T20 Universities)';
      color = '#22543d';
    } else if (sat >= 1380) {
      tier = 'TOP PUBLIC & PRIVATE UNIVERSITIES (Top 5-8%: NYU, UT Austin, Michigan, Georgia Tech)';
      color = '#22543d';
    } else if (sat >= 1200) {
      tier = 'STRONG MERIT SCHOLARSHIP RANGE (Top 20%: State Flagship Universities)';
      color = '#2563eb';
    } else if (sat >= 1050) {
      tier = 'NATIONAL AVERAGE RANGE (~50-65th percentile: Broad 4-Year College Direct Entry)';
      color = '#d97706';
    } else {
      tier = 'BELOW NATIONAL AVERAGE (Test-Optional Application Recommended)';
      color = '#4b5563';
    }

    actResEl.textContent = 'SAT ' + sat + ' = ACT ' + match.act + ' (' + match.pct + 'th Percentile)';
    actResEl.style.color = color;
    trResEl.textContent = tier;
    trResEl.style.color = color;
  }

  sEl.addEventListener('input', convertSat);
  convertSat();
})();