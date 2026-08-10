(function(){
'use strict';
const stack=[],display=document.getElementById('stack-display'),emptyMsg=document.getElementById('stack-empty'),
      valIn=document.getElementById('stack-val'),msg=document.getElementById('stack-msg'),
      sizeEl=document.getElementById('stack-size'),topEl=document.getElementById('stack-top');

function render(highlightIdx){
  display.innerHTML='';
  if(stack.length===0){
    emptyMsg.style.display='block';
  } else {
    emptyMsg.style.display='none';
    stack.forEach((v,i)=>{
      const el=document.createElement('div');
      el.style.cssText='width:160px;padding:10px;text-align:center;border-radius:6px;font-weight:600;font-size:1rem;transition:all 0.3s;';
      el.style.background=i===stack.length-1?'#4fc3f7':'#37474f';
      el.style.color=i===stack.length-1?'#111':'#eee';
      if(i===highlightIdx){el.style.background='#ffd54f';el.style.color='#111';el.style.transform='scale(1.1)';}
      el.textContent=v;
      display.appendChild(el);
    });
  }
  sizeEl.textContent=stack.length;
  topEl.textContent=stack.length?stack[stack.length-1]:'—';
}

document.getElementById('push-btn').addEventListener('click',()=>{
  const v=valIn.value.trim();
  if(!v){msg.textContent='Enter a value to push.';return;}
  if(stack.length>=10){msg.textContent='Stack overflow! Max 10 elements for demo.';return;}
  stack.push(isNaN(v)?v:+v);
  render(stack.length-1);
  msg.textContent='Pushed "'+v+'" onto the stack.';
  valIn.value='';valIn.focus();
});
document.getElementById('pop-btn').addEventListener('click',()=>{
  if(stack.length===0){msg.textContent='Stack underflow! Nothing to pop.';return;}
  const v=stack.pop();
  render();
  msg.textContent='Popped "'+v+'" from the stack.';
});
document.getElementById('peek-btn').addEventListener('click',()=>{
  if(stack.length===0){msg.textContent='Stack is empty.';return;}
  render(stack.length-1);
  msg.textContent='Top element: "'+stack[stack.length-1]+'"';
});
document.getElementById('stack-clear').addEventListener('click',()=>{
  stack.length=0;render();msg.textContent='Stack cleared.';
});
render();
})();
