(() => {
  'use strict';
  const mEl = document.getElementById('mag-app'), MEl = document.getElementById('mag-abs');
  const pcEl = document.getElementById('mag-res-pc'), lyEl = document.getElementById('mag-res-ly'), modEl = document.getElementById('mag-res-mod');

  function update() {
    const m = parseFloat(mEl.value), M = parseFloat(MEl.value);
    if (isNaN(m) || isNaN(M)) return;

    // m - M = 5 * log10(d_pc) - 5 => d_pc = 10^((m - M + 5) / 5)
    const dm = m - M;
    const dPc = Math.pow(10, (dm + 5) / 5);
    const dLy = dPc * 3.26156;

    pcEl.textContent = dPc >= 1000 ? (dPc / 1000).toFixed(2) + ' kpc' : dPc.toFixed(2) + ' Parsecs';
    lyEl.textContent = dLy >= 1e6 ? (dLy / 1e6).toFixed(2) + ' Million ly' : dLy.toFixed(2) + ' Light-Years';
    modEl.textContent = dm.toFixed(2) + ' mag';
  }

  mEl.addEventListener('input', update);
  MEl.addEventListener('input', update);
  update();
})();