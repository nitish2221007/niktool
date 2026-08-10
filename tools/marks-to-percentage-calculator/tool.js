(function() {
  'use strict';
  const marksEl = document.getElementById('marks-obtained');
  const totalEl = document.getElementById('total-marks');
  const outputEl = document.getElementById('marks-to-percentage-calculator-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('marks-to-percentage-calculator-message');

  primaryBtn.addEventListener('click', function() {
    const marks = parseFloat(marksEl.value);
    const total = parseFloat(totalEl.value);
    
    if (isNaN(marks) || isNaN(total) || marks < 0 || total <= 0) {
      msgEl.textContent = 'Please enter valid marks and total (total must be greater than 0).';
      msgEl.classList.add('is-error');
      return;
    }
    
    if (marks > total) {
      msgEl.textContent = 'Marks obtained cannot be greater than total marks.';
      msgEl.classList.add('is-error');
      return;
    }
    
    const percentage = (marks / total) * 100;
    outputEl.value = `Marks: ${marks} / ${total}\nPercentage: ${percentage.toFixed(2)}%`;
    copyBtn.disabled = false;
    msgEl.textContent = 'Percentage calculated successfully!';
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
    marksEl.value = '';
    totalEl.value = '';
    outputEl.value = '';
    copyBtn.disabled = true;
    msgEl.textContent = 'Cleared. Ready for new input.';
  });
})();
