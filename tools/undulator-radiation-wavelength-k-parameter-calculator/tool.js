(() => {
  'use strict';
  const uEl = document.getElementById('und-lamu'), bEl = document.getElementById('und-b0'), eEl = document.getElementById('und-e');
  const lamResEl = document.getElementById('und-res-lam'), evResEl = document.getElementById('und-res-ev');

  function update() {
    const lamUMm = parseFloat(uEl.value), b0 = parseFloat(bEl.value), eGev = parseFloat(eEl.value);
    if (isNaN(lamUMm) || isNaN(b0) || isNaN(eGev) || lamUMm <= 0 || b0 <= 0 || eGev <= 0) return;

    const lamUM = lamUMm * 1e-3;
    const K = 0.09337 * b0 * lamUMm;
    const gamma = (eGev * 1e9) / 511000;
    const lamM = (lamUM / (2 * Math.pow(gamma, 2))) * (1 + (Math.pow(K, 2) / 2));
    const lamNm = lamM * 1e9;
    const lamAngstrom = lamNm * 10;
    const energyKev = 1.239841984 / lamNm;

    lamResEl.textContent = (lamNm < 0.1 ? lamAngstrom.toFixed(2) + ' Å' : lamNm.toFixed(3) + ' nm') + ' (' + lamAngstrom.toFixed(2) + ' Å Hard X-Ray)';
    evResEl.textContent = energyKev.toFixed(2) + ' keV Photons (Undulator Parameter K = ' + K.toFixed(2) + ')';
  }

  [uEl, bEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();