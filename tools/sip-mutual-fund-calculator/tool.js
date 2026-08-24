(() => {
  'use strict';
  const mEl = document.getElementById('sip-monthly'), rEl = document.getElementById('sip-rate'), yEl = document.getElementById('sip-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('sip-res-card');
  const resTot = document.getElementById('sip-res-total'), resInv = document.getElementById('sip-res-invested'), resGain = document.getElementById('sip-res-gain');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const P = parseFloat(mEl.value);
    const annualRate = parseFloat(rEl.value);
    const years = parseFloat(yEl.value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setMsg('Please enter positive values for monthly investment, return rate, and years.', true);
      resCard.style.display = 'none'; return;
    }

    const n = years * 12;
    const i = (annualRate / 12) / 100;

    // SIP Formula: M = P * [ ((1 + i)^n - 1) / i ] * (1 + i)
    const maturity = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = P * n;
    const gain = maturity - invested;

    resTot.textContent = '$' + Math.round(maturity).toLocaleString();
    resInv.textContent = '$' + Math.round(invested).toLocaleString();
    resGain.textContent = '+$' + Math.round(gain).toLocaleString();

    resCard.style.display = 'block';
    setMsg('SIP wealth growth calculated.');
  });

  clearBtn.addEventListener('click', () => {
    mEl.value = '5000'; rEl.value = '12.0'; yEl.value = '15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();