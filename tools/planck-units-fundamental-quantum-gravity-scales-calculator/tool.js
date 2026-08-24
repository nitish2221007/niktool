(() => {
  'use strict';
  const cEl = document.getElementById('plk-c'), gEl = document.getElementById('plk-g'), hEl = document.getElementById('plk-hbar');
  const lResEl = document.getElementById('plk-res-len'), tmResEl = document.getElementById('plk-res-time');

  function update() {
    const c = parseFloat(cEl.value), G = parseFloat(gEl.value), hbar = parseFloat(hEl.value);
    if (isNaN(c) || isNaN(G) || isNaN(hbar) || c <= 0 || G <= 0 || hbar <= 0) return;

    // Planck Length l_p = sqrt( (hbar * G) / c^3 )  [meters]
    const l_p = Math.sqrt((hbar * G) / Math.pow(c, 3));

    // Planck Time t_p = sqrt( (hbar * G) / c^5 )  [seconds]
    const t_p = Math.sqrt((hbar * G) / Math.pow(c, 5));

    // Planck Mass m_p = sqrt( (hbar * c) / G )  [kg]
    const m_p_kg = Math.sqrt((hbar * c) / G);
    const m_p_ug = m_p_kg * 1e9; // micrograms

    // Planck Energy E_p = m_p * c^2  [Joules -> GigaJoules]
    const E_p_J = m_p_kg * Math.pow(c, 2);
    const E_p_GJ = E_p_J / 1e9;
    const E_p_GeV = (E_p_J / 1.602176634e-19) / 1e9;

    lResEl.textContent = 'l_p = ' + l_p.toExponential(3) + ' m (Quantum Geometry Scale)';
    tmResEl.textContent = 't_p = ' + t_p.toExponential(3) + ' s | m_p = ' + m_p_ug.toFixed(2) + ' μg (E_p = ' + E_p_GJ.toFixed(3) + ' GJ = ' + E_p_GeV.toExponential(2) + ' GeV)';
  }

  [cEl, gEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();