(() => {
  'use strict';
  const vsEl = document.getElementById('led-vs'), vfEl = document.getElementById('led-vf'), ifEl = document.getElementById('led-if');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('led-res-card');
  const resOhms = document.getElementById('led-res-ohms'), resPower = document.getElementById('led-res-power'), resStd = document.getElementById('led-res-std');

  const E24 = [100, 110, 120, 130, 150, 160, 180, 200, 220, 240, 270, 300, 330, 360, 390, 430, 470, 510, 560, 620, 680, 750, 820, 910, 1000];

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const vs = parseFloat(vsEl.value);
    const vf = parseFloat(vfEl.value);
    const ifMa = parseFloat(ifEl.value);

    if (isNaN(vs) || isNaN(vf) || isNaN(ifMa) || vs <= vf || ifMa <= 0) {
      setMsg('Supply voltage (Vs) must be greater than LED forward voltage (Vf).', true);
      resCard.style.display = 'none'; return;
    }

    const ifAmps = ifMa / 1000;
    const rOhms = (vs - vf) / ifAmps;
    const powerWatts = (vs - vf) * ifAmps;

    // Find nearest higher standard E24 resistor
    let nearestE24 = rOhms;
    for (const val of E24) {
      if (val >= rOhms) { nearestE24 = val; break; }
    }

    resOhms.textContent = rOhms.toFixed(1) + ' Ω (Ohms)';
    resPower.textContent = (powerWatts * 1000).toFixed(1) + ' mW (Use 1/4W resistor)';
    resStd.textContent = nearestE24 + ' Ω';

    resCard.style.display = 'block';
    setMsg('Resistor requirements calculated.');
  });

  clearBtn.addEventListener('click', () => {
    vsEl.value = '5.0'; vfEl.value = '2.0'; ifEl.value = '20'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();