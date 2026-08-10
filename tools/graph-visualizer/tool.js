(function(){
'use strict';
const cv=document.getElementById('graph-canvas'),ctx=cv.getContext('2d');
const msg=document.getElementById('graph-msg');
let nodes=[],edges=[],selected=null,animating=false;

function resize(){cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
window.addEventListener('resize',()=>{resize();draw();});resize();

function draw(hlNodes,hlEdges){
  const W=cv.clientWidth,H=cv.clientHeight;
  ctx.clearRect(0,0,W,H);
  edges.forEach((e,i)=>{
    const a=nodes[e[0]],b=nodes[e[1]];
    const isHl=hlEdges&&hlEdges.has(i);
    ctx.strokeStyle=isHl?'#ffd54f':'#546e7a';ctx.lineWidth=isHl?3:1.5;
    ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
  });
  nodes.forEach((n,i)=>{
    const isHl=hlNodes&&hlNodes.has(i);
    const isSel=selected===i;
    ctx.beginPath();ctx.arc(n.x,n.y,16,0,Math.PI*2);
    ctx.fillStyle=isHl?'#66bb6a':isSel?'#ffd54f':'#37474f';ctx.fill();
    ctx.strokeStyle=isSel?'#ffd54f':'#4fc3f7';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle='#eee';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(n.label,n.x,n.y);
  });
}
function findNode(x,y){
  for(let i=0;i<nodes.length;i++){
    const dx=nodes[i].x-x,dy=nodes[i].y-y;
    if(dx*dx+dy*dy<400)return i;
  }
  return -1;
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

cv.addEventListener('click',function(e){
  if(animating)return;
  const rect=cv.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
  const idx=findNode(x,y);
  if(idx>=0){
    if(selected===null){selected=idx;draw();msg.textContent='Node "'+nodes[idx].label+'" selected. Click another node to connect.';}
    else if(selected!==idx){
      const exists=edges.some(e=>(e[0]===selected&&e[1]===idx)||(e[0]===idx&&e[1]===selected));
      if(!exists){edges.push([selected,idx]);msg.textContent='Edge created: '+nodes[selected].label+' ↔ '+nodes[idx].label;}
      else msg.textContent='Edge already exists.';
      selected=null;draw();
    } else {selected=null;draw();}
  } else {
    const label=String.fromCharCode(65+nodes.length%26)+(nodes.length>=26?Math.floor(nodes.length/26):'');
    nodes.push({x,y,label});
    selected=null;draw();
    msg.textContent='Added node "'+label+'". Click another node to connect.';
  }
});

async function bfs(){
  if(!nodes.length){msg.textContent='Add nodes first.';return;}
  animating=true;
  const visited=new Set(),order=[],queue=[0],edgeHl=new Set();
  visited.add(0);
  while(queue.length){
    const cur=queue.shift();
    order.push(cur);
    draw(new Set(order),edgeHl);
    await sleep(400);
    for(let i=0;i<edges.length;i++){
      const e=edges[i];
      let nb=-1;
      if(e[0]===cur&&!visited.has(e[1]))nb=e[1];
      if(e[1]===cur&&!visited.has(e[0]))nb=e[0];
      if(nb>=0){visited.add(nb);queue.push(nb);edgeHl.add(i);}
    }
  }
  msg.textContent='BFS complete: visited '+order.length+'/'+nodes.length+' nodes → '+order.map(i=>nodes[i].label).join(' → ');
  animating=false;
}
async function dfs(){
  if(!nodes.length){msg.textContent='Add nodes first.';return;}
  animating=true;
  const visited=new Set(),order=[],edgeHl=new Set();
  async function go(cur,parentEdge){
    visited.add(cur);order.push(cur);
    if(parentEdge>=0)edgeHl.add(parentEdge);
    draw(new Set(order),edgeHl);
    await sleep(400);
    for(let i=0;i<edges.length;i++){
      const e=edges[i];
      let nb=-1;
      if(e[0]===cur&&!visited.has(e[1]))nb=e[1];
      if(e[1]===cur&&!visited.has(e[0]))nb=e[0];
      if(nb>=0)await go(nb,i);
    }
  }
  await go(0,-1);
  msg.textContent='DFS complete: visited '+order.length+'/'+nodes.length+' nodes → '+order.map(i=>nodes[i].label).join(' → ');
  animating=false;
}

document.getElementById('graph-bfs').addEventListener('click',()=>{if(!animating)bfs();});
document.getElementById('graph-dfs').addEventListener('click',()=>{if(!animating)dfs();});
document.getElementById('graph-random').addEventListener('click',()=>{
  nodes=[];edges=[];selected=null;
  const W=cv.clientWidth,H=cv.clientHeight;
  for(let i=0;i<8;i++){
    nodes.push({x:60+Math.random()*(W-120),y:50+Math.random()*(H-100),label:String.fromCharCode(65+i)});
  }
  for(let i=0;i<10;i++){
    const a=Math.floor(Math.random()*8),b=Math.floor(Math.random()*8);
    if(a!==b&&!edges.some(e=>(e[0]===a&&e[1]===b)||(e[0]===b&&e[1]===a)))edges.push([a,b]);
  }
  draw();msg.textContent='Random graph generated with 8 nodes and '+edges.length+' edges.';
});
document.getElementById('graph-clear').addEventListener('click',()=>{
  nodes=[];edges=[];selected=null;draw();msg.textContent='Cleared. Click to add nodes.';
});
draw();
})();
