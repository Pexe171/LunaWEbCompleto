export function enhanceMasonry(container){
  if(!container) return;
  const imgs = container.querySelectorAll('img');
  let pending = imgs.length; if(!pending){container.style.opacity='1';return;}
  const relayout = () => { container.style.opacity = '1'; };
  imgs.forEach(img=>{
    if(img.complete){ if(--pending===0) relayout(); }
    else img.addEventListener('load', ()=>{ if(--pending===0) relayout(); });
    img.addEventListener('error', ()=>{ if(--pending===0) relayout(); });
  });
}
