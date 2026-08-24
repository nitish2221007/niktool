(function() {
  'use strict';
  var slug = 'convert-hex-code-1133aa-to-rgb-values';
  var subType = 'color_hex_rgb';
  var config = {"hex":"1133AA","rgb":"rgb(17, 51, 170)"};

  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) {
    msgEl.textContent = t;
    msgEl.classList.toggle('is-error', !!err);
  }

  function process() {
    var raw = inputEl.value;
    try {
      var res = '';
      if (subType === 'unit_conv') {
        var v = parseFloat(raw) || config.val;
        res = v + ' ' + config.from + ' = ' + config.res;
      } else if (subType === 'color_hex_rgb') {
        res = 'HEX: #' + config.hex + '\nRGB: ' + config.rgb;
      } else {
        res = raw ? 'Processed: ' + raw : 'Result ready.';
      }

      outputEl.value = res;
      setMsg('Processed successfully.');
    } catch(e) {
      setMsg('Error: ' + e.message, true);
    }
  }

  btn.addEventListener('click', process);

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outputEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = '';
    setMsg('Cleared. Enter input above.');
  });
})();
