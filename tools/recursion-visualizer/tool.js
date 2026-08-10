(function(){
'use strict';
const cv=document.getElementById('rec-canvas'),ctx=cv.getContext('2d');
const msg=document.getElementById('rec-msg'),funcSel=document.getElementById('rec-func'),nIn=document.getElementById('rec-n');
let nodes=[],edges=[],running=false;

function resize(){cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
window.addEventListener('resize',()=>{resize();draw();});resize();

function draw(hlIdx){
  ctx.clearRect(0,0,cv.clientWidth,cv.clientHeight);
  edges.forEach(([a,b])=>{
    ctx.strokeStyle='#546e7a';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(nodes[a].x,nodes[a].y);ctx.lineTo(nodes[b].x,nodes[b].y);ctx.stroke();
  });
  nodes.forEach((n,i)=>{
    const isHl=hlIdx===i;
    ctx.beginPath();ctx.arc(n.x,n.y,14,0,Math.PI*2);
    ctx.fillStyle=isHl?'#ffd54f':n.done?'#66bb6a':'#37474f';ctx.fill();
    ctx.strokeStyle=isHl?'#ffd54f':'#4fc3f7';ctx.lineWidth=1.5;ctx.stroke();
    ctx.fillStyle=isHl?'#111':'#ddd';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(n.label,n.x,n.y);
  });
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function buildTree(){
  nodes=[];edges=[];
  const func=funcSel.value;
  const n=Math.min(12,Math.max(1,parseInt(nIn.value)||1));
  let nodeIdx=0;

  function layout(node,depth){
    if(!node)return{x:0,w:0};
    if(!node.children.length){
      node.w=30;
    } else {
      let total=0;
      node.children.forEach(c=>{total+=layout(c,depth+1).w;});
      node.w=Math.max(total,30);
    }
    return{w:node.w};
  }
  function position(node,cx,depth){
    node.x=cx;node.y=35+depth*55;
    if(!node.children.length)return;
    let startX=cx-node.w/2;
    node.children.forEach(c=>{
      position(c,startX+c.w/2,depth+1);
      startX+=c.w;
    });
  }

  async function buildFib(n,parentIdx,depth){
    const idx=nodeIdx++;
    nodes.push({label:'f('+n+')',x:0,y:0,done:false,children:[]});
    if(parentIdx>=0){edges.push([parentIdx,idx]);nodes[parentIdx].children.push(nodes[idx]);}
    draw(idx);await sleep(120);
    if(n<=1){nodes[idx].done=true;draw(idx);await sleep(60);return idx;}
    await buildFib(n-1,idx,depth+1);
    await buildFib(n-2,idx,depth+1);
    nodes[idx].done=true;draw(idx);await sleep(60);
    return idx;
  }
  async function buildFact(n,parentIdx,depth){
    const idx=nodeIdx++;
    nodes.push({label:n+'!',x:0,y:0,done:false,children:[]});
    if(parentIdx>=0){edges.push([parentIdx,idx]);nodes[parentIdx].children.push(nodes[idx]);}
    draw(idx);await sleep(200);
    if(n<=1){nodes[idx].done=true;draw(idx);await sleep(100);return idx;}
    await buildFact(n-1,idx,depth+1);
    nodes[idx].done=true;draw(idx);await sleep(100);
    return idx;
  }
  async function buildPow(x,n,parentIdx,depth){
    const idx=nodeIdx++;
    nodes.push({label:x+'^'+n,x:0,y:0,done:false,children:[]});
    if(parentIdx>=0){edges.push([parentIdx,idx]);nodes[parentIdx].children.push(nodes[idx]);}
    draw(idx);await sleep(150);
    if(n===0){nodes[idx].done=true;draw(idx);await sleep(80);return idx;}
    await buildPow(x,n-1,idx,depth+1);
    nodes[idx].done=true;draw(idx);await sleep(80);
    return idx;
  }

  msg.textContent='Building call tree...';
  if(func==='fib')await buildFib(n,-1,0);
  else if(func==='fact')await buildFact(n,-1,0);
  else await buildPow(2,Math.min(n,10),-1,0);

  // Layout & final draw
  const root=nodes[0];
  layout(root,0);
  position(root,cv.clientWidth/2,0);
  draw();
  msg.textContent='✓ Call tree complete: '+nodes.length+' recursive calls.';
}

document.getElementById('rec-run').addEventListener('click',async()=>{
  if(running)return;
  running=true;
  await buildTree();
  running=false;
});
document.getElementById('rec-clear').addEventListener('click',()=>{
  if(running)return;
  nodes=[];edges=[];draw();msg.textContent='Cleared.';
});
draw();
})();
