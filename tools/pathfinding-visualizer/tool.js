(function(){
'use strict';
const cv=document.getElementById('pf-canvas'),ctx=cv.getContext('2d');
const msg=document.getElementById('pf-msg'),statsEl=document.getElementById('pf-stats'),timeEl=document.getElementById('pf-time');
const COLS=40,ROWS=22;
let grid=[],start={r:11,c:3},end={r:11,c:36},running=false,mouseDown=false;

function initGrid(){grid=[];for(let r=0;r<ROWS;r++){grid[r]=[];for(let c=0;c<COLS;c++)grid[r][c]=0;}}
function resize(){cv.width=cv.clientWidth*devicePixelRatio;cv.height=cv.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
window.addEventListener('resize',()=>{resize();draw();});resize();
function cellW(){return cv.clientWidth/COLS;}
function cellH(){return cv.clientHeight/ROWS;}

function draw(visited,path){
  const w=cellW(),h=cellH();
  ctx.clearRect(0,0,cv.clientWidth,cv.clientHeight);
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      let color='#16213e';
      if(grid[r][c]===1)color='#37474f';
      if(visited&&visited.has(r*COLS+c))color='#4fc3f7';
      if(path&&path.has(r*COLS+c))color='#ffd54f';
      if(r===start.r&&c===start.c)color='#66bb6a';
      if(r===end.r&&c===end.c)color='#ef5350';
      ctx.fillStyle=color;
      ctx.fillRect(c*w+0.5,r*h+0.5,w-1,h-1);
    }
  }
}
function cellFromEvent(e){
  const rect=cv.getBoundingClientRect();
  return{c:Math.floor((e.clientX-rect.left)/cellW()),r:Math.floor((e.clientY-rect.top)/cellH())};
}
cv.addEventListener('mousedown',e=>{mouseDown=true;toggleWall(e);});
cv.addEventListener('mousemove',e=>{if(mouseDown)toggleWall(e);});
cv.addEventListener('mouseup',()=>mouseDown=false);
cv.addEventListener('mouseleave',()=>mouseDown=false);
function toggleWall(e){
  if(running)return;
  const{r,c}=cellFromEvent(e);
  if(r<0||r>=ROWS||c<0||c>=COLS)return;
  if((r===start.r&&c===start.c)||(r===end.r&&c===end.c))return;
  grid[r][c]=grid[r][c]?0:1;
  draw();
}
function neighbors(r,c){
  const res=[];
  if(r>0)res.push([r-1,c]);if(r<ROWS-1)res.push([r+1,c]);
  if(c>0)res.push([r,c-1]);if(c<COLS-1)res.push([r,c+1]);
  return res.filter(([rr,cc])=>grid[rr][cc]===0);
}
function manhattan(r,c){return Math.abs(r-end.r)+Math.abs(c-end.c);}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function runAlgo(algo){
  const visited=new Set(),prev=new Map();
  const sk=start.r*COLS+start.c,ek=end.r*COLS+end.c;
  let found=false;

  if(algo==='bfs'||algo==='dfs'){
    const container=algo==='bfs'?[[start.r,start.c]]:[[start.r,start.c]];
    const isQueue=algo==='bfs';
    visited.add(sk);
    while(container.length){
      const[r,c]=isQueue?container.shift():container.pop();
      const k=r*COLS+c;
      draw(visited);await sleep(8);
      if(r===end.r&&c===end.c){found=true;break;}
      for(const[nr,nc]of neighbors(r,c)){
        const nk=nr*COLS+nc;
        if(!visited.has(nk)){
          visited.add(nk);prev.set(nk,[r,c]);
          if(isQueue)container.push([nr,nc]);else container.push([nr,nc]);
        }
      }
    }
  } else {
    // Dijkstra & A* (uniform weight=1 for grid)
    const dist=new Array(ROWS*COLS).fill(Infinity);
    dist[sk]=0;
    const open=[[0,start.r,start.c]];
    while(open.length){
      open.sort((a,b)=>a[0]-b[0]);
      const[_,r,c]=open.shift();
      const k=r*COLS+c;
      if(visited.has(k))continue;
      visited.add(k);
      draw(visited);await sleep(8);
      if(r===end.r&&c===end.c){found=true;break;}
      for(const[nr,nc]of neighbors(r,c)){
        const nk=nr*COLS+nc;
        const nd=dist[k]+1;
        if(nd<dist[nk]){
          dist[nk]=nd;prev.set(nk,[r,c]);
          const h=algo==='astar'?manhattan(nr,nc):0;
          open.push([nd+h,nr,nc]);
        }
      }
    }
  }

  // Reconstruct path
  const path=new Set();
  if(found){
    let cur=[end.r,end.c];
    while(cur){
      path.add(cur[0]*COLS+cur[1]);
      cur=prev.get(cur[0]*COLS+cur[1]);
    }
  }
  draw(visited,path);
  statsEl.textContent='Nodes visited: '+visited.size+' | Path length: '+(path.size||0);
  return found;
}

document.getElementById('pf-run').addEventListener('click',async()=>{
  if(running)return;
  running=true;
  const algo=document.getElementById('pf-algo').value;
  const names={bfs:'BFS',dfs:'DFS',dijkstra:'Dijkstra',astar:'A*'};
  msg.textContent='Running '+names[algo]+'...';
  const t0=performance.now();
  const found=await runAlgo(algo);
  const t1=performance.now();
  timeEl.textContent='Time: '+(t1-t0).toFixed(1)+' ms';
  msg.textContent=found?'✓ '+names[algo]+' found a path!':'✗ '+names[algo]+' could not find a path.';
  running=false;
});
document.getElementById('pf-maze').addEventListener('click',()=>{
  if(running)return;
  initGrid();
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
    if(Math.random()<0.3&&!(r===start.r&&c===start.c)&&!(r===end.r&&c===end.c))grid[r][c]=1;
  }
  draw();msg.textContent='Random maze generated.';
});
document.getElementById('pf-clear').addEventListener('click',()=>{
  if(running)return;
  draw();msg.textContent='Path cleared. Walls remain.';
});
document.getElementById('pf-reset').addEventListener('click',()=>{
  if(running)return;
  initGrid();draw();statsEl.textContent='';timeEl.textContent='';msg.textContent='Grid reset.';
});
initGrid();draw();
})();
