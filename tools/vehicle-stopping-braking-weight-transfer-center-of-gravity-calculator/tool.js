(() => {
  'use strict';
  const mEl = document.getElementById('wt-m'), lEl = document.getElementById('wt-l');
  const hEl = document.getElementById('wt-h'), aEl = document.getElementById('wt-a');
  const dwResEl = document.getElementById('wt-res-dw'), spResEl = document.getElementById('wt-res-split');

  function update() {
    const W_kg = parseFloat(mEl.value), L_m = parseFloat(lEl.value);
    const h_m = parseFloat(hEl.value), a_g = parseFloat(aEl.value);

    if (isNaN(W_kg) || isNaN(L_m) || isNaN(h_m) || isNaN(a_g) || W_kg <= 0 || L_m <= 0 || h_m <= 0 || a_g <= 0) return;

    const Delta_W_kg = a_g * (h_m / L_m) * W_kg;
    const dynamic_front = (W_kg * 0.50) + Delta_W_kg;
    const dynamic_rear = (W_kg * 0.50) - Delta_W_kg;

    dwResEl.textContent = 'Transferred ΔW = ' + Delta_W_kg.toFixed(1) + ' kg (' + Math.round(Delta_W_kg * 9.80665).toLocaleString() + ' N)';
    spResEl.textContent = 'Front = ' + Math.round(dynamic_front) + ' kg (' + ((dynamic_front/W_kg)*100).toFixed(1) + '%) | Rear = ' + Math.round(dynamic_rear) + ' kg (' + ((dynamic_rear/W_kg)*100).toFixed(1) + '%)';
  }

  [mEl, lEl, hEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();