(() => {
  'use strict';
  const a250El = document.getElementById('nrc-250'), a500El = document.getElementById('nrc-500');
  const a1000El = document.getElementById('nrc-1000'), a2000El = document.getElementById('nrc-2000');
  const nrcResEl = document.getElementById('nrc-res-nrc'), pResEl = document.getElementById('nrc-res-perf');

  function update() {
    const a250 = parseFloat(a250El.value), a500 = parseFloat(a500El.value);
    const a1000 = parseFloat(a1000El.value), a2000 = parseFloat(a2000El.value);

    if (isNaN(a250) || isNaN(a500) || isNaN(a1000) || isNaN(a2000) || a250 < 0 || a500 < 0 || a1000 < 0 || a2000 < 0) return;

    // NRC is arithmetic average rounded to nearest 0.05
    const rawNrc = (a250 + a500 + a1000 + a2000) / 4;
    const roundedNrc = Math.round(rawNrc / 0.05) * 0.05;

    nrcResEl.textContent = roundedNrc.toFixed(2) + ' NRC (Raw: ' + rawNrc.toFixed(3) + ')';

    if (roundedNrc >= 0.90) {
      pResEl.textContent = 'Class A Absorber (Maximum Echo & Reverberation Control)';
      pResEl.style.color = '#22543d';
    } else if (roundedNrc >= 0.70) {
      pResEl.textContent = 'Class B Absorber (Highly Effective Acoustic Foam/Fiberglass)';
      pResEl.style.color = '#22543d';
    } else if (roundedNrc >= 0.50) {
      pResEl.textContent = 'Class C Absorber (Moderate Acoustic Ceiling Tiles)';
      pResEl.style.color = '#2563eb';
    } else {
      pResEl.textContent = 'Hard Reflective Surface (Low Sound Absorption)';
      pResEl.style.color = '#c53030';
    }
  }

  [a250El, a500El, a1000El, a2000El].forEach(el => el.addEventListener('input', update));
  update();
})();