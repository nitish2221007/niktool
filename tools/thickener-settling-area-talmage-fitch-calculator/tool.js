(() => {
  'use strict';
  const tpdEl = document.getElementById('thk-tpd'), cfEl = document.getElementById('thk-cfeed');
  const cuEl = document.getElementById('thk-cund'), vEl = document.getElementById('thk-v');
  const aResEl = document.getElementById('thk-res-area'), fResEl = document.getElementById('thk-res-flux');

  function update() {
    const tpd = parseFloat(tpdEl.value), CfeedPct = parseFloat(cfEl.value);
    const CundPct = parseFloat(cuEl.value), vMh = parseFloat(vEl.value);

    if (isNaN(tpd) || isNaN(CfeedPct) || isNaN(CundPct) || isNaN(vMh) || tpd <= 0 || CfeedPct <= 0 || CundPct <= CfeedPct || vMh <= 0) return;

    // Convert TPD dry solids to tonnes/hour
    const tphSolids = tpd / 24;

    // Dilution in feed and underflow: D = (1 - C) / C  [tonnes water / tonne solids]
    const D_feed = (100 - CfeedPct) / CfeedPct;
    const D_und = (100 - CundPct) / CundPct;

    // Water to overflow per hour = tphSolids * (D_feed - D_und)  [m^3 / h]
    const waterOverflowM3h = tphSolids * (D_feed - D_und);
    const waterRecoveredM3Day = waterOverflowM3h * 24;

    // Thickener Area A = waterOverflowM3h / vMh  [m^2]
    const Area = waterOverflowM3h / vMh;
    // Diameter D = sqrt( 4 * Area / pi )
    const Dia = Math.sqrt((4 * Area) / Math.PI);

    // Unit area = Area / TPD  [m^2 / TPD]
    const unitArea = Area / tpd;

    aResEl.textContent = Area.toFixed(1) + ' m² Area (' + Dia.toFixed(1) + ' m Diameter Tank)';
    fResEl.textContent = 'Unit Area: ' + unitArea.toFixed(3) + ' m²/(t/d) | Water Recovered: ' + Math.round(waterRecoveredM3Day).toLocaleString() + ' m³/day (Overflow)';
  }

  [tpdEl, cfEl, cuEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();