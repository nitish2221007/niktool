(() => {
  'use strict';
  const box = document.getElementById('key-press-box');
  const bigDisp = document.getElementById('key-big-display');
  const kKey = document.getElementById('k-res-key'), kCode = document.getElementById('k-res-code');
  const kWhich = document.getElementById('k-res-which'), kLoc = document.getElementById('k-res-location');

  function handleKey(e) {
    e.preventDefault();
    const key = e.key === ' ' ? 'Space' : e.key;
    bigDisp.textContent = key;

    kKey.textContent = JSON.stringify(e.key);
    kCode.textContent = e.code;
    kWhich.textContent = e.keyCode || e.which;

    let locStr = 'Standard (0)';
    if (e.location === 1) locStr = 'Left (1)';
    else if (e.location === 2) locStr = 'Right (2)';
    else if (e.location === 3) locStr = 'Numpad (3)';

    kLoc.textContent = locStr;
  }

  box.addEventListener('keydown', handleKey);
  window.addEventListener('keydown', (e) => {
    if (document.activeElement === box) return;
    handleKey(e);
  });
})();