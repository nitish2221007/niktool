(() => {
  'use strict';
  const ldEl = document.getElementById('bio-load'), dtEl = document.getElementById('bio-dtend'), dlEl = document.getElementById('bio-dload');
  const tdResEl = document.getElementById('bio-res-tend'), jtResEl = document.getElementById('bio-res-joint');

  const g = 9.80665;
  const forearmMassKg = 1.5; // average forearm + hand mass

  function update() {
    const loadKg = parseFloat(ldEl.value), d_tendon_cm = parseFloat(dtEl.value), d_load_cm = parseFloat(dlEl.value);
    if (isNaN(loadKg) || isNaN(d_tendon_cm) || isNaN(d_load_cm) || d_tendon_cm <= 0 || d_load_cm <= d_tendon_cm || loadKg < 0) return;

    const d_tendon_m = d_tendon_cm / 100;
    const d_load_m = d_load_cm / 100;
    const d_forearm_cg_m = d_load_m * 0.43; // center of gravity of forearm

    // Load torque = (m_load * g * d_load) + (m_forearm * g * d_forearm_cg)
    const tau_load = (loadKg * g * d_load_m) + (forearmMassKg * g * d_forearm_cg_m);

    // Tendon force F_tendon = tau_load / d_tendon
    const F_tendon_N = tau_load / d_tendon_m;
    const F_tendon_kg = F_tendon_N / g;

    // Joint reaction force F_joint = F_tendon - total downward load
    const totalDown_N = (loadKg + forearmMassKg) * g;
    const F_joint_N = F_tendon_N - totalDown_N;
    const mechDisadv = d_load_cm / d_tendon_cm;

    tdResEl.textContent = Math.round(F_tendon_N).toLocaleString() + ' N (' + F_tendon_kg.toFixed(1) + ' kg Tension)';
    jtResEl.textContent = 'Joint Reaction: ' + Math.round(F_joint_N).toLocaleString() + ' N Compression (' + mechDisadv.toFixed(1) + '× Class 3 Lever Disadvantage)';
  }

  [ldEl, dtEl, dlEl].forEach(el => el.addEventListener('input', update));
  update();
})();