(() => {
  'use strict';
  const cEl = document.getElementById('cv-c'), hEl = document.getElementById('cv-h');
  const a2El = document.getElementById('cv-a2'), dEl = document.getElementById('cv-d');
  const s2El = document.getElementById('cv-s2'), vEl = document.getElementById('cv-v');
  const aEl = document.getElementById('cv-a'), scEl = document.getElementById('cv-sc');
  const scResEl = document.getElementById('cv-res-score'), rcResEl = document.getElementById('cv-res-rec');

  const strokeRates = [0.2, 0.6, 2.2, 3.2, 4.8, 7.2, 9.7, 11.2, 12.5, 15.2];

  function update() {
    let score = 0;
    if (cEl.checked) score += 1;
    if (hEl.checked) score += 1;
    if (a2El.checked) {
      score += 2;
      aEl.checked = false; // mutually exclusive age
    } else if (aEl.checked) {
      score += 1;
    }
    if (dEl.checked) score += 1;
    if (s2El.checked) score += 2;
    if (vEl.checked) score += 1;
    if (scEl.checked) score += 1;

    score = Math.min(9, score);
    const annRisk = strokeRates[score] || 15.2;

    let rec = '', color = '#22543d';
    if (score === 0 || (score === 1 && scEl.checked && !cEl.checked && !hEl.checked && !dEl.checked && !s2El.checked && !vEl.checked && !aEl.checked && !a2El.checked)) {
      rec = 'LOW RISK (' + annRisk + '%/yr): No Anticoagulation Needed (Class I)';
      color = '#22543d';
    } else if (score === 1) {
      rec = 'INTERMEDIATE RISK (' + annRisk + '%/yr): Oral Anticoagulant (DOAC) May Be Considered (Class IIb)';
      color = '#ea580c';
    } else {
      rec = 'HIGH RISK (' + annRisk + '%/yr): Oral Anticoagulation (DOAC: Apixaban/Rivaroxaban) Strongly Recommended (Class I)';
      color = '#c53030';
    }

    scResEl.textContent = 'CHA₂DS₂-VASc Score = ' + score;
    scResEl.style.color = color;
    rcResEl.textContent = rec;
    rcResEl.style.color = color;
  }

  [cEl, hEl, a2El, dEl, s2El, vEl, aEl, scEl].forEach(el => el.addEventListener('change', update));
  update();
})();