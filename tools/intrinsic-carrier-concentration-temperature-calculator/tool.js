(() => {
  'use strict';
  const mEl = document.getElementById('nic-mat'), tEl = document.getElementById('nic-t');
  const niResEl = document.getElementById('nic-res-ni'), lkResEl = document.getElementById('nic-res-leak');

  const MATS = {
    'si':   { Eg0: 1.17, alpha: 4.73e-4, beta: 636, B: 5.23e15 },
    'ge':   { Eg0: 0.74, alpha: 4.77e-4, beta: 235, B: 1.66e15 },
    'gaas': { Eg0: 1.52, alpha: 5.41e-4, beta: 204, B: 2.10e15 }
  };

  const kB_eV = 8.617333262145e-5;

  function update() {
    const mat = MATS[mEl.value], tC = parseFloat(tEl.value);
    if (isNaN(tC)) return;

    const T = tC + 273.15;
    if (T <= 0) return;

    const Eg = mat.Eg0 - ((mat.alpha * Math.pow(T, 2)) / (T + mat.beta));
    const ni = mat.B * Math.pow(T, 1.5) * Math.exp(-Eg / (2 * kB_eV * T));

    niResEl.textContent = ni.toExponential(2) + ' cm⁻³ (n_i)';
    lkResEl.textContent = 'Bandgap E_g = ' + Eg.toFixed(3) + ' eV @ ' + Math.round(T) + ' K (Thermal Voltage ' + (kB_eV * T * 1000).toFixed(1) + ' mV)';
  }

  mEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();