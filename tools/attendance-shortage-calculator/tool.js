(() => {
  'use strict';
  const attEl = document.getElementById('att-attended');
  const totEl = document.getElementById('att-total');
  const targEl = document.getElementById('att-target');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('att-result-card');
  const resCur = document.getElementById('att-res-current');
  const resNeed = document.getElementById('att-res-needed');
  const resBunk = document.getElementById('att-res-bunk');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const attended = parseInt(attEl.value, 10);
    const total = parseInt(totEl.value, 10);
    const target = parseFloat(targEl.value) / 100;

    if (isNaN(attended) || isNaN(total) || attended < 0 || total <= 0 || attended > total) {
      setMsg('Please enter valid attended and total class counts (Attended cannot exceed Total).', true);
      resCard.style.display = 'none';
      return;
    }

    const curPct = (attended / total) * 100;
    resCur.textContent = curPct.toFixed(1) + '%';

    if (curPct >= target * 100) {
      // Safe to miss classes
      const maxBunks = Math.floor((attended - target * total) / target);
      resNeed.textContent = '0 (Target Met!)';
      resNeed.style.color = '#22543d';
      resBunk.textContent = maxBunks.toString();
      setMsg('Great job! Your attendance is already above ' + (target * 100) + '%.');
    } else {
      // Need more classes
      const needed = Math.ceil((target * total - attended) / (1 - target));
      resNeed.textContent = needed.toString();
      resNeed.style.color = '#c53030';
      resBunk.textContent = '0 (Shortage)';
      setMsg('You need to attend ' + needed + ' more consecutive classes to reach ' + (target * 100) + '%.', true);
    }

    resCard.style.display = 'block';
  });

  clearBtn.addEventListener('click', () => {
    attEl.value = ''; totEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();