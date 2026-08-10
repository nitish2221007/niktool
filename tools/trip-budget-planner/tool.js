(function() {
  'use strict';
  const peopleEl = document.getElementById('trip-people');
  const itemsEl = document.getElementById('trip-items');
  const outEl = document.getElementById('trip-budget-planner-output');
  const msgEl = document.getElementById('trip-budget-planner-message');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');

  primaryBtn.addEventListener('click', () => {
    const people = parseInt(peopleEl.value) || 1;
    const lines = itemsEl.value.split('\n').filter(Boolean);
    let total = 0;
    let breakdown = 'Item Breakdown:\n' + '-'.repeat(20) + '\n';
    
    lines.forEach(line => {
      const parts = line.split(',');
      if (parts.length >= 2) {
        const name = parts[0].trim();
        const amt = parseFloat(parts[1]);
        if (!isNaN(amt)) {
          total += amt;
          breakdown += `${name}: ${amt.toFixed(2)}\n`;
        }
      }
    });

    if (total === 0) {
      msgEl.textContent = 'Please enter at least one valid budget item.';
      msgEl.classList.add('is-error');
      return;
    }
    msgEl.classList.remove('is-error');
    
    const perPerson = total / people;
    outEl.value = `Total Trip Cost: ${total.toFixed(2)}\nNumber of Travelers: ${people}\nCost Per Person: ${perPerson.toFixed(2)}\n\n${breakdown}`;
    copyBtn.disabled = false;
    msgEl.textContent = 'Budget calculated successfully.';
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else {
      navigator.clipboard.writeText(outEl.value);
    }
    msgEl.textContent = 'Result copied to clipboard!';
  });

  clearBtn.addEventListener('click', () => {
    peopleEl.value = '1';
    itemsEl.value = '';
    outEl.value = '';
    copyBtn.disabled = true;
    msgEl.textContent = 'Cleared. Ready for new input.';
  });
})();
