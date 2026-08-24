(() => {
  'use strict';
  const edEl = document.getElementById('mst-edges'), vEl = document.getElementById('mst-v');
  const totResEl = document.getElementById('mst-res-tot'), trResEl = document.getElementById('mst-res-tree');

  function update() {
    const edges = edEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const V = parseInt(vEl.value, 10);

    if (edges.length === 0 || isNaN(V) || V < 2) return;

    const totalWeight = edges.reduce((a, b) => a + b, 0);
    const requiredEdges = V - 1;

    let treeStatus = '', color = '#22543d';
    if (edges.length === requiredEdges) {
      treeStatus = 'VALID SPANNING TREE: Exactly V - 1 = ' + requiredEdges + ' edges for ' + V + ' vertices';
      color = '#22543d';
    } else if (edges.length < requiredEdges) {
      treeStatus = 'DISCONNECTED GRAPH: Missing ' + (requiredEdges - edges.length) + ' edge(s) to connect all ' + V + ' nodes';
      color = '#ea580c';
    } else {
      treeStatus = 'CONTAINS CYCLES: ' + edges.length + ' edges exceeds V - 1 = ' + requiredEdges + ' (Remove redundant high-weight edges)';
      color = '#c53030';
    }

    totResEl.textContent = 'Total MST Weight = ' + totalWeight.toFixed(1);
    trResEl.textContent = treeStatus + ' [Average Edge Weight = ' + (totalWeight / edges.length).toFixed(1) + ']';
    trResEl.style.color = color;
  }

  edEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();