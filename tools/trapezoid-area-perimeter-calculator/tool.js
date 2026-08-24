(() => {
  'use strict';
  const aEl = document.getElementById('trap-a'), bEl = document.getElementById('trap-b');
  const hEl = document.getElementById('trap-h'), lEl = document.getElementById('trap-legs');
  const areaEl = document.getElementById('trap-res-area'), medEl = document.getElementById('trap-res-med'), perEl = document.getElementById('trap-res-perim');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value), h = parseFloat(hEl.value);
    const leg = parseFloat(lEl.value) || 0;
    if (isNaN(a) || isNaN(b) || isNaN(h) || a <= 0 || b <= 0 || h <= 0) return;

    const area = 0.5 * (a + b) * h;
    const median = 0.5 * (a + b);
    const perim = a + b + (2 * leg);

    areaEl.textContent = area.toFixed(2) + ' sq units';
    medEl.textContent = median.toFixed(2) + ' units';
    perEl.textContent = leg > 0 ? perim.toFixed(2) + ' units' : 'Enter leg length';
  }

  [aEl, bEl, hEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();