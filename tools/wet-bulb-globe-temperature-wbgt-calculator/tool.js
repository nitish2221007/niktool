(() => {
  'use strict';
  const twEl = document.getElementById('wbgt-tw'), tgEl = document.getElementById('wbgt-tg'), tdEl = document.getElementById('wbgt-td');
  const valResEl = document.getElementById('wbgt-res-val'), flResEl = document.getElementById('wbgt-res-flag');

  function update() {
    const Tw = parseFloat(twEl.value), Tg = parseFloat(tgEl.value), Td = parseFloat(tdEl.value);
    if (isNaN(Tw) || isNaN(Tg) || isNaN(Td)) return;

    // Outdoor with solar load: WBGT = 0.7*Tw + 0.2*Tg + 0.1*Td
    const wbgtF = (0.7 * Tw) + (0.2 * Tg) + (0.1 * Td);
    const wbgtC = (wbgtF - 32) * (5 / 9);

    valResEl.textContent = wbgtF.toFixed(1) + ' °F (' + wbgtC.toFixed(1) + ' °C)';

    if (wbgtF >= 90) {
      flResEl.textContent = 'BLACK FLAG (≥90°F: Suspend Strenuous Outdoor Activity)';
      flResEl.style.color = '#111827';
    } else if (wbgtF >= 88) {
      flResEl.textContent = 'RED FLAG (88-89°F: Maximum 20m Work / 40m Rest)';
      flResEl.style.color = '#c53030';
    } else if (wbgtF >= 85) {
      flResEl.textContent = 'YELLOW FLAG (85-87°F: 30m Work / 30m Rest)';
      flResEl.style.color = '#d97706';
    } else if (wbgtF >= 82) {
      flResEl.textContent = 'GREEN FLAG (82-84°F: Heavy Exercise Discretion)';
      flResEl.style.color = '#22543d';
    } else {
      flResEl.textContent = 'WHITE FLAG (<82°F: Normal Activity)';
      flResEl.style.color = '#2563eb';
    }
  }

  [twEl, tgEl, tdEl].forEach(el => el.addEventListener('input', update));
  update();
})();