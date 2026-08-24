(() => {
  'use strict';
  const sEl = document.getElementById('pg-sun'), rEl = document.getElementById('pg-ring');
  const pEl = document.getElementById('pg-planets'), mEl = document.getElementById('pg-mode');
  const rResEl = document.getElementById('pg-res-ratio'), gResEl = document.getElementById('pg-res-geom');

  function update() {
    const Ns = parseInt(sEl.value, 10), Nr = parseInt(rEl.value, 10), nPlanets = parseInt(pEl.value, 10);
    const mode = mEl.value;

    if (isNaN(Ns) || isNaN(Nr) || isNaN(nPlanets) || Ns <= 0 || Nr <= Ns || nPlanets < 2) return;

    const Np_calc = (Nr - Ns) / 2;
    const isIntegerPlanet = Number.isInteger(Np_calc);
    const isAssembled = (Ns + Nr) % nPlanets === 0;

    let ratio = 1.0;
    let desc = '';

    if (mode === 'sun_in_carrier_out') {
      ratio = 1 + (Nr / Ns);
      desc = ratio.toFixed(2) + ' : 1 Speed Reducer (Torque ×' + ratio.toFixed(2) + ')';
    } else if (mode === 'carrier_in_sun_out') {
      ratio = 1 / (1 + (Nr / Ns));
      desc = '1 : ' + (1 / ratio).toFixed(2) + ' Overdrive Multiplier';
    } else if (mode === 'sun_in_ring_out') {
      ratio = Nr / Ns;
      desc = ratio.toFixed(2) + ' : 1 Reverse Direction Inverter';
    }

    rResEl.textContent = desc;

    let status = '';
    if (isIntegerPlanet && isAssembled) {
      status = 'Planet Teeth N_p = ' + Np_calc + ' | VALID ASSEMBLY (' + nPlanets + ' Planets Symmetrically Meshed)';
      gResEl.style.color = '#22543d';
    } else {
      status = 'Planet N_p = ' + Np_calc + ' | INVALID ASSEMBLY (Check (N_s + N_r) % Planets == 0)';
      gResEl.style.color = '#c53030';
    }
    gResEl.textContent = status;
  }

  [sEl, rEl, pEl].forEach(el => el.addEventListener('input', update));
  mEl.addEventListener('change', update);
  update();
})();