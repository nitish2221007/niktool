(() => {
  'use strict';
  const wlEl = document.getElementById('ph-wl'), fEl = document.getElementById('ph-freq');
  const evEl = document.getElementById('ph-res-ev'), jEl = document.getElementById('ph-res-joules'), frqEl = document.getElementById('ph-res-calc-freq');

  const h = 6.62607015e-34; // Planck's constant (J·s)
  const c = 299792458; // Speed of light (m/s)
  const eV_J = 1.602176634e-19; // Joules per eV

  function updateFromWl() {
    const wlNm = parseFloat(wlEl.value);
    if (isNaN(wlNm) || wlNm <= 0) return;

    const lambdaM = wlNm * 1e-9;
    const freqHz = c / lambdaM;
    const freqThz = freqHz / 1e12;
    const eJoules = (h * c) / lambdaM;
    const eEv = eJoules / eV_J;

    fEl.value = freqThz.toFixed(2);
    evEl.textContent = eEv.toFixed(3) + ' eV';
    jEl.textContent = eJoules.toExponential(2) + ' J';
    frqEl.textContent = freqThz.toFixed(2) + ' THz';
  }

  function updateFromFreq() {
    const freqThz = parseFloat(fEl.value);
    if (isNaN(freqThz) || freqThz <= 0) return;

    const freqHz = freqThz * 1e12;
    const lambdaM = c / freqHz;
    const wlNm = lambdaM * 1e9;
    const eJoules = h * freqHz;
    const eEv = eJoules / eV_J;

    wlEl.value = wlNm.toFixed(1);
    evEl.textContent = eEv.toFixed(3) + ' eV';
    jEl.textContent = eJoules.toExponential(2) + ' J';
    frqEl.textContent = freqThz.toFixed(2) + ' THz';
  }

  wlEl.addEventListener('input', updateFromWl);
  fEl.addEventListener('input', updateFromFreq);
  updateFromWl();
})();