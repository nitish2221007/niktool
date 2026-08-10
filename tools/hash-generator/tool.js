(function() {
  'use strict';
  var slug = 'hash-generator';
  var inputEl = document.getElementById(slug + '-input');
  var algoEl = document.getElementById(slug + '-algo');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  async function generateHash(text, algo) {
    var encoder = new TextEncoder();
    var data = encoder.encode(text);
    var hashBuffer = await crypto.subtle.digest(algo, data);
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    var hashHex = hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    return hashHex;
  }

  btn.addEventListener('click', async function() {
    var text = inputEl.value;
    if (!text) { setMsg('Please enter text to hash.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var algo = algoEl.value;
    try {
      var hash = await generateHash(text, algo);
      var out = 'Algorithm: ' + algo + '\n';
      out += 'Input Length: ' + text.length + ' characters\n\n';
      out += 'Hash:\n' + hash;
      outputEl.value = out;
      copyBtn.disabled = false;
      setMsg('Hash generated successfully.');
    } catch(e) {
      setMsg('Error generating hash: ' + e.message, true);
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
