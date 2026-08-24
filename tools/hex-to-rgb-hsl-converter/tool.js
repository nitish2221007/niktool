(() => {
  'use strict';
  const inEl = document.getElementById('color-code-input');
  const picker = document.getElementById('color-code-picker');
  const swatch = document.getElementById('color-swatch-box');
  const resHex = document.getElementById('res-hex');
  const resRgb = document.getElementById('res-rgb');
  const resHsl = document.getElementById('res-hsl');

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return isNaN(num) ? null : { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function update() {
    let hex = inEl.value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    picker.value = hex;
    swatch.style.backgroundColor = hex;
    swatch.style.color = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 150 ? '#18211d' : '#ffffff';

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    resHex.textContent = hex.toUpperCase();
    resRgb.textContent = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
    resHsl.textContent = 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)';
  }

  inEl.addEventListener('input', update);
  picker.addEventListener('input', () => { inEl.value = picker.value; update(); });
  update();
})();