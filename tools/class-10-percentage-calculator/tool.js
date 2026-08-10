(function() {
  'use strict';
  const container = document.getElementById('subjects-container');
  const addBtn = document.getElementById('add-subject-btn');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const outputEl = document.getElementById('class-10-percentage-calculator-output');
  const msgEl = document.getElementById('class-10-percentage-calculator-message');
  let subjectCount = 0;

  function addSubject() {
    subjectCount++;
    const row = document.createElement('div');
    row.style.cssText = 'display:flex; gap:0.5rem; margin-bottom:0.5rem; align-items:center;';
    row.innerHTML = `
      <input type="text" class="tool-textarea" placeholder="Subject ${subjectCount}" style="flex:2; padding:0.4rem;">
      <input type="number" class="tool-textarea" placeholder="Marks" style="flex:1; padding:0.4rem;" min="0">
      <input type="number" class="tool-textarea" placeholder="Max" style="flex:1; padding:0.4rem;" min="1" value="100">
      <button type="button" class="button secondary" style="padding:0.25rem 0.5rem; font-size:0.8rem;">Remove</button>
    `;
    container.appendChild(row);
  }

  container.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Remove') {
      e.target.parentElement.remove();
    }
  });

  addBtn.addEventListener('click', addSubject);

  primaryBtn.addEventListener('click', function() {
    const rows = container.children;
    if (rows.length === 0) {
      msgEl.textContent = 'Please add at least one subject.';
      msgEl.classList.add('is-error');
      return;
    }
    
    let totalMarks = 0;
    let totalMax = 0;
    let validSubjects = 0;
    
    for (let row of rows) {
      const inputs = row.querySelectorAll('input');
      const marks = parseFloat(inputs[1].value);
      const max = parseFloat(inputs[2].value);
      
      if (!isNaN(marks) && !isNaN(max) && marks >= 0 && max > 0) {
        totalMarks += marks;
        totalMax += max;
        validSubjects++;
      }
    }
    
    if (validSubjects === 0) {
      msgEl.textContent = 'Please enter valid marks for at least one subject.';
      msgEl.classList.add('is-error');
      return;
    }
    
    const percentage = (totalMarks / totalMax) * 100;
    outputEl.value = `Total Marks: ${totalMarks} / ${totalMax}\nPercentage: ${percentage.toFixed(2)}%\nSubjects: ${validSubjects}`;
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
    container.innerHTML = '';
    outputEl.value = '';
    copyBtn.disabled = true;
    subjectCount = 0;
    msgEl.textContent = 'Cleared. Ready for new input.';
  });

  // Initialize with 5 subjects
  for (let i = 0; i < 5; i++) addSubject();
})();
