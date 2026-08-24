(() => {
  'use strict';
  const reEl = document.getElementById('nu-re'), prEl = document.getElementById('nu-pr');
  const kEl = document.getElementById('nu-k'), dEl = document.getElementById('nu-d');
  const nuResEl = document.getElementById('nu-res-nu'), hResEl = document.getElementById('nu-res-h');

  function update() {
    const Re = parseFloat(reEl.value), Pr = parseFloat(prEl.value);
    const k_fluid = parseFloat(kEl.value), D = parseFloat(dEl.value);

    if (isNaN(Re) || isNaN(Pr) || isNaN(k_fluid) || isNaN(D) || Re <= 0 || Pr <= 0 || k_fluid <= 0 || D <= 0) return;

    // Dittus-Boelter correlation for heating: Nu = 0.023 * (Re^0.8) * (Pr^0.4)
    const Nu = 0.023 * Math.pow(Re, 0.8) * Math.pow(Pr, 0.4);

    // Convective heat transfer coefficient: h = Nu * k / D  [W / (m^2 * K)]
    const h = (Nu * k_fluid) / D;

    nuResEl.textContent = 'Nusselt Nu = ' + Nu.toFixed(1);
    hResEl.textContent = 'Convective Coeff h = ' + Math.round(h).toLocaleString() + ' W/(m²·K) (D=' + (D*1000) + ' mm pipe @ Re=' + Math.round(Re).toLocaleString() + ')';
  }

  [reEl, prEl, kEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();