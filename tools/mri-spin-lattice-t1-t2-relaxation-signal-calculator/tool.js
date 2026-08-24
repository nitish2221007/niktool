(() => {
  'use strict';
  const trEl = document.getElementById('mri-tr'), teEl = document.getElementById('mri-te'), tisEl = document.getElementById('mri-tissue');
  const sResEl = document.getElementById('mri-res-sig'), wtResEl = document.getElementById('mri-res-wt');

  const TISSUES = {
    'fat':   { t1: 250,  t2: 80,   name: 'Lipid / Fat' },
    'white': { t1: 800,  t2: 80,   name: 'White Matter' },
    'gray':  { t1: 1100, t2: 100,  name: 'Gray Matter' },
    'csf':   { t1: 4000, t2: 2000, name: 'CSF Water' }
  };

  function update() {
    const t = TISSUES[tisEl.value];
    const TR = parseFloat(trEl.value), TE = parseFloat(teEl.value);

    if (isNaN(TR) || isNaN(TE) || TR <= 0 || TE < 0) return;

    // Spin echo equation: S = ( 1 - exp(-TR / T1) ) * exp(-TE / T2)
    const t1Term = 1.0 - Math.exp(-TR / t.t1);
    const t2Term = Math.exp(-TE / t.t2);
    const S = t1Term * t2Term;

    let weighting = '';
    let color = '#22543d';

    if (TR < 800 && TE < 30) {
      weighting = 'T1-WEIGHTED: Anatomy mapping (Fat bright, CSF dark)';
      color = '#22543d';
    } else if (TR > 2000 && TE > 70) {
      weighting = 'T2-WEIGHTED: Pathology & Edema detection (Water/CSF bright)';
      color = '#2563eb';
    } else if (TR > 2000 && TE < 30) {
      weighting = 'PROTON DENSITY (PD-WEIGHTED): High SNR tissue density mapping';
      color = '#d97706';
    } else {
      weighting = 'MIXED T1/T2 WEIGHTING (Intermediate Contrast)';
      color = '#4a5568';
    }

    sResEl.textContent = 'Signal S = ' + S.toFixed(3) + ' (' + (S * 100).toFixed(1) + '% Max | T₁ Recov: ' + (t1Term*100).toFixed(0) + '%, T₂ Decay: ' + (t2Term*100).toFixed(0) + '%)';
    wtResEl.textContent = weighting + ' - ' + t.name;
    wtResEl.style.color = color;
  }

  [trEl, teEl].forEach(el => el.addEventListener('input', update));
  tisEl.addEventListener('change', update);
  update();
})();