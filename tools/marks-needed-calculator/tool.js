(function() {
  'use strict';
  const currentMarksEl = document.getElementById('current-marks');
  const currentTotalEl = document.getElementById('current-total');
  const targetPercEl = document.getElementById('target-percentage');
  const remainingTotalEl = document.getElementById('remaining-total');
  const outputEl = document.getElementById('marks-needed-calculator-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('marks-needed-calculator-message');

  primaryBtn.addEventListener('click', function() {
    const currentMarks = parseFloat(currentMarksEl.value);
    const currentTotal = parseFloat(currentTotalEl.value);
    const targetPerc = parseFloat(targetPercEl.value);
    const remainingTotal = parseFloat(remainingTotalEl.value);
    
    if (isNaN(currentMarks) || isNaN(currentTotal) || isNaN(targetPerc) || isNaN(remainingTotal)) {
      msgEl.textContent = 'Please fill in all fields with valid numbers.';
      msgEl.classList.add('is-error');
      return;
    }
    
    if (currentMarks < 0 || currentTotal <= 0 || targetPerc < 0 || targetPerc > 100 || remainingTotal < 0) {
      msgEl.textContent = 'Please enter valid values (percentages must be 0-100, totals must be positive).';
      msgEl.classList.add('is-error');
      return;
    }
    
    const grandTotal = currentTotal + remainingTotal;
    const targetMarks = (targetPerc / 100) * grandTotal;
    const neededMarks = targetMarks - currentMarks;
    
    let result = `Current: ${currentMarks} / ${currentTotal}\n`;
    result += `Target: ${targetPerc}% of ${grandTotal} = ${targetMarks.toFixed(2)} marks\n`;
    result += `Remaining available: ${remainingTotal} marks\n\n`;
    
    if (neededMarks <= 0) {
      result += `✓ You have already achieved your target!`;
    } else if (neededMarks > remainingTotal) {
      result += `✗ Target is not achievable with remaining marks.\n`;
      result += `You need ${neededMarks.toFixed(2)} marks but only ${remainingTotal} are available.`;
    } else {
      result += `You need ${neededMarks.toFixed(2)} marks out of ${remainingTotal} remaining.`;
    }
    
    outputEl.value = result;
    copyBtn.disabled = false;
    msgEl.textContent = 'Required marks calculated!';
    msgEl.classList.remove('is-error');
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else {
      navigator.clipboard.writeText(outputEl.value);
    }
    msgEl.textContent = 'Result copied to clipboard!';
  });

  clearBtn.addEventListener('click', function() {
    currentMarksEl.value = '';
    currentTotalEl.value = '';
    targetPercEl.value = '';
    remainingTotalEl.value = '';
    outputEl.value = '';
    copyBtn.disabled = true;
    msgEl.textContent = 'Cleared. Ready for new input.';
  });
})();
