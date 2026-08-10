(function(){
'use strict';
const data = {
  o1:{name:"O(1) — Constant",calc:n=>1,explain:"The operation takes the same time regardless of input size. Example: accessing an array element by index.",examples:"Array access, Hash map lookup, Push/Pop on stack"},
  ologn:{name:"O(log n) — Logarithmic",calc:n=>Math.log2(n),explain:"The problem size halves each step. Doubling input only adds one extra step.",examples:"Binary search, Balanced BST operations"},
  on:{name:"O(n) — Linear",calc:n=>n,explain:"Time grows directly proportional to input. One pass through the data.",examples:"Linear search, Single loop, Traversal"},
  onlogn:{name:"O(n log n) — Linearithmic",calc:n=>n*Math.log2(n),explain:"Slightly worse than linear. Common in efficient sorting algorithms.",examples:"Merge sort, Heap sort, Quick sort (average)"},
  on2:{name:"O(n²) — Quadratic",calc:n=>n*n,explain:"Nested loops over the input. Doubling input quadruples the time.",examples:"Bubble sort, Selection sort, Insertion sort"},
  on3:{name:"O(n³) — Cubic",calc:n=>n*n*n,explain:"Three nested loops. Common in matrix multiplication.",examples:"Naive matrix multiply, Floyd-Warshall"},
  o2n:{name:"O(2ⁿ) — Exponential",calc:n=>Math.pow(2,n),explain:"Doubles with each additional element. Quickly becomes infeasible.",examples:"Recursive Fibonacci, Subset generation"},
  onfactorial:{name:"O(n!) — Factorial",calc:n=>{let r=1;for(let i=2;i<=n;i++)r*=i;return r;},explain:"Grows faster than exponential. Only feasible for very small n.",examples:"TSP brute force, Permutation generation"}
};
const sel=document.getElementById('algo-select'),nIn=document.getElementById('n-input'),
      btn=document.getElementById('calc-btn'),nameEl=document.getElementById('complexity-name'),
      opsEl=document.getElementById('ops-count'),expEl=document.getElementById('explanation'),
      exEl=document.getElementById('example-algos'),msg=document.getElementById('big-o-message'),
      copyBtn=document.getElementById('copy-output'),clearBtn=document.getElementById('clear-text'),
      canvas=document.getElementById('growth-chart');

function drawChart(key,n){
  const ctx=canvas.getContext('2d'),W=canvas.width,H=canvas.height;
  ctx.clearRect(0,0,W,H);
  const keys=Object.keys(data);
  const maxN=Math.max(n,20),maxOps=Math.max(data[key].calc(n),data.on2.calc(maxN),100);
  ctx.strokeStyle='#555';ctx.beginPath();ctx.moveTo(40,10);ctx.lineTo(40,H-30);ctx.lineTo(W-10,H-30);ctx.stroke();
  ctx.fillStyle='#888';ctx.font='11px sans-serif';
  ctx.fillText('n',W-20,H-15);ctx.fillText('ops',5,20);
  const colors=['#4fc3f7','#81c784','#fff176','#ffb74d','#ef5350','#ba68c8','#e57373','#f06292'];
  keys.forEach((k,idx)=>{
    ctx.strokeStyle=colors[idx%colors.length];ctx.lineWidth=k===key?2.5:1;
    ctx.globalAlpha=k===key?1:0.25;ctx.beginPath();
    for(let x=0;x<=maxN;x++){
      let op=data[k].calc(x);if(op>maxOps*1.2)op=maxOps*1.2;
      const px=40+(x/maxN)*(W-50),py=H-30-(op/maxOps)*(H-45);
      x===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.stroke();ctx.globalAlpha=1;ctx.lineWidth=1;
  });
}
btn.addEventListener('click',function(){
  const key=sel.value;if(!key){msg.textContent='Please select a pattern.';return;}
  const n=Math.max(1,parseInt(nIn.value)||1);
  const d=data[key],ops=d.calc(n);
  nameEl.textContent=d.name;
  opsEl.textContent=`For n = ${n.toLocaleString()}, approx ${ops<1e15?ops.toLocaleString():ops.toExponential(2)} operations`;
  expEl.textContent=d.explain;
  exEl.textContent='Common examples: '+d.examples;
  drawChart(key,n);copyBtn.disabled=false;
  msg.textContent='Showing '+d.name;
});
copyBtn.addEventListener('click',()=>{navigator.clipboard.writeText(nameEl.textContent+'\n'+opsEl.textContent).then(()=>msg.textContent='Copied!');});
clearBtn.addEventListener('click',()=>{sel.value='';nameEl.textContent='';opsEl.textContent='';expEl.textContent='';exEl.textContent='';canvas.getContext('2d').clearRect(0,0,400,220);copyBtn.disabled=true;msg.textContent='Cleared.';});
})();
