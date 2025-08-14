import { enhanceMasonry } from './modules/masonry.js';
import { fadeIn, showLoader, hideLoader } from './modules/animations.js';

const USER_NAME = 'Luna';

async function load(){
  showLoader();
  const res = await fetch('/public/js/data/mock-artworks.json');
  const all = await res.json();
  const mine = all.filter(a => a.artist === USER_NAME);
  hideLoader();
  render(mine);
}

function render(artworks){
  const list = document.querySelector('.masonry');
  const frag = document.createDocumentFragment();
  artworks.forEach((a,i)=>{
    const card = document.createElement('article');
    card.className = 'art-card';
    card.tabIndex = 0;
    card.innerHTML = `<img src="${a.thumb}" alt="${a.title} de ${a.artist}">`;
    card.addEventListener('click', ()=> location.href = `artwork.html?id=${a.id}`);
    card.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); card.click(); }});
    frag.appendChild(card);
    fadeIn(card, i*20);
  });
  list.appendChild(frag);
  document.getElementById('count').textContent = artworks.length;
  enhanceMasonry(list);
}

document.addEventListener('DOMContentLoaded', () => {
  anime({
    targets: '.profile-header',
    translateY: [-20, 0],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutQuad'
  });
  load();
});
