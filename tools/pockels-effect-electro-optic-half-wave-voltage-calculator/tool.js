(() => {
  'use strict';
  const lmEl = document.getElementById('pk-lambda'), n0El = document.getElementById('pk-n0'), rEl = document.getElementById('pk-r');
  const vpResEl = document.getElementById('pk-res-vpi'), evResEl = document.getElementById('pk-res-eval');

  function update() {
    const lambda_nm = parseFloat(lmEl.value), n0 = parseFloat(n0El.value), r_pm_V = parseFloat(rEl.value);
    if (isNaN(lambda_nm) || isNaN(n0) || isNaN(r_pm_V) || lambda_nm <= 0 || n0 <= 0 || r_pm_V <= 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const r_m_V = r_pm_V * 1e-12; // pm/V -> m/V

    // Half-wave voltage: V_pi = lambda / ( 2 * n0^3 * r )  [Volts]
    const V_pi = lambda_m / (2.0 * Math.pow(n0, 3) * r_m_V);

    vpResEl.textContent = 'Half-Wave Voltage V_π = ' + Math.round(V_pi).toLocaleString() + ' Volts (' + (V_pi / 1000).toFixed(2) + ' kV)';
    evResEl.textContent = 'Quarter-Wave V_π/2 = ' + Math.round(V_pi / 2.0).toLocaleString() + ' V (r = ' + r_pm_V + ' pm/V @ λ=' + lambda_nm + ' nm, n₀=' + n0 + ')';
  }

  [lmEl, n0El, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();