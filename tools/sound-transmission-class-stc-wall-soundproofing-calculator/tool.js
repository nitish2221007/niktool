(() => {
  'use strict';
  const wEl = document.getElementById('stc-wall'), fEl = document.getElementById('stc-freq');
  const stcResEl = document.getElementById('stc-res-stc'), tlResEl = document.getElementById('stc-res-tl');

  function update() {
    const parts = wEl.value.split('_');
    const m_s = parseFloat(parts[0]);
    const nominalSTC = parseInt(parts[1], 10);
    const f = parseFloat(fEl.value);

    if (isNaN(m_s) || isNaN(f) || m_s <= 0 || f <= 0) return;

    // Theoretical Mass Law for Transmission Loss: TL = 20*log10(m_s) + 20*log10(f) - 47.2  [dB]
    const TL = (20.0 * Math.log10(m_s)) + (20.0 * Math.log10(f)) - 47.2;

    let privacy = '', color = '#22543d';
    if (nominalSTC >= 55) { privacy = 'EXCELLENT PRIVACY (STC 55+: Music / shouting completely inaudible)'; color = '#22543d'; }
    else if (nominalSTC >= 50) { privacy = 'HIGH PRIVACY (STC 50+: Multi-family residential building code standard)'; color = '#22543d'; }
    else if (nominalSTC >= 40) { privacy = 'MODERATE PRIVACY (STC 40-49: Loud speech heard faintly)'; color = '#2563eb'; }
    else { privacy = 'POOR PRIVACY (STC < 40: Normal conversation clearly audible through wall)'; color = '#c53030'; }

    stcResEl.textContent = 'STC ≈ ' + nominalSTC + ' (' + privacy.split(' (')[0] + ')';
    stcResEl.style.color = color;
    tlResEl.textContent = 'Transmission Loss TL = ' + TL.toFixed(1) + ' dB @ ' + f + ' Hz (Mass m_s = ' + m_s + ' kg/m² | ' + privacy + ')';
    tlResEl.style.color = color;
  }

  wEl.addEventListener('change', update);
  fEl.addEventListener('input', update);
  update();
})();