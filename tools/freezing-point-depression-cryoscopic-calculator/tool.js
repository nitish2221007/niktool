(() => {
  'use strict';
  const sEl = document.getElementById('fp-solv'), mEl = document.getElementById('fp-m'), iEl = document.getElementById('fp-i');
  const totResEl = document.getElementById('fp-res-tot'), dtResEl = document.getElementById('fp-res-dt');

  function update() {
    const [tfStr, kfStr] = sEl.value.split(',');
    const Tf0 = parseFloat(tfStr), Kf = parseFloat(kfStr);
    const m = parseFloat(mEl.value), iFactor = parseFloat(iEl.value);

    if (isNaN(m) || isNaN(iFactor) || m <= 0 || iFactor < 1) return;

    // Delta_Tf = i * Kf * m
    const dTf = iFactor * Kf * m;
    const depressedTf = Tf0 - dTf;

    totResEl.textContent = depressedTf.toFixed(2) + ' °C (' + (depressedTf * 9/5 + 32).toFixed(1) + ' °F)';
    dtResEl.textContent = '-' + dTf.toFixed(3) + ' °C Depression';
  }

  sEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();