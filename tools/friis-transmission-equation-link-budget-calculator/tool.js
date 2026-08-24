(() => {
  'use strict';
  const ptEl = document.getElementById('fr-pt'), gtEl = document.getElementById('fr-gt');
  const grEl = document.getElementById('fr-gr'), fEl = document.getElementById('fr-freq'), dEl = document.getElementById('fr-dist');
  const prResEl = document.getElementById('fr-res-pr'), fsResEl = document.getElementById('fr-res-fspl');

  function update() {
    const Pt_dbm = parseFloat(ptEl.value), Gt = parseFloat(gtEl.value);
    const Gr = parseFloat(grEl.value), freqMhz = parseFloat(fEl.value), distKm = parseFloat(dEl.value);

    if (isNaN(Pt_dbm) || isNaN(Gt) || isNaN(Gr) || isNaN(freqMhz) || isNaN(distKm) || freqMhz <= 0 || distKm <= 0) return;

    const fspl = (20 * Math.log10(distKm)) + (20 * Math.log10(freqMhz)) + 32.44;
    const Pr_dbm = Pt_dbm + Gt + Gr - fspl;
    const Pr_watts = Math.pow(10, (Pr_dbm - 30) / 10);
    const Pr_pw = Pr_watts * 1e12;

    const rxSens = -95.0;
    const margin = Pr_dbm - rxSens;

    prResEl.textContent = Pr_dbm.toFixed(1) + ' dBm (' + (Pr_pw >= 1000 ? (Pr_pw / 1000).toFixed(2) + ' nW' : Pr_pw.toFixed(1) + ' pW') + ')';
    fsResEl.textContent = 'FSPL: ' + fspl.toFixed(1) + ' dB (Link Margin: ' + (margin >= 0 ? '+' : '') + margin.toFixed(1) + ' dB above -95 dBm Sensitivity)';
  }

  [ptEl, gtEl, grEl, fEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();