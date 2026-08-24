(() => {
  'use strict';
  const tisEl = document.getElementById('hu-tissue'), muEl = document.getElementById('hu-mu');
  const hResEl = document.getElementById('hu-res-val'), wResEl = document.getElementById('hu-res-win');

  const mu_water = 0.200; // cm^-1 @ 120 kVp
  const mu_air = 0.0002;

  const PRESETS = {
    'water':  { mu: 0.200, hu: 0, win: 'Mediastinum (WL = 40, WW = 400)' },
    'air':    { mu: 0.0002, hu: -1000, win: 'Lung Window (WL = -600, WW = 1500)' },
    'lung':   { mu: 0.060, hu: -700, win: 'Lung Window (WL = -600, WW = 1500)' },
    'fat':    { mu: 0.180, hu: -100, win: 'Abdominal Soft Tissue (WL = 40, WW = 350)' },
    'muscle': { mu: 0.208, hu: 40, win: 'Soft Tissue (WL = 40, WW = 400)' },
    'blood':  { mu: 0.216, hu: 80, win: 'Brain Stroke / Hemorrhage (WL = 40, WW = 80)' },
    'bone':   { mu: 0.400, hu: 1000, win: 'Bone Window (WL = 400, WW = 2000)' }
  };

  function update() {
    const mu = parseFloat(muEl.value);
    if (isNaN(mu) || mu < 0) return;

    // HU = 1000 * (mu - mu_water) / (mu_water - mu_air)
    const HU = Math.round(1000 * (mu - mu_water) / (mu_water - mu_air));

    let tissueDesc = '';
    if (HU <= -900) tissueDesc = 'Air / Gas Space (-1000 HU)';
    else if (HU <= -400) tissueDesc = 'Aerated Lung Parenchyma (-700 to -500 HU)';
    else if (HU <= -30) tissueDesc = 'Adipose / Fat Tissue (-120 to -60 HU)';
    else if (HU <= 15) tissueDesc = 'Water / Simple Serous Fluid (0 to 15 HU)';
    else if (HU <= 45) tissueDesc = 'Soft Tissue / Muscle (+35 to +45 HU)';
    else if (HU <= 90) tissueDesc = 'Acute Clotted Blood / Hemorrhage (+60 to +85 HU)';
    else if (HU <= 300) tissueDesc = 'Trabecular Cancellous Bone (+150 to +300 HU)';
    else tissueDesc = 'Dense Cortical Bone / Calcification / Metal Artifact (>+500 HU)';

    hResEl.textContent = (HU >= 0 ? '+' : '') + HU + ' HU (' + tissueDesc + ')';
    wResEl.textContent = 'Linear Attenuation μ = ' + mu.toFixed(4) + ' cm⁻¹ | Standard Clinical Windowing: ' + PRESETS[tisEl.value].win;
  }

  tisEl.addEventListener('change', () => {
    muEl.value = PRESETS[tisEl.value].mu;
    update();
  });
  muEl.addEventListener('input', update);
  update();
})();