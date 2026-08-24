(() => {
  'use strict';
  const pmcEl = document.getElementById('c14-pmc'), thEl = document.getElementById('c14-thalf');
  const ageResEl = document.getElementById('c14-res-age'), eraResEl = document.getElementById('c14-res-era');

  function update() {
    const pMC = parseFloat(pmcEl.value), t_half = parseFloat(thEl.value);
    if (isNaN(pMC) || isNaN(t_half) || pMC <= 0 || pMC > 100 || t_half <= 0) return;

    // Decay formula: N(t) / N0 = pMC / 100 = exp( - (ln 2 / t_half) * t )
    // t = ( t_half / ln 2 ) * ln( 100 / pMC )
    const age_years_BP = (t_half / Math.LN2) * Math.log(100.0 / pMC);
    const calendar_year_BCE = Math.round(age_years_BP - 1950);

    let era = '';
    let color = '#22543d';

    if (age_years_BP <= 500) {
      era = 'MODERN / HISTORIC ERA (~1450 - 1950 CE: Post-Medieval artifacts)';
      color = '#22543d';
    } else if (age_years_BP <= 2500) {
      era = 'CLASSICAL ANTIQUITY / IRON AGE (~550 BCE: Ancient Greece, Rome, Vedic India)';
      color = '#22543d';
    } else if (age_years_BP <= 5000) {
      era = 'BRONZE AGE / EARLY DYNASTIC (~3000 BCE: Egyptian Pyramids, Indus Valley Civilization)';
      color = '#22543d';
    } else if (age_years_BP <= 12000) {
      era = 'NEOLITHIC / MESOLITHIC (~10,000 BCE: Dawn of Agriculture & Göbekli Tepe)';
      color = '#2563eb';
    } else if (age_years_BP <= 50000) {
      era = 'UPPER PALEOLITHIC (Cave Paintings & Neanderthal Coexistence)';
      color = '#d97706';
    } else {
      era = 'BEYOND RADIOCARBON LIMIT (> 50,000 Years BP: Requires Potassium-Argon / Uranium-Thorium dating)';
      color = '#c53030';
    }

    ageResEl.textContent = 'Age = ' + Math.round(age_years_BP).toLocaleString() + ' Years BP';
    ageResEl.style.color = color;
    eraResEl.textContent = 'Cal Year: ~' + (calendar_year_BCE > 0 ? calendar_year_BCE.toLocaleString() + ' BCE' : Math.abs(calendar_year_BCE) + ' CE') + ' | ' + era;
    eraResEl.style.color = color;
  }

  pmcEl.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();