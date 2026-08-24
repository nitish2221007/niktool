(() => {
  'use strict';
  const vgsEl = document.getElementById('mos-vgs'), vthEl = document.getElementById('mos-vth');
  const vdsEl = document.getElementById('mos-vds'), knEl = document.getElementById('mos-kn');
  const idResEl = document.getElementById('mos-res-id'), mdResEl = document.getElementById('mos-res-mode'), vovResEl = document.getElementById('mos-res-vov');

  function update() {
    const vgs = parseFloat(vgsEl.value), vth = parseFloat(vthEl.value);
    const vds = parseFloat(vdsEl.value), knMa = parseFloat(knEl.value);

    if (isNaN(vgs) || isNaN(vth) || isNaN(vds) || isNaN(knMa) || knMa <= 0) return;

    const vov = vgs - vth;
    vovResEl.textContent = 'V_ov = ' + vov.toFixed(2) + ' V';

    if (vov <= 0) {
      idResEl.textContent = '0.00 mA (Cutoff)';
      idResEl.style.color = '#c53030';
      mdResEl.textContent = 'Cutoff Region (V_GS < V_th: Channel Off)';
      mdResEl.style.color = '#c53030';
      return;
    }

    if (vds >= vov) {
      // Saturation: I_D = 0.5 * k_n * V_ov^2 (mA)
      const id = 0.5 * knMa * Math.pow(vov, 2);
      idResEl.textContent = id.toFixed(2) + ' mA';
      idResEl.style.color = '#22543d';
      mdResEl.textContent = 'Saturation Active Region (Pinch-off: V_DS ≥ V_ov)';
      mdResEl.style.color = '#22543d';
    } else {
      // Triode / Linear: I_D = k_n * (V_ov * V_DS - 0.5 * V_DS^2)
      const id = knMa * (vov * vds - 0.5 * Math.pow(vds, 2));
      idResEl.textContent = id.toFixed(2) + ' mA';
      idResEl.style.color = '#2563eb';
      mdResEl.textContent = 'Triode / Linear Region (V_DS < V_ov)';
      mdResEl.style.color = '#2563eb';
    }
  }

  [vgsEl, vthEl, vdsEl, knEl].forEach(el => el.addEventListener('input', update));
  update();
})();