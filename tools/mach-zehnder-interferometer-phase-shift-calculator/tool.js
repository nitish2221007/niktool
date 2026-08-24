(() => {
  'use strict';
  const lEl = document.getElementById('mz-lam'), lenEl = document.getElementById('mz-l'), dnEl = document.getElementById('mz-dn');
  const pResEl = document.getElementById('mz-res-phi'), tResEl = document.getElementById('mz-res-trans');

  function update() {
    const lamNm = parseFloat(lEl.value), lMm = parseFloat(lenEl.value), dn = parseFloat(dnEl.value);
    if (isNaN(lamNm) || isNaN(lMm) || isNaN(dn) || lamNm <= 0 || lMm <= 0) return;

    const lamM = lamNm * 1e-9;
    const lM = lMm * 1e-3;

    // Delta_Phi = (2 * pi / lambda) * dn * L  [radians]
    const dPhiRad = (2 * Math.PI * dn * lM) / lamM;
    const dPhiDeg = (dPhiRad * 180) / Math.PI;
    const piMultiple = dPhiRad / Math.PI;

    // Intensity transmission T = cos^2(Delta_Phi / 2)
    const trans = Math.pow(Math.cos(dPhiRad / 2), 2) * 100;

    pResEl.textContent = dPhiRad.toFixed(3) + ' rad (' + piMultiple.toFixed(2) + 'π / ' + dPhiDeg.toFixed(1) + '°)';
    tResEl.textContent = trans.toFixed(1) + '% Output Transmission (cos²(ΔΦ/2))';
  }

  [lEl, lenEl, dnEl].forEach(el => el.addEventListener('input', update));
  update();
})();