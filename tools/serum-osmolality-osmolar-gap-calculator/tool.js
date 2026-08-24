(() => {
  'use strict';
  const mEl = document.getElementById('osm-meas'), naEl = document.getElementById('osm-na');
  const gEl = document.getElementById('osm-glu'), bunEl = document.getElementById('osm-bun');
  const gpResEl = document.getElementById('osm-res-gap'), dgResEl = document.getElementById('osm-res-diag');

  function update() {
    const measured = parseFloat(mEl.value), Na = parseFloat(naEl.value);
    const glu = parseFloat(gEl.value), bun = parseFloat(bunEl.value);

    if (isNaN(measured) || isNaN(Na) || isNaN(glu) || isNaN(bun) || measured <= 0 || Na <= 0) return;

    // Calculated Osmolality = 2 * Na + ( Glucose / 18 ) + ( BUN / 2.8 )  [mOsm / kg]
    const calculated = (2.0 * Na) + (glu / 18.0) + (bun / 2.8);

    // Osmolar Gap = Measured - Calculated
    const gap = measured - calculated;

    let diag = '';
    let color = '#22543d';

    if (gap > 10.0) {
      diag = 'ELEVATED OSMOLAR GAP (Gap > 10 mOsm/kg: Strongly suggests toxic alcohol ingestion - Methanol, Ethylene Glycol, Propylene Glycol; Fomepizole indicated!)';
      color = '#c53030';
    } else if (gap >= -10.0) {
      diag = 'NORMAL OSMOLAR GAP (-10 to +10 mOsm/kg: Osmotic solutes accounted for by sodium, glucose, and urea)';
      color = '#22543d';
    } else {
      diag = 'NEGATIVE OSMOLAR GAP (Lab measurement artifact or severe hyperlipidemia/hyperproteinemia)';
      color = '#d97706';
    }

    gpResEl.textContent = 'Osmolar Gap = ' + (gap >= 0 ? '+' : '') + gap.toFixed(1) + ' mOsm/kg';
    gpResEl.style.color = color;
    dgResEl.textContent = diag + ' | Calc Osm: ' + calculated.toFixed(1) + ' mOsm/kg (Measured: ' + measured + ')';
    dgResEl.style.color = color;
  }

  [mEl, naEl, gEl, bunEl].forEach(el => el.addEventListener('input', update));
  update();
})();