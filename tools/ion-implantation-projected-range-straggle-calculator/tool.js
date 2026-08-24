(() => {
  'use strict';
  const spEl = document.getElementById('ion-spec'), eEl = document.getElementById('ion-energy'), dEl = document.getElementById('ion-dose');
  const rpResEl = document.getElementById('ion-res-rp'), pkResEl = document.getElementById('ion-res-peak');

  const DOPANTS = {
    'boron':      { factorRp: 3.50, factorD始めて: 1.08, name: 'Boron' },
    'phosphorus': { factorRp: 1.25, factorD始めて: 0.48, name: 'Phosphorus' },
    'arsenic':    { factorRp: 0.65, factorD始めて: 0.24, name: 'Arsenic' }
  };

  function update() {
    const dop = DOPANTS[spEl.value];
    const E_kev = parseFloat(eEl.value), Dose = parseFloat(dEl.value);

    if (isNaN(E_kev) || isNaN(Dose) || E_kev <= 0 || Dose <= 0) return;

    // LSS theory projected range approximations in silicon:
    const Rp_nm = dop.factorRp * E_kev;
    const deltaRp_nm = dop.factorD始めて * E_kev * 0.85;

    // Peak concentration N_peak = Dose / ( sqrt(2*pi) * deltaRp_cm )
    const deltaRp_cm = deltaRp_nm * 1e-7;
    const N_peak = Dose / (Math.sqrt(2 * Math.PI) * deltaRp_cm);

    rpResEl.textContent = 'R_p = ' + Rp_nm.toFixed(1) + ' nm (Straggle ΔR_p = ' + deltaRp_nm.toFixed(1) + ' nm)';
    pkResEl.textContent = 'Peak: ' + N_peak.toExponential(2) + ' atoms/cm³ @ ' + Rp_nm.toFixed(0) + ' nm Depth (Dose: ' + Dose.toExponential(1) + ' ions/cm²)';
  }

  spEl.addEventListener('change', update);
  [eEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();