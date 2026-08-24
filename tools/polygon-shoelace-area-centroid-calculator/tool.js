(() => {
  'use strict';
  const pEl = document.getElementById('shl-pts');
  const aResEl = document.getElementById('shl-res-area'), cResEl = document.getElementById('shl-res-cent');

  function update() {
    const raw = pEl.value.trim();
    if (!raw) return;

    const lines = raw.split(/\r?\n/);
    const pts = [];
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(/[,\s]+/).filter(Boolean);
      if (parts.length >= 2) {
        const x = parseFloat(parts[0]), y = parseFloat(parts[1]);
        if (!isNaN(x) && !isNaN(y)) pts.push({ x, y });
      }
    }

    if (pts.length < 3) {
      aResEl.textContent = 'At least 3 vertices required';
      cResEl.textContent = 'Enter valid polygon coordinates';
      return;
    }

    const n = pts.length;
    let signedArea = 0;
    let cx = 0, cy = 0;
    let perimeter = 0;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const cross = (pts[i].x * pts[j].y) - (pts[j].x * pts[i].y);
      signedArea += cross;
      cx += (pts[i].x + pts[j].x) * cross;
      cy += (pts[i].y + pts[j].y) * cross;

      const dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
      perimeter += Math.sqrt(dx*dx + dy*dy);
    }

    signedArea = signedArea / 2;
    const area = Math.abs(signedArea);

    if (area > 0) {
      cx = cx / (6 * signedArea);
      cy = cy / (6 * signedArea);
    }

    aResEl.textContent = area.toFixed(2) + ' Sq Units (Shoelace Area)';
    cResEl.textContent = 'Centroid C = (' + cx.toFixed(2) + ', ' + cy.toFixed(2) + ') | Perimeter: ' + perimeter.toFixed(2) + ' (' + n + ' Vertices)';
  }

  pEl.addEventListener('input', update);
  update();
})();