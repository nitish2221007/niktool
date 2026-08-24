(() => {
  'use strict';
  const gEl = document.getElementById('psh-gas'), pdEl = document.getElementById('psh-pd');
  const vbResEl = document.getElementById('psh-res-vb'), stResEl = document.getElementById('psh-res-stat');

  const GASES = {
    'air': { A: 15.0, B: 365.0, gamma: 0.01, min_v: 327, name: 'Air' },
    'sf6': { A: 27.0, B: 890.0, gamma: 0.005,min_v: 800, name: 'SF₆ Gas' },
    'n2':  { A: 12.0, B: 342.0, gamma: 0.01, min_v: 250, name: 'Nitrogen N₂' },
    'ar':  { A: 14.0, B: 180.0, gamma: 0.05, min_v: 137, name: 'Argon Ar' },
    'he':  { A: 3.0,  B: 34.0,  gamma: 0.08, min_v: 150, name: 'Helium He' }
  };

  function update() {
    const g = GASES[gEl.value];
    const pd = parseFloat(pdEl.value);

    if (isNaN(pd) || pd <= 0) return;

    // Paschen's formula: V_B = ( B * pd ) / [ ln( A * pd ) - ln( ln( 1 + 1/gamma ) ) ]  [Volts]
    const gamma_term = Math.log(Math.log(1.0 + (1.0 / g.gamma)));
    const log_term = Math.log(g.A * pd) - gamma_term;

    let V_B = 0.0;
    if (log_term > 0) {
      V_B = (g.B * pd) / log_term;
      V_B = Math.max(g.min_v, V_B);
    } else {
      V_B = g.min_v;
    }

    const V_B_kv = V_B / 1000.0;

    vbResEl.textContent = 'V_B = ' + (V_B_kv < 1.0 ? Math.round(V_B) + ' V' : V_B_kv.toFixed(2) + ' kV Spark Flashover');
    stResEl.textContent = 'Dielectric Withstand @ p·d = ' + pd + ' Torr·cm (Minimum Paschen Dip V_min = ' + g.min_v + ' V in ' + g.name + ')';
  }

  gEl.addEventListener('change', update);
  pdEl.addEventListener('input', update);
  update();
})();