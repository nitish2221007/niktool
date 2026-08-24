(() => {
  'use strict';
  const tauEl = document.getElementById('dif-tau'), muEl = document.getElementById('dif-mu'), tEl = document.getElementById('dif-temp');
  const lResEl = document.getElementById('dif-res-l'), dResEl = document.getElementById('dif-res-d');

  const kB = 1.380649e-23;
  const q_e = 1.602176634e-19;

  function update() {
    const tauUs = parseFloat(tauEl.value), mu = parseFloat(muEl.value), T = parseFloat(tEl.value);
    if (isNaN(tauUs) || isNaN(mu) || isNaN(T) || tauUs <= 0 || mu <= 0 || T <= 0) return;

    const tauSec = tauUs * 1e-6;
    const Vt = (kB * T) / q_e;
    const D_cm2_s = mu * Vt;
    const L_cm = Math.sqrt(D_cm2_s * tauSec);
    const L_um = L_cm * 10000;

    lResEl.textContent = L_um.toFixed(1) + ' μm (' + (L_cm * 10).toFixed(2) + ' mm Diffusion Length)';
    dResEl.textContent = 'D = ' + D_cm2_s.toFixed(2) + ' cm² / s (Thermal Voltage V_t = ' + (Vt * 1000).toFixed(1) + ' mV)';
  }

  [tauEl, muEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();