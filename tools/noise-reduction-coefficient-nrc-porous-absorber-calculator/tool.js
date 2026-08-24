(() => {
  'use strict';
  const a250El = document.getElementById('nrc-250'), a500El = document.getElementById('nrc-500');
  const a1kEl = document.getElementById('nrc-1k'), a2kEl = document.getElementById('nrc-2k');
  const nrcResEl = document.getElementById('nrc-res-nrc'), dcResEl = document.getElementById('nrc-res-desc');

  function update() {
    const a250 = parseFloat(a250El.value), a500 = parseFloat(a500El.value);
    const a1k = parseFloat(a1kEl.value), a2k = parseFloat(a2kEl.value);

    if (isNaN(a250) || isNaN(a500) || isNaN(a1k) || isNaN(a2k)) return;

    // Raw average: (a250 + a500 + a1000 + a2000) / 4
    const rawAvg = (a250 + a500 + a1k + a2k) / 4.0;

    // ASTM C423 NRC is rounded to the nearest multiple of 0.05
    const NRC = Math.round(rawAvg * 20) / 20;

    let rating = '';
    let color = '#22543d';

    if (NRC < 0.20) {
      rating = 'Reflective Hard Surface (Concrete, Glass, Tile)';
      color = '#c53030';
    } else if (NRC < 0.50) {
      rating = 'Low-Absorption Material (Thin Carpet, Standard Ceiling Tile)';
      color = '#d97706';
    } else if (NRC < 0.75) {
      rating = 'Moderate Commercial Sound Absorber (Acoustic Baffle, Fabric Panel)';
      color = '#2563eb';
    } else {
      rating = 'High-Performance Acoustic Absorber (Studio Fiberglass / Open-Cell Foam)';
      color = '#22543d';
    }

    nrcResEl.textContent = 'NRC = ' + NRC.toFixed(2) + ' (Exact SAA = ' + rawAvg.toFixed(3) + ')';
    dcResEl.textContent = rating + ' (' + (rawAvg * 100).toFixed(1) + '% Average Acoustic Sound Absorption)';
    dcResEl.style.color = color;
  }

  [a250El, a500El, a1kEl, a2kEl].forEach(el => el.addEventListener('input', update));
  update();
})();