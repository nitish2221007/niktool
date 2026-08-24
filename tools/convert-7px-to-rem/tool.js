(function() {
  'use strict';
  var slug = 'convert-7px-to-rem';
  var subType = 'unit_px_rem';
  var config = {"px":7};

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
    if (!raw && subType.startsWith('text_')) {
      setMsg('Please enter input text.', true);
      outputEl.value = '';
      return;
    }

    try {
      var res = '';
      if (subType === 'text_line_remove') {
        var lines = raw.split('\n');
        var targetIdx = config.lineNumber - 1;
        if (targetIdx >= 0 && targetIdx < lines.length) lines.splice(targetIdx, 1);
        res = lines.join('\n');
      } else if (subType === 'text_first_lines_remove') {
        var lines = raw.split('\n');
        res = lines.slice(config.count).join('\n');
      } else if (subType === 'text_last_lines_remove') {
        var lines = raw.split('\n');
        res = lines.slice(0, Math.max(0, lines.length - config.count)).join('\n');
      } else if (subType === 'text_clean') {
        var lines = raw.split('\n');
        if (config.type === 'empty_lines') {
          res = lines.filter(function(l) { return l.trim().length > 0; }).join('\n');
        } else if (config.type === 'duplicate_lines') {
          var seen = new Set();
          res = lines.filter(function(l) { if (seen.has(l)) return false; seen.add(l); return true; }).join('\n');
        }
      } else if (subType === 'case_convert') {
        if (config.case === 'upper') res = raw.toUpperCase();
        else if (config.case === 'lower') res = raw.toLowerCase();
        else if (config.case === 'title') res = raw.replace(/\b\w/g, function(l){ return l.toUpperCase(); });
        else if (config.case === 'snake') res = raw.trim().toLowerCase().replace(/\s+/g, '_');
        else if (config.case === 'kebab') res = raw.trim().toLowerCase().replace(/\s+/g, '-');
        else if (config.case === 'camel') res = raw.trim().toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(m, c) { return c.toUpperCase(); });
      } else if (subType === 'unit_px_rem') {
        var val = parseFloat(raw) || config.px;
        res = (val / 16).toFixed(4) + ' rem (based on 16px root font size)';
      } else if (subType === 'unit_rem_px') {
        var val = parseFloat(raw) || config.rem;
        res = (val * 16).toFixed(2) + ' px (based on 16px root font size)';
      } else if (subType === 'cgpa_scale') {
        var cgpa = parseFloat(raw);
        if (isNaN(cgpa) || cgpa < 0 || cgpa > config.scale) {
          setMsg('Please enter a valid CGPA between 0 and ' + config.scale, true);
          return;
        }
        var pct = (cgpa / config.scale) * 100;
        res = 'CGPA: ' + cgpa + ' / ' + config.scale + '\nPercentage: ' + pct.toFixed(2) + '%';
      } else if (subType === 'marks_total') {
        var obt = parseFloat(raw);
        if (isNaN(obt) || obt < 0 || obt > config.total) {
          setMsg('Please enter valid obtained marks between 0 and ' + config.total, true);
          return;
        }
        var pct = (obt / config.total) * 100;
        res = 'Obtained Marks: ' + obt + ' / ' + config.total + '\nPercentage: ' + pct.toFixed(2) + '%';
      } else {
        res = raw;
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
