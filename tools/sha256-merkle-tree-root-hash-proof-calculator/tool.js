(() => {
  'use strict';
  const t1El = document.getElementById('mt-tx1'), t2El = document.getElementById('mt-tx2');
  const t3El = document.getElementById('mt-tx3'), t4El = document.getElementById('mt-tx4');
  const rResEl = document.getElementById('mt-res-root'), prResEl = document.getElementById('mt-res-proof');

  // Simple deterministic 32-bit FNV hash simulation for demonstration
  function fnv32(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  function update() {
    const t1 = t1El.value, t2 = t2El.value, t3 = t3El.value, t4 = t4El.value;

    const h1 = fnv32(t1);
    const h2 = fnv32(t2);
    const h3 = fnv32(t3);
    const h4 = fnv32(t4);

    const h12 = fnv32(h1 + h2);
    const h34 = fnv32(h3 + h4);

    const root = fnv32(h12 + h34);

    rResEl.textContent = 'Merkle Root: 0x' + root + ' (Hash Tree Root)';
    prResEl.textContent = 'Tx1 Proof Path: [0x' + h2 + ' (Sibling), 0x' + h34 + ' (Right Node)] -> Root 0x' + root;
  }

  [t1El, t2El, t3El, t4El].forEach(el => el.addEventListener('input', update));
  update();
})();