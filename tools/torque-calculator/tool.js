(() => {
  'use strict';
  const fEl = document.getElementById('tq-force'), rEl = document.getElementById('tq-radius');
  const aEl = document.getElementById('tq-angle'), rpmEl = document.getElementById('tq-rpm');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('tq-res-card');
  const resTq = document.getElementById('tq-res-torque'), resHp = document.getElementById('tq-res-hp'), resW = document.getElementById('tq-res-watts');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const F = parseFloat(fEl.value);
    const r = parseFloat(rEl.value);
    const angleDeg = parseFloat(aEl.value) || 90;
    const rpm = parseFloat(rpmEl.value) || 0;

    if (isNaN(F) || isNaN(r) || F <= 0 || r <= 0) {
      setMsg('Please enter positive values for force and lever arm distance.', true);
      resCard.style.display = 'none'; return;
    }

    const rad = (angleDeg * Math.PI) / 180;
    const torque = F * r * Math.sin(rad);

    // Power = Torque (N·m) * Angular velocity (rad/s) = Torque * (2 * pi * RPM / 60)
    const omega = (2 * Math.PI * rpm) / 60;
    const powerWatts = torque * omega;
    const hp = powerWatts / 745.7;

    resTq.textContent = torque.toFixed(2) + ' N·m (' + (torque * 0.737562).toFixed(2) + ' lb·ft)';
    resW.textContent = powerWatts >= 1000 ? (powerWatts / 1000).toFixed(2) + ' kW' : Math.round(powerWatts) + ' Watts';
    resHp.textContent = hp >= 0.01 ? hp.toFixed(2) + ' HP' : '0 HP (Static)';

    resCard.style.display = 'block';
    setMsg('Torque and rotational power calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fEl.value = '50'; rEl.value = '0.3'; aEl.value = '90'; rpmEl.value = '1500'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();