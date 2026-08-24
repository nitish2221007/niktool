(() => {
  'use strict';
  const l1El = document.getElementById('fk-l1'), l2El = document.getElementById('fk-l2');
  const th1El = document.getElementById('fk-th1'), th2El = document.getElementById('fk-th2');
  const posResEl = document.getElementById('fk-res-pos'), rchResEl = document.getElementById('fk-res-reach');

  function update() {
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value);
    const deg1 = parseFloat(th1El.value), deg2 = parseFloat(th2El.value);

    if (isNaN(l1) || isNaN(l2) || isNaN(deg1) || isNaN(deg2) || l1 <= 0 || l2 <= 0) return;

    const rad1 = (deg1 * Math.PI) / 180;
    const rad12 = ((deg1 + deg2) * Math.PI) / 180;

    // x = l1 * cos(th1) + l2 * cos(th1 + th2)
    // y = l1 * sin(th1) + l2 * sin(th1 + th2)
    const x = l1 * Math.cos(rad1) + l2 * Math.cos(rad12);
    const y = l1 * Math.sin(rad1) + l2 * Math.sin(rad12);

    const radius = Math.sqrt(x*x + y*y);
    const maxReach = l1 + l2;
    const reachPct = (radius / maxReach) * 100;

    posResEl.textContent = '(' + x.toFixed(2) + ', ' + y.toFixed(2) + ') cm';
    rchResEl.textContent = radius.toFixed(2) + ' cm (' + reachPct.toFixed(1) + '% of max ' + maxReach + ' cm)';
  }

  [l1El, l2El, th1El, th2El].forEach(el => el.addEventListener('input', update));
  update();
})();