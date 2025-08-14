export function fadeIn(el, delay = 0) {
  anime({
    targets: el,
    opacity: [0, 1],
    translateY: [8, 0],
    duration: 500,
    easing: 'easeOutQuad',
    delay
  });
}

export function likeBurst(el) {
  anime({
    targets: el,
    scale: [1, 1.3, 1],
    duration: 500,
    easing: 'easeOutElastic(1, .5)'
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
