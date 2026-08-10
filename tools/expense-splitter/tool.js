(function() {
  'use strict';
  const peopleEl = document.getElementById('split-people');
  const expEl = document.getElementById('split-expenses');
  const outEl = document.getElementById('expense-splitter-output');
  const msgEl = document.getElementById('expense-splitter-message');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');

  primaryBtn.addEventListener('click', () => {
    const people = peopleEl.value.split(',').map(s => s.trim()).filter(Boolean);
    const lines = expEl.value.split('\n').filter(Boolean);
    if (people.length < 2) {
      msgEl.textContent = 'Please enter at least two people.';
      msgEl.classList.add('is-error');
      return;
    }
    msgEl.classList.remove('is-error');
    
    const balances = {};
    people.forEach(p => balances[p] = 0);
    
    let valid = true;
    lines.forEach(line => {
      const parts = line.split(',').map(s => s.trim());
      if (parts.length < 2) return;
      const payer = parts[0];
      const amount = parseFloat(parts[1]);
      if (!balances.hasOwnProperty(payer) || isNaN(amount)) {
        valid = false;
        return;
      }
      balances[payer] += amount;
      const share = amount / people.length;
      people.forEach(p => balances[p] -= share);
    });

    if (!valid) {
      msgEl.textContent = 'Error: Check your expense format and ensure payer names match exactly.';
      msgEl.classList.add('is-error');
      return;
    }

    const debtors = [], creditors = [];
    for (const p in balances) {
      if (balances[p] < -0.01) debtors.push({name: p, amt: -balances[p]});
      else if (balances[p] > 0.01) creditors.push({name: p, amt: balances[p]});
    }
    
    debtors.sort((a,b) => b.amt - a.amt);
    creditors.sort((a,b) => b.amt - a.amt);
    
    let result = '';
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const diff = Math.min(debtors[i].amt, creditors[j].amt);
      result += `${debtors[i].name} owes ${creditors[j].name}: ${diff.toFixed(2)}\n`;
      debtors[i].amt -= diff;
      creditors[j].amt -= diff;
      if (debtors[i].amt < 0.01) i++;
      if (creditors[j].amt < 0.01) j++;
    }
    
    outEl.value = result || 'All settled up! No one owes anyone.';
    copyBtn.disabled = false;
    msgEl.textContent = 'Split calculated successfully.';
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
    peopleEl.value = '';
    expEl.value = '';
    outEl.value = '';
    copyBtn.disabled = true;
    msgEl.textContent = 'Cleared. Ready for new input.';
  });
})();
