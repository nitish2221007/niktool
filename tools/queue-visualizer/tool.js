(function(){
'use strict';
const queue=[],display=document.getElementById('queue-display'),emptyMsg=document.getElementById('queue-empty'),
      valIn=document.getElementById('queue-val'),msg=document.getElementById('queue-msg'),
      sizeEl=document.getElementById('queue-size'),frontEl=document.getElementById('queue-front'),rearEl=document.getElementById('queue-rear');

function render(hlIdx){
  display.innerHTML='';
  if(queue.length===0){display.appendChild(emptyMsg);emptyMsg.style.display='block';}
  else{
    emptyMsg.style.display='none';
    queue.forEach((v,i)=>{
      const el=document.createElement('div');
      el.style.cssText='min-width:60px;padding:12px 16px;text-align:center;border-radius:6px;font-weight:600;transition:all 0.3s;flex-shrink:0;';
      el.style.background=i===0?'#4fc3f7':i===queue.length-1?'#81c784':'#37474f';
      el.style.color=(i===0||i===queue.length-1)?'#111':'#eee';
      if(i===hlIdx){el.style.background='#ffd54f';el.style.color='#111';el.style.transform='scale(1.1)';}
      el.textContent=v;
      display.appendChild(el);
    });
  }
  sizeEl.textContent=queue.length;
  frontEl.textContent=queue.length?queue[0]:'—';
  rearEl.textContent=queue.length?queue[queue.length-1]:'—';
}
document.getElementById('enq-btn').addEventListener('click',()=>{
  const v=valIn.value.trim();
  if(!v){msg.textContent='Enter a value to enqueue.';return;}
  if(queue.length>=12){msg.textContent='Queue full! Max 12 elements for demo.';return;}
  queue.push(isNaN(v)?v:+v);
  render(queue.length-1);
  msg.textContent='Enqueued "'+v+'" at the rear.';
  valIn.value='';valIn.focus();
});
document.getElementById('deq-btn').addEventListener('click',()=>{
  if(!queue.length){msg.textContent='Queue underflow! Nothing to dequeue.';return;}
  const v=queue.shift();
  render(0);
  msg.textContent='Dequeued "'+v+'" from the front.';
});
document.getElementById('front-btn').addEventListener('click',()=>{
  if(!queue.length){msg.textContent='Queue is empty.';return;}
  render(0);msg.textContent='Front element: "'+queue[0]+'"';
});
document.getElementById('queue-clear').addEventListener('click',()=>{
  queue.length=0;render();msg.textContent='Queue cleared.';
});
render();
})();
