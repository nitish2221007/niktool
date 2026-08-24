(() => {
  'use strict';
  const insEl = document.getElementById('uval-ins'), shEl = document.getElementById('uval-sheath');
  const aEl = document.getElementById('uval-area'), dtEl = document.getElementById('uval-dt');
  const uResEl = document.getElementById('uval-res-u'), qResEl = document.getElementById('uval-res-q');

  const R_si_air_film = 0.17;

  function update() {
    const R_ins = parseFloat(insEl.value), R_sh = parseFloat(shEl.value);
    const Area = parseFloat(aEl.value), deltaT = parseFloat(dtEl.value);

    if (isNaN(R_ins) || isNaN(R_sh) || isNaN(Area) || isNaN(deltaT) || R_ins < 0 || R_sh < 0 || Area <= 0 || deltaT <= 0) return;

    const R_total_SI = R_si_air_film + R_ins + R_sh;
    const U_SI = 1 / R_total_SI;
    const R_US = R_total_SI * 5.678263;
    const q_watts = U_SI * Area * deltaT;

    uResEl.textContent = 'U = ' + U_SI.toFixed(3) + ' W / m²·K (U-US: ' + (1/R_US).toFixed(3) + ')';
    qResEl.textContent = 'Heat Loss: ' + q_watts.toFixed(1) + ' W (' + (q_watts * 3.412142).toFixed(0) + ' BTU/h | Total R-' + R_US.toFixed(1) + ' US)';
  }

  [insEl, shEl, aEl, dtEl].forEach(el => el.addEventListener('input', update));
  update();
})();