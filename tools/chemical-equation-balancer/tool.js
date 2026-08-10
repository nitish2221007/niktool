(function() {
  'use strict';
  var slug = 'chemical-equation-balancer';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  function parseMolecule(mol) {
    var counts = {};
    var i = 0;
    while (i < mol.length) {
      if (mol[i] === '(') {
        i++;
        var inner = '';
        var depth = 1;
        while (i < mol.length && depth > 0) {
          if (mol[i] === '(') depth++;
          if (mol[i] === ')') { depth--; if (depth === 0) break; }
          inner += mol[i]; i++;
        }
        i++;
        var numStr = '';
        while (i < mol.length && /\d/.test(mol[i])) { numStr += mol[i]; i++; }
        var mult = numStr ? parseInt(numStr) : 1;
        var innerCounts = parseMolecule(inner);
        for (var el in innerCounts) {
          counts[el] = (counts[el] || 0) + innerCounts[el] * mult;
        }
      } else if (/[A-Z]/.test(mol[i])) {
        var sym = mol[i]; i++;
        while (i < mol.length && /[a-z]/.test(mol[i])) { sym += mol[i]; i++; }
        var numStr2 = '';
        while (i < mol.length && /\d/.test(mol[i])) { numStr2 += mol[i]; i++; }
        var cnt = numStr2 ? parseInt(numStr2) : 1;
        counts[sym] = (counts[sym] || 0) + cnt;
      } else { i++; }
    }
    return counts;
  }
  function getElements(molecules) {
    var els = {};
    molecules.forEach(function(m) {
      var c = parseMolecule(m);
      for (var el in c) els[el] = true;
    });
    return Object.keys(els);
  }
  function atomCount(molecules, coeffs, elements) {
    var totals = {};
    elements.forEach(function(el){ totals[el] = 0; });
    molecules.forEach(function(m, idx) {
      var c = parseMolecule(m);
      elements.forEach(function(el) {
        totals[el] += (c[el] || 0) * coeffs[idx];
      });
    });
    return totals;
  }
  function gcd(a, b) { while(b){ var t=b; b=a%b; a=t; } return a; }
  btn.addEventListener('click', function() {
    var eq = inputEl.value.trim();
    if (!eq) { setMsg('Please enter a chemical equation.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var parts = eq.split(/->|=>|=/);
    if (parts.length !== 2) { setMsg('Use -> or = to separate reactants and products.', true); return; }
    var reactants = parts[0].split('+').map(function(s){return s.trim();}).filter(Boolean);
    var products = parts[1].split('+').map(function(s){return s.trim();}).filter(Boolean);
    if (!reactants.length || !products.length) { setMsg('Please enter valid reactants and products.', true); return; }
    var elements = getElements(reactants.concat(products));
    var nR = reactants.length, nP = products.length, n = nR + nP;
    if (n > 6) { setMsg('Too many molecules. This tool supports up to 6 total molecules.', true); return; }
    var found = null;
    function tryBalance(coeffs, idx) {
      if (found) return;
      if (idx === n) {
        var left = atomCount(reactants, coeffs.slice(0, nR), elements);
        var right = atomCount(products, coeffs.slice(nR), elements);
        var balanced = elements.every(function(el){ return left[el] === right[el]; });
        if (balanced) { found = coeffs.slice(); }
        return;
      }
      for (var c = 1; c <= 10; c++) {
        coeffs[idx] = c;
        tryBalance(coeffs, idx + 1);
        if (found) return;
      }
    }
    tryBalance(new Array(n), 0);
    if (!found) {
      setMsg('Could not balance this equation with small coefficients. Check the formula is correct.', true);
      outputEl.value = '';
      copyBtn.disabled = true;
      return;
    }
    var g = found[0];
    for (var i = 1; i < n; i++) g = gcd(g, found[i]);
    found = found.map(function(c){ return c / g; });
    var rStr = reactants.map(function(m, i){ return (found[i] > 1 ? found[i] : '') + m; }).join(' + ');
    var pStr = products.map(function(m, i){ return (found[nR+i] > 1 ? found[nR+i] : '') + m; }).join(' + ');
    var out = 'Balanced Equation:\n' + rStr + ' → ' + pStr + '\n\nAtom Verification:\n';
    var leftFinal = atomCount(reactants, found.slice(0, nR), elements);
    var rightFinal = atomCount(products, found.slice(nR), elements);
    elements.forEach(function(el) {
      out += el + ': ' + leftFinal[el] + ' = ' + rightFinal[el] + '\n';
    });
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Equation balanced successfully.');
  });
  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); }
    setMsg('Result copied to clipboard.');
  });
  clearBtn.addEventListener('click', function() {
    inputEl.value=''; outputEl.value=''; copyBtn.disabled=true;
    setMsg('Cleared. Enter a chemical equation above.');
  });
})();
