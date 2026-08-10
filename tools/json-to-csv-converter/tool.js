(function() {
  'use strict';
  var slug = 'json-to-csv-converter';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }

  function escapeCSV(val) {
    if (val === null || val === undefined) return '';
    var str = String(val);
    if (str.indexOf(',') !== -1 || str.indexOf('"') !== -1 || str.indexOf('\n') !== -1) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  btn.addEventListener('click', function() {
    var text = inputEl.value.trim();
    if (!text) { setMsg('Please enter JSON to convert.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    try {
      var parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        setMsg('Error: Input must be a JSON array of objects.', true);
        outputEl.value = '';
        copyBtn.disabled = true;
        return;
      }
      if (parsed.length === 0) {
        setMsg('Error: JSON array is empty.', true);
        outputEl.value = '';
        copyBtn.disabled = true;
        return;
      }
      var headers = Object.keys(parsed[0]);
      var csvLines = [headers.join(',')];
      parsed.forEach(function(row) {
        var values = headers.map(function(h) { return escapeCSV(row[h]); });
        csvLines.push(values.join(','));
      });
      outputEl.value = csvLines.join('\n');
      copyBtn.disabled = false;
      setMsg('Converted ' + parsed.length + ' rows to CSV.');
    } catch(e) {
      setMsg('Error: Invalid JSON. ' + e.message, true);
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
