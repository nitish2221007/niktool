(() => {
  'use strict';
  const preEl = document.getElementById('kd-pre'), postEl = document.getElementById('kd-post');
  const tEl = document.getElementById('kd-t'), ufEl = document.getElementById('kd-uf'), wEl = document.getElementById('kd-w');
  const ktResEl = document.getElementById('kd-res-ktv'), urResEl = document.getElementById('kd-res-urr');

  function update() {
    const C0 = parseFloat(preEl.value), C = parseFloat(postEl.value);
    const t_hr = parseFloat(tEl.value), UF_L = parseFloat(ufEl.value), W_kg = parseFloat(wEl.value);

    if (isNaN(C0) || isNaN(C) || isNaN(t_hr) || isNaN(UF_L) || isNaN(W_kg) || C0 <= C || C <= 0 || t_hr <= 0 || W_kg <= 0) return;

    // Urea ratio R = C / C0
    const R = C / C0;

    // Urea reduction ratio URR:
    const URR_pct = (1.0 - R) * 100.0;

    // Daugirdas 2nd generation spKt/V formula:
    // spKt/V = - ln( R - 0.008 * t ) + ( 4 - 3.5 * R ) * ( UF / W )
    const term1 = - Math.log(R - (0.008 * t_hr));
    const term2 = (4.0 - (3.5 * R)) * (UF_L / W_kg);
    const spKtV = term1 + term2;

    let eval_text = '', color = '#22543d';
    if (spKtV < 1.20) {
      eval_text = 'INADEQUATE DIALYSIS DOSE (spKt/V < 1.20: Increase blood flow, dialysate flow, or duration)';
      color = '#c53030';
    } else if (spKtV < 1.40) {
      eval_text = 'BORDERLINE ADEQUACY (Meets KDOQI minimum 1.20, below target 1.40)';
      color = '#ea580c';
    } else {
      eval_text = 'OPTIMAL ADEQUATE DIALYSIS DOSE (spKt/V ≥ 1.40 Target ✓)';
      color = '#22543d';
    }

    ktResEl.textContent = 'Dialysis Dose spKt/V = ' + spKtV.toFixed(2) + ' (' + (spKtV >= 1.20 ? 'ADEQUATE' : 'INADEQUATE') + ')';
    ktResEl.style.color = color;
    urResEl.textContent = 'URR = ' + URR_pct.toFixed(1) + '% | ' + eval_text + ' (R = ' + R.toFixed(3) + ' @ ' + t_hr + ' hr, UF = ' + UF_L + ' L)';
  }

  [preEl, postEl, tEl, ufEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();