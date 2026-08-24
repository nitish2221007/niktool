(() => {
  'use strict';
  const spEl = document.getElementById('vce-sp'), methEl = document.getElementById('vce-meth'), chEl = document.getElementById('vce-chem');
  const scResEl = document.getElementById('vce-res-scaled'), totResEl = document.getElementById('vce-res-total');

  function update() {
    const raw_sp = parseFloat(spEl.value) || 0;
    const raw_meth = parseFloat(methEl.value) || 0;
    const raw_ch = parseFloat(chEl.value) || 0;

    // Typical VTAC scaling curves:
    // Specialist Maths scales up by ~10-11 points at 38
    const scaled_sp = Math.min(50.0, raw_sp + (raw_sp >= 30 ? 10.5 : raw_sp * 0.3));
    // Math Methods scales up by ~4.5 points at 40
    const scaled_meth = Math.min(50.0, raw_meth + (raw_meth >= 30 ? 4.5 : raw_meth * 0.15));
    // Chemistry scales up by ~3.5 points at 36
    const scaled_ch = Math.min(50.0, raw_ch + (raw_ch >= 30 ? 3.5 : raw_ch * 0.1));

    scResEl.textContent = 'Spec Maths: ' + raw_sp + ' -> ' + scaled_sp.toFixed(1) + ' Scaled (+' + (scaled_sp - raw_sp).toFixed(1) + ')';
    totResEl.textContent = 'Methods: ' + raw_meth + ' -> ' + scaled_meth.toFixed(1) + ' (+' + (scaled_meth - raw_meth).toFixed(1) + ') | Chemistry: ' + raw_ch + ' -> ' + scaled_ch.toFixed(1) + ' (+' + (scaled_ch - raw_ch).toFixed(1) + ')';
  }

  [spEl, methEl, chEl].forEach(el => el.addEventListener('input', update));
  update();
})();