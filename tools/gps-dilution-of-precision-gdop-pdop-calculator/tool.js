(() => {
  'use strict';
  const pdopEl = document.getElementById('dop-pdop'), tdopEl = document.getElementById('dop-tdop'), uereEl = document.getElementById('dop-uere');
  const gdResEl = document.getElementById('dop-res-gdop'), erResEl = document.getElementById('dop-res-err');

  function update() {
    const PDOP = parseFloat(pdopEl.value), TDOP = parseFloat(tdopEl.value), UERE = parseFloat(uereEl.value);
    if (isNaN(PDOP) || isNaN(TDOP) || isNaN(UERE) || PDOP <= 0 || TDOP <= 0 || UERE <= 0) return;

    // GDOP = sqrt( PDOP^2 + TDOP^2 )
    const GDOP = Math.sqrt(Math.pow(PDOP, 2) + Math.pow(TDOP, 2));

    // 3D position error = PDOP * UERE  [meters]
    const posError3D = PDOP * UERE;

    // Approximate HDOP (horizontal) approx = PDOP * 0.707
    const HDOP = PDOP * 0.707;
    const posErrorHoriz = HDOP * UERE;

    let rating = '';
    let color = '#22543d';

    if (GDOP <= 2.0) {
      rating = 'IDEAL GEOMETRY (Open Sky Constellation)';
      color = '#22543d';
    } else if (GDOP <= 5.0) {
      rating = 'GOOD GEOMETRY (Standard Commercial Navigation)';
      color = '#22543d';
    } else if (GDOP <= 10.0) {
      rating = 'MODERATE GEOMETRY (Multipath / Urban Canyon Tree Canopy Obstruction)';
      color = '#d97706';
    } else {
      rating = 'POOR GEOMETRY (High Positioning Error - Unreliable Fix)';
      color = '#c53030';
    }

    gdResEl.textContent = 'GDOP = ' + GDOP.toFixed(2) + ' (' + rating + ')';
    erResEl.textContent = '3D Fix Accuracy: ±' + posError3D.toFixed(2) + ' m (Horizontal HDOP Error: ±' + posErrorHoriz.toFixed(2) + ' m @ UERE = ' + UERE + 'm)';
    erResEl.style.color = color;
  }

  [pdopEl, tdopEl, uereEl].forEach(el => el.addEventListener('input', update));
  update();
})();