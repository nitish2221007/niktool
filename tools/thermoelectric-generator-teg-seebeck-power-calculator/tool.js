(() => {
  'use strict';
  const thEl = document.getElementById('teg-th'), tcEl = document.getElementById('teg-tc');
  const sEl = document.getElementById('teg-s'), rEl = document.getElementById('teg-rint');
  const pResEl = document.getElementById('teg-res-pwr'), efResEl = document.getElementById('teg-res-eff');

  function update() {
    const ThC = parseFloat(thEl.value), TcC = parseFloat(tcEl.value);
    const SmV = parseFloat(sEl.value), Rint = parseFloat(rEl.value);

    if (isNaN(ThC) || isNaN(TcC) || isNaN(SmV) || isNaN(Rint) || ThC <= TcC || SmV <= 0 || Rint <= 0) return;

    const deltaT = ThC - TcC;
    const S_volts_K = SmV * 1e-3;

    // Open-circuit Seebeck voltage V_oc = S * deltaT  [Volts]
    const V_oc = S_volts_K * deltaT;

    // Maximum matched power output (R_load = R_int): P_max = V_oc^2 / (4 * R_int)  [Watts]
    const P_max = Math.pow(V_oc, 2) / (4 * Rint);

    // Thermodynamic efficiency with ZT ~ 0.85:
    const ThK = ThC + 273.15;
    const TcK = TcC + 273.15;
    const T_avg = (ThK + TcK) / 2;
    const ZT = 0.85; // typical Bi2Te3 figure of merit

    // Carnot efficiency eta_carnot = (Th - Tc) / Th
    const eta_carnot = deltaT / ThK;

    // TEG maximum efficiency: eta_max = eta_carnot * ( sqrt(1 + ZT) - 1 ) / ( sqrt(1 + ZT) + (Tc/Th) )
    const num = Math.sqrt(1 + ZT) - 1.0;
    const den = Math.sqrt(1 + ZT) + (TcK / ThK);
    const eta_teg = eta_carnot * (num / den);
    const eta_pct = eta_teg * 100;

    pResEl.textContent = 'P_max = ' + P_max.toFixed(2) + ' Watts Electrical Output';
    efResEl.textContent = 'V_oc = ' + V_oc.toFixed(2) + ' V (I_match = ' + (V_oc/(2*Rint)).toFixed(2) + ' A) | Efficiency η = ' + eta_pct.toFixed(2) + '% (Carnot: ' + (eta_carnot*100).toFixed(1) + '%, ΔT = ' + deltaT + '°C)';
  }

  [thEl, tcEl, sEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();