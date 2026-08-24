(() => {
  'use strict';
  const kbEl = document.getElementById('gm-kb'), bmEl = document.getElementById('gm-bm');
  const kgEl = document.getElementById('gm-kg'), thEl = document.getElementById('gm-theta');
  const gmResEl = document.getElementById('gm-res-gm'), gzResEl = document.getElementById('gm-res-gz');

  function update() {
    const KB = parseFloat(kbEl.value), BM = parseFloat(bmEl.value);
    const KG = parseFloat(kgEl.value), thetaDeg = parseFloat(thEl.value);

    if (isNaN(KB) || isNaN(BM) || isNaN(KG) || isNaN(thetaDeg) || KB < 0 || BM < 0 || KG < 0) return;

    // Height of transverse metacenter above keel KM = KB + BM
    const KM = KB + BM;

    // Metacentric height GM = KM - KG
    const GM = KM - KG;

    const thetaRad = (thetaDeg * Math.PI) / 180;
    // Righting arm GZ = GM * sin(theta)
    const GZ = GM * Math.sin(thetaRad);

    let status = '';
    let color = '#22543d';

    if (GM >= 1.00) {
      status = 'STABLE (GM = +' + GM.toFixed(2) + ' m: Good righting ability, IMO Resolution A.749 Compliant)';
      color = '#22543d';
    } else if (GM > 0.15) {
      status = 'TENDER STABILITY (0.15 m < GM < 1.00 m: Slow comfortable passenger roll, sensitive to top weight)';
      color = '#2563eb';
    } else if (GM > 0) {
      status = 'CRITICALLY LOW (0 < GM ≤ 0.15 m: Dangerous list risk in wind gusts!)';
      color = '#d97706';
    } else {
      status = 'NEGATIVE GM (GM < 0: UNSTABLE - Vessel capsizes immediately upon listing!)';
      color = '#c53030';
    }

    gmResEl.textContent = 'GM = ' + (GM >= 0 ? '+' : '') + GM.toFixed(2) + ' m (KM = ' + KM.toFixed(2) + ' m)';
    gmResEl.style.color = color;
    gzResEl.textContent = 'GZ(' + thetaDeg + '°) = ' + GZ.toFixed(3) + ' m | ' + status;
    gzResEl.style.color = color;
  }

  [kbEl, bmEl, kgEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();