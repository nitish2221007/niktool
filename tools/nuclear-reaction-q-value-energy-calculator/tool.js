(() => {
  'use strict';
  const rEl = document.getElementById('qv-r'), pEl = document.getElementById('qv-p');
  const qResEl = document.getElementById('qv-res-q'), tResEl = document.getElementById('qv-res-type');

  const mevPerU = 931.4940954;
  const joulesPerMev = 1.602176634e-13;

  function update() {
    const mR = parseFloat(rEl.value), mP = parseFloat(pEl.value);
    if (isNaN(mR) || isNaN(mP) || mR <= 0 || mP <= 0) return;

    const dm = mR - mP;
    const qMev = dm * mevPerU;
    const qJoules = qMev * joulesPerMev;

    qResEl.textContent = (qMev >= 0 ? '+' : '') + qMev.toFixed(2) + ' MeV';

    if (qMev > 0) {
      tResEl.textContent = 'Exoergic (Energy Released: ' + (qJoules * 1e12).toFixed(2) + ' pJ per reaction event)';
      tResEl.style.color = '#22543d';
    } else {
      tResEl.textContent = 'Endoergic Threshold Reaction (Requires |Q| = ' + Math.abs(qMev).toFixed(2) + ' MeV input energy)';
      tResEl.style.color = '#c53030';
    }
  }

  rEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();