(() => {
  'use strict';
  const vinEl = document.getElementById('bjt-vin'), icEl = document.getElementById('bjt-ic');
  const bEl = document.getElementById('bjt-beta'), vbeEl = document.getElementById('bjt-vbe');
  const rbResEl = document.getElementById('bjt-res-rb'), ibResEl = document.getElementById('bjt-res-ib');

  function update() {
    const vin = parseFloat(vinEl.value), icMa = parseFloat(icEl.value);
    const beta = parseFloat(bEl.value), vbe = parseFloat(vbeEl.value);

    if (isNaN(vin) || isNaN(icMa) || isNaN(beta) || isNaN(vbe) || vin <= vbe || icMa <= 0 || beta <= 0) return;

    // Required base current I_B = I_C / beta_sat (mA)
    const ibMa = icMa / beta;
    const ibA = ibMa * 1e-3;

    // R_B = (V_in - V_BE) / I_B (Ohms)
    const rbOhms = (vin - vbe) / ibA;

    // Pick closest standard E24 resistor
    const standardE24 = [100, 120, 150, 180, 220, 270, 330, 390, 430, 470, 510, 560, 680, 750, 820, 1000, 1200, 1500, 1800, 2200, 2700, 3300, 4700, 10000];
    let bestE24 = standardE24[0];
    let minDiff = Infinity;
    for (const val of standardE24) {
      if (val <= rbOhms) { // Choose smaller or equal resistor to guarantee full saturation
        const diff = rbOhms - val;
        if (diff < minDiff) { minDiff = diff; bestE24 = val; }
      }
    }

    rbResEl.textContent = bestE24 + ' Ω (Calculated ' + Math.round(rbOhms) + ' Ω)';
    ibResEl.textContent = ibMa.toFixed(1) + ' mA (' + (vin - vbe).toFixed(2) + 'V across R_B)';
  }

  [vinEl, icEl, bEl, vbeEl].forEach(el => el.addEventListener('input', update));
  update();
})();