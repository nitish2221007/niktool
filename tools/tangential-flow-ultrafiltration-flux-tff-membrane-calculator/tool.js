(() => {
  'use strict';
  const pfEl = document.getElementById('tff-pfeed'), prEl = document.getElementById('tff-pret');
  const ppEl = document.getElementById('tff-pperm'), aEl = document.getElementById('tff-area');
  const tmpResEl = document.getElementById('tff-res-tmp'), flxResEl = document.getElementById('tff-res-flux');

  // Baseline normalized permeability: 40 LMH per bar of TMP
  const permeability_LMH_bar = 40.0;

  function update() {
    const Pf = parseFloat(pfEl.value), Pr = parseFloat(prEl.value);
    const Pp = parseFloat(ppEl.value), Area = parseFloat(aEl.value);

    if (isNaN(Pf) || isNaN(Pr) || isNaN(Pp) || isNaN(Area) || Pf < Pr || Area <= 0) return;

    // Transmembrane Pressure TMP = (Pf + Pr)/2 - Pp  [bar]
    const TMP_bar = ((Pf + Pr) / 2.0) - Pp;
    const TMP_psi = TMP_bar * 14.5038;

    // Channel pressure drop DeltaP_channel = Pf - Pr  [bar]
    const deltaP_channel = Pf - Pr;

    // Permeate flux J = permeability * TMP  [LMH = Liters / m^2 * h]
    const J_LMH = Math.max(0, permeability_LMH_bar * TMP_bar);

    // Total volumetric flow rate Q_permeate = J * Area  [L / h]
    const Q_perm_L_h = J_LMH * Area;

    tmpResEl.textContent = 'TMP = ' + TMP_bar.toFixed(2) + ' bar (' + TMP_psi.toFixed(1) + ' psi)';
    flxResEl.textContent = 'Flux J = ' + J_LMH.toFixed(1) + ' LMH (' + Q_perm_L_h.toFixed(1) + ' L/h Filtrate | Channel ΔP = ' + deltaP_channel.toFixed(2) + ' bar @ Area = ' + Area + ' m²)';
  }

  [pfEl, prEl, ppEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();