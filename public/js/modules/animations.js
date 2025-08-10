export function fadeIn(el, delay=0){
  el.style.opacity = 0;
  el.style.transform = 'translateY(8px)';
  requestAnimationFrame(()=>{
    el.style.transition = `opacity var(--dur) var(--easing) ${delay}ms, transform var(--dur) var(--easing) ${delay}ms`;
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  });
}

export function showLoader(){
  const loader = document.querySelector('.loader');
  if(loader) loader.hidden = false;
}
export function hideLoader(){
  const loader = document.querySelector('.loader');
  if(loader) loader.hidden = true;
}
