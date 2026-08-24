(() => {
  'use strict';
  const sp1El = document.getElementById('bac-sp1'), sp2El = document.getElementById('bac-sp2');
  const phiEl = document.getElementById('bac-philo'), orEl = document.getElementById('bac-oral');
  const moyResEl = document.getElementById('bac-res-moy'), menResEl = document.getElementById('bac-res-men');

  function update() {
    const sp1 = parseFloat(sp1El.value) || 0, sp2 = parseFloat(sp2El.value) || 0;
    const philo = parseFloat(phiEl.value) || 0, oral = parseFloat(orEl.value) || 0;

    // Standard French Bac coefficients: Sp1 (16), Sp2 (16), Philo (8), Grand Oral (10)
    // Continuous assessment control continu baseline ~ 15.0 (Coeff 50)
    const totalWeighted = (sp1 * 16) + (sp2 * 16) + (philo * 8) + (oral * 10) + (15.0 * 50);
    const totalCoeff = 16 + 16 + 8 + 10 + 50;

    const moyenne = totalWeighted / totalCoeff;

    let mention = '';
    let color = '#22543d';

    if (moyenne >= 18.0) {
      mention = 'MENTION TRÈS BIEN AVEC LES FÉLICITATIONS DU JURY (≥ 18.0 / 20)';
      color = '#22543d';
    } else if (moyenne >= 16.0) {
      mention = 'MENTION TRÈS BIEN (16.0 - 17.99 / 20: High Honors)';
      color = '#22543d';
    } else if (moyenne >= 14.0) {
      mention = 'MENTION BIEN (14.0 - 15.99 / 20: Honors)';
      color = '#2563eb';
    } else if (moyenne >= 12.0) {
      mention = 'MENTION ASSEZ BIEN (12.0 - 13.99 / 20: Merit Pass)';
      color = '#d97706';
    } else if (moyenne >= 10.0) {
      mention = 'ADMIS SANS MENTION (10.0 - 11.99 / 20: Standard Pass)';
      color = '#4b5563';
    } else if (moyenne >= 8.0) {
      mention = 'RATTRAPAGE (8.0 - 9.99 / 20: Oral re-sit exam required)';
      color = '#c53030';
    } else {
      mention = 'AJOURNÉ (Fail: Repeat Year)';
      color = '#c53030';
    }

    moyResEl.textContent = moyenne.toFixed(2) + ' / 20 (' + mention.split(' (')[0] + ')';
    moyResEl.style.color = color;
    menResEl.textContent = mention + ' | Parcoursup Grand Écoles Standing';
    menResEl.style.color = color;
  }

  [sp1El, sp2El, phiEl, orEl].forEach(el => el.addEventListener('input', update));
  update();
})();