(() => {
  'use strict';
  const faEl = document.getElementById('pf-fa0'), caEl = document.getElementById('pf-ca0');
  const xEl = document.getElementById('pf-x'), kEl = document.getElementById('pf-k');
  const vlResEl = document.getElementById('pf-res-vol'), tuResEl = document.getElementById('pf-res-tau');

  function update() {
    const F_A0 = parseFloat(faEl.value), C_A0 = parseFloat(caEl.value);
    const X = parseFloat(xEl.value), k = parseFloat(kEl.value);

    if (isNaN(F_A0) || isNaN(C_A0) || isNaN(X) || isNaN(k) || F_A0 <= 0 || C_A0 <= 0 || X <= 0 || X >= 1 || k <= 0) return;

    // Volumetric flow rate v0 = F_A0 / C_A0  [m^3 / s]
    const v0 = F_A0 / C_A0;

    // 1st order PFR integration: V = (v0 / k) * ln( 1 / (1 - X) )
    const V_m3 = (v0 / k) * Math.log(1.0 / (1.0 - X));
    const V_L = V_m3 * 1000.0;

    // Space time tau = V / v0 = ln(1 / (1 - X)) / k  [seconds]
    const tau_sec = V_m3 / v0;

    // Damkohler number Da = k * tau
    const Da = k * tau_sec;

    vlResEl.textContent = 'PFR Volume V = ' + V_m3.toFixed(2) + ' m³ (' + Math.round(V_L).toLocaleString() + ' L)';
    tuResEl.textContent = 'Space Time τ = ' + tau_sec.toFixed(2) + ' s | Damköhler Da = ' + Da.toFixed(2) + ' (Flow v₀ = ' + v0.toFixed(3) + ' m³/s @ X = ' + (X*100).toFixed(0) + '%)';
  }

  [faEl, caEl, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();