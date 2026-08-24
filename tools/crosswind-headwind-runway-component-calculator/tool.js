(() => {
  'use strict';
  const rwyEl = document.getElementById('wnd-rwy'), dirEl = document.getElementById('wnd-dir'), spdEl = document.getElementById('wnd-spd');
  const xResEl = document.getElementById('wnd-res-xwind'), hResEl = document.getElementById('wnd-res-hwind');

  function update() {
    const rwyNum = parseFloat(rwyEl.value);
    const windDir = parseFloat(dirEl.value);
    const windSpd = parseFloat(spdEl.value);

    if (isNaN(rwyNum) || isNaN(windDir) || isNaN(windSpd) || windSpd < 0) return;

    const rwyDeg = rwyNum * 10;
    // Angle between wind and runway
    let angleDiff = windDir - rwyDeg;
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;

    const rad = (angleDiff * Math.PI) / 180;
    // Crosswind = Wind * sin(angle)
    const crosswind = windSpd * Math.sin(rad);
    // Headwind = Wind * cos(angle)
    const headwind = windSpd * Math.cos(rad);

    const absCross = Math.abs(crosswind);
    const crossSide = crosswind > 0 ? 'Right' : 'Left';

    xResEl.textContent = absCross.toFixed(1) + ' Knots (' + (absCross > 0 ? crossSide : 'Direct') + ')';
    if (headwind >= 0) {
      hResEl.textContent = headwind.toFixed(1) + ' Knots (Headwind)';
      hResEl.style.color = '#22543d';
    } else {
      hResEl.textContent = Math.abs(headwind).toFixed(1) + ' Knots (TAILWIND WARNING)';
      hResEl.style.color = '#c53030';
    }
  }

  [rwyEl, dirEl, spdEl].forEach(el => el.addEventListener('input', update));
  update();
})();