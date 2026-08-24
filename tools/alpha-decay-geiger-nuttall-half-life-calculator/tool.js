(() => {
  'use strict';
  const zEl = document.getElementById('gn-z'), eEl = document.getElementById('gn-e');
  const tResEl = document.getElementById('gn-res-t'), logResEl = document.getElementById('gn-res-log');

  function update() {
    const Z = parseFloat(zEl.value), E_alpha = parseFloat(eEl.value);
    if (isNaN(Z) || isNaN(E_alpha) || Z <= 0 || E_alpha <= 0) return;

    const log10_t_sec = (1.61 * (Z / Math.sqrt(E_alpha))) - 28.5;
    const t_sec = Math.pow(10, log10_t_sec);
    const t_years = t_sec / 31557600;

    let timeStr = '';
    if (t_years >= 1e9) timeStr = (t_years / 1e9).toFixed(2) + ' Billion Years';
    else if (t_years >= 1e6) timeStr = (t_years / 1e6).toFixed(2) + ' Million Years';
    else if (t_years >= 1.0) timeStr = t_years.toFixed(1) + ' Years';
    else if (t_sec >= 86400) timeStr = (t_sec / 86400).toFixed(1) + ' Days';
    else if (t_sec >= 1.0) timeStr = t_sec.toFixed(2) + ' Seconds';
    else timeStr = (t_sec * 1000).toFixed(2) + ' Milliseconds';

    tResEl.textContent = timeStr;
    logResEl.textContent = 'log₁₀(t₁/₂ in sec) = ' + log10_t_sec.toFixed(2) + ' (E_α = ' + E_alpha.toFixed(2) + ' MeV)';
  }

  zEl.addEventListener('input', update);
  eEl.addEventListener('input', update);
  update();
})();