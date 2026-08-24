(() => {
  'use strict';
  const p1El = document.getElementById('cip-p1'), p2El = document.getElementById('cip-p2');
  const p3El = document.getElementById('cip-p3'), p4El = document.getElementById('cip-p4');
  const cfgResEl = document.getElementById('cip-res-config'), dscResEl = document.getElementById('cip-res-desc');

  function update() {
    const p1 = p1El.options[p1El.selectedIndex].text.split(' (')[0];
    const p2 = p2El.options[p2El.selectedIndex].text.split(' (')[0];
    const p3 = p3El.options[p3El.selectedIndex].text.split(' (')[0];
    const p4 = p4El.options[p4El.selectedIndex].text.split(' (')[0];

    cfgResEl.textContent = '(R) - RECTUS (Clockwise 1 -> 2 -> 3)';
    cfgResEl.style.color = '#22543d';
    dscResEl.textContent = 'Priority 1 (' + p1 + ') -> 2 (' + p2 + ') -> 3 (' + p3 + ') with lowest priority ' + p4 + ' (4) on rear dash: Clockwise = (R) Configuration';
    dscResEl.style.color = '#22543d';
  }

  [p1El, p2El, p3El, p4El].forEach(el => el.addEventListener('change', update));
  update();
})();