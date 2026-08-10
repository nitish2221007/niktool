(function(){
'use strict';
const cv=document.getElementById('grid-canvas'),ctx=cv.getContext('2d');
const msg=document.getElementById('grid-msg');
const COLS=30,ROWS=18;
let grid=[],start={r:9,c:2},end={r:9,c:27},running=false;

function initGrid(){
  grid=[];
  for(let r=0;r<ROWS;r++){grid[r]=[];for(let c=0;c<COLS;c++)grid[r][c]=0;}
}
function resize(){cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
window.addEventListener('resize',()=>{resize();draw();});resize();

function cellSize(){return{w:cv.clientWidth/COLS,h:cv.clientHeight/ROWS};}
function draw(visited,path){
  const {w,h}=cellSize();
  ctx.clearRect(0,0,cv.clientWidth,cv.clientHeight);
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      let color='#16213e';
      if(grid[r][c]===1)color='#37474f';
      if(visited&&visited.has(r+','+c))color='#4fc3f7';
      if(path&&path.has(r+','+c))color='#ffd54f';
      if(r===start.r&&c===start.c)color='#66bb6a';
      if(r===end.r&&c===end.c)color='#ef5350';
      ctx.fillStyle=color;
      ctx.fillRect(c*w+0.5,r*h+0.5,w-1,h-1);
    }
  }
}
cv.addEventListener('click',function(e){
  if(running)return;
  const rect=cv.getBoundingClientRect(),{w,h}=cellSize();
  const c=Math.floor((e.clientX-rect.left)/w),r=Math.floor((e.clientY-rect.top)/h);
  if(r<0||r>=ROWS||c<0||c>=COLS)return;
  if((r===start.r&&c===start.c)||(r===end.r&&c===end.c))return;
  grid[r][c]=grid[r][c]?0:1;
  draw();
});
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function neighbors(r,c){
  const res=[];
  if(r>0)res.push([r-1,c]);
  if(r<ROWS-1)res.push([r+1,c]);
  if(c>0)res.push([r,c-1]);
  if(c<COLS-1)res.push([r,c+1]);
  return res.filter(([rr,cc])=>grid[rr][cc]===0);
}

async function runBFS(){
  const visited=new Set(),prev={},queue=[[start.r,start.c]];
  visited.add(start.r+','+start.c);
  while(queue.length){
    const [r,c]=queue.shift();
    draw(visited);await sleep(15);
    if(r===end.r&&c===end.c)return{visited,prev};
    for(const[nr,nc]of neighbors(r,c)){
      const key=nr+','+nc;
      if(!visited.has(key)){
        visited.add(key);prev[key]=[r,c];queue.push([nr,nc]);
      }
    }
  }
  return{visited,prev};
}
async function runDFS(){
  const visited=new Set(),prev={},stack=[[start.r,start.c]];
  while(stack.length){
    const [r,c]=stack.pop();
    const key=r+','+c;
    if(visited.has(key))continue;
    visited.add(key);
    draw(visited);await sleep(15);
    if(r===end.r&&c===end.c)return{visited,prev};
    for(const[nr,nc]of neighbors(r,c).reverse()){
      const nk=nr+','+nc;
      if(!visited.has(nk)){prev[nk]=[r,c];stack.push([nr,nc]);}
    }
  }
  return{visited,prev};
}
function reconstruct(prev){
  const path=new Set();
  let cur=[end.r,end.c];
  while(cur){
    path.add(cur[0]+','+cur[1]);
    cur=prev[cur[0]+','+cur[1]];
  }
  return path;
}

document.getElementById('grid-run').addEventListener('click',async()=>{
  if(running)return;
  running=true;
  msg.textContent='Running '+(document.getElementById('algo-sel').value==='bfs'?'BFS':'DFS')+'...';
  const algo=document.getElementById('algo-sel').value;
  const result=algo==='bfs'?await runBFS():await runDFS();
  const path=reconstruct(result.prev);
  draw(result.visited,path);
  msg.textContent=path.size>1?'✓ Path found! Length: '+path.size+' cells. Visited: '+result.visited.size+' cells.':'✗ No path found. Visited: '+result.visited.size+' cells.';
  running=false;
});
document.getElementById('grid-wall').addEventListener('click',()=>{
  if(running)return;
  initGrid();
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
    if(Math.random()<0.28&&!(r===start.r&&c===start.c)&&!(r===end.r&&c===end.c))grid[r][c]=1;
  }
  draw();msg.textContent='Random walls placed. Press Run.';
});
document.getElementById('grid-clear').addEventListener('click',()=>{
  if(running)return;
  initGrid();draw();msg.textContent='Grid cleared.';
});
initGrid();draw();
})();
