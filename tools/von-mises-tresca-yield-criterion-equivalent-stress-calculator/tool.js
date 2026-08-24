(() => {
  'use strict';
  const s1El = document.getElementById('vm-s1'), s2El = document.getElementById('vm-s2');
  const s3El = document.getElementById('vm-s3'), syEl = document.getElementById('vm-sy');
  const vmResEl = document.getElementById('vm-res-vm'), trResEl = document.getElementById('vm-res-tr');

  function update() {
    const s1 = parseFloat(s1El.value), s2 = parseFloat(s2El.value);
    const s3 = parseFloat(s3El.value), Sy = parseFloat(syEl.value);

    if (isNaN(s1) || isNaN(s2) || isNaN(s3) || isNaN(Sy) || Sy <= 0) return;

    // Von Mises stress: sigma_vm = 1/sqrt(2) * sqrt( (s1-s2)^2 + (s2-s3)^2 + (s3-s1)^2 )
    const sigma_vm = (1.0 / Math.SQRT2) * Math.sqrt(
      Math.pow(s1 - s2, 2) + Math.pow(s2 - s3, 2) + Math.pow(s3 - s1, 2)
    );

    // Tresca stress: sigma_tresca = max(|s1-s2|, |s2-s3|, |s3-s1|)
    const sigma_tresca = Math.max(Math.abs(s1 - s2), Math.abs(s2 - s3), Math.abs(s3 - s1));

    const n_vm = Sy / sigma_vm;
    const n_tresca = Sy / sigma_tresca;

    vmResEl.textContent = 'Von Mises σ_vm = ' + sigma_vm.toFixed(1) + ' MPa (Factor N = ' + n_vm.toFixed(2) + ' ' + (n_vm >= 1.0 ? '✓ SAFE' : '✗ YIELD') + ')';
    vmResEl.style.color = n_vm >= 1.0 ? '#22543d' : '#c53030';
    trResEl.textContent = 'Tresca σ_tresca = ' + sigma_tresca.toFixed(1) + ' MPa (Factor N = ' + n_tresca.toFixed(2) + ' | ' + (n_tresca >= 1.0 ? 'SAFE' : 'YIELD') + ')';
  }

  [s1El, s2El, s3El, syEl].forEach(el => el.addEventListener('input', update));
  update();
})();