(() => {
  'use strict';
  const kEl = document.getElementById('eul-k'), eEl = document.getElementById('eul-e');
  const iEl = document.getElementById('eul-i'), lEl = document.getElementById('eul-l');
  const pResEl = document.getElementById('eul-res-pcr'), efResEl = document.getElementById('eul-res-eff');

  function update() {
    const K = parseFloat(kEl.value), eGpa = parseFloat(eEl.value);
    const iCm4 = parseFloat(iEl.value), lM = parseFloat(lEl.value);

    if (isNaN(K) || isNaN(eGpa) || isNaN(iCm4) || isNaN(lM) || eGpa <= 0 || iCm4 <= 0 || lM <= 0) return;

    const ePa = eGpa * 1e9;
    const iM4 = iCm4 * 1e-8; // 1 cm^4 = 10^-8 m^4
    const effLen = K * lM;

    // Euler formula: P_cr = (pi^2 * E * I) / (K * L)^2  [Newtons]
    const Pcr_N = (Math.pow(Math.PI, 2) * ePa * iM4) / Math.pow(effLen, 2);
    const Pcr_kN = Pcr_N / 1000;
    const Pcr_kips = Pcr_kN * 0.224809;

    pResEl.textContent = Math.round(Pcr_kN).toLocaleString() + ' kN (' + Pcr_kips.toFixed(1) + ' kips)';
    efResEl.textContent = 'KL = ' + effLen.toFixed(2) + ' meters (K = ' + K + ')';
  }

  [kEl, eEl, iEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();