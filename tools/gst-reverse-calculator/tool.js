(() => {
  'use strict';
  const grossEl = document.getElementById('rgst-gross'), rateEl = document.getElementById('rgst-rate');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rgst-res-card');
  const resNet = document.getElementById('rgst-res-net'), resTax = document.getElementById('rgst-res-tax'), resHalf = document.getElementById('rgst-res-half');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const gross = parseFloat(grossEl.value);
    const rate = parseFloat(rateEl.value);

    if (isNaN(gross) || gross <= 0 || isNaN(rate) || rate <= 0) {
      setMsg('Please enter a valid positive gross amount.', true);
      resCard.style.display = 'none'; return;
    }

    // Base Price = Gross / (1 + Rate/100)
    const net = gross / (1 + (rate / 100));
    const tax = gross - net;
    const halfTax = tax / 2;

    resNet.textContent = '₹ ' + net.toFixed(2);
    resTax.textContent = '₹ ' + tax.toFixed(2);
    resHalf.textContent = '₹ ' + halfTax.toFixed(2) + ' (' + (rate / 2) + '%)';

    resCard.style.display = 'block';
    setMsg('Reverse GST calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    grossEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();