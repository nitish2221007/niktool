(() => {
  'use strict';
  const s1El = document.getElementById('ucas-sub1'), s2El = document.getElementById('ucas-sub2');
  const s3El = document.getElementById('ucas-sub3'), epqEl = document.getElementById('ucas-epq');
  const ptsResEl = document.getElementById('ucas-res-pts'), trResEl = document.getElementById('ucas-res-tier');

  function update() {
    const p1 = parseInt(s1El.value, 10), p2 = parseInt(s2El.value, 10);
    const p3 = parseInt(s3El.value, 10), p_epq = parseInt(epqEl.value, 10);

    const totalPoints = p1 + p2 + p3 + p_epq;

    let tier = '';
    let color = '#22543d';

    if (totalPoints >= 152) {
      tier = 'TOP-TIER / OXBRIDGE / IMPERIAL (152+ Points: A*A*A Profile - Elite UK Higher Education)';
      color = '#22543d';
    } else if (totalPoints >= 128) {
      tier = 'RUSSELL GROUP UNIVERSITIES (128 - 151 Points: ABB to AAA Profile - High Competitive Entry)';
      color = '#22543d';
    } else if (totalPoints >= 104) {
      tier = 'MID-TIER UK UNIVERSITIES (104 - 127 Points: BCC to BBB Profile - Good Degree Options)';
      color = '#2563eb';
    } else if (totalPoints >= 64) {
      tier = 'STANDARD ENTRY / FOUNDATION YEARS (64 - 103 Points: CCC to DDD Profile)';
      color = '#d97706';
    } else {
      tier = 'BELOW DIRECT DEGREE ENTRY (Consider Foundation Year or Access to HE Courses)';
      color = '#4b5563';
    }

    ptsResEl.textContent = totalPoints + ' UCAS Points';
    ptsResEl.style.color = color;
    trResEl.textContent = tier + ' (Points: ' + p1 + ' + ' + p2 + ' + ' + p3 + (p_epq > 0 ? ' + ' + p_epq : '') + ')';
    trResEl.style.color = color;
  }

  [s1El, s2El, s3El, epqEl].forEach(el => el.addEventListener('change', update));
  update();
})();