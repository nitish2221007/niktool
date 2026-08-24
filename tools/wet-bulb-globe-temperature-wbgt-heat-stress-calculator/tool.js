(() => {
  'use strict';
  const twEl = document.getElementById('wbgt-tw'), tgEl = document.getElementById('wbgt-tg'), tdEl = document.getElementById('wbgt-td');
  const wResEl = document.getElementById('wbgt-res-val'), fResEl = document.getElementById('wbgt-res-flag');

  function update() {
    const Tw = parseFloat(twEl.value), Tg = parseFloat(tgEl.value), Td = parseFloat(tdEl.value);
    if (isNaN(Tw) || isNaN(Tg) || isNaN(Td)) return;

    // Outdoor WBGT formula with solar radiation: WBGT = 0.7 * Tw + 0.2 * Tg + 0.1 * Td  [°C]
    const WBGT_C = (0.7 * Tw) + (0.2 * Tg) + (0.1 * Td);
    const WBGT_F = (WBGT_C * 9.0 / 5.0) + 32.0;

    let flag = '';
    let color = '#22543d';

    if (WBGT_C < 26.7) {
      flag = 'WHITE FLAG / LOW RISK (WBGT < 26.7°C / 80°F: Normal training, caution for unacclimatized)';
      color = '#22543d';
    } else if (WBGT_C < 29.4) {
      flag = 'GREEN FLAG (WBGT 26.7 - 29.3°C / 80 - 84.9°F: 50 min work / 10 min rest per hour)';
      color = '#2563eb';
    } else if (WBGT_C < 31.1) {
      flag = 'YELLOW FLAG (WBGT 29.4 - 31.0°C / 85 - 87.9°F: 40 min work / 20 min rest, active hydration)';
      color = '#d97706';
    } else if (WBGT_C < 32.2) {
      flag = 'RED FLAG ALERT (WBGT 31.1 - 32.1°C / 88 - 89.9°F: 20 min work / 40 min rest, heavy PT suspended)';
      color = '#ea580c';
    } else {
      flag = 'BLACK FLAG EMERGENCY (WBGT ≥ 32.2°C / 90°F: ALL NON-ESSENTIAL OUTDOOR PHYSICAL ACTIVITY STOPPED)';
      color = '#c53030';
    }

    wResEl.textContent = 'WBGT = ' + WBGT_C.toFixed(1) + ' °C (' + WBGT_F.toFixed(1) + ' °F)';
    wResEl.style.color = color;
    fResEl.textContent = flag;
    fResEl.style.color = color;
  }

  [twEl, tgEl, tdEl].forEach(el => el.addEventListener('input', update));
  update();
})();