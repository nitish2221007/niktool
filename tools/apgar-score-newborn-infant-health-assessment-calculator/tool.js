(() => {
  'use strict';
  const appEl = document.getElementById('ap-app'), pulEl = document.getElementById('ap-pul');
  const grEl = document.getElementById('ap-grim'), actEl = document.getElementById('ap-act');
  const respEl = document.getElementById('ap-resp');
  const totResEl = document.getElementById('ap-res-tot'), cdResEl = document.getElementById('ap-res-cond');

  function update() {
    const app = parseInt(appEl.value, 10), pul = parseInt(pulEl.value, 10);
    const gr = parseInt(grEl.value, 10), act = parseInt(actEl.value, 10);
    const resp = parseInt(respEl.value, 10);

    const total = app + pul + gr + act + resp;

    let cond = '', color = '#22543d';
    if (total >= 7) {
      cond = 'REASSURING TRANSITION (Score 7 - 10: Normal newborn vigor, routine drying & warming)';
      color = '#22543d';
    } else if (total >= 4) {
      cond = 'MODERATELY ABNORMAL (Score 4 - 6: Stimulate, clear airway, supplemental oxygen / PPV)';
      color = '#ea580c';
    } else {
      cond = 'CRITICALLY LOW (Score 0 - 3: Immediate Neonatal Resuscitation Protocol / Bag-Mask / CPR)';
      color = '#c53030';
    }

    totResEl.textContent = 'APGAR Score = ' + total + ' / 10';
    totResEl.style.color = color;
    cdResEl.textContent = cond;
    cdResEl.style.color = color;
  }

  [appEl, pulEl, grEl, actEl, respEl].forEach(el => el.addEventListener('change', update));
  update();
})();