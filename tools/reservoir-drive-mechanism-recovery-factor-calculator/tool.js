(() => {
  'use strict';
  const ooipEl = document.getElementById('rf-ooip'), drvEl = document.getElementById('rf-drive');
  const rResEl = document.getElementById('rf-res-rec'), vResEl = document.getElementById('rf-res-vol');

  const DRIVES = {
    'water_strong': { avgRF: 0.45, range: '35 - 60%', name: 'Strong Edge/Bottom Water Drive' },
    'gas_cap':      { avgRF: 0.30, range: '20 - 40%', name: 'Expanding Gas Cap Drive' },
    'solution_gas': { avgRF: 0.18, range: '10 - 25%', name: 'Solution Gas Depletion Drive' },
    'gravity':      { avgRF: 0.55, range: '40 - 75%', name: 'Steep Dip Gravity Drainage' }
  };

  function update() {
    const ooip = parseFloat(ooipEl.value);
    const d = DRIVES[drvEl.value];

    if (isNaN(ooip) || ooip <= 0) return;

    const recoverableMm = ooip * d.avgRF;
    const remainingMm = ooip - recoverableMm;

    rResEl.textContent = (d.avgRF * 100).toFixed(1) + '% Primary RF (Typical: ' + d.range + ')';
    vResEl.textContent = 'Recoverable EUR: ' + recoverableMm.toFixed(1) + ' MMSTB (' + d.name + ' | Residual: ' + remainingMm.toFixed(1) + ' MMSTB)';
  }

  ooipEl.addEventListener('input', update);
  drvEl.addEventListener('change', update);
  update();
})();