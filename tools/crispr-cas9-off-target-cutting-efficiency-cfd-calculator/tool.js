(() => {
  'use strict';
  const pamEl = document.getElementById('cr-pam'), sdEl = document.getElementById('cr-seed'), dsEl = document.getElementById('cr-dist');
  const cfdResEl = document.getElementById('cr-res-cfd'), rkResEl = document.getElementById('cr-res-risk');

  function update() {
    const pamWeight = parseFloat(pamEl.value);
    const nSeed = parseInt(sdEl.value, 10), nDist = parseInt(dsEl.value, 10);

    if (isNaN(pamWeight) || isNaN(nSeed) || isNaN(nDist) || nSeed < 0 || nDist < 0) return;

    // Doench 2016 CFD multiplicative penalty:
    // Seed mismatches (pos 1-10 close to PAM) reduce cutting heavily (~0.20 per mismatch)
    // Distal mismatches (pos 11-20) reduce cutting moderately (~0.65 per mismatch)
    const seedPenalty = Math.pow(0.22, nSeed);
    const distPenalty = Math.pow(0.68, nDist);

    const cfd_score = pamWeight * seedPenalty * distPenalty * 100.0;

    let risk = '', color = '#22543d';
    if (cfd_score >= 50.0) {
      risk = 'HIGH OFF-TARGET RISK (Cleavage probability > 50%: Validate with GUIDE-seq)';
      color = '#c53030';
    } else if (cfd_score >= 10.0) {
      risk = 'MODERATE RISK (10 - 50%: Possible non-specific indel formation)';
      color = '#ea580c';
    } else {
      risk = 'VERY LOW OFF-TARGET RISK (Cleavage < 10%: Highly specific on-target cutting)';
      color = '#22543d';
    }

    cfdResEl.textContent = 'CFD Score = ' + cfd_score.toFixed(1) + '%';
    cfdResEl.style.color = color;
    rkResEl.textContent = risk + ' (PAM factor: ' + pamWeight + ')';
    rkResEl.style.color = color;
  }

  [pamEl, sdEl, dsEl].forEach(el => el.addEventListener('input', update));
  pamEl.addEventListener('change', update);
  update();
})();