(function() {
  'use strict';
  const aEl = document.getElementById('coeff-a');
  const bEl = document.getElementById('coeff-b');
  const cEl = document.getElementById('coeff-c');
  const outputEl = document.getElementById('quadratic-equation-solver-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('quadratic-equation-solver-message');

  primaryBtn.addEventListener('click', function() {
    const a = parseFloat(aEl.value);
    const b = parseFloat(bEl.value);
    const c = parseFloat(cEl.value);
    
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      msgEl.textContent = 'Please enter valid numbers for all coefficients.';
      msgEl.classList.add('is-error');
      return;
    }
    
    if (a === 0) {
      msgEl.textContent = 'Coefficient "a" cannot be 0 (this would not be a quadratic equation).';
      msgEl.classList.add('is-error');
      return;
    }
    
    const discriminant = b * b - 4 * a * c;
    let result = `Equation: ${a}x² + ${b}x + ${c} = 0\n`;
    result += `Discriminant (D) = b² - 4ac = ${discriminant}\n\n`;
    
    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      result += `D > 0: Two distinct real roots\n`;
      result += `x₁ = ${root1.toFixed(4)}\n`;
      result += `x₂ = ${root2.toFixed(4)}`;
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      result += `D = 0: Two equal real roots\n`;
      result += `x₁ = x₂ = ${root.toFixed(4)}`;
    } else {
      const realPart = (-b / (2 * a)).toFixed(4);
      const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
      result += `D < 0: Two complex roots\n`;
      result += `x₁ = ${realPart} + ${imagPart}i\n`;
      result += `x₂ = ${realPart} - ${imagPart}i`;
    }
    
    outputEl.value = result;
    copyBtn.disabled = false;
    msgEl.textContent = 'Equation solved successfully!';
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
    aEl.value = '';
    bEl.value = '';
    cEl.value = '';
    outputEl.value = '';
    copyBtn.disabled = true;
    msgEl.textContent = 'Cleared. Ready for new equation.';
  });
})();
