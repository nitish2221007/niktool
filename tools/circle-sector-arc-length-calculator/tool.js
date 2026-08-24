(() => {
  'use strict';
  const rEl = document.getElementById('sec-r'), degEl = document.getElementById('sec-deg');
  const arcEl = document.getElementById('sec-res-arc'), areaEl = document.getElementById('sec-res-area'), chordEl = document.getElementById('sec-res-chord');

  function update() {
    const r = parseFloat(rEl.value), deg = parseFloat(degEl.value);
    if (isNaN(r) || isNaN(deg) || r <= 0 || deg <= 0 || deg > 360) return;

    const rad = (deg * Math.PI) / 180;
    const arc = r * rad;
    const area = 0.5 * r * r * rad;
    const chord = 2 * r * Math.sin(rad / 2);

    arcEl.textContent = arc.toFixed(2) + ' units';
    areaEl.textContent = area.toFixed(2) + ' sq units';
    chordEl.textContent = chord.toFixed(2) + ' units';
  }

  rEl.addEventListener('input', update);
  degEl.addEventListener('input', update);
  update();
})();