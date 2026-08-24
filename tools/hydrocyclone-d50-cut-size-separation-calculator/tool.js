(() => {
  'use strict';
  const dcEl = document.getElementById('cyc-dc'), doEl = document.getElementById('cyc-do');
  const duEl = document.getElementById('cyc-du'), pEl = document.getElementById('cyc-p');
  const d50ResEl = document.getElementById('cyc-res-d50'), spResEl = document.getElementById('cyc-res-split');

  function update() {
    const Dc = parseFloat(dcEl.value), Do = parseFloat(doEl.value);
    const Du = parseFloat(duEl.value), P_kpa = parseFloat(pEl.value);

    if (isNaN(Dc) || isNaN(Do) || isNaN(Du) || isNaN(P_kpa) || Dc <= 0 || Do <= 0 || Du <= 0 || P_kpa <= 0) return;

    // Simplified Plitt empirical correlation for d50 (microns):
    // d50_c approx = 50.5 * (Dc^0.46) * (Do^0.60) / ( (Du^0.20) * (P_kpa^0.25) )
    const num = 50.5 * Math.pow(Dc, 0.46) * Math.pow(Do, 0.60);
    const den = Math.pow(Du, 0.20) * Math.pow(P_kpa, 0.25);
    const d50 = num / den;

    d50ResEl.textContent = 'd₅₀ = ' + d50.toFixed(1) + ' μm (Cut Size)';
    spResEl.textContent = 'Overflow Fine Slurry: <' + d50.toFixed(0) + ' μm (Flotation Feed) | Underflow: >' + d50.toFixed(0) + ' μm (Ball Mill Recirculation)';
  }

  [dcEl, doEl, duEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();