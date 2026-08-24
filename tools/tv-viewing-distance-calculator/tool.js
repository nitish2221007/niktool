(() => {
  'use strict';
  const sEl = document.getElementById('tv-size');
  const thxEl = document.getElementById('tv-res-thx'), smpEl = document.getElementById('tv-res-smpte');

  function update() {
    const diagInches = parseFloat(sEl.value);
    if (isNaN(diagInches) || diagInches <= 0) return;

    // THX 40-degree field of view formula: Distance = Screen Size / 0.835 (inches)
    const distThxInches = diagInches / 0.835;
    const distThxM = distThxInches * 0.0254;
    const distThxFt = distThxInches / 12;

    // SMPTE 30-degree standard: Distance = Screen Size / 0.625 (inches)
    const distSmpteInches = diagInches / 0.625;
    const distSmpteM = distSmpteInches * 0.0254;
    const distSmpteFt = distSmpteInches / 12;

    thxEl.textContent = distThxM.toFixed(1) + ' m (' + distThxFt.toFixed(1) + ' ft)';
    smpEl.textContent = distSmpteM.toFixed(1) + ' m (' + distSmpteFt.toFixed(1) + ' ft)';
  }

  sEl.addEventListener('input', update);
  update();
})();