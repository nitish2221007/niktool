(function() {
  'use strict';
  const inputEl = document.getElementById('best-of-five-calculator-input');
  const outputEl = document.getElementById('best-of-five-calculator-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('best-of-five-calculator-message');

  primaryBtn.addEventListener('click', function() {
    const text = inputEl.value.trim();
    if (!text) {
      msgEl.textContent = 'Please enter marks for at least 5 subjects.';
      msgEl.classList.add('is-error');
      return;
    }
    
    const marks = text.split(/[\s,]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n >= 0);
    
    if (marks.length < 5) {
      msgEl.textContent = 'Please enter marks for at least 5 subjects.';
      msgEl.classList.add('is-error');
      return;
    }
    
    const sorted = [...marks].sort((a, b) => b - a);
    const best5 = sorted.slice(0, 5);
    const excluded = sorted.slice(5);
    const total = best5.reduce((sum, m) => sum + m, 0);
    const percentage = (total / 500) * 100;
    
    let result = `Best 5 Marks: ${best5.join(', ')}\n`;
    result += `Total: ${total} / 500\n`;
    result += `Percentage: ${percentage.toFixed(2)}%\n`;
    if (excluded.length > 0) {
      result += `\nExcluded: ${excluded.join(', ')}`;
    }
    
    outputEl.value = result;
    copyBtn.disabled = false;
    msgEl.textContent = 'Best 5 calculated successfully!';
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
    inputEl.value = '';
    outputEl.value = '';
    copyBtn.disabled = true;
    msgEl.textContent = 'Cleared. Ready for new input.';
  });
})();
