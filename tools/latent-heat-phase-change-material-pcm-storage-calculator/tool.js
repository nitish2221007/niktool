(() => {
  'use strict';
  const mEl = document.getElementById('pcm-mass'), matEl = document.getElementById('pcm-mat'), dtEl = document.getElementById('pcm-dt');
  const qResEl = document.getElementById('pcm-res-q'), cmpResEl = document.getElementById('pcm-res-cmp');

  const PCMS = {
    'paraffin':     { dh_f: 245.0, cp_s: 2.0, cp_l: 2.4, name: 'Paraffin Wax RT28' },
    'salt_hydrate': { dh_f: 190.0, cp_s: 1.4, cp_l: 2.1, name: 'Salt Hydrate CaCl₂·6H₂O' },
    'ice':          { dh_f: 334.0, cp_s: 2.1, cp_l: 4.18, name: 'Ice / Water Phase Change' },
    'erythritol':   { dh_f: 340.0, cp_s: 1.8, cp_l: 2.8, name: 'Sugar Alcohol Erythritol' }
  };

  function update() {
    const p = PCMS[matEl.value];
    const massKg = parseFloat(mEl.value), deltaT = parseFloat(dtEl.value);

    if (isNaN(massKg) || isNaN(deltaT) || massKg <= 0 || deltaT <= 0) return;

    // Latent heat Q_latent = m * deltaH_f  [kJ]
    const Q_latent_kj = massKg * p.dh_f;

    // Sensible heat across solid + liquid phase (assuming half deltaT in each phase)
    const Q_sensible_kj = massKg * (((p.cp_s + p.cp_l) / 2) * deltaT);

    // Total stored heat Q_total = Q_latent + Q_sensible  [kJ]
    const Q_total_kj = Q_latent_kj + Q_sensible_kj;
    const Q_total_kwh = Q_total_kj / 3600;
    const Q_latent_kwh = Q_latent_kj / 3600;

    const latentPct = (Q_latent_kj / Q_total_kj) * 100;

    // Equivalent water mass required for same sensible storage over deltaT:
    // m_water = Q_total_kj / (4.18 * deltaT)
    const m_water_kg = Q_total_kj / (4.18 * deltaT);
    const massSavingFactor = m_water_kg / massKg;

    qResEl.textContent = Q_total_kwh.toFixed(2) + ' kWh (' + Math.round(Q_total_kj).toLocaleString() + ' kJ Storage)';
    cmpResEl.textContent = 'Latent: ' + latentPct.toFixed(1) + '% (' + Q_latent_kwh.toFixed(1) + ' kWh) | ' + massSavingFactor.toFixed(1) + '× Less Mass than Water (' + Math.round(m_water_kg) + ' kg Water required for ' + deltaT + '°C span)';
  }

  [mEl, dtEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();