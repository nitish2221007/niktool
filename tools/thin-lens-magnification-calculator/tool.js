(() => {
  'use strict';
  const fEl = document.getElementById('lens-f'), doEl = document.getElementById('lens-do');
  const diEl = document.getElementById('lens-res-di'), magEl = document.getElementById('lens-res-mag'), typeEl = document.getElementById('lens-res-type');

  function update() {
    const f = parseFloat(fEl.value), dO = parseFloat(doEl.value);
    if (isNaN(f) || isNaN(dO) || f === 0 || dO <= 0 || f === dO) return;

    // 1/f = 1/do + 1/di => 1/di = 1/f - 1/do = (do - f) / (f * do) => di = (f * do) / (do - f)
    const dI = (f * dO) / (dO - f);
    const m = -dI / dO;

    diEl.textContent = (dI >= 0 ? '+' : '') + dI.toFixed(2) + ' cm';
    magEl.textContent = m.toFixed(2) + 'x';

    if (dI > 0) {
      typeEl.textContent = 'Real & Inverted (Projectable onto screen)';
      typeEl.style.color = '#22543d';
    } else {
      typeEl.textContent = 'Virtual & Upright (Magnified eyepiece view)';
      typeEl.style.color = '#2563eb';
    }
  }

  fEl.addEventListener('input', update);
  doEl.addEventListener('input', update);
  update();
})();