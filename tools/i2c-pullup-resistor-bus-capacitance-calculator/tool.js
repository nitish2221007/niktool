(() => {
  'use strict';
  const vddEl = document.getElementById('i2c-vdd'), cbEl = document.getElementById('i2c-cb'), modeEl = document.getElementById('i2c-mode');
  const recEl = document.getElementById('i2c-res-rec'), ranEl = document.getElementById('i2c-res-range');

  function update() {
    const vdd = parseFloat(vddEl.value), cbPf = parseFloat(cbEl.value), trMaxNs = parseFloat(modeEl.value);
    if (isNaN(vdd) || isNaN(cbPf) || isNaN(trMaxNs) || vdd <= 0.8 || cbPf <= 0 || trMaxNs <= 0) return;

    const cbF = cbPf * 1e-12;
    const trMaxS = trMaxNs * 1e-9;

    // NXP I2C Specification:
    // R_min = (Vdd - Vol_max) / Iol = (Vdd - 0.4V) / 3mA
    const rMin = (vdd - 0.4) / 0.003;
    // R_max = tr_max / (0.8473 * Cb)
    const rMax = trMaxS / (0.8473 * cbF);

    const rMinK = rMin / 1000;
    const rMaxK = rMax / 1000;

    let recK = Math.sqrt(rMinK * rMaxK);
    const standardE24 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, 10.0];
    let bestFit = 2.2;
    let minDiff = Infinity;
    for (const val of standardE24) {
      if (val >= rMinK && val <= rMaxK) {
        const diff = Math.abs(val - recK);
        if (diff < minDiff) { minDiff = diff; bestFit = val; }
      }
    }

    if (rMin > rMax) {
      recEl.textContent = 'Bus Capacitance Too High!';
      recEl.style.color = '#c53030';
      ranEl.textContent = 'Reduce PCB trace length or use I2C bus buffer';
    } else {
      recEl.textContent = bestFit + ' kΩ (E24 Standard)';
      recEl.style.color = '#22543d';
      ranEl.textContent = Math.round(rMin) + ' Ω to ' + (rMaxK).toFixed(2) + ' kΩ';
    }
  }

  [vddEl, cbEl, modeEl].forEach(el => el.addEventListener('input', update));
  update();
})();