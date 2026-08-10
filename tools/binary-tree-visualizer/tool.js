(function(){
'use strict';
const cv=document.getElementById('tree-canvas'),ctx=cv.getContext('2d');
const msg=document.getElementById('tree-msg'),valIn=document.getElementById('tree-val'),
      travSel=document.getElementById('traversal-sel'),outEl=document.getElementById('traversal-output');
let root=null,traversing=false;

function resize(){cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
window.addEventListener('resize',()=>{resize();drawTree();});resize();

function Node(v){return{val:v,left:null,right:null,x:0,y:0};}
function insert(root,v){
  if(!root)return Node(v);
  if(v<root.val)root.left=insert(root.left,v);
  else if(v>root.val)root.right=insert(root.right,v);
  return root;
}
function computePos(node,x,y,dx){
  if(!node)return;
  node.x=x;node.y=y;
  computePos(node.left,x-dx,y+60,dx/2);
  computePos(node.right,x+dx,y+60,dx/2);
}
function drawTree(hl){
  ctx.clearRect(0,0,cv.clientWidth,cv.clientHeight);
  if(!root){ctx.fillStyle='#555';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('Insert values to build a tree',cv.clientWidth/2,cv.clientHeight/2);return;}
  computePos(root,cv.clientWidth/2,35,cv.clientWidth/4);
  function drawEdges(n){
    if(!n)return;
    if(n.left){ctx.strokeStyle='#546e7a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(n.left.x,n.left.y);ctx.stroke();drawEdges(n.left);}
    if(n.right){ctx.strokeStyle='#546e7a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(n.right.x,n.right.y);ctx.stroke();drawEdges(n.right);}
  }
  function drawNodes(n){
    if(!n)return;
    const isHl=hl&&hl.includes(n.val);
    ctx.beginPath();ctx.arc(n.x,n.y,18,0,Math.PI*2);
    ctx.fillStyle=isHl?'#ffd54f':'#37474f';ctx.fill();
    ctx.strokeStyle=isHl?'#ffd54f':'#4fc3f7';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle=isHl?'#111':'#eee';ctx.font='bold 13px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(n.val,n.x,n.y);
    drawNodes(n.left);drawNodes(n.right);
  }
  drawEdges(root);drawNodes(root);
}
function getTraversal(type){
  const res=[];
  function ino(n){if(!n)return;ino(n.left);res.push(n.val);ino(n.right);}
  function pre(n){if(!n)return;res.push(n.val);pre(n.left);pre(n.right);}
  function post(n){if(!n)return;post(n.left);post(n.right);res.push(n.val);}
  function level(){if(!root)return;const q=[root];while(q.length){const n=q.shift();res.push(n.val);if(n.left)q.push(n.left);if(n.right)q.push(n.right);}}
  if(type==='inorder')ino(root);
  else if(type==='preorder')pre(root);
  else if(type==='postorder')post(root);
  else level();
  return res;
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

document.getElementById('tree-insert').addEventListener('click',()=>{
  const v=parseInt(valIn.value);
  if(isNaN(v)){msg.textContent='Enter a valid number.';return;}
  root=insert(root,v);drawTree();msg.textContent='Inserted '+v+'.';valIn.value='';valIn.focus();
});
document.getElementById('tree-traverse').addEventListener('click',async()=>{
  if(!root){msg.textContent='Tree is empty. Insert some values first.';return;}
  if(traversing)return;
  traversing=true;
  const seq=getTraversal(travSel.value);
  outEl.textContent='';
  msg.textContent='Traversing ('+travSel.value+')...';
  for(let i=0;i<seq.length;i++){
    drawTree(seq.slice(0,i+1));
    outEl.textContent=seq.slice(0,i+1).join(' → ');
    await sleep(500);
  }
  msg.textContent='✓ Traversal complete: '+seq.length+' nodes visited.';
  traversing=false;
});
document.getElementById('tree-random').addEventListener('click',()=>{
  root=null;
  const vals=new Set();
  while(vals.size<9)vals.add(Math.floor(Math.random()*99)+1);
  vals.forEach(v=>{root=insert(root,v);});
  drawTree();outEl.textContent='';msg.textContent='Random BST generated with 9 nodes.';
});
document.getElementById('tree-clear').addEventListener('click',()=>{
  root=null;drawTree();outEl.textContent='';msg.textContent='Tree cleared.';
});
drawTree();
})();
