(() => {
  'use strict';
  const sideEl = document.getElementById('hex-side');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('hex-res-card');

  const resArea = document.getElementById('hex-res-area');
  const resPeri = document.getElementById('hex-res-peri');
  const resLong = document.getElementById('hex-res-long-diag');
  const resShort = document.getElementById('hex-res-short-diag');
  const resInrad = document.getElementById('hex-res-inradius');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const a = parseFloat(sideEl.value);
    if (isNaN(a) || a <= 0) {
      setMsg('Please enter a valid positive side length.', true);
      resCard.style.display = 'none';
      return;
    }

    const area = ((3 * Math.sqrt(3)) / 2) * Math.pow(a, 2);
    const peri = 6 * a;
    const longDiag = 2 * a;
    const shortDiag = a * Math.sqrt(3);
    const inrad = (a * Math.sqrt(3)) / 2;

    resArea.textContent = area.toFixed(4) + ' sq units';
    resPeri.textContent = peri.toFixed(4) + ' units';
    resLong.textContent = longDiag.toFixed(4);
    resShort.textContent = shortDiag.toFixed(4);
    resInrad.textContent = inrad.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Hexagon geometry calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    sideEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();