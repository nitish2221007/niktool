(() => {
  'use strict';
  const opEl = document.getElementById('unc-op'), xEl = document.getElementById('unc-x'), dxEl = document.getElementById('unc-dx');
  const yEl = document.getElementById('unc-y'), dyEl = document.getElementById('unc-dy');
  const grpY = document.getElementById('unc-grp-y'), grpDy = document.getElementById('unc-grp-dy');
  const zResEl = document.getElementById('unc-res-z'), pctResEl = document.getElementById('unc-res-pct');

  function update() {
    const op = opEl.value;
    const x = parseFloat(xEl.value), dx = parseFloat(dxEl.value);
    const y = parseFloat(yEl.value), dy = parseFloat(dyEl.value);

    if (isNaN(x) || isNaN(dx) || dx < 0) return;

    const pct_x = (dx / Math.abs(x)) * 100.0;
    let Z = 0, deltaZ = 0, pct_z = 0, detail = '';

    if (op === 'add') {
      if (isNaN(y) || isNaN(dy)) return;
      Z = x + y;
      deltaZ = dx + dy;
      pct_z = (deltaZ / Math.abs(Z)) * 100.0;
      detail = 'Addition Rule: Δz = Δx + Δy = ' + dx.toFixed(3) + ' + ' + dy.toFixed(3);
    } else if (op === 'sub') {
      if (isNaN(y) || isNaN(dy)) return;
      Z = x - y;
      deltaZ = dx + dy; // In subtraction, absolute uncertainties still add!
      pct_z = (deltaZ / Math.abs(Z)) * 100.0;
      detail = 'Subtraction Rule: Δz = Δx + Δy (Uncertainties always add, never subtract)';
    } else if (op === 'mult') {
      if (isNaN(y) || isNaN(dy)) return;
      const pct_y = (dy / Math.abs(y)) * 100.0;
      Z = x * y;
      pct_z = pct_x + pct_y;
      deltaZ = Math.abs(Z) * (pct_z / 100.0);
      detail = 'Multiplication: %Δz = %Δx (' + pct_x.toFixed(2) + '%) + %Δy (' + pct_y.toFixed(2) + '%) = ' + pct_z.toFixed(2) + '%';
    } else if (op === 'div') {
      if (isNaN(y) || isNaN(dy) || y === 0) return;
      const pct_y = (dy / Math.abs(y)) * 100.0;
      Z = x / y;
      pct_z = pct_x + pct_y;
      deltaZ = Math.abs(Z) * (pct_z / 100.0);
      detail = 'Division: %Δz = %Δx (' + pct_x.toFixed(2) + '%) + %Δy (' + pct_y.toFixed(2) + '%) = ' + pct_z.toFixed(2) + '%';
    } else if (op === 'pow') {
      const n = isNaN(y) ? 2 : y;
      Z = Math.pow(x, n);
      pct_z = Math.abs(n) * pct_x;
      deltaZ = Math.abs(Z) * (pct_z / 100.0);
      detail = 'Power Rule: %Δz = |n| · %Δx = |' + n + '| · ' + pct_x.toFixed(2) + '% = ' + pct_z.toFixed(2) + '%';
    }

    zResEl.textContent = 'Z = ' + Z.toFixed(2) + ' ± ' + deltaZ.toFixed(2);
    pctResEl.textContent = 'Percentage Uncertainty: ±' + pct_z.toFixed(2) + '% (' + detail + ')';
  }

  [opEl, xEl, dxEl, yEl, dyEl].forEach(el => el.addEventListener('input', update));
  opEl.addEventListener('change', () => {
    if (opEl.value === 'pow') {
      grpY.querySelector('label').textContent = 'Exponent (n)';
      grpDy.style.display = 'none';
    } else {
      grpY.querySelector('label').textContent = 'Value Y (y)';
      grpDy.style.display = 'block';
    }
    update();
  });
  update();
})();