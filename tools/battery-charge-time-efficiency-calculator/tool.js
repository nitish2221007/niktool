(() => {
  'use strict';
  const capEl = document.getElementById('chg-cap'), curEl = document.getElementById('chg-current'), chemEl = document.getElementById('chg-chem');
  const tResEl = document.getElementById('chg-res-time'), cResEl = document.getElementById('chg-res-c');

  function update() {
    const capMah = parseFloat(capEl.value), curA = parseFloat(curEl.value), eff = parseFloat(chemEl.value);
    if (isNaN(capMah) || isNaN(curA) || isNaN(eff) || capMah <= 0 || curA <= 0 || eff <= 0) return;

    const curMa = curA * 1000;
    // Charge Time (Hours) = (Capacity / Current) / Efficiency
    const timeH = (capMah / curMa) / eff;
    const hours = Math.floor(timeH);
    const mins = Math.round((timeH - hours) * 60);

    // C-rate = Current (A) / Capacity (Ah)
    const capAh = capMah / 1000;
    const cRate = curA / capAh;

    tResEl.textContent = timeH.toFixed(2) + ' Hours (' + hours + 'h ' + mins + 'm)';
    cResEl.textContent = cRate.toFixed(2) + ' C (' + (cRate <= 0.5 ? 'Gentle Long-Life' : (cRate <= 1.0 ? 'Standard 1C' : 'Fast Fast-Charge')) + ')';
  }

  [capEl, curEl, chemEl].forEach(el => el.addEventListener('input', update));
  update();
})();