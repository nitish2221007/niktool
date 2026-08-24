(() => {
  'use strict';
  const rEl = document.getElementById('circ-r'), thEl = document.getElementById('circ-th');
  const mnResEl = document.getElementById('circ-res-main'), scResEl = document.getElementById('circ-res-sec');

  function update() {
    const r = parseFloat(rEl.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(r) || isNaN(thetaDeg) || r <= 0 || thetaDeg <= 0 || thetaDeg > 360) return;

    const thetaRad = (thetaDeg * Math.PI) / 180.0;

    // Full circle:
    const Area_total = Math.PI * Math.pow(r, 2);
    const Circ = 2.0 * Math.PI * r;

    // Arc length s = r * theta (in radians) = (thetaDeg / 360) * Circ
    const arcLength = (thetaDeg / 360.0) * Circ;

    // Sector Area = (thetaDeg / 360) * Area_total
    const sectorArea = (thetaDeg / 360.0) * Area_total;

    mnResEl.textContent = 'Area = ' + Area_total.toFixed(2) + ' | Circ = ' + Circ.toFixed(2);
    scResEl.textContent = 'Sector Area = ' + sectorArea.toFixed(2) + ' | Arc Length s = ' + arcLength.toFixed(2) + ' (' + thetaDeg + '° = ' + (thetaDeg/360).toFixed(3) + ' fraction @ r = ' + r + ')';
  }

  rEl.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();