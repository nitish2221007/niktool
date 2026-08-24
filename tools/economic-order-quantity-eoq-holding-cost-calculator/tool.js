(() => {
  'use strict';
  const dEl = document.getElementById('eoq-d'), sEl = document.getElementById('eoq-s'), hEl = document.getElementById('eoq-h');
  const qResEl = document.getElementById('eoq-res-q'), cResEl = document.getElementById('eoq-res-cost');

  function update() {
    const D = parseFloat(dEl.value), S = parseFloat(sEl.value), H = parseFloat(hEl.value);
    if (isNaN(D) || isNaN(S) || isNaN(H) || D <= 0 || S <= 0 || H <= 0) return;

    // EOQ formula: Q* = sqrt( (2 * D * S) / H )
    const EOQ = Math.sqrt((2.0 * D * S) / H);
    const roundedEOQ = Math.round(EOQ);

    // Number of orders per year N = D / Q
    const ordersPerYear = D / EOQ;

    // Annual holding cost = (Q / 2) * H
    const annualHolding = (EOQ / 2.0) * H;
    // Annual ordering cost = (D / Q) * S
    const annualOrdering = (D / EOQ) * S;
    // Total cost = Holding + Ordering
    const totalCost = annualHolding + annualOrdering;

    qResEl.textContent = 'EOQ = ' + roundedEOQ + ' Units / Order';
    cResEl.textContent = 'Total Cost = $' + Math.round(totalCost).toLocaleString() + '/yr (' + ordersPerYear.toFixed(1) + ' Orders/yr | Holding: $' + Math.round(annualHolding).toLocaleString() + ' + Ordering: $' + Math.round(annualOrdering).toLocaleString() + ')';
  }

  [dEl, sEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();