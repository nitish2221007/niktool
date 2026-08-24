(() => {
  'use strict';
  const vEl = document.getElementById('mcrt-v'), xEl = document.getElementById('mcrt-x');
  const xwEl = document.getElementById('mcrt-xw'), dEl = document.getElementById('mcrt-days');
  const qwResEl = document.getElementById('mcrt-res-qw'), invResEl = document.getElementById('mcrt-res-inv');

  function update() {
    const V = parseFloat(vEl.value), X = parseFloat(xEl.value);
    const Xw = parseFloat(xwEl.value), targetMCRT = parseFloat(dEl.value);

    if (isNaN(V) || isNaN(X) || isNaN(Xw) || isNaN(targetMCRT) || V <= 0 || X <= 0 || Xw <= 0 || targetMCRT <= 0) return;

    // Total biomass inventory in aeration basin = V * X / 1000  [kg solids]
    const totalMassKg = (V * X) / 1000;

    // Required daily solids wasting rate = totalMassKg / targetMCRT  [kg / day]
    const dailyWastedKg = totalMassKg / targetMCRT;

    // Waste Activated Sludge (WAS) volumetric pumping rate Q_w = (dailyWastedKg * 1000) / Xw  [m^3 / day]
    const Qw_m3_day = (dailyWastedKg * 1000) / Xw;

    qwResEl.textContent = 'Q_w = ' + Qw_m3_day.toFixed(1) + ' m³ / Day WAS Pumping';
    invResEl.textContent = 'Inventory: ' + Math.round(totalMassKg).toLocaleString() + ' kg MLSS | Waste: ' + Math.round(dailyWastedKg).toLocaleString() + ' kg/d @ ' + targetMCRT + '-Day MCRT (θ_c)';
  }

  [vEl, xEl, xwEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();