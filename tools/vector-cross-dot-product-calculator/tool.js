(() => {
  'use strict';
  const axEl = document.getElementById('vec-ax'), ayEl = document.getElementById('vec-ay'), azEl = document.getElementById('vec-az');
  const bxEl = document.getElementById('vec-bx'), byEl = document.getElementById('vec-by'), bzEl = document.getElementById('vec-bz');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('vec-res-card');
  const resDot = document.getElementById('vec-res-dot'), resCross = document.getElementById('vec-res-cross');
  const resAngle = document.getElementById('vec-res-angle'), resMagA = document.getElementById('vec-res-maga'), resMagB = document.getElementById('vec-res-magb');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const ax = parseFloat(axEl.value), ay = parseFloat(ayEl.value), az = parseFloat(azEl.value);
    const bx = parseFloat(bxEl.value), by = parseFloat(byEl.value), bz = parseFloat(bzEl.value);

    if ([ax, ay, az, bx, by, bz].some(isNaN)) {
      setMsg('Please enter valid numerical components for all vector axes.', true);
      resCard.style.display = 'none'; return;
    }

    const dot = ax * bx + ay * by + az * bz;
    const cx = ay * bz - az * by;
    const cy = az * bx - ax * bz;
    const cz = ax * by - ay * bx;

    const magA = Math.sqrt(ax * ax + ay * ay + az * az);
    const magB = Math.sqrt(bx * bx + by * by + bz * bz);

    let angleDeg = 0;
    if (magA > 0 && magB > 0) {
      const cosTheta = Math.max(-1, Math.min(1, dot / (magA * magB)));
      angleDeg = (Math.acos(cosTheta) * 180) / Math.PI;
    }

    resDot.textContent = dot.toFixed(4);
    resCross.textContent = '(' + cx.toFixed(2) + ', ' + cy.toFixed(2) + ', ' + cz.toFixed(2) + ')';
    resAngle.textContent = angleDeg.toFixed(2) + '°';
    resMagA.textContent = magA.toFixed(4);
    resMagB.textContent = magB.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Vector products computed.');
  });

  clearBtn.addEventListener('click', () => {
    [axEl, ayEl, azEl, bxEl, byEl, bzEl].forEach(el => el.value = '');
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();