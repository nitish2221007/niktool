(() => {
  'use strict';
  const fyEl = document.getElementById('st-fy'), zxEl = document.getElementById('st-zx'), sxEl = document.getElementById('st-sx');
  const mpResEl = document.getElementById('st-res-mp'), shResEl = document.getElementById('st-res-shape');

  function update() {
    const Fy_MPa = parseFloat(fyEl.value), Zx_cm3 = parseFloat(zxEl.value), Sx_cm3 = parseFloat(sxEl.value);
    if (isNaN(Fy_MPa) || isNaN(Zx_cm3) || isNaN(Sx_cm3) || Fy_MPa <= 0 || Zx_cm3 <= 0 || Sx_cm3 <= 0) return;

    // Convert cm^3 to m^3 (1 cm^3 = 10^-6 m^3):
    const Zx_m3 = Zx_cm3 * 1e-6;
    const Sx_m3 = Sx_cm3 * 1e-6;
    const Fy_Pa = Fy_MPa * 1e6;

    // Plastic Moment: M_p = F_y * Z_x  [N * m -> kN * m]
    const Mp_kNm = (Fy_Pa * Zx_m3) / 1000.0;
    const Mp_kipft = Mp_kNm * 0.737562;

    // Elastic Yield Moment: M_y = F_y * S_x  [kN * m]
    const My_kNm = (Fy_Pa * Sx_m3) / 1000.0;

    // Shape factor k = Z_x / S_x
    const shapeFactor = Zx_cm3 / Sx_cm3;
    const reservePct = (shapeFactor - 1.0) * 100.0;

    // LRFD design moment (phi = 0.90):
    const phi_Mp = 0.90 * Mp_kNm;

    mpResEl.textContent = 'M_p = ' + Mp_kNm.toFixed(2) + ' kN·m (φ·M_p = ' + phi_Mp.toFixed(1) + ' kN·m)';
    shResEl.textContent = 'Yield M_y = ' + My_kNm.toFixed(2) + ' kN·m | Shape Factor = ' + shapeFactor.toFixed(2) + ' (+' + reservePct.toFixed(1) + '% Plastic Reserve @ F_y = ' + Fy_MPa + ' MPa)';
  }

  [fyEl, zxEl, sxEl].forEach(el => el.addEventListener('input', update));
  update();
})();