(() => {
  'use strict';
  const trEl = document.getElementById('bl-tr'), teEl = document.getElementById('bl-te');
  const t1El = document.getElementById('bl-t1'), t2El = document.getElementById('bl-t2');
  const sgResEl = document.getElementById('bl-res-sig'), wtResEl = document.getElementById('bl-res-weight');

  function update() {
    const TR = parseFloat(trEl.value), TE = parseFloat(teEl.value);
    const T1 = parseFloat(t1El.value), T2 = parseFloat(t2El.value);

    if (isNaN(TR) || isNaN(TE) || isNaN(T1) || isNaN(T2) || TR <= 0 || TE < 0 || T1 <= 0 || T2 <= 0) return;

    // Longitudinal T1 recovery fraction: (1 - exp(-TR / T1))
    const t1_recovery = 1.0 - Math.exp(- TR / T1);

    // Transverse T2 decay fraction: exp(-TE / T2)
    const t2_decay = Math.exp(- TE / T2);

    // Relative spin echo signal:
    const S = t1_recovery * t2_decay;

    let weighting = '', color = '#22543d';
    if (TR <= 800 && TE <= 30) {
      weighting = 'T1-WEIGHTED IMAGE (Short TR / Short TE: Anatomy & Fat Bright)';
      color = '#22543d';
    } else if (TR >= 2000 && TE >= 80) {
      weighting = 'T2-WEIGHTED IMAGE (Long TR / Long TE: Water / CSF / Edema Bright)';
      color = '#22543d';
    } else if (TR >= 2000 && TE <= 30) {
      weighting = 'PROTON DENSITY (PD) WEIGHTED (Long TR / Short TE: High SNR)';
      color = '#22543d';
    } else {
      weighting = 'MIXED T1/T2 CONTRAST (Intermediate Sequence)';
      color = '#ea580c';
    }

    sgResEl.textContent = 'Relative Signal S = ' + S.toFixed(3) + ' (' + (S * 100).toFixed(1) + '% Max)';
    wtResEl.textContent = weighting + ' [T1 Recovery = ' + (t1_recovery*100).toFixed(1) + '%, T2 Remaining = ' + (t2_decay*100).toFixed(1) + '%]';
    wtResEl.style.color = color;
  }

  [trEl, teEl, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();