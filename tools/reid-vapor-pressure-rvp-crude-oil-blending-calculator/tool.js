(() => {
  'use strict';
  const bVEl = document.getElementById('rvp-but-vol'), aVEl = document.getElementById('rvp-alk-vol');
  const rVEl = document.getElementById('rvp-ref-vol'), fVEl = document.getElementById('rvp-fcc-vol');
  const bResEl = document.getElementById('rvp-res-blend'), epaResEl = document.getElementById('rvp-res-epa');

  // Component pure RVPs in psi:
  const RVP_but = 52.0;  // n-Butane
  const RVP_alk = 5.0;   // Alkylate
  const RVP_ref = 3.5;   // Reformate
  const RVP_fcc = 11.5;  // FCC Naphtha

  function update() {
    const vBut = parseFloat(bVEl.value), vAlk = parseFloat(aVEl.value);
    const vRef = parseFloat(rVEl.value), vFcc = parseFloat(fVEl.value);

    if (isNaN(vBut) || isNaN(vAlk) || isNaN(vRef) || isNaN(vFcc)) return;

    const totalVol = vBut + vAlk + vRef + vFcc;
    if (totalVol === 0) return;

    // Chevron 1.25 power blending index method:
    // Blend Index BI = sum( (v_i / totalVol) * (RVP_i)^1.25 )
    // RVP_blend = (BI)^(1 / 1.25)
    const BI = ((vBut / totalVol) * Math.pow(RVP_but, 1.25)) +
               ((vAlk / totalVol) * Math.pow(RVP_alk, 1.25)) +
               ((vRef / totalVol) * Math.pow(RVP_ref, 1.25)) +
               ((vFcc / totalVol) * Math.pow(RVP_fcc, 1.25));

    const RVP_blend_psi = Math.pow(BI, 1.0 / 1.25);
    const RVP_blend_kpa = RVP_blend_psi * 6.89476;

    let epaStatus = '';
    let color = '#22543d';

    if (RVP_blend_psi <= 7.80) {
      epaStatus = 'EPA STRICT REFORMULATED (RFG) SUMMER COMPLIANT (RVP ≤ 7.8 psi: High Ozone Non-Attainment)';
      color = '#22543d';
    } else if (RVP_blend_psi <= 9.00) {
      epaStatus = 'EPA CONVENTIONAL SUMMER COMPLIANT (RVP ≤ 9.0 psi Federal Standard)';
      color = '#22543d';
    } else if (RVP_blend_psi <= 13.5) {
      epaStatus = 'WINTER GASOLINE SPECIFICATION (RVP 11.5 - 13.5 psi: Easy Cold Weather Engine Starting)';
      color = '#2563eb';
    } else {
      epaStatus = 'VAPOR LOCK RISK: RVP exceeds 13.5 psi - Risk of hot fuel pump cavitation vapor lock!';
      color = '#c53030';
    }

    bResEl.textContent = 'RVP = ' + RVP_blend_psi.toFixed(2) + ' psi (' + RVP_blend_kpa.toFixed(1) + ' kPa)';
    epaResEl.textContent = epaStatus + ' (Total Volume: ' + totalVol.toFixed(0) + '%)';
    epaResEl.style.color = color;
  }

  [bVEl, aVEl, rVEl, fVEl].forEach(el => el.addEventListener('input', update));
  update();
})();