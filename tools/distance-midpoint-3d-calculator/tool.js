(() => {
  'use strict';
  const x1El = document.getElementById('d3-x1'), y1El = document.getElementById('d3-y1'), z1El = document.getElementById('d3-z1');
  const x2El = document.getElementById('d3-x2'), y2El = document.getElementById('d3-y2'), z2El = document.getElementById('d3-z2');
  const distEl = document.getElementById('d3-res-dist'), midEl = document.getElementById('d3-res-mid');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value), z1 = parseFloat(z1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value), z2 = parseFloat(z2El.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) return;

    // d = sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)
    const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    // Midpoint = ((x1+x2)/2, (y1+y2)/2, (z1+z2)/2)
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const midZ = (z1 + z2) / 2;

    distEl.textContent = dist.toFixed(3) + ' units';
    midEl.textContent = '(' + midX.toFixed(2) + ', ' + midY.toFixed(2) + ', ' + midZ.toFixed(2) + ')';
  }

  [x1El, y1El, z1El, x2El, y2El, z2El].forEach(el => el.addEventListener('input', update));
  update();
})();