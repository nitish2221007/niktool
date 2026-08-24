(function() {
  'use strict';
  var slug = 'microstrip-line-characteristic-impedance-pcb-rf-calculator';

  function el(id) {
    return document.getElementById(slug + '-' + id);
  }

  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) {
    msgEl.textContent = t;
    msgEl.classList.toggle('is-error', !!err);
  }

  function calculate() {
    try {

      var w = parseFloat(el('w-mm').value);
      var h = parseFloat(el('h-mm').value);
      var er = parseFloat(el('er').value);
      if (isNaN(w) || w <= 0 || isNaN(h) || h <= 0 || isNaN(er) || er < 1) {
        return { err: 'Please enter valid positive values for W, H, and εr.' };
      }
      var u = w / h;
      var e_eff = ((er + 1) / 2) + (((er - 1) / 2) * (1 / Math.sqrt(1 + 12 / u)));
      var z0 = 0;
      if (u <= 1) {
        z0 = (60 / Math.sqrt(e_eff)) * Math.log((8 / u) + (u / 4));
      } else {
        z0 = (120 * Math.PI) / (Math.sqrt(e_eff) * (u + 1.393 + 0.667 * Math.log(u + 1.444)));
      }
      var c = 3e8;
      var v_m_s = c / Math.sqrt(e_eff);
      var prop_delay_ps_mm = (1 / v_m_s) * 1e9;
      var out = 'PCB MICROSTRIP LINE CHARACTERISTIC IMPEDANCE ANALYSIS\n';
      out += '======================================================\n';
      out += 'Trace Width (W)       : ' + w + ' mm\n';
      out += 'Substrate Height (H)  : ' + h + ' mm (W/H ratio = ' + u.toFixed(3) + ')\n';
      out += 'Substrate Permittivity (εr): ' + er + '\n\n';
      out += 'RESULTS:\n';
      out += 'Characteristic Impedance (Z0): ' + z0.toFixed(2) + ' Ω\n';
      out += 'Effective Dielectric (εeff) : ' + e_eff.toFixed(3) + '\n';
      out += 'Propagation Delay     : ' + prop_delay_ps_mm.toFixed(2) + ' ps/mm (' + (prop_delay_ps_mm * 25.4).toFixed(2) + ' ps/inch)';
      return { out: out, msg: 'Microstrip line impedance calculated successfully.' };
    
    } catch(e) {
      return { err: 'Error during calculation: ' + e.message };
    }
  }

  btn.addEventListener('click', function() {
    var res = calculate();
    if (res.err) {
      outputEl.value = '';
      copyBtn.disabled = true;
      setMsg(res.err, true);
    } else {
      outputEl.value = res.out;
      copyBtn.disabled = false;
      setMsg(res.msg || 'Calculation completed successfully.');
    }
  });

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outputEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    var inputs = ['w-mm', 'h-mm', 'er'];
    inputs.forEach(function(id) {
      var elem = el(id);
      if (elem) elem.value = elem.defaultValue || '';
    });
    outputEl.value = '';
    copyBtn.disabled = true;
    setMsg('Cleared. Enter values above.');
  });
})();
