(() => {
  'use strict';
  const dEl = document.getElementById('to-d'), fsEl = document.getElementById('to-fscope'), feEl = document.getElementById('to-feye');
  const mgResEl = document.getElementById('to-res-mag'), lgResEl = document.getElementById('to-res-lgp');

  function update() {
    const D = parseFloat(dEl.value), f_scope = parseFloat(fsEl.value), f_eye = parseFloat(feEl.value);
    if (isNaN(D) || isNaN(f_scope) || isNaN(f_eye) || D <= 0 || f_scope <= 0 || f_eye <= 0) return;

    // Magnification: M = f_scope / f_eye
    const M = f_scope / f_eye;

    // Focal ratio: f/N = f_scope / D
    const f_ratio = f_scope / D;

    // Light gathering power compared to 7mm dark-adapted human eye pupil: LGP = ( D / 7 )^2
    const LGP = Math.pow(D / 7.0, 2);

    // Exit pupil: EP = D / M = f_eye / f_ratio  [mm]
    const exit_pupil = D / M;

    mgResEl.textContent = 'Magnification = ' + Math.round(M) + '×';
    lgResEl.textContent = 'LGP = ' + Math.round(LGP) + '× Eye | Focal Ratio = f/' + f_ratio.toFixed(1) + ' | Exit Pupil = ' + exit_pupil.toFixed(2) + ' mm';
  }

  [dEl, fsEl, feEl].forEach(el => el.addEventListener('input', update));
  update();
})();