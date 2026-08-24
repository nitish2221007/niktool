(() => {
  'use strict';
  const inputs = [
    ['m00','m01','m02'],
    ['m10','m11','m12'],
    ['m20','m21','m22']
  ].map(row => row.map(id => document.getElementById(id)));

  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('mat-res-card');
  const resDet = document.getElementById('mat-res-det'), resStatus = document.getElementById('mat-res-status');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const vals = inputs.map(row => row.map(el => parseFloat(el.value)));
    if (vals.flat().some(isNaN)) {
      setMsg('Please fill in all 9 matrix cells with valid numbers.', true);
      resCard.style.display = 'none'; return;
    }

    const [[a, b, c], [d, e, f], [g, h, i]] = vals;
    // det = a(ei − fh) − b(di − fg) + c(dh − eg)
    const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

    resDet.textContent = det.toFixed(4);
    if (Math.abs(det) < 1e-12) {
      resStatus.textContent = 'Singular (Non-Invertible)';
      resStatus.style.color = '#c53030';
    } else {
      resStatus.textContent = 'Invertible (det ≠ 0)';
      resStatus.style.color = '#22543d';
    }

    resCard.style.display = 'block';
    setMsg('Matrix determinant calculated.');
  });

  clearBtn.addEventListener('click', () => {
    inputs.flat().forEach(el => el.value = '');
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();