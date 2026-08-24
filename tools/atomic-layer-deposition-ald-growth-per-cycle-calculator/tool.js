(() => {
  'use strict';
  const matEl = document.getElementById('ald-mat'), cycEl = document.getElementById('ald-cycles');
  const thResEl = document.getElementById('ald-res-thk'), moResEl = document.getElementById('ald-res-mono');

  const ALD_DATA = {
    'al2o3': { gpc_A: 1.10, mono_A: 3.0, name: 'Aluminium Oxide (Al₂O₃)' },
    'hfo2':  { gpc_A: 0.95, mono_A: 2.8, name: 'Hafnium Oxide (HfO₂ High-k)' },
    'tio2':  { gpc_A: 0.50, mono_A: 2.5, name: 'Titanium Dioxide (TiO₂)' },
    'zno':   { gpc_A: 1.80, mono_A: 2.6, name: 'Zinc Oxide (ZnO)' }
  };

  function update() {
    const d = ALD_DATA[matEl.value];
    const N = parseInt(cycEl.value, 10);
    if (isNaN(N) || N <= 0) return;

    // Total thickness in Angstroms = N * GPC
    const totalA = N * d.gpc_A;
    const totalNm = totalA / 10;
    const monolayers = totalA / d.mono_A;

    thResEl.textContent = totalNm.toFixed(2) + ' nm (' + totalA.toFixed(1) + ' Å Film Thickness)';
    moResEl.textContent = '~' + monolayers.toFixed(1) + ' Atomic Monolayers (GPC: ' + d.gpc_A.toFixed(2) + ' Å/cycle, 100% Self-Limiting Conformality)';
  }

  matEl.addEventListener('change', update);
  cycEl.addEventListener('input', update);
  update();
})();