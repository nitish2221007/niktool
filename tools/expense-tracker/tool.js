(function() {
  'use strict';
  const KEY = 'niktool_expenses';
  const amountEl = document.getElementById('exp-amount');
  const catEl = document.getElementById('exp-category');
  const descEl = document.getElementById('exp-desc');
  const outEl = document.getElementById('expense-tracker-output');
  const msgEl = document.getElementById('expense-tracker-message');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const summaryEl = document.getElementById('exp-summary');
  let expenses = JSON.parse(localStorage.getItem(KEY) || '[]');

  function render() {
    if (!expenses.length) {
      outEl.value = 'No expenses logged yet.';
      summaryEl.innerHTML = '<li>No data to summarize.</li>';
      copyBtn.disabled = true;
      return;
    }
    let text = 'Date | Category | Description | Amount\n';
    text += '-'.repeat(40) + '\n';
    const cats = {};
    expenses.forEach(e => {
      text += `${e.date} | ${e.cat} | ${e.desc} | ${e.amt}\n`;
      cats[e.cat] = (cats[e.cat] || 0) + Number(e.amt);
    });
    outEl.value = text;
    copyBtn.disabled = false;
    
    let sumHtml = '';
    let total = 0;
    for (const c in cats) {
      sumHtml += `<li><strong>${c}:</strong> ${cats[c].toFixed(2)}</li>`;
      total += cats[c];
    }
    sumHtml += `<li><strong>Total:</strong> ${total.toFixed(2)}</li>`;
    summaryEl.innerHTML = sumHtml;
  }

  primaryBtn.addEventListener('click', () => {
    const amt = amountEl.value;
    if (!amt || Number(amt) <= 0) {
      msgEl.textContent = 'Please enter a valid amount.';
      msgEl.classList.add('is-error');
      return;
    }
    msgEl.classList.remove('is-error');
    expenses.push({
      date: new Date().toISOString().split('T')[0],
      cat: catEl.value,
      desc: descEl.value || 'Unnamed',
      amt: Number(amt)
    });
    localStorage.setItem(KEY, JSON.stringify(expenses));
    amountEl.value = '';
    descEl.value = '';
    msgEl.textContent = 'Expense added successfully!';
    render();
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else {
      navigator.clipboard.writeText(outEl.value);
    }
    msgEl.textContent = 'Log copied to clipboard!';
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all expense data?')) {
      expenses = [];
      localStorage.removeItem(KEY);
      msgEl.textContent = 'All data cleared.';
      render();
    }
  });

  render();
})();
