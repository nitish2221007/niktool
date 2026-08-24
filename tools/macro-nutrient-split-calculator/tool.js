(() => {
  'use strict';
  const calEl = document.getElementById('mac-cals'), planEl = document.getElementById('mac-plan');
  const pEl = document.getElementById('mac-res-p'), cEl = document.getElementById('mac-res-c'), fEl = document.getElementById('mac-res-f');

  function update() {
    const cals = parseFloat(calEl.value);
    const plan = planEl.value.split('-').map(Number);
    if (isNaN(cals) || cals <= 0 || plan.length !== 3) return;

    const carbPct = plan[0] / 100;
    const protPct = plan[1] / 100;
    const fatPct = plan[2] / 100;

    // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
    const protGrams = (cals * protPct) / 4;
    const carbGrams = (cals * carbPct) / 4;
    const fatGrams = (cals * fatPct) / 9;

    pEl.textContent = Math.round(protGrams) + ' g (' + Math.round(cals * protPct) + ' kcal)';
    cEl.textContent = Math.round(carbGrams) + ' g (' + Math.round(cals * carbPct) + ' kcal)';
    fEl.textContent = Math.round(fatGrams) + ' g (' + Math.round(cals * fatPct) + ' kcal)';
  }

  calEl.addEventListener('input', update);
  planEl.addEventListener('change', update);
  update();
})();