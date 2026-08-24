(() => {
  'use strict';
  const m0El = document.getElementById('km-m0'), m1El = document.getElementById('km-m1');
  const m2El = document.getElementById('km-m2'), m3El = document.getElementById('km-m3');
  const sopResEl = document.getElementById('km-res-sop'), grpResEl = document.getElementById('km-res-grp');

  function update() {
    const m0 = parseInt(m0El.value, 10), m1 = parseInt(m1El.value, 10);
    const m2 = parseInt(m2El.value, 10), m3 = parseInt(m3El.value, 10);

    const sum = m0 + m1 + m2 + m3;
    let sop = '', grouping = '';

    if (sum === 4) {
      sop = 'F = 1 (Always TRUE)';
      grouping = 'Quad group of 4 covers entire map';
    } else if (sum === 0) {
      sop = 'F = 0 (Always FALSE)';
      grouping = 'Empty map (zero minterms)';
    } else if (m0 === 1 && m1 === 1 && m2 === 1 && m3 === 0) {
      sop = "F = A' + B' (NAND Logic)";
      grouping = "Pair 1 (m₀,m₁) = A' | Pair 2 (m₀,m₂) = B'";
    } else if (m0 === 0 && m1 === 1 && m2 === 1 && m3 === 0) {
      sop = "F = A'B + AB' (XOR Logic: A ⊕ B)";
      grouping = "Diagonal 1s cannot be grouped (2 isolated minterms)";
    } else if (m0 === 1 && m1 === 0 && m2 === 0 && m3 === 1) {
      sop = "F = A'B' + AB (XNOR Logic: A ⊙ B)";
      grouping = "Diagonal 1s cannot be grouped (2 isolated minterms)";
    } else if (m0 === 1 && m1 === 1 && m2 === 0 && m3 === 0) {
      sop = "F = A'";
      grouping = "Row group (m₀, m₁) eliminates B";
    } else if (m0 === 0 && m1 === 0 && m2 === 1 && m3 === 1) {
      sop = "F = A";
      grouping = "Row group (m₂, m₃) eliminates B";
    } else if (m0 === 1 && m1 === 0 && m2 === 1 && m3 === 0) {
      sop = "F = B'";
      grouping = "Column group (m₀, m₂) eliminates A";
    } else if (m0 === 0 && m1 === 1 && m2 === 0 && m3 === 1) {
      sop = "F = B";
      grouping = "Column group (m₁, m₃) eliminates A";
    } else {
      const active = [];
      if (m0) active.push("A'B'");
      if (m1) active.push("A'B");
      if (m2) active.push("AB'");
      if (m3) active.push("AB");
      sop = 'F = ' + active.join(' + ');
      grouping = 'Individual minterm sum';
    }

    sopResEl.textContent = sop;
    grpResEl.textContent = grouping + ' [m₀=' + m0 + ', m₁=' + m1 + ', m₂=' + m2 + ', m₃=' + m3 + ']';
  }

  [m0El, m1El, m2El, m3El].forEach(el => el.addEventListener('change', update));
  update();
})();