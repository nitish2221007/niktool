(() => {
  'use strict';
  const mdEl = document.getElementById('ei-mode'), vmEl = document.getElementById('ei-vmax');
  const kmEl = document.getElementById('ei-km'), inhEl = document.getElementById('ei-inh');
  const apResEl = document.getElementById('ei-res-app'), dsResEl = document.getElementById('ei-res-desc');

  function update() {
    const mode = mdEl.value, Vmax = parseFloat(vmEl.value);
    const Km = parseFloat(kmEl.value), I_over_Ki = parseFloat(inhEl.value);

    if (isNaN(Vmax) || isNaN(Km) || isNaN(I_over_Ki) || Vmax <= 0 || Km <= 0 || I_over_Ki < 0) return;

    // Alpha factor = 1 + [I] / Ki
    const alpha = 1.0 + I_over_Ki;

    let Km_app = Km, Vmax_app = Vmax, desc = '';

    if (mode === 'comp') {
      Km_app = Km * alpha;
      Vmax_app = Vmax;
      desc = 'COMPETITIVE: Binds active site (Km increases ' + alpha.toFixed(1) + '×, Vmax unchanged)';
    } else if (mode === 'noncomp') {
      Km_app = Km;
      Vmax_app = Vmax / alpha;
      desc = 'NON-COMPETITIVE: Allosteric binding (Vmax reduced by ' + alpha.toFixed(1) + '×, Km unchanged)';
    } else {
      Km_app = Km / alpha;
      Vmax_app = Vmax / alpha;
      desc = 'UNCOMPETITIVE: Binds ES complex only (Both Km and Vmax reduced by ' + alpha.toFixed(1) + '×)';
    }

    apResEl.textContent = 'K_m^app = ' + Km_app.toFixed(1) + ' mM | V_max^app = ' + Vmax_app.toFixed(1) + ' μmol/min';
    dsResEl.textContent = desc + ' (α = ' + alpha.toFixed(2) + ')';
  }

  [mdEl, vmEl, kmEl, inhEl].forEach(el => el.addEventListener('input', update));
  mdEl.addEventListener('change', update);
  update();
})();