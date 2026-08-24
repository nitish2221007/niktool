(() => {
  'use strict';
  const apiEl = document.getElementById('api-val'), sgEl = document.getElementById('api-sg');
  const clsResEl = document.getElementById('api-res-class'), dnsResEl = document.getElementById('api-res-dens');

  function updateFromApi(api) {
    if (isNaN(api) || api < -10 || api > 100) return;

    // SG = 141.5 / (API + 131.5)
    const sg = 141.5 / (api + 131.5);
    sgEl.value = sg.toFixed(4);

    const kgM3 = sg * 999.016; // Density of water at 60°F
    const lbGal = sg * 8.337;

    dnsResEl.textContent = kgM3.toFixed(1) + ' kg / m³ (' + lbGal.toFixed(2) + ' lb/gal)';

    if (api > 31.1) {
      clsResEl.textContent = 'Light Crude Oil (> 31.1 °API: WTI / Brent Standard)';
      clsResEl.style.color = '#22543d';
    } else if (api >= 22.3 && api <= 31.1) {
      clsResEl.textContent = 'Medium Crude Oil (22.3 to 31.1 °API)';
      clsResEl.style.color = '#2563eb';
    } else if (api >= 10.0 && api < 22.3) {
      clsResEl.textContent = 'Heavy Crude Oil (10.0 to 22.3 °API: Sinks in Water if < 10)';
      clsResEl.style.color = '#d97706';
    } else {
      clsResEl.textContent = 'Extra Heavy Bitumen / Oil Sands (< 10.0 °API)';
      clsResEl.style.color = '#c53030';
    }
  }

  apiEl.addEventListener('input', () => {
    const api = parseFloat(apiEl.value);
    if (!isNaN(api)) updateFromApi(api);
  });

  sgEl.addEventListener('input', () => {
    const sg = parseFloat(sgEl.value);
    if (!isNaN(sg) && sg > 0) {
      const api = (141.5 / sg) - 131.5;
      apiEl.value = api.toFixed(1);
      updateFromApi(api);
    }
  });

  updateFromApi(39.6);
})();