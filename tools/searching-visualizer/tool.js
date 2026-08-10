(function(){
'use strict';
const cv=document.getElementById('search-canvas'),ctx=cv.getContext('2d');
const msg=document.getElementById('search-msg'),searchBtn=document.getElementById('search-btn'),
      newBtn=document.getElementById('new-arr-btn'),targetIn=document.getElementById('target-input'),
      typeSel=document.getElementById('search-type'),spd=document.getElementById('spd');
let arr=[],searching=false;

function resize(){cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);}
window.addEventListener('resize',()=>{resize();draw();});resize();

function gen(){
  arr=[];for(let i=0;i<25;i++)arr.push(Math.floor(Math.random()*99)+1);
  draw();msg.textContent='Array ready. Pick a target and press Search.';
}
function draw(hl={}){
  const W=cv.clientWidth,H=cv.clientHeight,n=arr.length,bw=W/n;
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<n;i++){
    let c='#4fc3f7';
    if(hl.checked&&hl.checked.has(i))c='#90a4ae';
    if(hl.current===i)c='#ef5350';
    if(hl.found===i)c='#66bb6a';
    if(hl.range&&hl.range.has(i))c='#ffd54f';
    ctx.fillStyle=c;
    const bh=(arr[i]/100)*(H-50);
    ctx.fillRect(i*bw+2,H-30-bh,bw-4,bh);
    ctx.fillStyle='#eee';ctx.font='11px sans-serif';ctx.textAlign='center';
    ctx.fillText(arr[i],i*bw+bw/2,H-10);
  }
}
function sleep(){return new Promise(r=>setTimeout(r,500-(+spd.value)*4.5));}

async function linearSearch(t){
  const checked=new Set();
  for(let i=0;i<arr.length;i++){
    if(!searching)return;
    draw({checked,current:i});await sleep();
    if(arr[i]===t){draw({found:i});msg.textContent='✓ Found '+t+' at index '+i+' after '+(i+1)+' comparisons!';return;}
    checked.add(i);
  }
  msg.textContent='✗ '+t+' not found after '+arr.length+' comparisons.';
}
async function binarySearch(t){
  arr.sort((a,b)=>a-b);draw();
  await sleep();
  let lo=0,hi=arr.length-1,steps=0;
  while(lo<=hi&&searching){
    const mid=Math.floor((lo+hi)/2);steps++;
    const range=new Set();for(let x=lo;x<=hi;x++)range.add(x);
    draw({range,current:mid});await sleep();
    if(arr[mid]===t){draw({found:mid});msg.textContent='✓ Found '+t+' at index '+mid+' in '+steps+' steps (Binary Search)!';return;}
    if(arr[mid]<t)lo=mid+1;else hi=mid-1;
  }
  msg.textContent='✗ '+t+' not found after '+steps+' steps.';
}

searchBtn.addEventListener('click',async()=>{
  if(searching){searching=false;searchBtn.textContent='🔍 Search';return;}
  const t=parseInt(targetIn.value);
  if(isNaN(t)){msg.textContent='Enter a valid target number.';return;}
  searching=true;searchBtn.textContent='⏹ Stop';
  msg.textContent='Searching for '+t+'...';
  if(typeSel.value==='linear')await linearSearch(t);
  else await binarySearch(t);
  searching=false;searchBtn.textContent='🔍 Search';
});
newBtn.addEventListener('click',()=>{if(!searching)gen();});
typeSel.addEventListener('change',()=>{
  if(typeSel.value==='binary'){arr.sort((a,b)=>a-b);draw();msg.textContent='Array sorted for Binary Search.';}
});
gen();
})();
