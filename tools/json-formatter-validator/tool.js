(function() {
  'use strict';
  var slug = 'json-formatter-validator';
  var inputEl = document.getElementById(slug + '-input');
  var modeEl = document.getElementById(slug + '-mode');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please enter JSON to process.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    try {
      var parsed = JSON.parse(text);
      var mode = modeEl.value;
      if (mode === 'format') {
        outputEl.value = JSON.stringify(parsed, null, 2);
        setMsg('JSON formatted successfully.');
      } else if (mode === 'minify') {
        outputEl.value = JSON.stringify(parsed);
        setMsg('JSON minified successfully.');
      } else {
        var keys = Object.keys(parsed);
        outputEl.value = 'Valid JSON!\n\nType: ' + (Array.isArray(parsed) ? 'Array' : typeof parsed) + '\n';
        if (Array.isArray(parsed)) {
          outputEl.value += 'Items: ' + parsed.length + '\n';
        } else if (typeof parsed === 'object') {
          outputEl.value += 'Keys: ' + keys.length + '\n';
          outputEl.value += 'Key names: ' + keys.join(', ') + '\n';
        }
        setMsg('JSON is valid.');
      }
      copyBtn.disabled = false;
    } catch(e) {
      var errMsg = e.message;
      var lineMatch = errMsg.match(/position (\d+)/);
      outputEl.value = 'Invalid JSON!\n\nError: ' + errMsg + '\n\n';
      if (lineMatch) {
        var pos = parseInt(lineMatch[1]);
        var lines = text.substring(0, pos).split('\n');
        outputEl.value += 'Approximate location: Line ' + lines.length + ', Column ' + (lines[lines.length-1].length + 1);
      }
      copyBtn.disabled = true;
      setMsg('JSON validation failed. Check the error details.', true);
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
