(() => {
  'use strict';
  const hEl = document.getElementById('mag-hdg'), dEl = document.getElementById('mag-dec'), dirEl = document.getElementById('mag-dir');
  const tResEl = document.getElementById('mag-res-true'), rResEl = document.getElementById('mag-res-rule');

  function update() {
    const magHdg = parseFloat(hEl.value), decMag = Math.abs(parseFloat(dEl.value)), sign = parseFloat(dirEl.value);
    if (isNaN(magHdg) || isNaN(decMag)) return;

    // True = Magnetic + (Declination * sign)
    const decSigned = decMag * sign;
    let trueHdg = (magHdg + decSigned + 360) % 360;

    tResEl.textContent = trueHdg.toFixed(1) + '° True Heading (Map Bearing)';
    rResEl.textContent = 'True = Mag ' + magHdg.toFixed(1) + '° ' + (sign > 0 ? '+ ' : '- ') + decMag.toFixed(1) + '° ' + (sign > 0 ? 'East' : 'West');
  }

  [hEl, dEl, dirEl].forEach(el => el.addEventListener('input', update));
  dirEl.addEventListener('change', update);
  update();
})();