(() => {
  'use strict';
  const sigEl = document.getElementById('nyq-fsig'), fsEl = document.getElementById('nyq-fs');
  const alResEl = document.getElementById('nyq-res-alias'), stResEl = document.getElementById('nyq-res-stat');

  function update() {
    const Fsig = parseFloat(sigEl.value), Fs = parseFloat(fsEl.value);
    if (isNaN(Fsig) || isNaN(Fs) || Fsig <= 0 || Fs <= 0) return;

    const Fnyq = Fs / 2;
    const rem = Fsig % Fs;
    let fAlias = rem;
    if (rem > Fnyq) {
      fAlias = Fs - rem;
    }

    alResEl.textContent = fAlias.toFixed(1) + ' Hz (Apparent Digital Output)';

    if (Fsig <= Fnyq) {
      stResEl.textContent = 'NO ALIASING: Perfect Reconstruction (Signal ≤ ' + Fnyq.toFixed(1) + ' Hz Nyquist Boundary)';
      stResEl.style.color = '#22543d';
    } else {
      stResEl.textContent = 'SEVERE ALIASING: Signal Exceeds Nyquist ' + Fnyq.toFixed(1) + ' Hz (Foldback Distortion |' + Fsig + ' - ' + Fs + '| = ' + fAlias.toFixed(1) + ' Hz)';
      stResEl.style.color = '#c53030';
    }
  }

  sigEl.addEventListener('input', update);
  fsEl.addEventListener('input', update);
  update();
})();