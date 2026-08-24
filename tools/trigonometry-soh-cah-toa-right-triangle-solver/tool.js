(() => {
  'use strict';
  const thEl = document.getElementById('tr-th'), hypEl = document.getElementById('tr-hyp');
  const oppResEl = document.getElementById('tr-res-opp'), ratResEl = document.getElementById('tr-res-ratios');

  function update() {
    const thetaDeg = parseFloat(thEl.value), hyp = parseFloat(hypEl.value);
    if (isNaN(thetaDeg) || isNaN(hyp) || thetaDeg <= 0 || thetaDeg >= 90 || hyp <= 0) return;

    const thetaRad = (thetaDeg * Math.PI) / 180.0;

    // SOH: sin(theta) = Opp / Hyp => Opp = Hyp * sin(theta)
    const opp = hyp * Math.sin(thetaRad);

    // CAH: cos(theta) = Adj / Hyp => Adj = Hyp * cos(theta)
    const adj = hyp * Math.cos(thetaRad);

    // TOA: tan(theta) = Opp / Adj
    const sinVal = Math.sin(thetaRad);
    const cosVal = Math.cos(thetaRad);
    const tanVal = Math.tan(thetaRad);

    oppResEl.textContent = 'Opposite = ' + opp.toFixed(2) + ' | Adjacent = ' + adj.toFixed(2);
    ratResEl.textContent = 'sin(' + thetaDeg + '°) = ' + sinVal.toFixed(3) + ' | cos(' + thetaDeg + '°) = ' + cosVal.toFixed(3) + ' | tan(' + thetaDeg + '°) = ' + tanVal.toFixed(3) + ' (Hyp: ' + hyp + ')';
  }

  thEl.addEventListener('input', update);
  hypEl.addEventListener('input', update);
  update();
})();