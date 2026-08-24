(function() {
  'use strict';
  var slug = 'multiple-images-to-pdf';
  var subType = 'img_to_pdf';
  var config = {};

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
      if (subType === 'data_csv_json') {
        var lines = raw.trim().split('\n');
        if (lines.length === 0) return;
        var headers = lines[0].split(',');
        var result = [];
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(',');
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentline[j] ? currentline[j].trim() : '';
          }
          result.push(obj);
        }
        res = JSON.stringify(result, null, 2);
      } else if (subType === 'data_json_csv') {
        var arr = JSON.parse(raw);
        if (!Array.isArray(arr)) arr = [arr];
        var keys = Object.keys(arr[0] || {});
        var csv = keys.join(',') + '\n';
        arr.forEach(function(row) {
          csv += keys.map(function(k) { return JSON.stringify(row[k] || ''); }).join(',') + '\n';
        });
        res = csv;
      } else if (subType === 'enc_txt_b64') {
        res = btoa(unescape(encodeURIComponent(raw)));
      } else if (subType === 'enc_b64_txt') {
        res = decodeURIComponent(escape(atob(raw.trim())));
      } else if (subType === 'enc_url') {
        res = encodeURIComponent(raw);
      } else if (subType === 'enc_urldec') {
        res = decodeURIComponent(raw);
      } else if (subType === 'color_hex_rgb') {
        var hex = raw.trim().replace(/^#/, '');
        if (hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
        var num = parseInt(hex, 16);
        var r = (num >> 16) & 255;
        var g = (num >> 8) & 255;
        var b = num & 255;
        res = 'RGB: rgb(' + r + ', ' + g + ', ' + b + ')\nHex: #' + hex.toUpperCase();
      } else if (subType === 'color_rgb_hex') {
        var parts = raw.match(/\d+/g);
        if (parts && parts.length >= 3) {
          var r = parseInt(parts[0], 10), g = parseInt(parts[1], 10), b = parseInt(parts[2], 10);
          res = 'Hex: #' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        } else {
          setMsg('Please enter valid RGB values e.g. 23, 107, 77', true);
          return;
        }
      } else if (subType === 'fin_sip') {
        var vals = raw.match(/\d+(\.\d+)?/g);
        var p = vals && vals[0] ? parseFloat(vals[0]) : 5000;
        var r = vals && vals[1] ? parseFloat(vals[1]) : 12;
        var y = vals && vals[2] ? parseFloat(vals[2]) : 10;
        var i = (r / 12) / 100;
        var n = y * 12;
        var fv = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        var inv = p * n;
        res = 'Monthly Investment : ₹' + p.toLocaleString() + '\nTenure : ' + y + ' Years\nTotal Investment : ₹' + inv.toLocaleString() + '\nExpected Future Value : ₹' + Math.round(fv).toLocaleString() + '\nEstimated Returns : ₹' + Math.round(fv - inv).toLocaleString();
      } else if (subType === 'fin_gst') {
        var amt = parseFloat(raw) || 1000;
        var gst18 = amt * 0.18;
        res = 'Original Amount: ₹' + amt.toFixed(2) + '\nGST (18% Add): ₹' + gst18.toFixed(2) + '\nTotal with GST: ₹' + (amt + gst18).toFixed(2);
      } else {
        res = 'Input processed: ' + raw.length + ' characters.';
      }

      outputEl.value = res;
      setMsg('Conversion completed successfully.');
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
