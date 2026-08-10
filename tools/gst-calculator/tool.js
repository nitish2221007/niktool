(function() {
  'use strict';
  var slug = 'gst-calculator';
  var baseEl = document.getElementById(slug + '-input');
  var rateEl = document.getElementById(slug + '-rate');
  var modeEl = document.getElementById(slug + '-mode');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var base = parseFloat(baseEl.value), rate = parseFloat(rateEl.value);
    if (isNaN(base) || isNaN(rate)) { setMsg('Please enter both base price and GST rate.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (base < 0 || rate < 0) { setMsg('Price and rate must be non-negative.', true); return; }
    var out = '';
    if (modeEl.value === 'add') {
      var gst = base * rate / 100;
      var total = base + gst;
      out = 'Mode: Add GST\nBase Price: ' + base + '\nGST Rate: ' + rate + '%\nGST Amount: ' + gst.toFixed(2) + '\nTotal (Inclusive): ' + total.toFixed(2) + '\nCGST: ' + (gst/2).toFixed(2) + '\nSGST: ' + (gst/2).toFixed(2);
    } else {
      var net = base / (1 + rate/100);
      var gstAmt = base - net;
      out = 'Mode: Remove GST\nInclusive Price: ' + base + '\nGST Rate: ' + rate + '%\nNet Price (Exclusive): ' + net.toFixed(2) + '\nGST Amount: ' + gstAmt.toFixed(2) + '\nCGST: ' + (gstAmt/2).toFixed(2) + '\nSGST: ' + (gstAmt/2).toFixed(2);
    }
    out += '\n\nNote: This is a calculator, not tax advice.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('GST calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    baseEl.value=''; rateEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter price and rate above.');
  });
})();
