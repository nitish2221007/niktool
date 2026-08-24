(() => {
  'use strict';
  const majEl = document.getElementById('tor-r-maj'), minEl = document.getElementById('tor-r-min');
  const volEl = document.getElementById('tor-res-vol'), areaEl = document.getElementById('tor-res-area');

  function update() {
    const R = parseFloat(majEl.value), r = parseFloat(minEl.value);
    if (isNaN(R) || isNaN(r) || R <= 0 || r <= 0 || R <= r) {
      volEl.textContent = '-'; areaEl.textContent = 'Major R must exceed Minor r'; return;
    }

    // V = 2 * pi^2 * R * r^2
    const vol = 2 * Math.pow(Math.PI, 2) * R * Math.pow(r, 2);
    // A = 4 * pi^2 * R * r
    const area = 4 * Math.pow(Math.PI, 2) * R * r;

    volEl.textContent = vol.toFixed(2) + ' cu units';
    areaEl.textContent = area.toFixed(2) + ' sq units';
  }

  majEl.addEventListener('input', update);
  minEl.addEventListener('input', update);
  update();
})();