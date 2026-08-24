(() => {
  'use strict';
  const lEl = document.getElementById('bck-l'), eEl = document.getElementById('bck-e');
  const iEl = document.getElementById('bck-i'), kEl = document.getElementById('bck-k');
  const pResEl = document.getElementById('bck-res-pcr'), efResEl = document.getElementById('bck-res-eff');

  function update() {
    const Lm = parseFloat(lEl.value), EGpa = parseFloat(eEl.value);
    const I_cm4 = parseFloat(iEl.value), K = parseFloat(kEl.value);

    if (isNaN(Lm) || isNaN(EGpa) || isNaN(I_cm4) || isNaN(K) || Lm <= 0 || EGpa <= 0 || I_cm4 <= 0 || K <= 0) return;

    const E_pa = EGpa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // cm^4 to m^4
    const Le_m = K * Lm;

    // Euler buckling load: P_cr = ( pi^2 * E * I ) / Le^2  [Newtons]
    const Pcr_N = (Math.pow(Math.PI, 2) * E_pa * I_m4) / Math.pow(Le_m, 2);
    const Pcr_kN = Pcr_N / 1000;
    const Pcr_kips = Pcr_kN * 0.224809;
    const Pcr_tonnes = Pcr_kN / 9.80665;

    pResEl.textContent = 'P_cr = ' + Math.round(Pcr_kN).toLocaleString() + ' kN (' + Math.round(Pcr_kips).toLocaleString() + ' kips)';
    efResEl.textContent = 'Effective Length L_e = ' + Le_m.toFixed(2) + ' m (K = ' + K + ') | Critical Capacity: ' + Math.round(Pcr_tonnes).toLocaleString() + ' Tonnes';
  }

  [lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  kEl.addEventListener('change', update);
  update();
})();