(() => {
  'use strict';
  const bEl = document.getElementById('cr-boom'), rEl = document.getElementById('cr-rad'), lEl = document.getElementById('cr-load');
  const aResEl = document.getElementById('cr-res-angle'), hResEl = document.getElementById('cr-res-height'), mResEl = document.getElementById('cr-res-moment');

  function update() {
    const boomM = parseFloat(bEl.value), radM = parseFloat(rEl.value), loadTons = parseFloat(lEl.value);
    if (isNaN(boomM) || isNaN(radM) || isNaN(loadTons) || boomM <= 0 || radM <= 0 || loadTons <= 0 || radM > boomM) {
      aResEl.textContent = 'Radius exceeds boom length!';
      return;
    }

    // cos(theta) = rad / boom
    const radAng = Math.acos(radM / boomM);
    const degAng = (radAng * 180) / Math.PI;

    // Tip height = boom * sin(theta)
    const tipHeightM = boomM * Math.sin(radAng);
    const tipHeightFt = tipHeightM * 3.28084;

    // Overturning moment = load * radius
    const moment = loadTons * radM;

    aResEl.textContent = degAng.toFixed(1) + '° Boom Angle';
    hResEl.textContent = tipHeightM.toFixed(1) + ' m (' + tipHeightFt.toFixed(1) + ' ft Tip Height)';
    mResEl.textContent = moment.toFixed(1) + ' Ton·meters Load Moment';
  }

  [bEl, rEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();