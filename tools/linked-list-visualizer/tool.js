(function(){
'use strict';
let list=[];
const display=document.getElementById('ll-display'),msg=document.getElementById('ll-msg'),
      valIn=document.getElementById('ll-val'),countEl=document.getElementById('ll-count');

function render(hlIdx){
  display.innerHTML='';
  if(!list.length){display.innerHTML='<span style="opacity:0.4;">Empty list — add nodes to begin</span>';countEl.textContent='0';return;}
  list.forEach((v,i)=>{
    const node=document.createElement('div');
    node.style.cssText='display:flex;align-items:center;';
    const box=document.createElement('div');
    box.style.cssText='padding:10px 16px;border-radius:6px;font-weight:600;background:'+(i===hlIdx?'#ffd54f':'#37474f')+';color:'+(i===hlIdx?'#111':'#eee')+';transition:all 0.3s;';
    box.textContent=v;
    const arrow=document.createElement('span');
    arrow.style.cssText='margin:0 6px;opacity:0.5;font-size:1.2rem;';
    arrow.textContent=i<list.length-1?'→':'→ ∅';
    node.appendChild(box);node.appendChild(arrow);
    display.appendChild(node);
  });
  countEl.textContent=list.length;
}
document.getElementById('ll-add').addEventListener('click',()=>{
  const v=valIn.value.trim();if(!v){msg.textContent='Enter a value.';return;}
  list.push(+v||v);render(list.length-1);msg.textContent='Added "'+v+'" at the end.';valIn.value='';valIn.focus();
});
document.getElementById('ll-add-front').addEventListener('click',()=>{
  const v=valIn.value.trim();if(!v){msg.textContent='Enter a value.';return;}
  list.unshift(+v||v);render(0);msg.textContent='Added "'+v+'" at the front.';valIn.value='';valIn.focus();
});
document.getElementById('ll-del').addEventListener('click',()=>{
  if(!list.length){msg.textContent='List is empty.';return;}
  const v=list.pop();render();msg.textContent='Deleted "'+v+'" from the end.';
});
document.getElementById('ll-reverse').addEventListener('click',()=>{
  if(!list.length){msg.textContent='Nothing to reverse.';return;}
  list.reverse();render();msg.textContent='List reversed! Pointers updated.';
});
document.getElementById('ll-clear').addEventListener('click',()=>{
  list=[];render();msg.textContent='List cleared.';
});
render();
})();
