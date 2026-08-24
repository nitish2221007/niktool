(() => {
  'use strict';
  const naEl = document.getElementById('of-nacl'), dgEl = document.getElementById('of-diag');
  const lsResEl = document.getElementById('of-res-lysis'), evResEl = document.getElementById('of-res-eval');

  function update() {
    const nacl = parseFloat(naEl.value), mode = dgEl.value;
    if (isNaN(nacl) || nacl < 0 || nacl > 0.90) return;

    let mean_nacl = 0.42, slope = 25.0, desc = '';

    if (mode === 'normal') {
      mean_nacl = 0.42; slope = 25.0;
      desc = 'NORMAL: Initial hemolysis ~0.50% NaCl, 50% at 0.42%, complete at 0.30%';
    } else if (mode === 'sphero') {
      mean_nacl = 0.60; slope = 20.0;
      desc = 'HEREDITARY SPHEROCYTOSIS: Spherocytes lack membrane reserve, lyse easily at high NaCl';
    } else {
      mean_nacl = 0.32; slope = 30.0;
      desc = 'THALASSEMIA / SICKLE CELL: Target cells have high surface-to-volume ratio, resist lysis';
    }

    // Sigmoidal hemolysis curve: % Hemolysis = 100 / ( 1 + exp( slope * (NaCl - mean_NaCl) ) )
    const hemolysis_pct = 100.0 / (1.0 + Math.exp(slope * (nacl - mean_nacl)));

    lsResEl.textContent = 'Predicted Hemolysis = ' + hemolysis_pct.toFixed(1) + '%';
    evResEl.textContent = desc + ' (At ' + nacl.toFixed(2) + '% NaCl)';
  }

  naEl.addEventListener('input', update);
  dgEl.addEventListener('change', update);
  update();
})();