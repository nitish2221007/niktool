(() => {
  'use strict';
  const vEl = document.getElementById('wire-v'), iEl = document.getElementById('wire-i');
  const lenEl = document.getElementById('wire-len'), awgEl = document.getElementById('wire-awg');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('wire-res-card');
  const resV = document.getElementById('wire-res-drop-v'), resPct = document.getElementById('wire-res-drop-pct'), resEnd = document.getElementById('wire-res-v-end');

  // Resistance in Ohms per 1000 meters for copper at 20°C
  const AWG_RES = {
    18: 20.95, 16: 13.17, 14: 8.286, 12: 5.211,
    10: 3.277, 8: 2.061, 6: 1.296, 4: 0.8152
  };

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v = parseFloat(vEl.value);
    const i = parseFloat(iEl.value);
    const lenM = parseFloat(lenEl.value);
    const awg = parseInt(awgEl.value, 10);

    if (isNaN(v) || isNaN(i) || isNaN(lenM) || v <= 0 || i <= 0 || lenM <= 0) {
      setMsg('Please enter valid positive numbers for voltage, current, and wire distance.', true);
      resCard.style.display = 'none'; return;
    }

    // Round-trip wire distance is 2 * lenM
    const rPerKm = AWG_RES[awg] || 5.211;
    const totalR = (rPerKm / 1000) * (2 * lenM);
    const dropV = i * totalR;
    const dropPct = (dropV / v) * 100;
    const loadV = v - dropV;

    resV.textContent = dropV.toFixed(2) + ' Volts';
    resPct.textContent = dropPct.toFixed(2) + '%';
    resPct.style.color = dropPct <= 3.0 ? '#22543d' : (dropPct <= 5.0 ? '#d97706' : '#c53030');
    resEnd.textContent = loadV.toFixed(2) + ' Volts';

    resCard.style.display = 'block';
    setMsg('Voltage drop calculated.');
  });

  clearBtn.addEventListener('click', () => {
    vEl.value = '12'; iEl.value = '10'; lenEl.value = '15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();