(function() {
  'use strict';
  var slug = 'atomic-mass-lookup';
  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');
  function setMsg(t, e){ msgEl.textContent=t; msgEl.classList.toggle('is-error', !!e); }
  var DATA = [
    {s:'H', n:'Hydrogen', z:1, m:1.008}, {s:'He', n:'Helium', z:2, m:4.003},
    {s:'Li', n:'Lithium', z:3, m:6.94}, {s:'Be', n:'Beryllium', z:4, m:9.012},
    {s:'B', n:'Boron', z:5, m:10.81}, {s:'C', n:'Carbon', z:6, m:12.011},
    {s:'N', n:'Nitrogen', z:7, m:14.007}, {s:'O', n:'Oxygen', z:8, m:15.999},
    {s:'F', n:'Fluorine', z:9, m:18.998}, {s:'Ne', n:'Neon', z:10, m:20.180},
    {s:'Na', n:'Sodium', z:11, m:22.990}, {s:'Mg', n:'Magnesium', z:12, m:24.305},
    {s:'Al', n:'Aluminium', z:13, m:26.982}, {s:'Si', n:'Silicon', z:14, m:28.085},
    {s:'P', n:'Phosphorus', z:15, m:30.974}, {s:'S', n:'Sulfur', z:16, m:32.06},
    {s:'Cl', n:'Chlorine', z:17, m:35.45}, {s:'Ar', n:'Argon', z:18, m:39.948},
    {s:'K', n:'Potassium', z:19, m:39.098}, {s:'Ca', n:'Calcium', z:20, m:40.078},
    {s:'Cr', n:'Chromium', z:24, m:51.996}, {s:'Mn', n:'Manganese', z:25, m:54.938},
    {s:'Fe', n:'Iron', z:26, m:55.845}, {s:'Cu', n:'Copper', z:29, m:63.546},
    {s:'Zn', n:'Zinc', z:30, m:65.38}, {s:'Br', n:'Bromine', z:35, m:79.904},
    {s:'Ag', n:'Silver', z:47, m:107.868}, {s:'I', n:'Iodine', z:53, m:126.904},
    {s:'Ba', n:'Barium', z:56, m:137.327}, {s:'Pb', n:'Lead', z:82, m:207.2},
    {s:'Au', n:'Gold', z:79, m:196.967}
  ];
  btn.addEventListener('click', function() {
    var q = inputEl.value.trim().toLowerCase();
    if (!q) { setMsg('Please enter an element name or symbol.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var found = DATA.find(function(el) { return el.s.toLowerCase() === q || el.n.toLowerCase() === q; });
    if (!found) { setMsg('Element not found in the common school database.', true); outputEl.value=''; copyBtn.disabled=true; return; }
    var out = 'Element: ' + found.n + '\n';
    out += 'Symbol: ' + found.s + '\n';
    out += 'Atomic Number (Z): ' + found.z + '\n';
    out += 'Atomic Mass (u): ' + found.m + '\n\n';
    out += 'Useful for calculating molar mass in chemical formulas.';
    outputEl.value = out;
    copyBtn.disabled = false;
    setMsg('Element found.');
  });
  copyBtn.addEventListener('click', function() { if (window.NikTool && typeof window.NikTool.copy === 'function') { window.NikTool.copy(outputEl.value, copyBtn); } else if (navigator.clipboard) { navigator.clipboard.writeText(outputEl.value); } setMsg('Result copied.'); });
  clearBtn.addEventListener('click', function() { inputEl.value=''; outputEl.value=''; copyBtn.disabled=true; setMsg('Cleared.'); });
})();
