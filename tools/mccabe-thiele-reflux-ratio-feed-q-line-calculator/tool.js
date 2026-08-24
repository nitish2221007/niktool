(() => {
  'use strict';
  const rEl = document.getElementById('mct-r'), xdEl = document.getElementById('mct-xd');
  const xfEl = document.getElementById('mct-xf'), qEl = document.getElementById('mct-q');
  const rolResEl = document.getElementById('mct-res-rol'), qlResEl = document.getElementById('mct-res-qline');

  function update() {
    const R = parseFloat(rEl.value), xD = parseFloat(xdEl.value);
    const xF = parseFloat(xfEl.value), q = parseFloat(qEl.value);

    if (isNaN(R) || isNaN(xD) || isNaN(xF) || isNaN(q) || R <= 0 || xD <= 0 || xF <= 0) return;

    // Rectifying Operating Line (ROL): y = (R / (R + 1)) * x + (xD / (R + 1))
    const slopeROL = R / (R + 1.0);
    const interceptROL = xD / (R + 1.0);

    // Feed q-line: y = (q / (q - 1)) * x - (xF / (q - 1))
    let qlineStr = '';
    if (Math.abs(q - 1.0) < 1e-4) {
      qlineStr = 'Vertical line x = ' + xF.toFixed(3) + ' (Saturated Liquid Feed)';
    } else if (Math.abs(q) < 1e-4) {
      qlineStr = 'Horizontal line y = ' + xF.toFixed(3) + ' (Saturated Vapor Feed)';
    } else {
      const slopeQ = q / (q - 1.0);
      const interceptQ = -xF / (q - 1.0);
      qlineStr = 'y = ' + slopeQ.toFixed(3) + '·x + ' + interceptQ.toFixed(3) + ' (Slope = ' + slopeQ.toFixed(2) + ')';
    }

    rolResEl.textContent = 'ROL: y = ' + slopeROL.toFixed(3) + '·x + ' + interceptROL.toFixed(3);
    qlResEl.textContent = 'Feed q-Line: ' + qlineStr + ' | y-Intercept = ' + interceptROL.toFixed(3);
  }

  [rEl, xdEl, xfEl].forEach(el => el.addEventListener('input', update));
  qEl.addEventListener('change', update);
  update();
})();