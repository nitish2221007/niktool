(function() {
  'use strict';

  const RATE_INR_CNY = 0.086;

  const inrInput = document.getElementById('inr-input');
  const cnyOutput = document.getElementById('cny-output');
  const convertBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('inr-cny-message');
  const quickBtns = document.querySelectorAll('.quick-amount');

  function formatCNY(num) {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  function formatINR(num) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  }

  function doConvert() {
    const val = parseFloat(inrInput.value);
    if (isNaN(val) || val < 0) {
      cnyOutput.value = '';
      copyBtn.disabled = true;
      if (inrInput.value !== '') showMsg('Please enter a valid positive amount.', true);
      return;
    }
    const result = val * RATE_INR_CNY;
    cnyOutput.value = `${formatINR(val)} = ${formatCNY(result)}\n\nApproximately ¥${result.toFixed(2)} Chinese Yuan`;
    copyBtn.disabled = false;
    showMsg(`Converted ₹${val.toFixed(2)} → ¥${result.toFixed(2)} CNY`);
  }

  function showMsg(text, isError) {
    msgEl.textContent = text;
    msgEl.classList.toggle('is-error', !!isError);
  }

  inrInput.addEventListener('input', doConvert);
  convertBtn.addEventListener('click', doConvert);

  quickBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      inrInput.value = btn.getAttribute('data-amount');
      doConvert();
    });
  });

  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(cnyOutput.value).then(function() {
      showMsg('Result copied to clipboard!');
    }).catch(function() {
      showMsg('Failed to copy.', true);
    });
  });

  clearBtn.addEventListener('click', function() {
    inrInput.value = '';
    cnyOutput.value = '';
    copyBtn.disabled = true;
    showMsg('Cleared. Enter a new amount in INR.');
  });
})();
