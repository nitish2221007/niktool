(() => {
  'use strict';
  const onEl = document.getElementById('spr-kon'), offEl = document.getElementById('spr-koff');
  const kdResEl = document.getElementById('spr-res-kd'), hfResEl = document.getElementById('spr-res-half');

  function update() {
    const k_on = parseFloat(onEl.value), k_off = parseFloat(offEl.value);
    if (isNaN(k_on) || isNaN(k_off) || k_on <= 0 || k_off <= 0) return;

    // K_D = k_off / k_on  [Molar -> nM]
    const K_D_M = k_off / k_on;
    const K_D_nM = K_D_M * 1e9;

    // Complex half-life: t_1/2 = ln(2) / k_off  [seconds -> minutes]
    const t_half_sec = Math.log(2.0) / k_off;
    const t_half_min = t_half_sec / 60.0;

    let affDesc = '', color = '#22543d';
    if (K_D_nM < 1.0) { affDesc = 'PICOMOLAR ULTRA-HIGH AFFINITY (K_D < 1 nM)'; color = '#22543d'; }
    else if (K_D_nM <= 100.0) { affDesc = 'NANOMOLAR HIGH AFFINITY (1 - 100 nM: Therapeutic antibody range)'; color = '#22543d'; }
    else if (K_D_nM <= 10000.0) { affDesc = 'MICROMOLAR MODERATE AFFINITY (0.1 - 10 μM: Small molecule drug lead)'; color = '#ea580c'; }
    else { affDesc = 'WEAK TRANSIENT BINDING (> 10 μM)'; color = '#c53030'; }

    kdResEl.textContent = 'Affinity K_D = ' + (K_D_nM < 1 ? (K_D_nM * 1000).toFixed(1) + ' pM' : (K_D_nM >= 1000 ? (K_D_nM / 1000).toFixed(2) + ' μM' : K_D_nM.toFixed(1) + ' nM'));
    kdResEl.style.color = color;
    hfResEl.textContent = 'Complex Half-Life = ' + (t_half_min >= 60 ? (t_half_min/60).toFixed(2) + ' Hours' : t_half_min.toFixed(2) + ' min') + ' (' + affDesc + ')';
  }

  onEl.addEventListener('input', update);
  offEl.addEventListener('input', update);
  update();
})();