(() => {
  'use strict';
  const seqEl = document.getElementById('kd-seq');
  const scResEl = document.getElementById('kd-res-score'), tmResEl = document.getElementById('kd-res-tm');

  const kdScale = {
    'I': 4.5, 'V': 4.2, 'L': 3.8, 'F': 2.8, 'C': 2.5, 'M': 1.9, 'A': 1.8, 'G': -0.4,
    'T': -0.7, 'S': -0.8, 'W': -0.9, 'Y': -1.3, 'P': -1.6, 'H': -3.2, 'E': -3.5,
    'Q': -3.5, 'D': -3.5, 'N': -3.5, 'K': -3.9, 'R': -4.5
  };

  function update() {
    const seq = seqEl.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
    if (seq.length < 3) return;

    let totalScore = 0, validCount = 0;
    for (let aa of seq) {
      if (kdScale[aa] !== undefined) {
        totalScore += kdScale[aa];
        validCount++;
      }
    }

    if (validCount === 0) return;

    const meanHydropathy = totalScore / validCount;

    let pred = '', color = '#22543d';
    if (meanHydropathy >= 1.60 && validCount >= 18) {
      pred = 'TRANSMEMBRANE HELIX (Score > +1.6 across ' + validCount + ' aa: Lipid bilayer span)';
      color = '#22543d';
    } else if (meanHydropathy >= 0.5) {
      pred = 'HYDROPHOBIC CORE (Interior globular protein domain)';
      color = '#2563eb';
    } else {
      pred = 'HYDROPHILIC / SOLUBLE (Surface-exposed loop / Aqueous cytosolic region)';
      color = '#ea580c';
    }

    scResEl.textContent = 'Mean Hydropathy = ' + (meanHydropathy >= 0 ? '+' : '') + meanHydropathy.toFixed(2);
    tmResEl.textContent = pred + ' (' + validCount + ' residues evaluated)';
    tmResEl.style.color = color;
  }

  seqEl.addEventListener('input', update);
  update();
})();