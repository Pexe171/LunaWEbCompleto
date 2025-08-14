import { enhanceMasonry } from './modules/masonry.js';
import { fadeIn, showLoader, hideLoader, pageIntro, parallaxOnScroll } from './modules/animations-extended.js';

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
  pageIntro('.profile-header', ['.title', '.bio', '.stats', '.edit-form']);
  parallaxOnScroll('.profile-header', 0.05);
  load();
});
