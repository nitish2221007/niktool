(() => {
  'use strict';
  const fcEl = document.getElementById('bep-fixed'), spEl = document.getElementById('bep-price'), vcEl = document.getElementById('bep-var');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('bep-res-card');
  const resUnits = document.getElementById('bep-res-units'), resRev = document.getElementById('bep-res-rev'), resMargin = document.getElementById('bep-res-margin');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const fc = parseFloat(fcEl.value);
    const sp = parseFloat(spEl.value);
    const vc = parseFloat(vcEl.value);

    if (isNaN(fc) || isNaN(sp) || isNaN(vc) || fc < 0 || sp <= 0 || vc < 0 || sp <= vc) {
      setMsg('Please enter valid numbers where Selling Price exceeds Variable Cost.', true);
      resCard.style.display = 'none'; return;
    }

    const margin = sp - vc;
    const units = Math.ceil(fc / margin);
    const revenue = units * sp;

    resUnits.textContent = units.toLocaleString() + ' Units';
    resRev.textContent = '$' + Math.round(revenue).toLocaleString();
    resMargin.textContent = '$' + margin.toFixed(2) + ' / unit (' + ((margin / sp) * 100).toFixed(1) + '%)';

    resCard.style.display = 'block';
    setMsg('Break-even analysis calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fcEl.value = ''; spEl.value = ''; vcEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();