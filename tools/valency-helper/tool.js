(function() {
  'use strict';
  var slug = 'valency-helper';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  var DATA = [
    {s:'H', n:'Hydrogen', v:1}, {s:'He', n:'Helium', v:0},
    {s:'Li', n:'Lithium', v:1}, {s:'Be', n:'Beryllium', v:2},
    {s:'B', n:'Boron', v:3}, {s:'C', n:'Carbon', v:4},
    {s:'N', n:'Nitrogen', v:3}, {s:'O', n:'Oxygen', v:2},
    {s:'F', n:'Fluorine', v:1}, {s:'Ne', n:'Neon', v:0},
    {s:'Na', n:'Sodium', v:1}, {s:'Mg', n:'Magnesium', v:2},
    {s:'Al', n:'Aluminium', v:3}, {s:'Si', n:'Silicon', v:4},
    {s:'P', n:'Phosphorus', v:3}, {s:'S', n:'Sulfur', v:2},
    {s:'Cl', n:'Chlorine', v:1}, {s:'Ar', n:'Argon', v:0},
    {s:'K', n:'Potassium', v:1}, {s:'Ca', n:'Calcium', v:2},
    {s:'Cr', n:'Chromium', v:3}, {s:'Mn', n:'Manganese', v:2},
    {s:'Fe', n:'Iron', v:2}, {s:'Cu', n:'Copper', v:2},
    {s:'Zn', n:'Zinc', v:2}, {s:'Ag', n:'Silver', v:1},
    {s:'I', n:'Iodine', v:1}, {s:'Ba', n:'Barium', v:2},
    {s:'Pb', n:'Lead', v:2}, {s:'Au', n:'Gold', v:3}
  ];
  btn.addEventListener('click', function() {
    var q = inputEl.value.trim().toLowerCase();
    if (!q) { setMsg('Please enter an element name or symbol.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var found = DATA.find(function(el) { return el.s.toLowerCase() === q || el.n.toLowerCase() === q; });
    if (!found) {
      setMsg('Element not found in the common school database.', true);
      outputEl.value = '';
      copyBtn.disabled = true;
      return;
    }
    var out = 'Element: ' + found.n + '\n';
    out += 'Symbol: ' + found.s + '\n';
    out += 'Common Valency: ' + (found.v === 0 ? '0 (inert/noble gas)' : found.v) + '\n\n';
    out += 'Valency determines how many bonds an atom can form.\n';
    out += 'Example: ' + found.n + ' (valency ' + found.v + ') combines with elements of complementary valency.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Element found.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
