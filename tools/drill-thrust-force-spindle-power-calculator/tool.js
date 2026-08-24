(() => {
  'use strict';
  const mEl = document.getElementById('sp-mat'), mrrEl = document.getElementById('sp-mrr'), etaEl = document.getElementById('sp-eta');
  const hpResEl = document.getElementById('sp-res-hp'), cutResEl = document.getElementById('sp-res-cut');

  function update() {
    const Kp = parseFloat(mEl.value), mrr = parseFloat(mrrEl.value), etaPct = parseFloat(etaEl.value);
    if (isNaN(Kp) || isNaN(mrr) || isNaN(etaPct) || Kp <= 0 || mrr <= 0 || etaPct <= 0) return;

    const eta = etaPct / 100;
    const pCutHp = mrr * Kp;
    const pMotorHp = pCutHp / eta;
    const pMotorKw = pMotorHp * 0.7457;

    hpResEl.textContent = pMotorHp.toFixed(2) + ' HP (' + pMotorKw.toFixed(2) + ' kW Motor Demand)';
    cutResEl.textContent = 'Net Tool-Tip Power: ' + pCutHp.toFixed(2) + ' HP (Unit Power K_p = ' + Kp.toFixed(2) + ' HP/in³/min)';
  }

  mrrEl.addEventListener('input', update);
  etaEl.addEventListener('input', update);
  mEl.addEventListener('change', update);
  update();
})();