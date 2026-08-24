(() => {
  'use strict';
  const pEl = document.getElementById('emi-principal'), rEl = document.getElementById('emi-rate'), yEl = document.getElementById('emi-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('emi-res-card');
  const resEmi = document.getElementById('emi-res-monthly'), resInt = document.getElementById('emi-res-interest'), resTot = document.getElementById('emi-res-total');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const P = parseFloat(pEl.value);
    const annualRate = parseFloat(rEl.value);
    const years = parseFloat(yEl.value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setMsg('Please enter valid positive numbers for loan parameters.', true);
      resCard.style.display = 'none'; return;
    }

    const n = years * 12;
    const r = (annualRate / 12) / 100;

    // EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totalInt = totalPay - P;

    resEmi.textContent = '$' + Math.round(emi).toLocaleString() + ' / month';
    resInt.textContent = '$' + Math.round(totalInt).toLocaleString();
    resTot.textContent = '$' + Math.round(totalPay).toLocaleString();

    resCard.style.display = 'block';
    setMsg('Loan amortization calculated.');
  });

  clearBtn.addEventListener('click', () => {
    pEl.value = '100000'; rEl.value = '8.5'; yEl.value = '5'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();