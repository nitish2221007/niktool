(function(){
'use strict';
const cv=document.getElementById('sort-canvas'),ctx=cv.getContext('2d');
const msg=document.getElementById('sort-msg'),startBtn=document.getElementById('start-btn'),
      shufBtn=document.getElementById('shuffle-btn'),sizeS=document.getElementById('size-slider'),
      speedS=document.getElementById('speed-slider'),algoSel=document.getElementById('sort-select');
let arr=[],sorting=false,animId=null;

function resize(){cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);}
window.addEventListener('resize',()=>{resize();draw();});
resize();

function gen(){
  arr=[];const n=+sizeS.value;
  for(let i=0;i<n;i++)arr.push(Math.random()*0.9+0.05);
  draw();msg.textContent='Array generated ('+n+' elements). Press ▶ Sort.';
}
function draw(hl={}){
  const W=cv.clientWidth,H=cv.clientHeight,n=arr.length,bw=W/n;
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<n;i++){
    let c='#4fc3f7';
    if(hl.sorted&&hl.sorted.has(i))c='#66bb6a';
    if(hl.compare&&hl.compare.has(i))c='#ef5350';
    if(hl.swap&&hl.swap.has(i))c='#ffd54f';
    ctx.fillStyle=c;
    ctx.fillRect(i*bw+1,H-arr[i]*H,bw-2,arr[i]*H-4);
  }
}
function sleep(){return new Promise(r=>setTimeout(r,101-(+speedS.value)));}

async function bubbleSort(){
  const n=arr.length,sorted=new Set();
  for(let i=0;i<n-1;i++){
    for(let j=0;j<n-1-i;j++){
      if(!sorting)return;
      draw({compare:new Set([j,j+1]),sorted});await sleep();
      if(arr[j]>arr[j+1]){
        draw({swap:new Set([j,j+1]),sorted});
        [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
        await sleep();
      }
    }
    sorted.add(n-1-i);
  }
  sorted.add(0);draw({sorted});
}
async function selectionSort(){
  const n=arr.length,sorted=new Set();
  for(let i=0;i<n-1;i++){
    let mi=i;
    for(let j=i+1;j<n;j++){
      if(!sorting)return;
      draw({compare:new Set([mi,j]),sorted});await sleep();
      if(arr[j]<arr[mi])mi=j;
    }
    if(mi!==i){
      draw({swap:new Set([i,mi]),sorted});
      [arr[i],arr[mi]]=[arr[mi],arr[i]];await sleep();
    }
    sorted.add(i);
  }
  sorted.add(n-1);draw({sorted});
}
async function insertionSort(){
  const n=arr.length,sorted=new Set([0]);
  for(let i=1;i<n;i++){
    let key=arr[i],j=i-1;
    draw({compare:new Set([i]),sorted});await sleep();
    while(j>=0&&arr[j]>key){
      if(!sorting)return;
      draw({swap:new Set([j,j+1]),sorted});
      arr[j+1]=arr[j];j--;await sleep();
    }
    arr[j+1]=key;sorted.add(i);
  }
  draw({sorted:new Set(arr.map((_,i)=>i))});
}
async function mergeSort(){
  const sorted=new Set();
  async function ms(l,r){
    if(l>=r||!sorting)return;
    const m=Math.floor((l+r)/2);
    await ms(l,m);await ms(m+1,r);
    await merge(l,m,r);
  }
  async function merge(l,m,r){
    const left=arr.slice(l,m+1),right=arr.slice(m+1,r+1);
    let i=0,j=0,k=l;
    while(i<left.length&&j<right.length&&sorting){
      draw({compare:new Set([k]),sorted});await sleep();
      arr[k]=left[i]<=right[j]?left[i++]:right[j++];
      draw({swap:new Set([k]),sorted});await sleep();k++;
    }
    while(i<left.length&&sorting){arr[k]=left[i++];draw({swap:new Set([k]),sorted});await sleep();k++;}
    while(j<right.length&&sorting){arr[k]=right[j++];draw({swap:new Set([k]),sorted});await sleep();k++;}
    if(l===0&&r===arr.length-1)for(let x=l;x<=r;x++)sorted.add(x);
  }
  await ms(0,arr.length-1);
  draw({sorted:new Set(arr.map((_,i)=>i))});
}
async function quickSort(){
  const sorted=new Set();
  async function qs(lo,hi){
    if(lo>=hi||!sorting)return;
    const p=await partition(lo,hi);
    sorted.add(p);
    await qs(lo,p-1);await qs(p+1,hi);
  }
  async function partition(lo,hi){
    const pivot=arr[hi];let i=lo-1;
    for(let j=lo;j<hi;j++){
      if(!sorting)return lo;
      draw({compare:new Set([j,hi]),sorted});await sleep();
      if(arr[j]<pivot){
        i++;
        draw({swap:new Set([i,j]),sorted});
        [arr[i],arr[j]]=[arr[j],arr[i]];await sleep();
      }
    }
    [arr[i+1],arr[hi]]=[arr[hi],arr[i+1]];
    draw({swap:new Set([i+1,hi]),sorted});await sleep();
    return i+1;
  }
  await qs(0,arr.length-1);
  draw({sorted:new Set(arr.map((_,i)=>i))});
}

startBtn.addEventListener('click',async()=>{
  if(sorting){sorting=false;startBtn.textContent='▶ Sort';return;}
  sorting=true;startBtn.textContent='⏹ Stop';
  const algo=algoSel.value;
  msg.textContent='Running '+algoSel.options[algoSel.selectedIndex].text+'...';
  if(algo==='bubble')await bubbleSort();
  else if(algo==='selection')await selectionSort();
  else if(algo==='insertion')await insertionSort();
  else if(algo==='merge')await mergeSort();
  else await quickSort();
  if(sorting)msg.textContent='✓ Sorting complete!';
  sorting=false;startBtn.textContent='▶ Sort';
});
shufBtn.addEventListener('click',()=>{if(!sorting)gen();});
sizeS.addEventListener('input',()=>{if(!sorting)gen();});
gen();
})();
