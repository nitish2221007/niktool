(() => {
  'use strict';
  const pwrEl = document.getElementById('lv-pwr'), dEl = document.getElementById('lv-d');
  const ctResEl = document.getElementById('lv-res-contact'), fcResEl = document.getElementById('lv-res-focal');

  function update() {
    const F_spec = parseFloat(pwrEl.value), d_mm = parseFloat(dEl.value);
    if (isNaN(F_spec) || isNaN(d_mm) || F_spec === 0 || d_mm < 0) return;

    const d_m = d_mm / 1000.0;

    // Vertex distance compensation:
    // F_contact = F_spec / ( 1 - d * F_spec )  [Diopters]
    const F_contact = F_spec / (1.0 - d_m * F_spec);

    // Focal length f = 1 / F_spec  [meters -> cm]
    const f_cm = (1.0 / F_spec) * 100.0;

    // Round to nearest 0.25 D standard prescription step:
    const rounded_25 = Math.round(F_contact * 4.0) / 4.0;

    ctResEl.textContent = 'Contact Lens = ' + F_contact.toFixed(2) + ' D (' + (rounded_25 >= 0 ? '+' : '') + rounded_25.toFixed(2) + ' D standard)';
    fcResEl.textContent = 'Focal Length f = ' + f_cm.toFixed(2) + ' cm | Vertex: ' + d_mm + ' mm (Shift = ' + (F_contact - F_spec >= 0 ? '+' : '') + (F_contact - F_spec).toFixed(2) + ' D)';
  }

  pwrEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();