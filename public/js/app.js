import { enhanceMasonry } from './modules/masonry.js';
import { fadeIn, likeBurst, staggerFadeIn, rotateOnHover, colorTransition, showLoader, hideLoader } from './modules/animations-extended.js';
import { toggleLike, isLiked } from './modules/ui.js';

const state = { q:'', tag:'Tudo', artworks:[] };

async function load(){
  showLoader();
  const res = await fetch('/public/js/data/mock-artworks.json');
  state.artworks = await res.json();
  hideLoader();
  render();
}

function render(){
  const list = document.querySelector('.masonry');
  const placeholder = document.querySelector('.gallery-placeholder');
  list.innerHTML = '';
  const filtered = state.artworks.filter(a =>
    (state.tag==='Tudo' || a.tags.includes(state.tag.toLowerCase())) &&
    (a.title.toLowerCase().includes(state.q) || a.artist.toLowerCase().includes(state.q) || a.tags.join(' ').includes(state.q))
  );

  if(filtered.length === 0){
    placeholder.hidden = false;
    list.style.display = 'none';
    return;
  }

  placeholder.hidden = true;
  list.style.display = '';

  const frag = document.createDocumentFragment();
  filtered.forEach((a,i)=>{
    const card = document.createElement('article');
    card.className='art-card';
    card.tabIndex=0;
    const liked = isLiked(a.id);
    card.innerHTML = `
      <img src="${a.thumb}" alt="${a.title} de ${a.artist}">
      <div class="overlay">
        <h3 class="title">${a.title}</h3>
        <p class="artist">por ${a.artist}</p>
        <button class="like ${liked?'is-liked':''}" aria-label="Curtir">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-4.35-9-7.5S-.5 5.5 2.25 3.75C5-1 12 4.5 12 4.5S19-1 21.75 3.75 21 13.5 12 21z"/></svg>
        </button>
      </div>`;
    const likeBtn = card.querySelector('.like');
    likeBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleLike(a.id);
      likeBtn.classList.toggle('is-liked');
      likeBurst(likeBtn);
    });
    card.addEventListener('click', ()=> location.href = `artwork.html?id=${a.id}`);
    card.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); card.click(); }});
    frag.appendChild(card);
    fadeIn(card, i*20);
  });
  list.appendChild(frag);
  enhanceMasonry(list);
  staggerFadeIn('.masonry', '.art-card');
  rotateOnHover('.art-card .like');
  colorTransition('.chip.is-active', {
    backgroundColor: ['#934232', '#b95d4a']
  });
}

function bindUI(){
  document.querySelectorAll('.chip').forEach(ch=>{
    ch.addEventListener('click', ()=>{
      document.querySelector('.chip.is-active')?.classList.remove('is-active');
      ch.classList.add('is-active');
      state.tag = ch.textContent.trim();
      render();
    });
  });
  const search = document.querySelector('input[type="search"]');
  search.addEventListener('input', e=>{ state.q = e.target.value.toLowerCase(); render(); });
}

document.addEventListener('DOMContentLoaded', ()=>{ bindUI(); load(); });
