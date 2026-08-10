(function(){
'use strict';
const ALGOS=[
  {cat:"Sorting",name:"Bubble Sort",time:"O(n²)",space:"O(1)",desc:"Repeatedly swap adjacent elements if out of order."},
  {cat:"Sorting",name:"Selection Sort",time:"O(n²)",space:"O(1)",desc:"Find minimum, place at front. Repeat."},
  {cat:"Sorting",name:"Insertion Sort",time:"O(n²) / O(n) best",space:"O(1)",desc:"Build sorted portion by inserting each element. Great for small/nearly-sorted data."},
  {cat:"Sorting",name:"Merge Sort",time:"O(n log n)",space:"O(n)",desc:"Divide and conquer. Split, sort halves, merge. Stable."},
  {cat:"Sorting",name:"Quick Sort",time:"O(n log n) avg / O(n²) worst",space:"O(log n)",desc:"Pick pivot, partition, recurse. Fast in practice."},
  {cat:"Sorting",name:"Heap Sort",time:"O(n log n)",space:"O(1)",desc:"Build max-heap, repeatedly extract max."},
  {cat:"Sorting",name:"Counting Sort",time:"O(n + k)",space:"O(k)",desc:"Non-comparison sort for small integer range."},
  {cat:"Sorting",name:"Radix Sort",time:"O(d × n)",space:"O(n + k)",desc:"Sort by digits. Non-comparison, stable."},
  {cat:"Searching",name:"Binary Search",time:"O(log n)",space:"O(1)",desc:"Halve search space each step. Requires sorted array."},
  {cat:"Searching",name:"Linear Search",time:"O(n)",space:"O(1)",desc:"Check each element sequentially."},
  {cat:"Searching",name:"BFS",time:"O(V + E)",space:"O(V)",desc:"Breadth-first traversal using a queue. Shortest path in unweighted graphs."},
  {cat:"Searching",name:"DFS",time:"O(V + E)",space:"O(V)",desc:"Depth-first traversal using stack/recursion. Cycle detection, topological sort."},
  {cat:"Graph",name:"Dijkstra's",time:"O((V+E) log V)",space:"O(V)",desc:"Shortest path from source with non-negative weights. Uses priority queue."},
  {cat:"Graph",name:"Bellman-Ford",time:"O(V × E)",space:"O(V)",desc:"Shortest path, handles negative weights. Detects negative cycles."},
  {cat:"Graph",name:"Floyd-Warshall",time:"O(V³)",space:"O(V²)",desc:"All-pairs shortest path. Works with negative weights (no negative cycles)."},
  {cat:"Graph",name:"Kruskal's MST",time:"O(E log E)",space:"O(V)",desc:"Minimum spanning tree via edge sorting + Union-Find."},
  {cat:"Graph",name:"Prim's MST",time:"O((V+E) log V)",space:"O(V)",desc:"Minimum spanning tree via greedy vertex expansion."},
  {cat:"Graph",name:"Topological Sort",time:"O(V + E)",space:"O(V)",desc:"Linear ordering of DAG vertices. Kahn's (BFS) or DFS-based."},
  {cat:"Graph",name:"A* Search",time:"O(E log V)",space:"O(V)",desc:"Shortest path with heuristic. Faster than Dijkstra when good heuristic exists."},
  {cat:"Dynamic Programming",name:"Kadane's Algorithm",time:"O(n)",space:"O(1)",desc:"Maximum subarray sum."},
  {cat:"Dynamic Programming",name:"0/1 Knapsack",time:"O(n × W)",space:"O(W)",desc:"Maximize value within weight limit. Each item used once."},
  {cat:"Dynamic Programming",name:"Longest Common Subsequence",time:"O(m × n)",space:"O(m × n)",desc:"Longest subsequence common to two strings."},
  {cat:"Dynamic Programming",name:"Edit Distance",time:"O(m × n)",space:"O(m × n)",desc:"Min operations (insert/delete/replace) to transform one string."},
  {cat:"Dynamic Programming",name:"Coin Change",time:"O(n × amount)",space:"O(amount)",desc:"Fewest coins to make target amount."},
  {cat:"Dynamic Programming",name:"Longest Increasing Subsequence",time:"O(n log n)",space:"O(n)",desc:"Length of longest strictly increasing subsequence. Patience sorting."},
  {cat:"Greedy",name:"Activity Selection",time:"O(n log n)",space:"O(1)",desc:"Max non-overlapping activities. Sort by end time."},
  {cat:"Greedy",name:"Huffman Coding",time:"O(n log n)",space:"O(n)",desc:"Optimal prefix-free compression using min-heap."},
  {cat:"Greedy",name:"Interval Scheduling",time:"O(n log n)",space:"O(1)",desc:"Max non-overlapping intervals."},
  {cat:"String",name:"KMP Pattern Matching",time:"O(n + m)",space:"O(m)",desc:"Efficient string matching with failure function."},
  {cat:"String",name:"Rabin-Karp",time:"O(n + m) avg",space:"O(1)",desc:"Rolling hash for pattern matching."},
  {cat:"Divide & Conquer",name:"Binary Exponentiation",time:"O(log n)",space:"O(1)",desc:"Compute xⁿ by squaring."},
  {cat:"Divide & Conquer",name:"Strassen's Matrix Multiply",time:"O(n^2.807)",space:"O(n²)",desc:"Faster than naive O(n³) matrix multiplication."}
];
const searchIn=document.getElementById('algo-search'),listEl=document.getElementById('algo-list'),msgEl=document.getElementById('algo-msg');
const catColor={Sorting:'#4fc3f7',Searching:'#81c784',Graph:'#ba68c8','Dynamic Programming':'#ffb74d',Greedy:'#ef5350',String:'#f06292','Divide & Conquer':'#4dd0e1'};

function render(filter){
  listEl.innerHTML='';
  const f=(filter||'').toLowerCase();
  let count=0;
  ALGOS.forEach(a=>{
    if(f&&!a.name.toLowerCase().includes(f)&&!a.cat.toLowerCase().includes(f)&&!a.desc.toLowerCase().includes(f))return;
    count++;
    const card=document.createElement('div');
    card.style.cssText='padding:1rem;border-radius:8px;background:rgba(255,255,255,0.04);';
    card.innerHTML=
      '<div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">'+
        '<span style="font-weight:700;font-size:1rem;">'+a.name+'</span>'+
        '<span style="font-size:0.75rem;padding:2px 8px;border-radius:10px;background:'+(catColor[a.cat]||'#4fc3f7')+';color:#111;font-weight:600;">'+a.cat+'</span>'+
      '</div>'+
      '<p style="font-size:0.85rem;margin-top:0.5rem;opacity:0.8;">'+a.desc+'</p>'+
      '<p style="font-size:0.85rem;margin-top:0.35rem;"><strong style="color:#66bb6a;">Time:</strong> '+a.time+' &nbsp; <strong style="color:#ffd54f;">Space:</strong> '+a.space+'</p>';
    listEl.appendChild(card);
  });
  msgEl.textContent=count?count+' algorithm(s) shown.':'No results for "'+filter+'".';
}
searchIn.addEventListener('input',()=>render(searchIn.value));
render();
})();
