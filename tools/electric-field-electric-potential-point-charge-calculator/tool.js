(() => {
  'use strict';
  const qEl = document.getElementById('ef-q'), rEl = document.getElementById('ef-r');
  const fldResEl = document.getElementById('ef-res-field'), potResEl = document.getElementById('ef-res-pot');

  const k_e = 8.9875517923e9; // N * m^2 / C^2

  function update() {
    const q_nC = parseFloat(qEl.value), r_cm = parseFloat(rEl.value);
    if (isNaN(q_nC) || isNaN(r_cm) || r_cm <= 0) return;

    const q_C = q_nC * 1e-9;
    const r_m = r_cm / 100.0;

    // Electric field E = k_e * |q| / r^2  [V / m = N / C]
    const E = (k_e * Math.abs(q_C)) / Math.pow(r_m, 2);

    // Electric potential V = k_e * q / r  [Volts]
    const V = (k_e * q_C) / r_m;

    const isPositive = q_nC > 0;
    const dir = isPositive ? 'Radially OUTWARD (Repels positive test charge)' : 'Radially INWARD (Attracts positive test charge)';

    fldResEl.textContent = 'Field E = ' + Math.round(E).toLocaleString() + ' V / m (N/C)';
    potResEl.textContent = 'Potential V = ' + (V >= 0 ? '+' : '') + V.toFixed(1) + ' Volts | ' + dir + ' @ r = ' + r_cm + ' cm';
  }

  qEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();