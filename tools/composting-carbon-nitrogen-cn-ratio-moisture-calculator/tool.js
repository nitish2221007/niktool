(() => {
  'use strict';
  const mgEl = document.getElementById('cp-mg'), cngEl = document.getElementById('cp-cng'), wgEl = document.getElementById('cp-wg');
  const mbEl = document.getElementById('cp-mb'), cnbEl = document.getElementById('cp-cnb'), wbEl = document.getElementById('cp-wb');
  const cnResEl = document.getElementById('cp-res-cn'), msResEl = document.getElementById('cp-res-moist');

  function update() {
    const Mg = parseFloat(mgEl.value), CNg = parseFloat(cngEl.value), Wg_pct = parseFloat(wgEl.value);
    const Mb = parseFloat(mbEl.value), CNb = parseFloat(cnbEl.value), Wb_pct = parseFloat(wbEl.value);

    if (isNaN(Mg) || isNaN(CNg) || isNaN(Wg_pct) || isNaN(Mb) || isNaN(CNb) || isNaN(Wb_pct) || Mg <= 0 || CNg <= 0 || Mb <= 0 || CNb <= 0) return;

    // Dry mass:
    const dry_g = Mg * (1.0 - (Wg_pct / 100.0));
    const dry_b = Mb * (1.0 - (Wb_pct / 100.0));

    // Assume carbon is approx 50% of dry organic matter:
    const C_g = 0.50 * dry_g;
    const N_g = C_g / CNg;

    const C_b = 0.50 * dry_b;
    const N_b = C_b / CNb;

    // Blended C:N ratio:
    const total_C = C_g + C_b;
    const total_N = N_g + N_b;
    const blended_CN = total_C / total_N;

    // Blended moisture:
    const total_water = (Mg * (Wg_pct / 100.0)) + (Mb * (Wb_pct / 100.0));
    const blended_moisture_pct = (total_water / (Mg + Mb)) * 100.0;

    let eval_cn = '', color = '#22543d';
    if (blended_CN >= 25.0 && blended_CN <= 35.0) {
      eval_cn = 'OPTIMAL C:N (25:1 - 35:1: Rapid thermophilic decomposition without odor ✓)';
      color = '#22543d';
    } else if (blended_CN < 25.0) {
      eval_cn = 'TOO MUCH NITROGEN (< 25:1: Ammonia odor & fly nuisance: Add more browns)';
      color = '#ea580c';
    } else {
      eval_cn = 'TOO MUCH CARBON (> 35:1: Slow decomposition rate: Add more nitrogen greens)';
      color = '#ea580c';
    }

    cnResEl.textContent = 'Blended C:N Ratio = ' + blended_CN.toFixed(1) + ' : 1';
    cnResEl.style.color = color;
    msResEl.textContent = 'Moisture = ' + blended_moisture_pct.toFixed(1) + '% (' + eval_cn.split(' (')[0] + ' | Total Weight = ' + (Mg + Mb) + ' kg)';
  }

  [mgEl, cngEl, wgEl, mbEl, cnbEl, wbEl].forEach(el => el.addEventListener('input', update));
  update();
})();