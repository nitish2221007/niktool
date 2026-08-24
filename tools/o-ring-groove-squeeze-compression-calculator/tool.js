(() => {
  'use strict';
  const wEl = document.getElementById('or-w'), dEl = document.getElementById('or-depth');
  const sqResEl = document.getElementById('or-res-sq'), stResEl = document.getElementById('or-res-status');

  function update() {
    const W = parseFloat(wEl.value), depth = parseFloat(dEl.value);
    if (isNaN(W) || isNaN(depth) || W <= 0 || depth <= 0 || depth >= W) {
      sqResEl.textContent = 'Depth must be less than O-Ring W';
      return;
    }

    // Squeeze % = ( (W - depth) / W ) * 100
    const squeezeInches = W - depth;
    const squeezePct = (squeezeInches / W) * 100;

    sqResEl.textContent = squeezePct.toFixed(2) + '% (' + (squeezeInches * 1000).toFixed(1) + ' mils / ' + (squeezeInches * 25.4).toFixed(2) + ' mm)';

    if (squeezePct >= 15 && squeezePct <= 30) {
      stResEl.textContent = 'OPTIMAL for Static Industrial Seals (15% to 30% Squeeze)';
      stResEl.style.color = '#22543d';
    } else if (squeezePct >= 8 && squeezePct < 15) {
      stResEl.textContent = 'OPTIMAL for Dynamic Reciprocating Piston/Rod Seals (10% to 15%)';
      stResEl.style.color = '#2563eb';
    } else if (squeezePct > 30) {
      stResEl.textContent = 'EXCESS SQUEEZE (> 30%: Risk of Elastomer Extrusion & Pinching)';
      stResEl.style.color = '#c53030';
    } else {
      stResEl.textContent = 'INSUFFICIENT SQUEEZE (< 8%: Risk of Leakage)';
      stResEl.style.color = '#c53030';
    }
  }

  wEl.addEventListener('change', update);
  dEl.addEventListener('input', update);
  update();
})();