(() => {
  'use strict';
  const rEl = document.getElementById('cap-r'), thEl = document.getElementById('cap-th'), gamEl = document.getElementById('cap-gam');
  const hResEl = document.getElementById('cap-res-ht'), lpResEl = document.getElementById('cap-res-lp');

  const g = 9.80665;
  const rho_water = 1000.0; // kg / m^3

  function update() {
    const rUm = parseFloat(rEl.value), thDeg = parseFloat(thEl.value), gamMnm = parseFloat(gamEl.value);
    if (isNaN(rUm) || isNaN(thDeg) || isNaN(gamMnm) || rUm <= 0 || gamMnm <= 0 || thDeg < 0 || thDeg > 180) return;

    const rM = rUm * 1e-6;
    const gamNm = gamMnm * 1e-3; // mN/m to N/m
    const thRad = (thDeg * Math.PI) / 180;

    // Jurin's law: h = (2 * gamma * cos(theta)) / (rho * g * r)  [meters]
    const hM = (2 * gamNm * Math.cos(thRad)) / (rho_water * g * rM);
    const hMm = hM * 1000;

    // Capillary Laplace suction pressure: deltaP = (2 * gamma * cos(theta)) / r  [Pa]
    const dP_Pa = (2 * gamNm * Math.cos(thRad)) / rM;

    let behavior = '';
    if (thDeg < 90) {
      behavior = 'Hydrophilic Capillary Rise (+Spontaneous Inflow Wicking)';
    } else if (thDeg === 90) {
      behavior = 'Neutral Meniscus (Zero Capillary Force)';
    } else {
      behavior = 'Hydrophobic Capillary Depression (Requires External Pressure to Enter)';
    }

    hResEl.textContent = 'h = ' + hMm.toFixed(1) + ' mm (' + (hMm / 10).toFixed(2) + ' cm Rise Height)';
    lpResEl.textContent = 'Laplace Suction: ' + Math.round(dP_Pa).toLocaleString() + ' Pa (' + (dP_Pa / 100).toFixed(1) + ' mbar) - ' + behavior;
  }

  [rEl, thEl, gamEl].forEach(el => el.addEventListener('input', update));
  update();
})();