(() => {
  'use strict';
  const inEl = document.getElementById('mc-in'), outEl = document.getElementById('mc-out');

  const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  function textToMorse(text) {
    return text.toUpperCase().split('').map(ch => MORSE_MAP[ch] || '').filter(Boolean).join(' ');
  }

  function update() {
    outEl.value = textToMorse(inEl.value);
  }

  inEl.addEventListener('input', update);
  update();
})();