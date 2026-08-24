(() => {
  'use strict';
  const container = document.getElementById('gpa-rows-container');
  const gpaEl = document.getElementById('gpa-res-val'), crEl = document.getElementById('gpa-res-credits');

  function update() {
    const credEls = container.querySelectorAll('.gpa-credits');
    const gradeEls = container.querySelectorAll('.gpa-grade');

    let totalPoints = 0, totalCredits = 0;
    for (let i = 0; i < credEls.length; i++) {
      const cr = parseFloat(credEls[i].value) || 0;
      const gr = parseFloat(gradeEls[i].value) || 0;
      totalPoints += cr * gr;
      totalCredits += cr;
    }

    if (totalCredits <= 0) {
      gpaEl.textContent = '0.00'; crEl.textContent = '0 Credits'; return;
    }

    const gpa = totalPoints / totalCredits;
    gpaEl.textContent = gpa.toFixed(2);
    crEl.textContent = totalCredits + ' Credits';
  }

  container.addEventListener('input', update);
  container.addEventListener('change', update);
  update();
})();