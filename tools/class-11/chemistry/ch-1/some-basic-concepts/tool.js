document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('ch1-input');
  const outputEl = document.getElementById('ch1-output');
  const actionBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const messageEl = document.getElementById('ch1-message');

  actionBtn?.addEventListener('click', () => {
    const text = inputEl.value.trim();
    if (!text) {
      messageEl.textContent = 'Please enter mass and molar mass separated by comma.';
      return;
    }
    const parts = text.split(',').map(p => parseFloat(p.trim())).filter(p => !isNaN(p));
    if (parts.length < 2) {
      messageEl.textContent = 'Please enter two valid numbers: Given Mass, Molar Mass.';
      return;
    }
    const [mass, molarMass] = parts;
    if (molarMass <= 0) {
      messageEl.textContent = 'Molar mass must be greater than zero.';
      return;
    }
    const moles = mass / molarMass;
    const molecules = moles * 6.022e23;
    const result = `Given Mass: ${mass} g\nMolar Mass: ${molarMass} g/mol\n\nMoles: ${moles.toFixed(4)} mol\nMolecules: ${molecules.toExponential(3)} molecules`;
    outputEl.value = result;
    copyBtn.disabled = false;
    messageEl.textContent = 'Calculation complete!';
  });

  copyBtn?.addEventListener('click', () => {
    if (window.NikTool && window.NikTool.copy) {
      window.NikTool.copy(outputEl.value, copyBtn);
    }
  });

  clearBtn?.addEventListener('click', () => {
    inputEl.value = '';
    outputEl.value = '';
    copyBtn.disabled = true;
    messageEl.textContent = 'Cleared.';
  });
});
