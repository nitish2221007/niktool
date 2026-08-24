(() => {
  'use strict';
  const dEl = document.getElementById('mor-d'), uEl = document.getElementById('mor-u');
  const udotEl = document.getElementById('mor-udot'), cdEl = document.getElementById('mor-cd'), cmEl = document.getElementById('mor-cm');
  const ftResEl = document.getElementById('mor-res-ftot'), spResEl = document.getElementById('mor-res-split');

  const rho_seawater = 1025.0; // kg / m^3

  function update() {
    const D = parseFloat(dEl.value), u = parseFloat(uEl.value);
    const udot = parseFloat(udotEl.value), Cd = parseFloat(cdEl.value), Cm = parseFloat(cmEl.value);

    if (isNaN(D) || isNaN(u) || isNaN(udot) || isNaN(Cd) || isNaN(Cm) || D <= 0 || Cd <= 0 || Cm <= 0) return;

    // Morison Drag Force per unit length F_d = 0.5 * Cd * rho * D * u * |u|  [N / m]
    const F_d_N = 0.5 * Cd * rho_seawater * D * u * Math.abs(u);
    const F_d_kN = F_d_N / 1000;

    // Morison Inertia Force per unit length F_m = Cm * rho * (pi * D^2 / 4) * udot  [N / m]
    const area = (Math.PI * Math.pow(D, 2)) / 4.0;
    const F_m_N = Cm * rho_seawater * area * udot;
    const F_m_kN = F_m_N / 1000;

    // Total force per linear meter F_tot = F_d + F_m  [kN / m]
    const F_tot_kN = F_d_kN + F_m_kN;

    const dragPct = (Math.abs(F_d_kN) / (Math.abs(F_d_kN) + Math.abs(F_m_kN))) * 100;
    const inertiaPct = 100 - dragPct;

    ftResEl.textContent = 'F_total = ' + F_tot_kN.toFixed(1) + ' kN / m Pile Wave Force';
    spResEl.textContent = 'Drag F_d: ' + F_d_kN.toFixed(1) + ' kN/m (' + dragPct.toFixed(0) + '%) | Inertia F_m: ' + F_m_kN.toFixed(1) + ' kN/m (' + inertiaPct.toFixed(0) + '%) @ D = ' + D + ' m';
  }

  [dEl, uEl, udotEl, cdEl, cmEl].forEach(el => el.addEventListener('input', update));
  update();
})();