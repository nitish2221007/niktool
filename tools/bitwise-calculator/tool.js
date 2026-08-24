(() => {
  'use strict';
  const aEl = document.getElementById('bit-a'), bEl = document.getElementById('bit-b');
  const andDec = document.getElementById('res-and-dec'), andBin = document.getElementById('res-and-bin');
  const orDec = document.getElementById('res-or-dec'), orBin = document.getElementById('res-or-bin');
  const xorDec = document.getElementById('res-xor-dec'), xorBin = document.getElementById('res-xor-bin');
  const notDec = document.getElementById('res-not-dec'), notBin = document.getElementById('res-not-bin');
  const shlDec = document.getElementById('res-shl-dec'), shlBin = document.getElementById('res-shl-bin');
  const shrDec = document.getElementById('res-shr-dec'), shrBin = document.getElementById('res-shr-bin');

  function toBin32(n) {
    return (n >>> 0).toString(2).padStart(16, '0');
  }

  function update() {
    const a = parseInt(aEl.value, 10);
    const b = parseInt(bEl.value, 10);
    if (isNaN(a) || isNaN(b)) return;

    const opAnd = a & b;
    const opOr = a | b;
    const opXor = a ^ b;
    const opNot = ~a;
    const opShl = a << 1;
    const opShr = a >> 1;

    andDec.textContent = opAnd; andBin.textContent = toBin32(opAnd);
    orDec.textContent = opOr; orBin.textContent = toBin32(opOr);
    xorDec.textContent = opXor; xorBin.textContent = toBin32(opXor);
    notDec.textContent = opNot; notBin.textContent = toBin32(opNot);
    shlDec.textContent = opShl; shlBin.textContent = toBin32(opShl);
    shrDec.textContent = opShr; shrBin.textContent = toBin32(opShr);
  }

  aEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();