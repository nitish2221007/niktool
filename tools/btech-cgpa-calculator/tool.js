(function() {
  'use strict';

  const container = document.getElementById('semester-container');
  const addBtn = document.getElementById('add-semester-btn');
  const calcBtn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-text');
  const copyBtn = document.getElementById('copy-output');
  const outputEl = document.getElementById('cgpa-output');
  const extraInfo = document.getElementById('cgpa-extra-info');
  const msgEl = document.getElementById('btech-cgpa-message');

  let semCount = 0;

  function addSemester() {
    if (semCount >= 12) {
      showMsg("Maximum 12 semesters allowed.", true);
      return;
    }
    semCount++;
    const row = document.createElement('div');
    row.style.cssText = "display:flex; gap:0.5rem; margin-bottom:0.5rem; align-items:center; flex-wrap:wrap;";
    row.innerHTML = `
      <span style="min-width:60px; font-weight:500;">Sem ${semCount}</span>
      <input type="number" class="tool-textarea" style="flex:1; min-width:80px; padding:0.35rem;" placeholder="Credits" step="1" min="0" data-type="credits">
      <input type="number" class="tool-textarea" style="flex:1; min-width:80px; padding:0.35rem;" placeholder="SGPA (0-10)" step="0.01" min="0" max="10" data-type="sgpa">
      <button type="button" class="button secondary" style="padding:0.25rem 0.5rem; font-size:0.8rem;" aria-label="Remove semester">Remove</button>
    `;
    container.appendChild(row);
  }

  function init() {
    // Start with 8 semesters for a typical B.Tech
    for (let i = 0; i < 8; i++) addSemester();
  }

  container.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Remove') {
      e.target.parentElement.remove();
      // Renumber semesters
      const rows = container.children;
      for (let i = 0; i < rows.length; i++) {
        rows[i].querySelector('span').textContent = `Sem ${i + 1}`;
      }
      semCount = rows.length;
    }
  });

  addBtn.addEventListener('click', addSemester);

  calcBtn.addEventListener('click', function() {
    const rows = container.children;
    let totalCredits = 0;
    let totalWeightedSGPA = 0;
    let validSems = 0;
    let errors = [];

    for (let i = 0; i < rows.length; i++) {
      const creditsInput = rows[i].querySelector('[data-type="credits"]');
      const sgpaInput = rows[i].querySelector('[data-type="sgpa"]');
      
      const cVal = parseFloat(creditsInput.value);
      const sVal = parseFloat(sgpaInput.value);

      if (creditsInput.value && sgpaInput.value) {
        if (isNaN(cVal) || isNaN(sVal) || cVal <= 0 || sVal < 0 || sVal > 10) {
          errors.push(`Sem ${i + 1} has invalid data.`);
        } else {
          totalCredits += cVal;
          totalWeightedSGPA += (cVal * sVal);
          validSems++;
        }
      } else if (creditsInput.value || sgpaInput.value) {
        errors.push(`Sem ${i + 1} is incomplete.`);
      }
    }

    if (validSems === 0) {
      showMsg("Please enter at least one semester with valid credits and SGPA.", true);
      outputEl.value = "";
      extraInfo.textContent = "";
      copyBtn.disabled = true;
      return;
    }

    if (errors.length > 0) {
      showMsg("Warning: " + errors.join(" ") + " Skipped incomplete/invalid rows.", true);
    } else {
      showMsg("Successfully calculated CGPA for " + validSems + " semester(s).");
    }

    const cgpa = totalWeightedSGPA / totalCredits;
    const percentage = (cgpa - 0.75) * 10; // Standard AICTE conversion
    
    outputEl.value = `Overall CGPA: ${cgpa.toFixed(2)}\nEquivalent Percentage: ${percentage.toFixed(2)}%`;
    extraInfo.textContent = `Total Credits: ${totalCredits} | Semesters Calculated: ${validSems}`;
    copyBtn.disabled = false;
  });

  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(outputEl.value).then(function() {
      showMsg("Result copied to clipboard!");
    }).catch(function() {
      showMsg("Failed to copy.", true);
    });
  });

  clearBtn.addEventListener('click', function() {
    container.innerHTML = "";
    semCount = 0;
    outputEl.value = "";
    extraInfo.textContent = "";
    copyBtn.disabled = true;
    init();
    showMsg("Calculator cleared. Ready for new entries.");
  });

  function showMsg(text, isError) {
    msgEl.textContent = text;
    msgEl.classList.toggle('is-error', !!isError);
  }

  init();
})();
