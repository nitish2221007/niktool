(() => {
  'use strict';
  const cfgEl = document.getElementById('bs-cfg'), iEl = document.getElementById('bs-i'), rEl = document.getElementById('bs-r');
  const bResEl = document.getElementById('bs-res-b'), dsResEl = document.getElementById('bs-res-desc');

  const mu_0 = 4.0 * Math.PI * 1e-7; // T * m / A

  function update() {
    const isWire = cfgEl.value === 'wire';
    const I = parseFloat(iEl.value), val = parseFloat(rEl.value);

    if (isNaN(I) || isNaN(val) || I <= 0 || val <= 0) return;

    let B_tesla = 0;
    if (isWire) {
      // Straight wire: B = ( mu_0 * I ) / ( 2 * pi * r )
      const r_m = val / 100.0;
      B_tesla = (mu_0 * I) / (2.0 * Math.PI * r_m);
    } else {
      // Solenoid: B = mu_0 * n * I (val = turns per meter)
      const n_turns_m = val;
      B_tesla = mu_0 * n_turns_m * I;
    }

    const B_uT = B_tesla * 1e6;
    const B_gauss = B_tesla * 1e4;

    bResEl.textContent = 'Field B = ' + (B_uT >= 1000 ? (B_uT/1000).toFixed(3) + ' mT' : B_uT.toFixed(2) + ' μT') + ' (' + B_gauss.toFixed(3) + ' Gauss)';
    dsResEl.textContent = (isWire ? 'Straight Wire at r = ' + val + ' cm' : 'Solenoid Coil with n = ' + val + ' turns/m') + ' @ Current I = ' + I + ' A';
  }

  [cfgEl, iEl, rEl].forEach(el => el.addEventListener('input', update));
  cfgEl.addEventListener('change', update);
  update();
})();