(() => {
  'use strict';
  const fgInput = document.getElementById('contrast-fg');
  const fgPicker = document.getElementById('contrast-fg-picker');
  const bgInput = document.getElementById('contrast-bg');
  const bgPicker = document.getElementById('contrast-bg-picker');
  const preview = document.getElementById('contrast-preview-card');
  const ratioVal = document.getElementById('contrast-ratio-val');
  const aaNormal = document.getElementById('contrast-aa-normal');
  const aaLarge = document.getElementById('contrast-aa-large');
  const aaaNormal = document.getElementById('contrast-aaa-normal');

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return isNaN(num) ? null : { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function getLuminance(rgb) {
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function calculateContrast() {
    let fgHex = fgInput.value.trim();
    let bgHex = bgInput.value.trim();
    if (!fgHex.startsWith('#')) fgHex = '#' + fgHex;
    if (!bgHex.startsWith('#')) bgHex = '#' + bgHex;

    const rgbFg = hexToRgb(fgHex);
    const rgbBg = hexToRgb(bgHex);

    if (!rgbFg || !rgbBg) return;

    preview.style.color = fgHex;
    preview.style.backgroundColor = bgHex;

    const lum1 = getLuminance(rgbFg);
    const lum2 = getLuminance(rgbBg);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);

    ratioVal.textContent = ratio.toFixed(2) + ':1';

    function setBadge(el, pass) {
      el.textContent = pass ? 'PASS' : 'FAIL';
      el.style.color = pass ? '#22543d' : '#c53030';
    }

    setBadge(aaNormal, ratio >= 4.5);
    setBadge(aaLarge, ratio >= 3.0);
    setBadge(aaaNormal, ratio >= 7.0);
  }

  fgInput.addEventListener('input', () => { fgPicker.value = fgInput.value; calculateContrast(); });
  fgPicker.addEventListener('input', () => { fgInput.value = fgPicker.value; calculateContrast(); });
  bgInput.addEventListener('input', () => { bgPicker.value = bgInput.value; calculateContrast(); });
  bgPicker.addEventListener('input', () => { bgInput.value = bgPicker.value; calculateContrast(); });

  calculateContrast();
})();