(() => {
  'use strict';
  const sdsEl = document.getElementById('elf-sds'), rEl = document.getElementById('elf-r');
  const ieEl = document.getElementById('elf-ie'), wEl = document.getElementById('elf-w');
  const vbResEl = document.getElementById('elf-res-vb'), csResEl = document.getElementById('elf-res-cs');

  function update() {
    const Sds = parseFloat(sdsEl.value), R = parseFloat(rEl.value);
    const Ie = parseFloat(ieEl.value), W_kn = parseFloat(wEl.value);

    if (isNaN(Sds) || isNaN(R) || isNaN(Ie) || isNaN(W_kn) || Sds <= 0 || R <= 0 || Ie <= 0 || W_kn <= 0) return;

    // Seismic response coefficient: C_s = S_DS / ( R / I_e )
    let Cs = Sds / (R / Ie);

    // ASCE 7 minimum threshold: Cs shall not be less than 0.044 * S_DS * I_e or 0.01
    const Cs_min = Math.max(0.01, 0.044 * Sds * Ie);
    if (Cs < Cs_min) Cs = Cs_min;

    // Base shear V_b = C_s * W  [kN]
    const V_b = Cs * W_kn;
    const V_b_kips = V_b * 0.224809;

    vbResEl.textContent = 'V_b = ' + Math.round(V_b).toLocaleString() + ' kN (' + Math.round(V_b_kips).toLocaleString() + ' kips)';
    csResEl.textContent = 'C_s = ' + Cs.toFixed(4) + ' (' + (Cs * 100).toFixed(2) + '% of Seismic Weight | R/I_e = ' + (R/Ie).toFixed(2) + ' Ductility Reduction)';
  }

  [sdsEl, rEl, ieEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();