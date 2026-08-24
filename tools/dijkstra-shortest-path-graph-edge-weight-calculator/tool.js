(() => {
  'use strict';
  const dvEl = document.getElementById('dj-dv'), duEl = document.getElementById('dj-du'), wEl = document.getElementById('dj-w');
  const rxResEl = document.getElementById('dj-res-relax'), pdResEl = document.getElementById('dj-res-pred');

  function update() {
    const d_v = parseFloat(dvEl.value), d_u = parseFloat(duEl.value), w = parseFloat(wEl.value);
    if (isNaN(d_v) || isNaN(d_u) || isNaN(w) || d_u < 0 || w < 0) return;

    const candidate = d_u + w;

    if (candidate < d_v) {
      const diff = d_v - candidate;
      rxResEl.textContent = 'RELAXED: New d(v) = ' + candidate + ' (Shortened by -' + diff + ')';
      rxResEl.style.color = '#22543d';
      pdResEl.textContent = 'Predecessor updated to node u | d(u) + w = ' + d_u + ' + ' + w + ' = ' + candidate + ' < ' + d_v;
      pdResEl.style.color = '#22543d';
    } else {
      rxResEl.textContent = 'NO CHANGE: d(v) stays ' + d_v + ' (Candidate ' + candidate + ' ≥ ' + d_v + ')';
      rxResEl.style.color = '#ea580c';
      pdResEl.textContent = 'Existing path through alternate route remains shorter or equal';
      pdResEl.style.color = '#ea580c';
    }
  }

  [dvEl, duEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();