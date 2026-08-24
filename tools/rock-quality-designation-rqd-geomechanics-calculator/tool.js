(() => {
  'use strict';
  const totEl = document.getElementById('rqd-tot'), pcEl = document.getElementById('rqd-pieces');
  const vResEl = document.getElementById('rqd-res-val'), dResEl = document.getElementById('rqd-res-desc');

  function update() {
    const Ltot = parseFloat(totEl.value);
    const raw = pcEl.value;

    if (isNaN(Ltot) || Ltot <= 0) return;

    const pieces = raw.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n >= 10.0);
    const sumSoundPieces = pieces.reduce((a, b) => a + b, 0);

    // RQD = ( sum(L_pieces >= 10cm) / L_total ) * 100%
    const rqd = Math.min(100, (sumSoundPieces / Ltot) * 100);

    let classification = '';
    let color = '#22543d';

    if (rqd < 25) {
      classification = 'VERY POOR Rock Mass (Heavy Jointing / Fracturing)';
      color = '#c53030';
    } else if (rqd < 50) {
      classification = 'POOR Rock Mass';
      color = '#d97706';
    } else if (rqd < 75) {
      classification = 'FAIR Rock Quality';
      color = '#2563eb';
    } else if (rqd < 90) {
      classification = 'GOOD Rock Quality (Stable Tunneling)';
      color = '#22543d';
    } else {
      classification = 'EXCELLENT Massive Intact Rock Mass';
      color = '#22543d';
    }

    vResEl.textContent = 'RQD = ' + rqd.toFixed(1) + '%';
    dResEl.textContent = classification + ' (' + sumSoundPieces.toFixed(0) + ' cm Sound / ' + Ltot + ' cm Run, ' + pieces.length + ' Pieces)';
    dResEl.style.color = color;
  }

  totEl.addEventListener('input', update);
  pcEl.addEventListener('input', update);
  update();
})();