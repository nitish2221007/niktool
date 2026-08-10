(function() {
  'use strict';
  const KEY = 'niktool_btech_dash';
  const cgpaEl = document.getElementById('dash-cgpa');
  const attEl = document.getElementById('dash-att');
  const todosEl = document.getElementById('dash-todos');
  const outEl = document.getElementById('btech-student-dashboard-output');
  const msgEl = document.getElementById('btech-student-dashboard-message');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');

  function load() {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (data.cgpa) cgpaEl.value = data.cgpa;
    if (data.att) attEl.value = data.att;
    if (data.todos) todosEl.value = data.todos;
    render();
  }

  function render() {
    const cgpa = parseFloat(cgpaEl.value) || 0;
    const att = parseFloat(attEl.value) || 0;
    const todos = todosEl.value.split('\n').filter(Boolean);
    
    let status = 'Academic Status Report\n' + '='.repeat(25) + '\n';
    status += `CGPA: ${cgpa.toFixed(2)} ${cgpa >= 8.0 ? '(Excellent)' : cgpa >= 6.5 ? '(Good)' : '(Needs Focus)'}\n`;
    status += `Attendance: ${att.toFixed(1)}% ${att >= 75 ? '(Safe)' : '(Critical - Attend classes!)'}\n`;
    status += `\nPending Tasks (${todos.length}):\n`;
    if (todos.length) {
      todos.forEach((t, i) => status += `${i + 1}. ${t}\n`);
    } else {
      status += 'None. Keep it up!\n';
    }
    outEl.value = status;
    copyBtn.disabled = false;
  }

  primaryBtn.addEventListener('click', () => {
    const data = {
      cgpa: cgpaEl.value,
      att: attEl.value,
      todos: todosEl.value
    };
    localStorage.setItem(KEY, JSON.stringify(data));
    msgEl.textContent = 'Dashboard updated and saved locally!';
    msgEl.classList.remove('is-error');
    render();
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else {
      navigator.clipboard.writeText(outEl.value);
    }
    msgEl.textContent = 'Status copied to clipboard!';
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Reset dashboard data?')) {
      localStorage.removeItem(KEY);
      cgpaEl.value = '';
      attEl.value = '';
      todosEl.value = '';
      msgEl.textContent = 'Dashboard cleared.';
      render();
    }
  });

  load();
})();
