(() => {
  'use strict';
  const muEl = document.getElementById('hu-mu'), muwEl = document.getElementById('hu-muw');
  const valResEl = document.getElementById('hu-res-val'), clResEl = document.getElementById('hu-res-class');

  function update() {
    const mu = parseFloat(muEl.value), mu_w = parseFloat(muwEl.value);
    if (isNaN(mu) || isNaN(mu_w) || mu < 0 || mu_w <= 0) return;

    // Hounsfield unit formula: HU = 1000 * (mu - mu_w) / mu_w
    const HU = 1000.0 * (mu - mu_w) / mu_w;
    const round_HU = Math.round(HU);

    let tissue = '', windowing = '';
    if (round_HU <= -900) {
      tissue = 'AIR / LUNG TRACHEA (Black)';
      windowing = 'Lung Window: L = -600, W = 1500';
    } else if (round_HU <= -500) {
      tissue = 'LUNG PARENCHYMA';
      windowing = 'Lung Window: L = -600, W = 1500';
    } else if (round_HU <= -30) {
      tissue = 'ADIPOSE FAT TISSUE';
      windowing = 'Soft Tissue: L = +40, W = 350';
    } else if (round_HU <= 15) {
      tissue = 'WATER / CYST / CSF (0 HU Reference)';
      windowing = 'Soft Tissue: L = +40, W = 350';
    } else if (round_HU <= 80) {
      tissue = 'SOFT TISSUE / LIVER / MUSCLE / BLOOD';
      windowing = 'Abdominal Window: L = +40, W = 350';
    } else if (round_HU <= 300) {
      tissue = 'ACUTE CLOT / CONTRAST ENHANCEMENT';
      windowing = 'Angio Window: L = +100, W = 600';
    } else {
      tissue = 'CANCELLOUS / CORTICAL COMPACT BONE';
      windowing = 'Bone Window: L = +500, W = 2000';
    }

    valResEl.textContent = 'CT Radiodensity = ' + (round_HU >= 0 ? '+' : '') + round_HU + ' HU (' + tissue + ')';
    clResEl.textContent = tissue + ' | Recommended CT Display: ' + windowing + ' (μ = ' + mu.toFixed(3) + ' cm⁻¹)';
  }

  muEl.addEventListener('input', update);
  muwEl.addEventListener('input', update);
  update();
})();