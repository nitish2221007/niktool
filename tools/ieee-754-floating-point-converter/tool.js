(() => {
  'use strict';
  const inEl = document.getElementById('fp-input');
  const hexEl = document.getElementById('fp-hex'), signEl = document.getElementById('fp-sign'), expEl = document.getElementById('fp-exp'), manEl = document.getElementById('fp-man');

  function update() {
    const val = parseFloat(inEl.value);
    if (isNaN(val)) return;

    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, val, false); // Big endian

    const uintVal = view.getUint32(0, false);
    const hexStr = '0x' + uintVal.toString(16).toUpperCase().padStart(8, '0');
    const binStr = uintVal.toString(2).padStart(32, '0');

    const sign = binStr[0];
    const exp = binStr.slice(1, 9);
    const man = binStr.slice(9);

    const expDec = parseInt(exp, 2);
    const expUnbiased = expDec - 127;

    hexEl.textContent = hexStr;
    signEl.textContent = sign + (sign === '1' ? ' (Negative)' : ' (Positive)');
    expEl.textContent = exp + ' (' + expDec + ' - 127 = 2^' + expUnbiased + ')';
    manEl.textContent = man;
  }

  inEl.addEventListener('input', update);
  update();
})();