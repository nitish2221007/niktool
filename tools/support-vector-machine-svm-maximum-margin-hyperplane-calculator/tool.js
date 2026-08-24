(() => {
  'use strict';
  const wEl = document.getElementById('sv-w'), fnEl = document.getElementById('sv-func');
  const mgResEl = document.getElementById('sv-res-margin'), hgResEl = document.getElementById('sv-res-hinge');

  function update() {
    const norm_w = parseFloat(wEl.value), func_margin = parseFloat(fnEl.value);
    if (isNaN(norm_w) || isNaN(func_margin) || norm_w <= 0) return;

    // Geometric margin width = 2 / ||w||
    const geom_margin = 2.0 / norm_w;

    // Hinge loss = max(0, 1 - func_margin)
    const hinge_loss = Math.max(0.0, 1.0 - func_margin);

    let svStatus = '', color = '#22543d';
    if (func_margin > 1.0) {
      svStatus = 'CORRECTLY CLASSIFIED (Outside margin: Hinge loss = 0, not a support vector)';
      color = '#22543d';
    } else if (func_margin === 1.0) {
      svStatus = 'ON MARGIN BOUNDARY (Exact Support Vector: Hinge loss = 0)';
      color = '#22543d';
    } else if (func_margin >= 0) {
      svStatus = 'MARGIN VIOLATION (Inside margin street, correct side: Active Support Vector)';
      color = '#ea580c';
    } else {
      svStatus = 'MISCLASSIFIED (Wrong side of hyperplane: Severe penalty)';
      color = '#c53030';
    }

    mgResEl.textContent = 'Geometric Margin = ' + geom_margin.toFixed(3) + ' (Width = 2/‖w‖)';
    hgResEl.textContent = 'Hinge Loss = ' + hinge_loss.toFixed(3) + ' | ' + svStatus.split(' (')[0];
    hgResEl.style.color = color;
  }

  wEl.addEventListener('input', update);
  fnEl.addEventListener('input', update);
  update();
})();