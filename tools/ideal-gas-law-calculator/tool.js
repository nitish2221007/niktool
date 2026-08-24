(() => {
  'use strict';
  const solveSelect = document.getElementById('gas-solve-for');
  const pInput = document.getElementById('gas-p');
  const vInput = document.getElementById('gas-v');
  const nInput = document.getElementById('gas-n');
  const tInput = document.getElementById('gas-t');

  const grpP = document.getElementById('group-P');
  const grpV = document.getElementById('group-V');
  const grpN = document.getElementById('group-n');
  const grpT = document.getElementById('group-T');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('gas-res-card');
  const resVal = document.getElementById('gas-res-val');

  const R = 0.082057; // L atm / (mol K)

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function updateInputs() {
    const solve = solveSelect.value;
    grpP.style.display = solve === 'P' ? 'none' : 'block';
    grpV.style.display = solve === 'V' ? 'none' : 'block';
    grpN.style.display = solve === 'n' ? 'none' : 'block';
    grpT.style.display = solve === 'T' ? 'none' : 'block';
    resCard.style.display = 'none';
  }

  solveSelect.addEventListener('change', updateInputs);
  updateInputs();

  btn.addEventListener('click', () => {
    const solve = solveSelect.value;
    const P = parseFloat(pInput.value);
    const V = parseFloat(vInput.value);
    const n = parseFloat(nInput.value);
    const T = parseFloat(tInput.value);

    let result = 0;
    let unit = '';

    if (solve === 'P') {
      if (isNaN(V) || isNaN(n) || isNaN(T) || V <= 0 || n <= 0 || T <= 0) {
        setMsg('Please enter positive values for V, n, and T.', true); return;
      }
      result = (n * R * T) / V;
      unit = 'atm';
    } else if (solve === 'V') {
      if (isNaN(P) || isNaN(n) || isNaN(T) || P <= 0 || n <= 0 || T <= 0) {
        setMsg('Please enter positive values for P, n, and T.', true); return;
      }
      result = (n * R * T) / P;
      unit = 'Liters (L)';
    } else if (solve === 'n') {
      if (isNaN(P) || isNaN(V) || isNaN(T) || P <= 0 || V <= 0 || T <= 0) {
        setMsg('Please enter positive values for P, V, and T.', true); return;
      }
      result = (P * V) / (R * T);
      unit = 'moles (mol)';
    } else if (solve === 'T') {
      if (isNaN(P) || isNaN(V) || isNaN(n) || P <= 0 || V <= 0 || n <= 0) {
        setMsg('Please enter positive values for P, V, and n.', true); return;
      }
      result = (P * V) / (n * R);
      unit = 'Kelvin (K)';
    }

    resVal.textContent = result.toFixed(4) + ' ' + unit;
    resCard.style.display = 'block';
    setMsg('Ideal Gas Law computed successfully.');
  });

  clearBtn.addEventListener('click', () => {
    pInput.value = ''; vInput.value = ''; nInput.value = ''; tInput.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();