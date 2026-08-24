(() => {
  'use strict';
  const eEl = document.getElementById('atar-eng'), s2El = document.getElementById('atar-s2');
  const s3El = document.getElementById('atar-s3'), s4El = document.getElementById('atar-s4'), s5El = document.getElementById('atar-s5');
  const aResEl = document.getElementById('atar-res-val'), agResEl = document.getElementById('atar-res-agg');

  function update() {
    const eng = parseFloat(eEl.value) || 0;
    const s2 = parseFloat(s2El.value) || 0;
    const s3 = parseFloat(s3El.value) || 0;
    const s4 = parseFloat(s4El.value) || 0;
    const s5 = parseFloat(s5El.value) || 0;

    // Aggregate = Primary 4 (including English) + 10% of 5th
    const aggregate = eng + s2 + s3 + s4 + (0.10 * s5);

    // Empirical VTAC aggregate to ATAR scaling curve:
    let ATAR = 30.0;
    if (aggregate >= 200) ATAR = 99.90 + ((aggregate - 200) / 10) * 0.05;
    else if (aggregate >= 185) ATAR = 99.00 + ((aggregate - 185) / 15) * 0.90;
    else if (aggregate >= 160) ATAR = 93.00 + ((aggregate - 160) / 25) * 6.00;
    else if (aggregate >= 135) ATAR = 80.00 + ((aggregate - 135) / 25) * 13.00;
    else if (aggregate >= 110) ATAR = 65.00 + ((aggregate - 110) / 25) * 15.00;
    else if (aggregate >= 80) ATAR = 45.00 + ((aggregate - 80) / 30) * 20.00;
    else ATAR = Math.max(30.0, (aggregate / 80) * 45.0);

    ATAR = Math.min(99.95, ATAR);

    let rating = '';
    let color = '#22543d';

    if (ATAR >= 95.0) {
      rating = 'EXCEPTIONAL: Eligible for Melbourne/Sydney Uni Medicine, Law, Actuarial & Elite Scholars Programs';
      color = '#22543d';
    } else if (ATAR >= 85.0) {
      rating = 'GROUP OF EIGHT (Go8) ELIGIBLE: Monash, UNSW, ANU Engineering, Commerce & Science';
      color = '#22543d';
    } else if (ATAR >= 70.0) {
      rating = 'STANDARD UNIVERSITY ENTRY: Direct entry into major undergraduate bachelor degrees';
      color = '#2563eb';
    } else {
      rating = 'TAFE / PATHWAY DIPLOMA: Direct pathways into second-year university bachelor transfers';
      color = '#d97706';
    }

    aResEl.textContent = 'ATAR ≈ ' + ATAR.toFixed(2);
    aResEl.style.color = color;
    agResEl.textContent = 'Aggregate: ' + aggregate.toFixed(1) + '/210 | ' + rating;
    agResEl.style.color = color;
  }

  [eEl, s2El, s3El, s4El, s5El].forEach(el => el.addEventListener('input', update));
  update();
})();