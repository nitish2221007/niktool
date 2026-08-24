(() => {
  'use strict';
  const fEl = document.getElementById('ln-f'), doEl = document.getElementById('ln-do'), hoEl = document.getElementById('ln-ho');
  const diResEl = document.getElementById('ln-res-di'), mgResEl = document.getElementById('ln-res-mag');

  function update() {
    const f = parseFloat(fEl.value), d_o = parseFloat(doEl.value), h_o = parseFloat(hoEl.value);
    if (isNaN(f) || isNaN(d_o) || isNaN(h_o) || f === 0 || d_o <= 0) return;

    // 1/f = 1/d_o + 1/d_i => 1/d_i = 1/f - 1/d_o = (d_o - f) / (f * d_o)
    // d_i = (f * d_o) / (d_o - f)
    if (d_o === f) {
      diResEl.textContent = 'Image at INFINITY (Parallel Rays: No Image Formed)';
      mgResEl.textContent = 'Object located exactly at the focal point (d_o = f)';
      return;
    }

    const d_i = (f * d_o) / (d_o - f);
    const m = -d_i / d_o;
    const h_i = m * h_o;

    const isReal = d_i > 0;
    const isInverted = m < 0;

    diResEl.textContent = 'd_i = ' + (d_i >= 0 ? '+' : '') + d_i.toFixed(2) + ' cm (' + (isReal ? 'REAL IMAGE' : 'VIRTUAL IMAGE') + ')';
    mgResEl.textContent = 'Magnification m = ' + m.toFixed(2) + '× (' + (isInverted ? 'INVERTED' : 'UPRIGHT') + ', ' + (Math.abs(m) > 1 ? 'Magnified' : 'Diminished') + ' | Image Height h_i = ' + h_i.toFixed(2) + ' cm)';
  }

  [fEl, doEl, hoEl].forEach(el => el.addEventListener('input', update));
  update();
})();