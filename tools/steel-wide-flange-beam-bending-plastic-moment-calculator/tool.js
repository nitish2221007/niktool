(() => {
  'use strict';
  const fyEl = document.getElementById('pm-fy'), zxEl = document.getElementById('pm-zx');
  const phiResEl = document.getElementById('pm-res-phimp'), nomResEl = document.getElementById('pm-res-nom');

  const phiB = 0.90; // AISC flexure resistance factor

  function update() {
    const fyKsi = parseFloat(fyEl.value), zxIn3 = parseFloat(zxEl.value);
    if (isNaN(fyKsi) || isNaN(zxIn3) || fyKsi <= 0 || zxIn3 <= 0) return;

    // Nominal plastic moment M_p = F_y * Z_x (kip*in)
    const Mp_kip_in = fyKsi * zxIn3;
    const Mp_kip_ft = Mp_kip_in / 12;
    const phiMp_kip_ft = phiB * Mp_kip_ft;
    const phiMp_kn_m = phiMp_kip_ft * 1.35582;

    phiResEl.textContent = phiMp_kip_ft.toFixed(1) + ' kip·ft (' + phiMp_kn_m.toFixed(1) + ' kN·m)';
    nomResEl.textContent = Mp_kip_ft.toFixed(1) + ' kip·ft Nominal (M_p = ' + Math.round(Mp_kip_in) + ' kip·in)';
  }

  fyEl.addEventListener('change', update);
  zxEl.addEventListener('input', update);
  update();
})();