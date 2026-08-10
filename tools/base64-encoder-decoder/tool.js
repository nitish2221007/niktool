(function() {
  'use strict';
  var slug = 'base64-encoder-decoder';
  var inputEl = document.getElementById(slug + '-input');
  var modeEl = document.getElementById(slug + '-mode');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function decodeBase64(str) {
    return decodeURIComponent(escape(atob(str)));
  }

  btn.addEventListener('click', function() {
    var text = inputEl.value;
    if (!text.trim()) { setMsg('Please enter text to process.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    try {
      var result;
      if (modeEl.value === 'encode') {
        result = encodeBase64(text);
        outputEl.value = 'Mode: Encode (Text → Base64)\nInput Length: ' + text.length + '\nOutput Length: ' + result.length + '\n\n' + result;
      } else {
        result = decodeBase64(text.trim());
        outputEl.value = 'Mode: Decode (Base64 → Text)\nInput Length: ' + text.length + '\nOutput Length: ' + result.length + '\n\n' + result;
      }
      copyBtn.disabled = false;
      setMsg('Base64 ' + modeEl.value + 'd successfully.');
    } catch(e) {
      setMsg('Error: Invalid Base64 input for decoding. Check your input.', true);
      outputEl.value = '';
      copyBtn.disabled = true;
    }
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared.');
  });
})();
