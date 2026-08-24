(() => {
  'use strict';
  const solveSelect = document.getElementById('dil-solve-for');
  const c1In = document.getElementById('dil-c1');
  const v1In = document.getElementById('dil-v1');
  const c2In = document.getElementById('dil-c2');
  const v2In = document.getElementById('dil-v2');

  const grpC1 = document.getElementById('grp-c1');
  const grpV1 = document.getElementById('grp-v1');
  const grpC2 = document.getElementById('grp-c2');
  const grpV2 = document.getElementById('grp-v2');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('dil-res-card');
  const resVal = document.getElementById('dil-res-val');
  const resSolvent = document.getElementById('dil-res-solvent');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function update() {
    const s = solveSelect.value;
    grpC1.style.display = s === 'C1' ? 'none' : 'block';
    grpV1.style.display = s === 'V1' ? 'none' : 'block';
    grpC2.style.display = s === 'C2' ? 'none' : 'block';
    grpV2.style.display = s === 'V2' ? 'none' : 'block';
    resCard.style.display = 'none';
  }

  solveSelect.addEventListener('change', update);
  update();

  btn.addEventListener('click', () => {
    const s = solveSelect.value;
    const c1 = parseFloat(c1In.value);
    const v1 = parseFloat(v1In.value);
    const c2 = parseFloat(c2In.value);
    const v2 = parseFloat(v2In.value);

    let result = 0;
    let solvent = '-';

    if (s === 'V1') {
      if (isNaN(c1) || isNaN(c2) || isNaN(v2) || c1 <= 0 || c2 <= 0 || v2 <= 0 || c2 > c1) {
        setMsg('Please enter valid positive values where C2 <= C1.', true); return;
      }
      result = (c2 * v2) / c1;
      solvent = (v2 - result).toFixed(3) + ' units';
      resVal.textContent = 'V₁ = ' + result.toFixed(3) + ' units';
    } else if (s === 'C1') {
      if (isNaN(v1) || isNaN(c2) || isNaN(v2) || v1 <= 0 || c2 <= 0 || v2 <= 0) {
        setMsg('Please enter positive values.', true); return;
      }
      result = (c2 * v2) / v1;
      resVal.textContent = 'C₁ = ' + result.toFixed(3) + ' units';
    } else if (s === 'C2') {
      if (isNaN(c1) || isNaN(v1) || isNaN(v2) || c1 <= 0 || v1 <= 0 || v2 <= 0) {
        setMsg('Please enter positive values.', true); return;
      }
      result = (c1 * v1) / v2;
      resVal.textContent = 'C₂ = ' + result.toFixed(3) + ' units';
    } else if (s === 'V2') {
      if (isNaN(c1) || isNaN(v1) || isNaN(c2) || c1 <= 0 || v1 <= 0 || c2 <= 0) {
        setMsg('Please enter positive values.', true); return;
      }
      result = (c1 * v1) / c2;
      solvent = (result - v1).toFixed(3) + ' units';
      resVal.textContent = 'V₂ = ' + result.toFixed(3) + ' units';
    }

    resSolvent.textContent = solvent;
    resCard.style.display = 'block';
    setMsg('Dilution calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    c1In.value = ''; v1In.value = ''; c2In.value = ''; v2In.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();