(() => {
  'use strict';
  const gEl = document.getElementById('blt-grade'), dEl = document.getElementById('blt-diam');
  const tEl = document.getElementById('blt-t'), pEl = document.getElementById('blt-planes');
  const capResEl = document.getElementById('blt-res-cap'), brResEl = document.getElementById('blt-res-bear');

  const phi = 0.75; // AISC LRFD resistance factor

  function update() {
    const fnvKsi = parseFloat(gEl.value), dIn = parseFloat(dEl.value);
    const tIn = parseFloat(tEl.value), planes = parseInt(pEl.value, 10);

    if (isNaN(fnvKsi) || isNaN(dIn) || isNaN(tIn) || tIn <= 0) return;

    // Nominal cross section area A_b = pi * (d^2) / 4 (sq in)
    const Ab = (Math.PI * Math.pow(dIn, 2)) / 4;
    // Nominal shear Rn_shear = Fnv * Ab * planes
    const Rn_shear = fnvKsi * Ab * planes;
    const phiRn_shear = phi * Rn_shear;

    // Nominal bearing strength Rn_bearing = 2.4 * d * t * Fu (Assuming Fu = 58 ksi for A36/A992)
    const Fu = 58.0; // ksi
    const Rn_bearing = 2.4 * dIn * tIn * Fu;
    const phiRn_bearing = phi * Rn_bearing;

    const knShear = phiRn_shear * 4.44822;

    capResEl.textContent = phiRn_shear.toFixed(2) + ' kips (' + knShear.toFixed(1) + ' kN)';
    brResEl.textContent = phiRn_bearing.toFixed(2) + ' kips (Plate Tearout Limit)';
  }

  [gEl, dEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();