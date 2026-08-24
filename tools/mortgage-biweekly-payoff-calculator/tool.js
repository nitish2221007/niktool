(() => {
  'use strict';
  const bEl = document.getElementById('bw-bal'), rEl = document.getElementById('bw-rate'), yEl = document.getElementById('bw-years');
  const savEl = document.getElementById('bw-res-sav'), shvEl = document.getElementById('bw-res-shaved'), pmtEl = document.getElementById('bw-res-payment');

  function update() {
    const P = parseFloat(bEl.value), annualRate = parseFloat(rEl.value), years = parseFloat(yEl.value);
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) return;

    const rMonthly = (annualRate / 100) / 12;
    const nMonthly = years * 12;

    // Monthly payment M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = (P * (rMonthly * Math.pow(1 + rMonthly, nMonthly))) / (Math.pow(1 + rMonthly, nMonthly) - 1);
    const totalInterestMonthly = (monthlyPayment * nMonthly) - P;

    const biweeklyPayment = monthlyPayment / 2;
    const rBiweekly = (annualRate / 100) / 26;

    // Simulate accelerated biweekly amortization (26 payments/yr = 13 monthly payments/yr)
    let balance = P;
    let biweeklyPeriods = 0;
    let totalInterestBiweekly = 0;

    while (balance > 0 && biweeklyPeriods < 3000) {
      const interest = balance * rBiweekly;
      totalInterestBiweekly += interest;
      const principal = biweeklyPayment - interest;
      balance -= principal;
      biweeklyPeriods++;
    }

    const biweeklyYears = biweeklyPeriods / 26;
    const yearsShaved = Math.max(0, years - biweeklyYears);
    const interestSaved = Math.max(0, totalInterestMonthly - totalInterestBiweekly);

    savEl.textContent = '$' + Math.round(interestSaved).toLocaleString();
    shvEl.textContent = yearsShaved.toFixed(1) + ' Years Shaved Off';
    pmtEl.textContent = '$' + Math.round(biweeklyPayment).toLocaleString() + ' / 2-weeks';
  }

  [bEl, rEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();