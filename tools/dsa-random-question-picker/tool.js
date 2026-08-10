(function(){
'use strict';
const BANK=[
  {t:"arrays",d:"easy",q:"Two Sum — find two numbers in an array that add up to a target."},
  {t:"arrays",d:"easy",q:"Maximum Subarray — find the contiguous subarray with the largest sum (Kadane's)."},
  {t:"arrays",d:"easy",q:"Contains Duplicate — check if any value appears at least twice."},
  {t:"arrays",d:"medium",q:"3Sum — find all unique triplets that sum to zero."},
  {t:"arrays",d:"medium",q:"Product of Array Except Self — without division, O(n)."},
  {t:"arrays",d:"medium",q:"Merge Intervals — merge all overlapping intervals."},
  {t:"arrays",d:"hard",q:"Trapping Rain Water — compute how much water can be trapped."},
  {t:"arrays",d:"hard",q:"First Missing Positive — find smallest missing positive in O(n)."},
  {t:"strings",d:"easy",q:"Valid Anagram — check if two strings are anagrams."},
  {t:"strings",d:"easy",q:"Valid Palindrome — check palindrome ignoring non-alphanumeric chars."},
  {t:"strings",d:"medium",q:"Longest Substring Without Repeating Characters."},
  {t:"strings",d:"medium",q:"Group Anagrams — group strings that are anagrams of each other."},
  {t:"strings",d:"hard",q:"Minimum Window Substring — smallest substring containing all chars of target."},
  {t:"strings",d:"hard",q:"Regular Expression Matching — implement '.' and '*' matching."},
  {t:"linkedlist",d:"easy",q:"Reverse Linked List — reverse a singly linked list."},
  {t:"linkedlist",d:"easy",q:"Merge Two Sorted Lists — merge into one sorted list."},
  {t:"linkedlist",d:"medium",q:"Linked List Cycle — detect if a cycle exists (Floyd's)."},
  {t:"linkedlist",d:"medium",q:"Remove Nth Node From End — in one pass."},
  {t:"linkedlist",d:"hard",q:"Merge k Sorted Lists — merge k sorted linked lists."},
  {t:"stacks",d:"easy",q:"Valid Parentheses — check if brackets are properly matched."},
  {t:"stacks",d:"easy",q:"Implement Queue using Stacks."},
  {t:"stacks",d:"medium",q:"Min Stack — support push, pop, top, getMin in O(1)."},
  {t:"stacks",d:"medium",q:"Daily Temperatures — days until a warmer temperature."},
  {t:"stacks",d:"hard",q:"Largest Rectangle in Histogram — using a monotonic stack."},
  {t:"trees",d:"easy",q:"Maximum Depth of Binary Tree."},
  {t:"trees",d:"easy",q:"Invert Binary Tree — mirror the tree."},
  {t:"trees",d:"easy",q:"Same Tree — check if two trees are identical."},
  {t:"trees",d:"medium",q:"Validate Binary Search Tree."},
  {t:"trees",d:"medium",q:"Binary Tree Level Order Traversal."},
  {t:"trees",d:"medium",q:"Lowest Common Ancestor of a BST."},
  {t:"trees",d:"hard",q:"Serialize and Deserialize Binary Tree."},
  {t:"trees",d:"hard",q:"Binary Tree Maximum Path Sum."},
  {t:"graphs",d:"easy",q:"Flood Fill — DFS/BFS to fill connected region."},
  {t:"graphs",d:"medium",q:"Number of Islands — count connected components in a grid."},
  {t:"graphs",d:"medium",q:"Clone Graph — deep copy a graph with neighbors."},
  {t:"graphs",d:"medium",q:"Course Schedule — detect cycle in directed graph (topological sort)."},
  {t:"graphs",d:"hard",q:"Word Ladder — shortest transformation sequence."},
  {t:"graphs",d:"hard",q:"Alien Dictionary — derive letter order from sorted words."},
  {t:"dp",d:"easy",q:"Climbing Stairs — count distinct ways to climb n steps."},
  {t:"dp",d:"easy",q:"House Robber — max money without robbing adjacent houses."},
  {t:"dp",d:"medium",q:"Coin Change — fewest coins to make amount."},
  {t:"dp",d:"medium",q:"Longest Increasing Subsequence."},
  {t:"dp",d:"medium",q:"0/1 Knapsack — maximize value within weight limit."},
  {t:"dp",d:"hard",q:"Edit Distance — minimum operations to convert one string to another."},
  {t:"dp",d:"hard",q:"Regular Expression Matching with DP."},
  {t:"sorting",d:"easy",q:"Binary Search — find target in sorted array."},
  {t:"sorting",d:"easy",q:"Search Insert Position."},
  {t:"sorting",d:"medium",q:"Search in Rotated Sorted Array."},
  {t:"sorting",d:"medium",q:"Find First and Last Position of Element."},
  {t:"sorting",d:"medium",q:"Kth Largest Element in an Array (Quickselect)."},
  {t:"sorting",d:"hard",q:"Median of Two Sorted Arrays."}
];
const topicSel=document.getElementById('qp-topic'),diffSel=document.getElementById('qp-diff'),
      pickBtn=document.getElementById('qp-pick'),resultEl=document.getElementById('qp-result'),
      msgEl=document.getElementById('qp-msg');
const diffColor={easy:'#66bb6a',medium:'#ffd54f',hard:'#ef5350'};
const topicNames={arrays:'Arrays',strings:'Strings',linkedlist:'Linked List',stacks:'Stacks & Queues',trees:'Trees',graphs:'Graphs',dp:'Dynamic Programming',sorting:'Sorting & Searching'};

pickBtn.addEventListener('click',()=>{
  const t=topicSel.value,d=diffSel.value;
  let pool=BANK.filter(q=>(t==='all'||q.t===t)&&(d==='all'||q.d===d));
  if(!pool.length){msgEl.textContent='No questions match the filters.';return;}
  const q=pool[Math.floor(Math.random()*pool.length)];
  resultEl.innerHTML='<p style="font-size:0.8rem; opacity:0.6; margin-bottom:0.5rem;">'+
    '<span style="background:'+diffColor[q.d]+'; color:#111; padding:2px 8px; border-radius:10px; font-weight:600; font-size:0.75rem;">'+q.d.toUpperCase()+'</span> '+
    '<span style="margin-left:6px;">'+(topicNames[q.t]||q.t)+'</span></p>'+
    '<p style="font-size:1.15rem; font-weight:600;">'+q.q+'</p>';
  msgEl.textContent='Random question picked from '+(t==='all'?'all topics':topicNames[t])+' ('+(d==='all'?'any difficulty':d)+').';
});
})();
