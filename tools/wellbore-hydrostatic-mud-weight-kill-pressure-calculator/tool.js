(() => {
  'use strict';
  const mwEl = document.getElementById('mud-mw'), tvdEl = document.getElementById('mud-tvd'), siEl = document.getElementById('mud-sidpp');
  const hResEl = document.getElementById('mud-res-hyd'), kResEl = document.getElementById('mud-res-kill');

  function update() {
    const MW = parseFloat(mwEl.value), TVD = parseFloat(tvdEl.value), SIDPP = parseFloat(siEl.value);
    if (isNaN(MW) || isNaN(TVD) || isNaN(SIDPP) || MW <= 0 || TVD <= 0 || SIDPP < 0) return;

    // Hydrostatic pressure P_hyd = 0.052 * MW * TVD  [psi]
    const Phyd = 0.052 * MW * TVD;
    const gradPsiFt = 0.052 * MW;

    // Kill Mud Weight KMW = MW + SIDPP / (0.052 * TVD)  [PPG]
    const KMW = MW + (SIDPP / (0.052 * TVD));
    const deltaMW = KMW - MW;

    hResEl.textContent = Math.round(Phyd).toLocaleString() + ' psi Hydrostatic (' + (Phyd * 0.0689476).toFixed(1) + ' bar | ' + gradPsiFt.toFixed(3) + ' psi/ft)';
    kResEl.textContent = 'Kill Mud: ' + KMW.toFixed(2) + ' PPG (Formation Pressure: ' + Math.round(Phyd + SIDPP).toLocaleString() + ' psi, ΔMW = +' + deltaMW.toFixed(2) + ' PPG)';
  }

  [mwEl, tvdEl, siEl].forEach(el => el.addEventListener('input', update));
  update();
})();