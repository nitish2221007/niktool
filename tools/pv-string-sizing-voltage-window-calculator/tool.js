(() => {
  'use strict';
  const vocEl = document.getElementById('str-voc'), bEl = document.getElementById('str-beta');
  const tEl = document.getElementById('str-tmin'), vmEl = document.getElementById('str-vmax');
  const pResEl = document.getElementById('str-res-maxp'), vResEl = document.getElementById('str-res-voc');

  function update() {
    const Voc_stc = parseFloat(vocEl.value), beta = parseFloat(bEl.value);
    const Tmin = parseFloat(tEl.value), Vmax_inv = parseFloat(vmEl.value);

    if (isNaN(Voc_stc) || isNaN(beta) || isNaN(Tmin) || isNaN(Vmax_inv) || Voc_stc <= 0 || Vmax_inv <= 0) return;

    const deltaT = Tmin - 25.0;
    const Voc_cold = Voc_stc * (1 + ((beta / 100) * deltaT));
    const maxModules = Math.floor(Vmax_inv / Voc_cold);
    const maxStringVoc = maxModules * Voc_cold;

    pResEl.textContent = maxModules + ' Panels in Series (Max Safe String)';
    vResEl.textContent = Voc_cold.toFixed(2) + ' V Cold V_oc @ ' + Tmin + '°C (Max String V_oc = ' + maxStringVoc.toFixed(1) + ' V, Limit: ' + Vmax_inv + ' V)';
  }

  [vocEl, bEl, tEl, vmEl].forEach(el => el.addEventListener('input', update));
  update();
})();