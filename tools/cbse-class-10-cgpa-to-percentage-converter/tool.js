(() => {
  'use strict';
  const cgpaEl = document.getElementById('cbse-cgpa'), subEl = document.getElementById('cbse-sub');
  const pctResEl = document.getElementById('cbse-res-pct'), subResEl = document.getElementById('cbse-res-sub');

  function update() {
    const cgpa = parseFloat(cgpaEl.value), gp = parseFloat(subEl.value);
    if (isNaN(cgpa) || cgpa <= 0 || cgpa > 10.0) return;

    // Official CBSE formula: Overall Percentage = CGPA * 9.5
    const overall_pct = cgpa * 9.5;

    // Subject percentage = GP * 9.5
    let subStr = '';
    if (!isNaN(gp) && gp >= 1 && gp <= 10) {
      const sub_pct = gp * 9.5;
      let grade = '';
      if (gp === 10) grade = 'A1 (91-100)';
      else if (gp === 9) grade = 'A2 (81-90)';
      else if (gp === 8) grade = 'B1 (71-80)';
      else if (gp === 7) grade = 'B2 (61-70)';
      else if (gp === 6) grade = 'C1 (51-60)';
      else if (gp === 5) grade = 'C2 (41-50)';
      else if (gp === 4) grade = 'D (33-40)';
      else grade = 'E (Failed)';
      subStr = 'Subject Percentage: ' + sub_pct.toFixed(1) + '% (GP ' + gp + ' × 9.5 | Grade ' + grade + ')';
    }

    pctResEl.textContent = overall_pct.toFixed(2) + '% Equivalent Marks';
    subResEl.textContent = subStr || 'Formula: Percentage = CGPA × 9.5 (Approved by CBSE Examination Bylaws)';
  }

  cgpaEl.addEventListener('input', update);
  subEl.addEventListener('input', update);
  update();
})();