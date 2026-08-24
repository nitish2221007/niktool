(() => {
  'use strict';
  const cEl = document.getElementById('df-c'), vEl = document.getElementById('df-v');
  const fEl = document.getElementById('df-freq'), matEl = document.getElementById('df-mat');
  const pResEl = document.getElementById('df-res-ploss'), qResEl = document.getElementById('df-res-q');

  const MATS = {
    'ptfe': { tan_delta: 0.0002, name: 'PTFE Teflon' },
    'fr4':  { tan_delta: 0.0200, name: 'FR-4 Epoxy' },
    'c0g':  { tan_delta: 0.0010, name: 'C0G Ceramic' },
    'x7r':  { tan_delta: 0.0250, name: 'X7R Ceramic' }
  };

  function update() {
    const C_pf = parseFloat(cEl.value), V_rms = parseFloat(vEl.value), f_mhz = parseFloat(fEl.value);
    const m = MATS[matEl.value];

    if (isNaN(C_pf) || isNaN(V_rms) || isNaN(f_mhz) || C_pf <= 0 || V_rms <= 0 || f_mhz <= 0) return;

    const C_f = C_pf * 1e-12;
    const f_hz = f_mhz * 1e6;
    const omega = 2.0 * Math.PI * f_hz;

    // Dielectric loss power P_loss = omega * C * V^2 * tan(delta)  [Watts]
    const P_loss = omega * C_f * Math.pow(V_rms, 2) * m.tan_delta;

    // Reactive power Q_var = omega * C * V^2  [VAR]
    const Q_var = omega * C_f * Math.pow(V_rms, 2);

    // Quality factor Q = 1 / tan(delta)
    const Q_factor = 1.0 / m.tan_delta;

    pResEl.textContent = 'P_loss = ' + (P_loss < 1.0 ? (P_loss * 1000).toFixed(1) + ' mW' : P_loss.toFixed(2) + ' Watts Heat');
    qResEl.textContent = 'Quality Factor Q = ' + Math.round(Q_factor).toLocaleString() + ' | tan δ = ' + m.tan_delta + ' (' + m.name + ' @ ' + f_mhz + ' MHz, Reactive: ' + Q_var.toFixed(1) + ' VAR)';
  }

  [cEl, vEl, fEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();