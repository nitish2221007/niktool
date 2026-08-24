(() => {
  'use strict';
  const sgsEl = document.getElementById('sl-sgs'), cwEl = document.getElementById('sl-cw');
  const sgmResEl = document.getElementById('sl-res-sgm'), cvResEl = document.getElementById('sl-res-cv');

  function update() {
    const SG_s = parseFloat(sgsEl.value), Cw = parseFloat(cwEl.value);
    if (isNaN(SG_s) || isNaN(Cw) || SG_s <= 1.0 || Cw <= 0 || Cw >= 100) return;

    // SG_slurry = 100 / ( (Cw / SG_s) + ( (100 - Cw) / 1.0 ) )
    const SG_m = 100 / ((Cw / SG_s) + (100 - Cw));
    // Volume percent solids: Cv = (Cw * SG_m) / SG_s
    const Cv = (Cw * SG_m) / SG_s;
    const dryGramsPerLiter = SG_m * (Cw / 100) * 1000;

    sgmResEl.textContent = SG_m.toFixed(3) + ' SG (' + Math.round(SG_m * 1000) + ' kg/m³)';
    cvResEl.textContent = Cv.toFixed(1) + '% Solids (Dry ' + Math.round(dryGramsPerLiter) + ' g/L)';
  }

  sgsEl.addEventListener('input', update);
  cwEl.addEventListener('input', update);
  update();
})();