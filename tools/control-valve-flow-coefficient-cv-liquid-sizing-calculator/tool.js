(() => {
  'use strict';
  const qEl = document.getElementById('cv-q'), dpEl = document.getElementById('cv-dp'), sgEl = document.getElementById('cv-sg');
  const cvResEl = document.getElementById('cv-res-val'), pResEl = document.getElementById('cv-res-pipe');

  function update() {
    const Q_gpm = parseFloat(qEl.value), dP_psi = parseFloat(dpEl.value), SG = parseFloat(sgEl.value);
    if (isNaN(Q_gpm) || isNaN(dP_psi) || isNaN(SG) || Q_gpm <= 0 || dP_psi <= 0 || SG <= 0) return;

    // ISA-75 liquid sizing equation: C_v = Q * sqrt( SG / deltaP )  [GPM / sqrt(psi)]
    const Cv = Q_gpm * Math.sqrt(SG / dP_psi);

    // Metric Kv = 0.865 * Cv  [m^3/h / sqrt(bar)]
    const Kv = 0.865 * Cv;

    const Q_m3_h = Q_gpm * 0.227125;
    const dP_bar = dP_psi * 0.0689476;

    // Recommended nominal valve body diameter rule of thumb: D_valve approx sqrt(Cv / 10) inches
    let valveSize = '';
    if (Cv < 15) valveSize = '1.0" (DN 25)';
    else if (Cv < 30) valveSize = '1.5" (DN 40)';
    else if (Cv < 60) valveSize = '2.0" (DN 50)';
    else if (Cv < 120) valveSize = '3.0" (DN 80)';
    else if (Cv < 220) valveSize = '4.0" (DN 100)';
    else valveSize = '6.0"+ (DN 150+)';

    cvResEl.textContent = 'C_v = ' + Cv.toFixed(1) + ' (Metric K_v = ' + Kv.toFixed(1) + ')';
    pResEl.textContent = 'Recommended Body: ' + valveSize + ' | Flow: ' + Q_m3_h.toFixed(1) + ' m³/h @ ΔP = ' + dP_bar.toFixed(2) + ' bar (Operating at 70% Stroke)';
  }

  [qEl, dpEl, sgEl].forEach(el => el.addEventListener('input', update));
  update();
})();