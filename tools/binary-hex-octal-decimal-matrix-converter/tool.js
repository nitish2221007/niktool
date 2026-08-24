(() => {
  'use strict';
  const decEl = document.getElementById('base-dec'), binEl = document.getElementById('base-bin');
  const hexEl = document.getElementById('base-hex'), octEl = document.getElementById('base-oct');

  function updateFromDec(num) {
    binEl.value = num.toString(2);
    hexEl.value = num.toString(16).toUpperCase();
    octEl.value = num.toString(8);
  }

  decEl.addEventListener('input', () => {
    const num = parseInt(decEl.value, 10);
    if (!isNaN(num)) updateFromDec(num);
  });

  binEl.addEventListener('input', () => {
    const num = parseInt(binEl.value, 2);
    if (!isNaN(num)) {
      decEl.value = num.toString(10);
      hexEl.value = num.toString(16).toUpperCase();
      octEl.value = num.toString(8);
    }
  });

  hexEl.addEventListener('input', () => {
    const num = parseInt(hexEl.value, 16);
    if (!isNaN(num)) {
      decEl.value = num.toString(10);
      binEl.value = num.toString(2);
      octEl.value = num.toString(8);
    }
  });

  octEl.addEventListener('input', () => {
    const num = parseInt(octEl.value, 8);
    if (!isNaN(num)) {
      decEl.value = num.toString(10);
      binEl.value = num.toString(2);
      hexEl.value = num.toString(16).toUpperCase();
    }
  });

  updateFromDec(255);
})();