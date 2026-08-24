(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), tEl = document.getElementById('ct-t');
  const tempEl = document.getElementById('ct-temp'), pathEl = document.getElementById('ct-path');
  const ctResEl = document.getElementById('ct-res-val'), logResEl = document.getElementById('ct-res-log');

  function update() {
    const C = parseFloat(cEl.value), T10 = parseFloat(tEl.value);
    const Tc = parseFloat(tempEl.value), pathogen = pathEl.value;

    if (isNaN(C) || isNaN(T10) || isNaN(Tc) || C <= 0 || T10 <= 0 || Tc < 0) return;

    // Achieved CT = C * T10  [mg * min / L]
    const achievedCT = C * T10;

    let reqCT = 0;
    let targetLog = 0;
    let pathName = '';

    if (pathogen === 'giardia') {
      // EPA 3-Log Giardia CT table approx for pH 7.5: CT_3log approx = 160 * exp(-0.055 * Tc)
      reqCT = 160.0 * Math.exp(-0.055 * Tc);
      targetLog = 3.0;
      pathName = 'Giardia Cysts';
    } else {
      // EPA 4-Log Virus CT table approx: CT_4log approx = 12 * exp(-0.07 * Tc)
      reqCT = 12.0 * Math.exp(-0.07 * Tc);
      targetLog = 4.0;
      pathName = 'Enteric Viruses';
    }

    // Achieved log inactivation = targetLog * (achievedCT / reqCT)
    const achievedLog = (targetLog * achievedCT) / reqCT;
    const killPct = (1.0 - Math.pow(10, -achievedLog)) * 100;

    let status = '';
    let color = '#22543d';

    if (achievedLog >= targetLog) {
      status = 'FULL EPA COMPLIANCE: ' + achievedLog.toFixed(2) + '-Log ' + pathName + ' Inactivation (' + killPct.toFixed(3) + '% Kill > ' + targetLog + '-Log Target)';
      color = '#22543d';
    } else {
      status = 'PARTIAL DISINFECTION: ' + achievedLog.toFixed(2) + '-Log Inactivation (' + (achievedCT/reqCT * 100).toFixed(0) + '% of Required ' + targetLog + '-Log CT = ' + reqCT.toFixed(1) + ' mg·min/L)';
      color = '#d97706';
    }

    ctResEl.textContent = 'CT = ' + achievedCT.toFixed(1) + ' mg · min / L (Achieved)';
    logResEl.textContent = status;
    logResEl.style.color = color;
  }

  [cEl, tEl, tempEl].forEach(el => el.addEventListener('input', update));
  pathEl.addEventListener('change', update);
  update();
})();