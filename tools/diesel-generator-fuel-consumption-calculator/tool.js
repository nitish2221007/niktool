(() => {
  'use strict';
  const kwEl = document.getElementById('gen-kw'), ldEl = document.getElementById('gen-load'), tkEl = document.getElementById('gen-tank');
  const rResEl = document.getElementById('gen-res-rate'), runResEl = document.getElementById('gen-res-run'), gphResEl = document.getElementById('gen-res-gph');

  function update() {
    const kw = parseFloat(kwEl.value), load = parseFloat(ldEl.value), tankL = parseFloat(tkEl.value);
    if (isNaN(kw) || isNaN(load) || isNaN(tankL) || kw <= 0 || load <= 0 || tankL <= 0) return;

    // Standard diesel specific fuel consumption rule of thumb:
    // Full load: ~0.070 gallons per hour per kW (approx 0.265 L / kWh)
    // Part load scaling:
    const specificBurnGpkW = 0.070 * (0.35 + 0.65 * load);
    const gph = kw * specificBurnGpkW * load;
    const lph = gph * 3.78541;

    const runtimeHours = tankL / lph;

    rResEl.textContent = lph.toFixed(1) + ' L / hour';
    runResEl.textContent = runtimeHours.toFixed(1) + ' Hours (' + (runtimeHours / 24).toFixed(1) + ' Days)';
    gphResEl.textContent = gph.toFixed(2) + ' GPH (US Gallons/hr)';
  }

  [kwEl, ldEl, tkEl].forEach(el => el.addEventListener('input', update));
  update();
})();