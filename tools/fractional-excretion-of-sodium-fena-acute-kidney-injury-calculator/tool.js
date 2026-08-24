(() => {
  'use strict';
  const unaEl = document.getElementById('fn-una'), snaEl = document.getElementById('fn-sna');
  const ucrEl = document.getElementById('fn-ucr'), scrEl = document.getElementById('fn-scr');
  const fnResEl = document.getElementById('fn-res-val'), dgResEl = document.getElementById('fn-res-diag');

  function update() {
    const Una = parseFloat(unaEl.value), Sna = parseFloat(snaEl.value);
    const Ucr = parseFloat(ucrEl.value), Scr = parseFloat(scrEl.value);

    if (isNaN(Una) || isNaN(Sna) || isNaN(Ucr) || isNaN(Scr) || Una < 0 || Sna <= 0 || Ucr <= 0 || Scr <= 0) return;

    // FeNa = (Una * Scr) / (Sna * Ucr) * 100  [%]
    const FeNa = ((Una * Scr) / (Sna * Ucr)) * 100.0;

    let diag = '', color = '#22543d';
    if (FeNa < 1.0) {
      diag = 'PRERENAL AZOTEMIA (FeNa < 1.0%: Renal hypoperfusion, responds to IV fluids)';
      color = '#22543d';
    } else if (FeNa <= 2.0) {
      diag = 'INDETERMINATE / MIXED (FeNa 1.0% - 2.0%: Clinical correlation required)';
      color = '#ea580c';
    } else {
      diag = 'INTRINSIC ACUTE TUBULAR NECROSIS (ATN FeNa > 2.0%: Damaged tubules cannot reabsorb sodium)';
      color = '#c53030';
    }

    fnResEl.textContent = 'FeNa = ' + FeNa.toFixed(2) + '%';
    fnResEl.style.color = color;
    dgResEl.textContent = diag;
    dgResEl.style.color = color;
  }

  [unaEl, snaEl, ucrEl, scrEl].forEach(el => el.addEventListener('input', update));
  update();
})();