(() => {
  'use strict';
  const exprEl = document.getElementById('sat-expr');
  const stResEl = document.getElementById('sat-res-status'), asResEl = document.getElementById('sat-res-assign');

  function evalExpr(type, A, B, C) {
    if (type === 'conj') {
      // (A or B) and (not A or C) and (not B or not C)
      return (A || B) && (!A || C) && (!B || !C);
    } else if (type === 'xor') {
      // (A != B) and (B != C) and (A != C) -> impossible in boolean logic
      return (A !== B) && (B !== C) && (A !== C);
    } else if (type === 'taut') {
      return A || !A;
    } else {
      // (A->B and B->C) -> (A->C)
      const prem = (!A || B) && (!B || C);
      const conc = !A || C;
      return !prem || conc;
    }
  }

  function update() {
    const type = exprEl.value;
    let satCount = 0;
    let sampleModel = null;

    const bools = [false, true];
    for (let A of bools) {
      for (let B of bools) {
        for (let C of bools) {
          if (evalExpr(type, A, B, C)) {
            satCount++;
            if (!sampleModel) sampleModel = { A, B, C };
          }
        }
      }
    }

    let status = '', color = '#22543d';
    if (satCount === 8) {
      status = 'TAUTOLOGY (Valid for 100% of all 8 truth assignments)';
      color = '#22543d';
    } else if (satCount > 0) {
      status = 'SATISFIABLE (' + satCount + ' / 8 Truth Models Satisfy Formula)';
      color = '#22543d';
    } else {
      status = 'UNSATISFIABLE (Contradiction: 0 / 8 Models satisfy formula)';
      color = '#c53030';
    }

    stResEl.textContent = status;
    stResEl.style.color = color;
    asResEl.textContent = sampleModel ? 'Satisfying Model: A=' + sampleModel.A + ', B=' + sampleModel.B + ', C=' + sampleModel.C : 'No satisfying assignment exists (Formula evaluates to False everywhere)';
    asResEl.style.color = color;
  }

  exprEl.addEventListener('change', update);
  update();
})();