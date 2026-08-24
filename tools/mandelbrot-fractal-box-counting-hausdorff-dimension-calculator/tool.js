(() => {
  'use strict';
  const fEl = document.getElementById('bx-fractal'), sEl = document.getElementById('bx-scale');
  const dResEl = document.getElementById('bx-res-dim'), stResEl = document.getElementById('bx-res-stat');

  const FRACTALS = {
    'koch':       { N: 4,  scale: 3, name: 'Koch Snowflake' },
    'sierpinski': { N: 3,  scale: 2, name: 'Sierpiński Triangle' },
    'cantor':     { N: 2,  scale: 3, name: 'Cantor Dust Set' },
    'menger':     { N: 20, scale: 3, name: 'Menger Sponge' },
    'britain':    { N: 4.88, scale: 3.5, name: 'Coastline of Great Britain' }
  };

  function update() {
    const f = FRACTALS[fEl.value];
    const iter = parseInt(sEl.value, 10);

    if (isNaN(iter) || iter < 1) return;

    // Exact theoretical Hausdorff dimension D = ln(N) / ln(scale)
    const D0 = Math.log(f.N) / Math.log(f.scale);

    const totalPieces = Math.pow(f.N, iter);
    const boxSize = Math.pow(f.scale, iter);

    dResEl.textContent = 'D₀ = ' + D0.toFixed(4) + ' Dimension';
    stResEl.textContent = f.name + ' (Iter ' + iter + ': N = ' + Math.round(totalPieces).toLocaleString() + ' boxes @ scale 1/' + Math.round(boxSize).toLocaleString() + ' | D = ln(' + f.N + ')/ln(' + f.scale + '))';
  }

  fEl.addEventListener('change', update);
  sEl.addEventListener('input', update);
  update();
})();