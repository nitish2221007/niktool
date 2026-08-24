(() => {
  'use strict';
  const inEl = document.getElementById('morse-text-input');
  const outEl = document.getElementById('morse-output');
  const playBtn = document.getElementById('morse-play-btn');
  const stopBtn = document.getElementById('morse-stop-btn');
  const copyBtn = document.getElementById('copy-morse-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');

  const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/', '.': '.-.-.-', ',': '--..--',
    '?': '..--..', '!': '-.-.--'
  };

  const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function translate() {
    const raw = inEl.value.trim();
    if (!raw) { outEl.value = ''; return; }

    const isMorse = /^[.\-\s/]+$/.test(raw);
    if (isMorse) {
      // Decode Morse to text
      const words = raw.split('/');
      const decoded = words.map(w => {
        return w.trim().split(/\s+/).map(ch => REVERSE_MORSE[ch] || '').join('');
      }).join(' ');
      outEl.value = decoded;
      setMsg('Decoded Morse code to plain text.');
    } else {
      // Encode Text to Morse
      const upper = raw.toUpperCase();
      const encoded = upper.split('').map(ch => MORSE_MAP[ch] || '').filter(Boolean).join(' ');
      outEl.value = encoded;
      setMsg('Encoded text to International Morse code.');
    }
  }

  inEl.addEventListener('input', translate);

  let audioCtx = null;
  let isPlaying = false;
  let audioTimeout = null;

  function stopAudio() {
    isPlaying = false;
    if (audioTimeout) clearTimeout(audioTimeout);
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
    setMsg('Audio stopped.');
  }

  function playMorse() {
    const morse = outEl.value || inEl.value;
    if (!morse) { setMsg('No Morse code to play.', true); return; }

    stopAudio();
    isPlaying = true;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const dotTime = 0.08; // seconds
    let curTime = audioCtx.currentTime + 0.1;

    for (let char of morse) {
      if (!isPlaying) break;
      if (char === '.') {
        playTone(curTime, dotTime);
        curTime += dotTime * 2;
      } else if (char === '-') {
        playTone(curTime, dotTime * 3);
        curTime += dotTime * 4;
      } else if (char === ' ' || char === '/') {
        curTime += dotTime * 4;
      }
    }

    setMsg('Playing Morse code audio...');
    audioTimeout = setTimeout(() => { isPlaying = false; setMsg('Playback finished.'); }, (curTime - audioCtx.currentTime) * 1000);
  }

  function playTone(startTime, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.3, startTime + 0.005);
    gain.gain.setValueAtTime(0.3, startTime + duration - 0.005);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playBtn.addEventListener('click', playMorse);
  stopBtn.addEventListener('click', stopAudio);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Morse code copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; stopAudio();
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();