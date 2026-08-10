(function() {
  'use strict';

  const RATE_USD_INR = 83.50;

  const usdInput = document.getElementById('usd-input');
  const inrOutput = document.getElementById('inr-output');
  const convertBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('usd-inr-message');
  const rateInfo = document.getElementById('rate-info');
  const quickBtns = document.querySelectorAll('.quick-amount');

  function formatINR(num) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  function doConvert() {
    const val = parseFloat(usdInput.value);
    if (isNaN(val) || val < 0) {
      inrOutput.value = '';
      copyBtn.disabled = true;
      if (usdInput.value !== '') showMsg('Please enter a valid positive amount.', true);
      return;
    }
    const result = val * RATE_USD_INR;
    inrOutput.value = `$${val.toFixed(2)} USD = ${formatINR(result)}\n\nIn words: approx. ${Math.round(result).toLocaleString('en-IN')} Rupees`;
    copyBtn.disabled = false;
    showMsg(`Converted $${val.toFixed(2)} USD → ${formatINR(result)} INR`);
  }

  function showMsg(text, isError) {
    msgEl.textContent = text;
    msgEl.classList.toggle('is-error', !!isError);
  }

  usdInput.addEventListener('input', doConvert);
  convertBtn.addEventListener('click', doConvert);

  quickBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      usdInput.value = btn.getAttribute('data-amount');
      doConvert();
    });
  });

  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(inrOutput.value).then(function() {
      showMsg('Result copied to clipboard!');
    }).catch(function() {
      showMsg('Failed to copy.', true);
    });
  });

  clearBtn.addEventListener('click', function() {
    usdInput.value = '';
    inrOutput.value = '';
    copyBtn.disabled = true;
    showMsg('Cleared. Enter a new amount in USD.');
  });
})();
