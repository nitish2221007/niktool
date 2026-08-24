(() => {
  'use strict';
  const fpEl = document.getElementById('but-fp'), fsEl = document.getElementById('but-fs');
  const apEl = document.getElementById('but-ap'), asEl = document.getElementById('but-as');
  const oResEl = document.getElementById('but-res-ord'), rResEl = document.getElementById('but-res-roll');

  function update() {
    const Fp = parseFloat(fpEl.value), Fs = parseFloat(fsEl.value);
    const Ap = parseFloat(apEl.value), As = parseFloat(asEl.value);

    if (isNaN(Fp) || isNaN(Fs) || isNaN(Ap) || isNaN(As) || Fp <= 0 || Fs <= Fp || Ap <= 0 || As <= Ap) return;

    const num = Math.log10((Math.pow(10, 0.1 * As) - 1) / (Math.pow(10, 0.1 * Ap) - 1));
    const den = 2 * Math.log10(Fs / Fp);
    const N_calc = num / den;
    const N = Math.ceil(N_calc);

    const rollOffOctave = N * 6;
    const rollOffDecade = N * 20;

    oResEl.textContent = 'N = ' + N + 'th Order (Poles: ' + N + ', Exact: ' + N_calc.toFixed(2) + ')';
    rResEl.textContent = 'Roll-Off: -' + rollOffOctave + ' dB / Octave (-' + rollOffDecade + ' dB / Decade, Maximally Flat Passband)';
  }

  [fpEl, fsEl, apEl, asEl].forEach(el => el.addEventListener('input', update));
  update();
})();