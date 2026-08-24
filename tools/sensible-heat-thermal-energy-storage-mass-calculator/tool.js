(() => {
  'use strict';
  const mwhEl = document.getElementById('tes-mwh'), dtEl = document.getElementById('tes-dt'), matEl = document.getElementById('tes-mat');
  const mResEl = document.getElementById('tes-res-mass'), vResEl = document.getElementById('tes-res-vol');

  const MEDIA = {
    'salt':     { cp_kj: 1.50, rho: 1850.0, name: 'Molten Nitrate Solar Salt' },
    'water':    { cp_kj: 4.18, rho: 1000.0, name: 'Pressurized Water' },
    'oil':      { cp_kj: 2.30, rho: 850.0,  name: 'Synthetic Thermal Oil' },
    'concrete': { cp_kj: 0.90, rho: 2300.0, name: 'Solid Cast Concrete' }
  };

  function update() {
    const med = MEDIA[matEl.value];
    const MWh = parseFloat(mwhEl.value), deltaT = parseFloat(dtEl.value);

    if (isNaN(MWh) || isNaN(deltaT) || MWh <= 0 || deltaT <= 0) return;

    // Convert MWh to kJ: 1 MWh = 3.6e6 kJ
    const Q_kj = MWh * 3.6e6;

    // Mass m = Q / (cp * deltaT)  [kg]
    const massKg = Q_kj / (med.cp_kj * deltaT);
    const massTonnes = massKg / 1000;

    // Volume V = massKg / rho  [m^3]
    const volM3 = massKg / med.rho;

    // Cylindrical tank with Aspect Ratio H/D = 1: V = pi/4 * D^3 => D = (4V/pi)^(1/3)
    const tankDim = Math.pow((4 * volM3) / Math.PI, 1 / 3);

    mResEl.textContent = Math.round(massTonnes).toLocaleString() + ' Tonnes (' + med.name + ')';
    vResEl.textContent = 'Tank Volume: ' + Math.round(volM3).toLocaleString() + ' m³ (' + tankDim.toFixed(1) + ' m Dia × ' + tankDim.toFixed(1) + ' m Height Cylinder @ ΔT = ' + deltaT + '°C)';
  }

  [mwhEl, dtEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();