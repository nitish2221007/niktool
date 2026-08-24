(() => {
  'use strict';
  const bpmEl = document.getElementById('bpm-val');
  const qEl = document.getElementById('bpm-res-1-4'), d8El = document.getElementById('bpm-res-1-8d');
  const e8El = document.getElementById('bpm-res-1-8'), t8El = document.getElementById('bpm-res-1-8t');

  function update() {
    const bpm = parseFloat(bpmEl.value);
    if (isNaN(bpm) || bpm <= 0) return;

    // 1/4 note ms = (60,000 / BPM)
    const quarterMs = 60000 / bpm;
    const dotted8Ms = quarterMs * 0.75;
    const eighthMs = quarterMs * 0.5;
    const triplet8Ms = quarterMs * (2 / 3);

    qEl.textContent = quarterMs.toFixed(1) + ' ms';
    d8El.textContent = dotted8Ms.toFixed(1) + ' ms';
    e8El.textContent = eighthMs.toFixed(1) + ' ms';
    t8El.textContent = triplet8Ms.toFixed(1) + ' ms';
  }

  bpmEl.addEventListener('input', update);
  update();
})();