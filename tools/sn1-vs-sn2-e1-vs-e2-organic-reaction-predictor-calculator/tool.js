(() => {
  'use strict';
  const sEl = document.getElementById('rxn-sub'), nEl = document.getElementById('rxn-nuc');
  const mResEl = document.getElementById('rxn-res-mech'), dResEl = document.getElementById('rxn-res-det');

  function update() {
    const sub = sEl.value, nuc = nEl.value;

    let major = '', detail = '';
    let color = '#22543d';

    if (sub === '1') {
      if (nuc === 'strong_weak') {
        major = 'E2 ELIMINATION';
        detail = 'Bulky base (t-BuOK) cannot access 1° backside -> Forces E2 Hofmann alkene';
      } else if (nuc === 'strong_strong' || nuc === 'weak_strong') {
        major = 'SN2 SUBSTITUTION (Major)';
        detail = '1° Primary unhindered substrate undergoes rapid bimolecular backside attack with Walden inversion';
      } else {
        major = 'NO REACTION (Too Slow)';
        detail = '1° alkyl halide with weak nucleophile/base does not form carbocations and is too slow for solvolysis';
        color = '#d97706';
      }
    } else if (sub === '2') {
      if (nuc === 'strong_strong') {
        major = 'E2 ELIMINATION (Major) + SN2 (Minor)';
        detail = 'Strong base abstracts beta-hydrogen faster than backside nucleophilic attack on 2° carbon';
      } else if (nuc === 'strong_weak') {
        major = 'E2 ELIMINATION (100%)';
        detail = 'Sterically hindered bulky base guarantees pure E2 Zaitsev/Hofmann elimination';
      } else if (nuc === 'weak_strong') {
        major = 'SN2 SUBSTITUTION (Pure)';
        detail = 'Good nucleophile without basicity (e.g. I⁻, CN⁻, NaN₃) forces clean SN2 with 100% Walden inversion';
      } else {
        major = 'SN1 + E1 MIXTURE (Solvolysis)';
        detail = 'Weak nucleophile/base in polar protic solvent forms 2° carbocation intermediate -> Racemic SN1 + E1';
        color = '#2563eb';
      }
    } else if (sub === '3') {
      if (nuc === 'strong_strong' || nuc === 'strong_weak') {
        major = 'E2 ELIMINATION (100%)';
        detail = '3° Tertiary substrate completely blocks SN2 backside attack -> High base strength drives instantaneous E2 alkene';
      } else if (nuc === 'weak_strong' || nuc === 'weak_weak') {
        major = 'SN1 SUBSTITUTION (Major) + E1 (Minor)';
        detail = 'Stable 3° tertiary carbocation forms (rate-limiting step), followed by nucleophile trapping (Racemization)';
      }
    }

    mResEl.textContent = major;
    mResEl.style.color = color;
    dResEl.textContent = detail;
    dResEl.style.color = color;
  }

  sEl.addEventListener('change', update);
  nEl.addEventListener('change', update);
  update();
})();