(() => {
  'use strict';
  const solveEl = document.getElementById('boyle-solve');
  const p1El = document.getElementById('boyle-p1'), v1El = document.getElementById('boyle-v1');
  const p2El = document.getElementById('boyle-p2'), v2El = document.getElementById('boyle-v2');
  const grpP1 = document.getElementById('grp-bp1'), grpV1 = document.getElementById('grp-bv1');
  const grpP2 = document.getElementById('grp-bp2'), grpV2 = document.getElementById('grp-bv2');

  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('boyle-res-card'), resVal = document.getElementById('boyle-res-val');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function update() {
    const s = solveEl.value;
    grpP1.style.display = s === 'P1' ? 'none' : 'block';
    grpV1.style.display = s === 'V1' ? 'none' : 'block';
    grpP2.style.display = s === 'P2' ? 'none' : 'block';
    grpV2.style.display = s === 'V2' ? 'none' : 'block';
    resCard.style.display = 'none';
  }

  solveEl.addEventListener('change', update);
  update();

  btn.addEventListener('click', () => {
    const s = solveEl.value;
    const p1 = parseFloat(p1El.value), v1 = parseFloat(v1El.value);
    const p2 = parseFloat(p2El.value), v2 = parseFloat(v2El.value);

    let res = 0, label = '';
    if (s === 'P2') {
      if (isNaN(p1) || isNaN(v1) || isNaN(v2) || p1 <= 0 || v1 <= 0 || v2 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p1 * v1) / v2; label = 'P₂ = ' + res.toFixed(3) + ' pressure units';
    } else if (s === 'V2') {
      if (isNaN(p1) || isNaN(v1) || isNaN(p2) || p1 <= 0 || v1 <= 0 || p2 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p1 * v1) / p2; label = 'V₂ = ' + res.toFixed(3) + ' volume units';
    } else if (s === 'P1') {
      if (isNaN(p2) || isNaN(v2) || isNaN(v1) || p2 <= 0 || v2 <= 0 || v1 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p2 * v2) / v1; label = 'P₁ = ' + res.toFixed(3) + ' pressure units';
    } else if (s === 'V1') {
      if (isNaN(p2) || isNaN(v2) || isNaN(p1) || p2 <= 0 || v2 <= 0 || p1 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p2 * v2) / p1; label = 'V₁ = ' + res.toFixed(3) + ' volume units';
    }

    resVal.textContent = label;
    resCard.style.display = 'block';
    setMsg('Boyle's Law computed.');
  });

  clearBtn.addEventListener('click', () => {
    p1El.value = '1.0'; v1El.value = '10.0'; p2El.value = '2.0'; v2El.value = '5.0'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();