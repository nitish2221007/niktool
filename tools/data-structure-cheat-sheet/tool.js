(function(){
'use strict';
const DS=[
  {name:"Array",ops:[["Access","O(1)"],["Search","O(n)"],["Insert","O(n)"],["Delete","O(n)"]],use:"Ordered collection with random access. Best when size is known and frequent index-based access is needed."},
  {name:"Linked List (Singly)",ops:[["Access","O(n)"],["Search","O(n)"],["Insert at head","O(1)"],["Delete","O(n)"]],use:"Dynamic size, frequent insertions/deletions at ends. No random access."},
  {name:"Doubly Linked List",ops:[["Access","O(n)"],["Insert/Delete (known node)","O(1)"],["Search","O(n)"]],use:"Same as singly but allows backward traversal. Used in LRU cache."},
  {name:"Stack",ops:[["Push","O(1)"],["Pop","O(1)"],["Peek","O(1)"]],use:"LIFO. Undo/redo, call stack, DFS, expression evaluation, backtracking."},
  {name:"Queue",ops:[["Enqueue","O(1)"],["Dequeue","O(1)"],["Front","O(1)"]],use:"FIFO. BFS, task scheduling, buffering, printer spooling."},
  {name:"Hash Map / Hash Table",ops:[["Insert","O(1) avg"],["Lookup","O(1) avg"],["Delete","O(1) avg"]],use:"Key-value storage with near-constant access. The most versatile DS."},
  {name:"Binary Search Tree",ops:[["Search","O(log n) avg"],["Insert","O(log n) avg"],["Delete","O(log n) avg"]],use:"Sorted data with fast search/insert/delete. Inorder traversal gives sorted order."},
  {name:"AVL / Red-Black Tree",ops:[["Search","O(log n)"],["Insert","O(log n)"],["Delete","O(log n)"]],use:"Self-balancing BST. Guarantees O(log n) worst case. Used in language libraries."},
  {name:"Heap (Min/Max)",ops:[["Insert","O(log n)"],["Extract Min/Max","O(log n)"],["Peek","O(1)"],["Build","O(n)"]],use:"Priority queue, Dijkstra, heap sort, top-K problems."},
  {name:"Trie (Prefix Tree)",ops:[["Insert","O(L)"],["Search","O(L)"],["Prefix search","O(L)"]],use:"Autocomplete, spell check, IP routing. L = word length."},
  {name:"Graph (Adjacency List)",ops:[["Add vertex","O(1)"],["Add edge","O(1)"],["BFS/DFS","O(V+E)"]],use:"Networks, maps, dependencies, social graphs."},
  {name:"Disjoint Set (Union-Find)",ops:[["Find","O(α(n))"],["Union","O(α(n))"]],use:"Connected components, Kruskal's MST, cycle detection. α = inverse Ackermann."},
  {name:"Segment Tree",ops:[["Build","O(n)"],["Query","O(log n)"],["Update","O(log n)"]],use:"Range queries (sum, min, max) with point updates."},
  {name:"Fenwick Tree (BIT)",ops:[["Build","O(n log n)"],["Prefix query","O(log n)"],["Update","O(log n)"]],use:"Prefix sum queries with updates. Less memory than segment tree."}
];
const searchIn=document.getElementById('ds-search'),listEl=document.getElementById('ds-list'),msgEl=document.getElementById('ds-msg');

function render(filter){
  listEl.innerHTML='';
  const f=(filter||'').toLowerCase();
  let count=0;
  DS.forEach(ds=>{
    if(f&&!ds.name.toLowerCase().includes(f)&&!ds.use.toLowerCase().includes(f))return;
    count++;
    const card=document.createElement('div');
    card.style.cssText='padding:1rem;border-radius:8px;background:rgba(255,255,255,0.04);';
    let tableHtml='<table style="width:100%;border-collapse:collapse;font-size:0.85rem;margin:0.5rem 0;">';
    tableHtml+='<tr style="border-bottom:1px solid rgba(255,255,255,0.1);"><th style="text-align:left;padding:4px;opacity:0.6;">Operation</th><th style="text-align:left;padding:4px;opacity:0.6;">Complexity</th></tr>';
    ds.ops.forEach(([op,cx])=>{
      tableHtml+='<tr><td style="padding:4px;">'+op+'</td><td style="padding:4px;color:#4fc3f7;font-weight:600;">'+cx+'</td></tr>';
    });
    tableHtml+='</table>';
    card.innerHTML='<p style="font-weight:700;font-size:1.05rem;color:#66bb6a;">'+ds.name+'</p>'+tableHtml+'<p style="font-size:0.85rem;opacity:0.75;margin-top:0.5rem;">'+ds.use+'</p>';
    listEl.appendChild(card);
  });
  msgEl.textContent=count?count+' data structure(s) shown.':'No results for "'+filter+'".';
}
searchIn.addEventListener('input',()=>render(searchIn.value));
render();
})();
