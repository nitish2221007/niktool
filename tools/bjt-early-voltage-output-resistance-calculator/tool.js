(() => {
  'use strict';
  const vaEl = document.getElementById('ea-va'), icEl = document.getElementById('ea-ic');
  const roResEl = document.getElementById('ea-res-ro'), gnResEl = document.getElementById('ea-res-gain');

  const Vt = 0.026;

  function update() {
    const Va = parseFloat(vaEl.value), icMa = parseFloat(icEl.value);
    if (isNaN(Va) || isNaN(icMa) || Va <= 0 || icMa <= 0) return;

    const icAmps = icMa * 1e-3;
    const roOhms = Va / icAmps;
    const roKohm = roOhms / 1000;
    const gm = icAmps / Vt;
    const av0 = Va / Vt;
    const av0Db = 20 * Math.log10(av0);

    roResEl.textContent = (roKohm >= 1000 ? (roKohm / 1000).toFixed(2) + ' MΩ' : roKohm.toFixed(1) + ' kΩ') + ' (r_o)';
    gnResEl.textContent = 'Intrinsic Max Gain A_v0 = ' + Math.round(av0).toLocaleString() + ' V/V (' + av0Db.toFixed(1) + ' dB, g_m = ' + (gm * 1000).toFixed(1) + ' mA/V)';
  }

  vaEl.addEventListener('input', update);
  icEl.addEventListener('input', update);
  update();
})();