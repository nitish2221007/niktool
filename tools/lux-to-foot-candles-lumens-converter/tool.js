(() => {
  'use strict';
  const luxEl = document.getElementById('lx-lux'), fcEl = document.getElementById('lx-fc');
  const descEl = document.getElementById('lx-res-desc'), sunEl = document.getElementById('lx-res-sun');

  function updateFromLux(lux) {
    // 1 fc = 10.7639 lux => fc = lux / 10.7639
    const fc = lux / 10.7639;
    fcEl.value = fc.toFixed(2);

    if (lux < 20) descEl.textContent = 'Night / Emergency Lighting (<20 lx)';
    else if (lux < 150) descEl.textContent = 'Hallway / Corridor (50 - 150 lx)';
    else if (lux < 300) descEl.textContent = 'Living Room / Casual Retail (150 - 300 lx)';
    else if (lux < 750) descEl.textContent = 'Office Workstation / Classroom (500 lx)';
    else if (lux < 2000) descEl.textContent = 'Precision Drafting / Surgery (1,000 - 2,000 lx)';
    else descEl.textContent = 'Direct Sunlight / Television Studio (10,000+ lx)';

    sunEl.textContent = ((lux / 100000) * 100).toFixed(2) + '% of Direct Sunlight (100,000 lx)';
  }

  luxEl.addEventListener('input', () => {
    const v = parseFloat(luxEl.value);
    if (!isNaN(v)) updateFromLux(v);
  });

  fcEl.addEventListener('input', () => {
    const v = parseFloat(fcEl.value);
    if (!isNaN(v)) {
      const lux = v * 10.7639;
      luxEl.value = lux.toFixed(1);
      updateFromLux(lux);
    }
  });

  updateFromLux(500);
})();