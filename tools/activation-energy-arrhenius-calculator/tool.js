(() => {
  'use strict';
  const t1El = document.getElementById('arr-t1'), k1El = document.getElementById('arr-k1');
  const t2El = document.getElementById('arr-t2'), k2El = document.getElementById('arr-k2');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('arr-res-card');
  const resEa = document.getElementById('arr-res-ea'), resRatio = document.getElementById('arr-res-ratio');

  const R = 8.314462; // J / (mol K)

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const t1 = parseFloat(t1El.value), k1 = parseFloat(k1El.value);
    const t2 = parseFloat(t2El.value), k2 = parseFloat(k2El.value);

    if (isNaN(t1) || isNaN(k1) || isNaN(t2) || isNaN(k2) || t1 <= 0 || k1 <= 0 || t2 <= 0 || k2 <= 0 || t1 === t2) {
      setMsg('Please enter valid positive values with different temperatures.', true);
      resCard.style.display = 'none'; return;
    }

    // ln(k2/k1) = (-Ea / R) * (1/T2 - 1/T1) = (Ea / R) * (1/T1 - 1/T2)
    // Ea = (R * ln(k2/k1)) / (1/T1 - 1/T2)
    const ratio = k2 / k1;
    const eaJoules = (R * Math.log(ratio)) / ((1 / t1) - (1 / t2));
    const eaKj = eaJoules / 1000;

    resEa.textContent = eaKj.toFixed(2) + ' kJ/mol (' + eaJoules.toFixed(0) + ' J/mol)';
    resRatio.textContent = ratio.toFixed(2) + 'x Faster';

    resCard.style.display = 'block';
    setMsg('Activation energy computed.');
  });

  clearBtn.addEventListener('click', () => {
    t1El.value = '298.15'; k1El.value = '0.015'; t2El.value = '318.15'; k2El.value = '0.045'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();