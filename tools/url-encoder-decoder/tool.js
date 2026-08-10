(function() {
  'use strict';
  var slug = 'url-encoder-decoder';
  var inputEl = document.getElementById(slug + '-input');
  var modeEl = document.getElementById(slug + '-mode');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  btn.addEventListener('click', function() {
    var text = inputEl.value;
    if (!text.trim()) { setMsg('Please enter text to process.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    try {
      var result;
      if (modeEl.value === 'encode') {
        result = encodeURIComponent(text);
        outputEl.value = 'Mode: Encode\nInput: ' + text.substring(0, 100) + (text.length > 100 ? '...' : '') + '\n\nEncoded:\n' + result;
      } else {
        result = decodeURIComponent(text.trim());
        outputEl.value = 'Mode: Decode\nInput: ' + text.substring(0, 100) + (text.length > 100 ? '...' : '') + '\n\nDecoded:\n' + result;
      }
      copyBtn.disabled = false;
      setMsg('URL ' + modeEl.value + 'd successfully.');
    } catch(e) {
      setMsg('Error: Invalid encoded URL. Check your input.', true);
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
