(() => {
  'use strict';
  const mapEl = document.getElementById('svr-map'), cvpEl = document.getElementById('svr-cvp'), coEl = document.getElementById('svr-co');
  const svrResEl = document.getElementById('svr-res-val'), wdResEl = document.getElementById('svr-res-wood');

  function update() {
    const MAP = parseFloat(mapEl.value), CVP = parseFloat(cvpEl.value), CO = parseFloat(coEl.value);
    if (isNaN(MAP) || isNaN(CVP) || isNaN(CO) || CO <= 0 || MAP <= CVP) return;

    // SVR = 80 * (MAP - CVP) / CO  [dynes * s / cm^5]
    const SVR = (80.0 * (MAP - CVP)) / CO;
    const woodUnits = (MAP - CVP) / CO;

    let status = '', color = '#22543d';
    if (SVR >= 800 && SVR <= 1400) {
      status = 'NORMAL VASCULAR TONE (800 - 1,400 dynes·s/cm⁵)';
      color = '#22543d';
    } else if (SVR < 800) {
      status = 'VASODILATORY / DISTRIBUTIVE SHOCK (SVR < 800: Sepsis / Anaphylaxis / Vasoplegia)';
      color = '#c53030';
    } else {
      status = 'VASOCONSTRICTED / HIGH AFTERLOAD (SVR > 1400: Cardiogenic shock / Hypovolemia)';
      color = '#2563eb';
    }

    svrResEl.textContent = 'SVR = ' + Math.round(SVR).toLocaleString() + ' dynes·s / cm⁵';
    svrResEl.style.color = color;
    wdResEl.textContent = woodUnits.toFixed(1) + ' Wood Units | ' + status;
    wdResEl.style.color = color;
  }

  [mapEl, cvpEl, coEl].forEach(el => el.addEventListener('input', update));
  update();
})();