(function(){
'use strict';
const KEY='niktool_dsa_progress';
const DEFAULT_TOPICS=[
  'Arrays & Hashing','Two Pointers','Sliding Window','Stack','Binary Search',
  'Linked List','Trees','Tries','Heap / Priority Queue','Backtracking',
  'Graphs (BFS/DFS)','Dynamic Programming (1D)','Dynamic Programming (2D)','Greedy','Intervals','Bit Manipulation','Advanced DP','Math & Geometry'
];
let topics=[],done={};
function load(){
  try{
    const raw=localStorage.getItem(KEY);
    if(raw){const d=JSON.parse(raw);topics=d.topics||[...DEFAULT_TOPICS];done=d.done||{};}
    else{topics=[...DEFAULT_TOPICS];done={};}
  }catch(e){topics=[...DEFAULT_TOPICS];done={};}
}
function save(){localStorage.setItem(KEY,JSON.stringify({topics,done}));}

const listEl=document.getElementById('topic-list'),msgEl=document.getElementById('tracker-msg'),
      statDone=document.getElementById('stat-done'),statPend=document.getElementById('stat-pending'),
      statPct=document.getElementById('stat-pct'),customIn=document.getElementById('custom-topic');

function render(){
  listEl.innerHTML='';
  let dc=0;
  topics.forEach((t,i)=>{
    const isDone=!!done[t];
    if(isDone)dc++;
    const row=document.createElement('div');
    row.style.cssText='display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0.8rem;border-radius:6px;background:rgba(255,255,255,0.04);';
    if(isDone)row.style.opacity='0.6';
    const cb=document.createElement('input');
    cb.type='checkbox';cb.checked=isDone;
    cb.style.cssText='width:18px;height:18px;cursor:pointer;';
    cb.addEventListener('change',()=>{
      done[t]=cb.checked;save();render();
      msgEl.textContent=cb.checked?'✓ "'+t+'" marked complete!':'"'+t+'" marked incomplete.';
    });
    const label=document.createElement('span');
    label.textContent=(i+1)+'. '+t;
    label.style.cssText='flex:1;'+(isDone?'text-decoration:line-through;':'');
    const del=document.createElement('button');
    del.textContent='✕';del.style.cssText='background:none;border:none;color:#ef5350;cursor:pointer;font-size:0.9rem;opacity:0.5;';
    del.addEventListener('click',()=>{
      topics.splice(i,1);delete done[t];save();render();
      msgEl.textContent='Removed "'+t+'".';
    });
    row.appendChild(cb);row.appendChild(label);row.appendChild(del);
    listEl.appendChild(row);
  });
  const total=topics.length,pending=total-dc;
  statDone.textContent=dc;statPend.textContent=pending;
  statPct.textContent=total?Math.round(dc/total*100)+'%':'0%';
}

document.getElementById('add-topic-btn').addEventListener('click',()=>{
  const v=customIn.value.trim();
  if(!v){msgEl.textContent='Enter a topic name.';return;}
  if(topics.includes(v)){msgEl.textContent='Topic already exists.';return;}
  topics.push(v);save();render();customIn.value='';
  msgEl.textContent='Added "'+v+'".';
});
document.getElementById('reset-progress').addEventListener('click',()=>{
  if(confirm('Reset all progress? This cannot be undone.')){
    topics=[...DEFAULT_TOPICS];done={};save();render();
    msgEl.textContent='Progress reset to defaults.';
  }
});
load();render();
})();
