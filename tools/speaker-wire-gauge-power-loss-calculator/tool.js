(() => {
  'use strict';
  const awgEl = document.getElementById('spk-awg'), lEl = document.getElementById('spk-len'), zEl = document.getElementById('spk-ohms');
  const resEl = document.getElementById('spk-res-res'), lossEl = document.getElementById('spk-res-loss');

  // Resistance per 1000m (Ohms / km) for copper
  const AWG_RES = { '12': 5.21, '14': 8.28, '16': 13.17, '18': 20.95 };

  function update() {
    const awg = awgEl.value;
    const lenM = parseFloat(lEl.value);
    const zSpk = parseFloat(zEl.value);
    if (isNaN(lenM) || isNaN(zSpk) || lenM <= 0 || zSpk <= 0) return;

    // Loop resistance = 2 conductors * length (km) * Ohms/km
    const rPerKm = AWG_RES[awg] || 13.17;
    const rLoop = 2 * (lenM / 1000) * rPerKm;

    // Voltage divider attenuation = zSpk / (zSpk + rLoop)
    const voltRatio = zSpk / (zSpk + rLoop);
    const dbLoss = 20 * Math.log10(voltRatio);
    const powerLossPct = (1 - Math.pow(voltRatio, 2)) * 100;

    resEl.textContent = rLoop.toFixed(3) + ' Ω';
    lossEl.textContent = dbLoss.toFixed(2) + ' dB (' + powerLossPct.toFixed(1) + '% Power Loss)';
  }

  [awgEl, lEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();