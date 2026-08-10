(function() {
  'use strict';
  var slug = 'discount-calculator';
  var priceEl = document.getElementById(slug + '-input');
  var pctEl = document.getElementById(slug + '-pct');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  btn.addEventListener('click', function() {
    var price = parseFloat(priceEl.value), pct = parseFloat(pctEl.value);
    if (isNaN(price) || isNaN(pct)) { setMsg('Please enter both original price and discount percent.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    if (price < 0) { setMsg('Original price cannot be negative.', true); return; }
    if (pct < 0 || pct > 100) { setMsg('Discount percent must be between 0 and 100.', true); return; }
    var discount = price * pct / 100;
    var final = price - discount;
    outputEl.value = 'Original Price: ' + price + '\nDiscount: ' + pct + '%\nDiscount Amount: ' + discount.toFixed(2) + '\nFinal Price: ' + final.toFixed(2) + '\nYou Save: ' + discount.toFixed(2);
    copyBtn.disabled = false;
    setMsg('Discount calculated successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    priceEl.value=''; pctEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter price and discount above.');
  });
})();
