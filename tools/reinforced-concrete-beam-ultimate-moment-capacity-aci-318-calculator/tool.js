(() => {
  'use strict';
  const bEl = document.getElementById('rc-b'), dEl = document.getElementById('rc-d'), asEl = document.getElementById('rc-as');
  const fcEl = document.getElementById('rc-fc'), fyEl = document.getElementById('rc-fy');
  const phiMnResEl = document.getElementById('rc-res-phi-mn'), whResEl = document.getElementById('rc-res-whitney');

  function update() {
    const b = parseFloat(bEl.value), d = parseFloat(dEl.value), As = parseFloat(asEl.value);
    const fc = parseFloat(fcEl.value), fy = parseFloat(fyEl.value);

    if (isNaN(b) || isNaN(d) || isNaN(As) || isNaN(fc) || isNaN(fy) || b <= 0 || d <= 0 || As <= 0 || fc <= 0 || fy <= 0) return;

    // Whitney stress block depth a = ( As * fy ) / ( 0.85 * fc * b )  [mm]
    const a = (As * fy) / (0.85 * fc * b);

    // Nominal moment capacity: Mn = As * fy * ( d - a/2 )  [N * mm]
    const Mn_Nmm = As * fy * (d - (a / 2.0));
    const Mn_kNm = Mn_Nmm / 1e6;

    // Design moment capacity (tension-controlled phi = 0.90):
    const phi = 0.90;
    const phi_Mn_kNm = phi * Mn_kNm;

    // Reinforcement ratio rho = As / (b * d)
    const rho = (As / (b * d)) * 100.0;

    phiMnResEl.textContent = 'Design φ·M_n = ' + phi_Mn_kNm.toFixed(2) + ' kN·m';
    whResEl.textContent = 'Nominal M_n = ' + Mn_kNm.toFixed(2) + ' kN·m | a = ' + a.toFixed(2) + ' mm (Lever arm: ' + (d - a/2).toFixed(1) + ' mm | Rebar Ratio ρ = ' + rho.toFixed(2) + '%)';
  }

  [bEl, dEl, asEl, fcEl, fyEl].forEach(el => el.addEventListener('input', update));
  update();
})();