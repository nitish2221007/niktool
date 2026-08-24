(() => {
  'use strict';
  const eqEl = document.getElementById('wc-eq'), dbtEl = document.getElementById('wc-dbt');
  const bEl = document.getElementById('wc-beta'), rfEl = document.getElementById('wc-rf');
  const rdEl = document.getElementById('wc-rd'), txEl = document.getElementById('wc-tax');
  const wacResEl = document.getElementById('wc-res-wacc'), capResEl = document.getElementById('wc-res-capm');

  const equityRiskPremium = 5.0; // Standard 5.0% historical market risk premium (r_m - r_f)

  function update() {
    const E = parseFloat(eqEl.value), D = parseFloat(dbtEl.value);
    const beta = parseFloat(bEl.value), rf_pct = parseFloat(rfEl.value);
    const rd_pct = parseFloat(rdEl.value), tax_pct = parseFloat(txEl.value);

    if (isNaN(E) || isNaN(D) || isNaN(beta) || isNaN(rf_pct) || isNaN(rd_pct) || isNaN(tax_pct) || E <= 0 || D < 0) return;

    const V = E + D;
    const w_e = E / V;
    const w_d = D / V;

    // CAPM Cost of Equity: r_e = r_f + beta * ERP
    const r_e_pct = rf_pct + (beta * equityRiskPremium);

    // After-tax cost of debt: r_d_after_tax = r_d * ( 1 - T_c )
    const tax_rate = tax_pct / 100.0;
    const r_d_after_tax_pct = rd_pct * (1.0 - tax_rate);

    // WACC = (w_e * r_e) + (w_d * r_d_after_tax)
    const WACC = (w_e * r_e_pct) + (w_d * r_d_after_tax_pct);

    wacResEl.textContent = 'WACC = ' + WACC.toFixed(2) + '% Discount Rate';
    capResEl.textContent = 'Cost of Equity r_e = ' + r_e_pct.toFixed(2) + '% | After-Tax Debt = ' + r_d_after_tax_pct.toFixed(2) + '% (Equity: ' + (w_e*100).toFixed(0) + '%, Debt: ' + (w_d*100).toFixed(0) + '%)';
  }

  [eqEl, dbtEl, bEl, rfEl, rdEl, txEl].forEach(el => el.addEventListener('input', update));
  update();
})();