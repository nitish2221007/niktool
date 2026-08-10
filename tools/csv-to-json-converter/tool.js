(function() {
  'use strict';
  var slug = 'csv-to-json-converter';
  var inputEl = document.getElementById(slug + '-input');
  var delimiterEl = document.getElementById(slug + '-delimiter');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  function parseCSVLine(line, delimiter) {
    var result = [];
    var current = '';
    var inQuotes = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i+1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === delimiter) {
          result.push(current.trim());
          current = '';
        } else {
          current += ch;
        }
      }
    }
    result.push(current.trim());
    return result;
  }

  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please enter CSV to convert.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var delimiter = delimiterEl.value === 'tab' ? '\t' : delimiterEl.value;
    var lines = text.split('\n').map(function(l){return l.trim();}).filter(Boolean);
    if (lines.length < 2) {
      setMsg('Error: Need at least a header row and one data row.', true);
      outputEl.value = '';
      copyBtn.disabled = true;
      return;
    }
    var headers = parseCSVLine(lines[0], delimiter);
    var jsonArray = [];
    for (var i = 1; i < lines.length; i++) {
      var values = parseCSVLine(lines[i], delimiter);
      var obj = {};
      headers.forEach(function(h, idx) {
        obj[h] = values[idx] !== undefined ? values[idx] : '';
      });
      jsonArray.push(obj);
    }
    outputEl.value = JSON.stringify(jsonArray, null, 2);
    copyBtn.disabled = false;
    setMsg('Converted ' + jsonArray.length + ' rows to JSON.');
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
