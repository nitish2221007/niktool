(() => {
  'use strict';
  const ctEl = document.getElementById('suv-ct'), dsEl = document.getElementById('suv-dose');
  const tEl = document.getElementById('suv-t'), wEl = document.getElementById('suv-w');
  const svResEl = document.getElementById('suv-res-val'), evResEl = document.getElementById('suv-res-eval');

  const half_life_F18 = 109.77; // minutes for Fluorine-18

  function update() {
    const C_tissue_kBq_mL = parseFloat(ctEl.value), Injected_MBq = parseFloat(dsEl.value);
    const time_min = parseFloat(tEl.value), W_kg = parseFloat(wEl.value);

    if (isNaN(C_tissue_kBq_mL) || isNaN(Injected_MBq) || isNaN(time_min) || isNaN(W_kg) || C_tissue_kBq_mL < 0 || Injected_MBq <= 0 || time_min < 0 || W_kg <= 0) return;

    // Decay correction for 18F: Dose_decayed = Dose_inj * exp( - ln(2) * t / t_1/2 )
    const lambda_decay = Math.LN2 / half_life_F18;
    const Decayed_Dose_MBq = Injected_MBq * Math.exp(- lambda_decay * time_min);

    // Injected dose concentration in kBq / g (assuming tissue density 1 g/mL):
    // Dose_conc_kBq_g = (Decayed_Dose_MBq * 1000 kBq/MBq) / (W_kg * 1000 g/kg) = Decayed_Dose_MBq / W_kg
    const Dose_conc = Decayed_Dose_MBq / W_kg;

    // SUV_bw = C_tissue / Dose_conc
    const SUV_bw = C_tissue_kBq_mL / Dose_conc;

    let eval_text = '', color = '#22543d';
    if (SUV_bw > 5.0) {
      eval_text = 'INTENSE HYPERMETABOLISM (Strongly suggestive of active malignancy / high-grade lymphoma/carcinoma)';
      color = '#c53030';
    } else if (SUV_bw >= 2.5) {
      eval_text = 'MODERATE FDG AVIDITY (Malignant lesion or active inflammatory granuloma)';
      color = '#ea580c';
    } else {
      eval_text = 'PHYSIOLOGICAL / BENIGN BACKGROUND (Low metabolic glucose turnover)';
      color = '#22543d';
    }

    svResEl.textContent = 'SUV_bw = ' + SUV_bw.toFixed(2) + ' (' + (SUV_bw >= 2.5 ? 'HYPERMETABOLIC' : 'NORMAL') + ')';
    svResEl.style.color = color;
    evResEl.textContent = eval_text + ' [Decayed Dose = ' + Decayed_Dose_MBq.toFixed(1) + ' MBq @ ' + time_min + ' min post-injection, W = ' + W_kg + ' kg]';
  }

  [ctEl, dsEl, tEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();