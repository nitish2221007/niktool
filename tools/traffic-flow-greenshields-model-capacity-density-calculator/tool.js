(() => {
  'use strict';
  const vfEl = document.getElementById('gs-vf'), kjEl = document.getElementById('gs-kj'), kEl = document.getElementById('gs-k');
  const flResEl = document.getElementById('gs-res-flow'), stResEl = document.getElementById('gs-res-state');

  function update() {
    const v_f = parseFloat(vfEl.value), k_j = parseFloat(kjEl.value), k = parseFloat(kEl.value);
    if (isNaN(v_f) || isNaN(k_j) || isNaN(k) || v_f <= 0 || k_j <= 0 || k < 0) return;

    // Greenshields linear speed-density: v = v_f * ( 1 - k / k_j )
    const v = Math.max(0, v_f * (1.0 - (k / k_j)));

    // Traffic flow: q = k * v  [veh / hr]
    const q = k * v;

    // Max capacity at k_opt = k_j / 2, v_opt = v_f / 2: q_max = 0.25 * v_f * k_j
    const q_max = 0.25 * v_f * k_j;
    const k_opt = k_j / 2.0;

    let regime = '', color = '#22543d';
    if (k <= k_opt) {
      regime = 'UNCONGESTED FREE FLOW (k ≤ k_opt: Stable traffic stream)';
      color = '#22543d';
    } else {
      regime = 'CONGESTED FORCED FLOW (k > k_opt: Stop-and-go breakdown / Bottleneck queue)';
      color = '#c53030';
    }

    flResEl.textContent = 'Flow q = ' + Math.round(q).toLocaleString() + ' veh / hr / lane (' + (k === k_opt ? 'MAX CAPACITY' : regime.split(' (')[0]) + ')';
    flResEl.style.color = color;
    stResEl.textContent = 'Speed v = ' + v.toFixed(1) + ' km/h | Max Capacity q_max = ' + Math.round(q_max).toLocaleString() + ' veh/h @ k_opt = ' + k_opt.toFixed(0) + ' veh/km';
    stResEl.style.color = color;
  }

  [vfEl, kjEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();