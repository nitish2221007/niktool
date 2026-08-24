(() => {
  'use strict';
  const vocEl = document.getElementById('sc-voc'), iscEl = document.getElementById('sc-isc');
  const pmaxEl = document.getElementById('sc-pmax'), arEl = document.getElementById('sc-area');
  const efResEl = document.getElementById('sc-res-eff'), ffResEl = document.getElementById('sc-res-ff');

  function update() {
    const V_oc = parseFloat(vocEl.value), I_sc = parseFloat(iscEl.value);
    const P_max = parseFloat(pmaxEl.value), Area_cm2 = parseFloat(arEl.value);

    if (isNaN(V_oc) || isNaN(I_sc) || isNaN(P_max) || isNaN(Area_cm2) || V_oc <= 0 || I_sc <= 0 || P_max <= 0 || Area_cm2 <= 0) return;

    // Fill factor: FF = P_max / (V_oc * I_sc)
    const theoretical_power = V_oc * I_sc;
    const FF = P_max / theoretical_power;
    const FF_pct = FF * 100.0;

    // Standard solar irradiance: 1000 W / m^2 = 0.100 W / cm^2
    const P_in = Area_cm2 * 0.100; // Watts input

    // Efficiency: eta = P_max / P_in * 100%
    const eta_pct = (P_max / P_in) * 100.0;

    let qual = '', color = '#22543d';
    if (eta_pct >= 22.0) { qual = 'PREMIUM HIGH EFFICIENCY (TOPCon / HJT / Perovskite Tandem)'; color = '#22543d'; }
    else if (eta_pct >= 18.0) { qual = 'COMMERCIAL GRADE (Standard Mono-PERC Silicon)'; color = '#22543d'; }
    else { qual = 'LOW EFFICIENCY (Polycrystalline / Thin Film)'; color = '#ea580c'; }

    efResEl.textContent = 'Efficiency η = ' + eta_pct.toFixed(2) + '% (' + qual.split(' (')[0] + ')';
    efResEl.style.color = color;
    ffResEl.textContent = 'Fill Factor FF = ' + FF_pct.toFixed(2) + '% | V_oc·I_sc = ' + theoretical_power.toFixed(2) + ' W (Input Light = ' + P_in.toFixed(2) + ' W @ 1000 W/m²)';
  }

  [vocEl, iscEl, pmaxEl, arEl].forEach(el => el.addEventListener('input', update));
  update();
})();