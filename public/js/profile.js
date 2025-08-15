import { enhanceMasonry } from './modules/masonry.js';
import { fadeIn, showLoader, hideLoader, pageIntro, parallaxOnScroll, likeBurst, rotateOnHover } from './modules/animations-extended.js';
import { signElement } from './protect-images.js';
import { toggleLike, isLiked } from './modules/ui.js';

const USER_NAME = 'Luna';

async function load(){
  showLoader();
  const res = await fetch('/public/js/data/mock-artworks.json');
  const all = await res.json();
  const mine = all.filter(a => a.artist === USER_NAME);
  hideLoader();
  await render(mine);
}

  async function render(artworks){
    const list = document.querySelector('.masonry');
    const frag = document.createDocumentFragment();
    for (const [i, a] of artworks.entries()){
      const card = document.createElement('article');
      card.className = 'art-card';
      card.tabIndex = 0;
      const liked = isLiked(a.id);
      card.innerHTML = `
        <img data-protected-src="${a.thumb}" alt="${a.title}">
        <div class="card-footer">
          <div class="actions">
            <button class="like ${liked?'is-liked':''}" aria-label="Curtir">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-4.35-9-7.5S-.5 5.5 2.25 3.75C5-1 12 4.5 12 4.5S19-1 21.75 3.75 21 13.5 12 21z"/></svg>
            </button>
            <button class="comment" aria-label="Comentar">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h12l4 4V6z"/></svg>
            </button>
          </div>
          <p class="caption"><strong>${a.title}</strong></p>
        </div>`;
      const img = card.querySelector('img');
      await signElement(img);
      const likeBtn = card.querySelector('.like');
      likeBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        toggleLike(a.id);
        likeBtn.classList.toggle('is-liked');
        likeBurst(likeBtn);
      });
      card.addEventListener('click', (e)=>{ if(e.target.closest('button')) return; location.href = `artwork.html?id=${a.id}`; });
      card.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); card.click(); }});
      frag.appendChild(card);
      fadeIn(card, i*20);
    }
    list.appendChild(frag);
    document.getElementById('count').textContent = artworks.length;
    enhanceMasonry(list);
    rotateOnHover('.art-card .like');
  }

document.addEventListener('DOMContentLoaded', () => {
  pageIntro('.profile-header', ['.title', '.bio', '.stats', '.edit-form']);
  parallaxOnScroll('.profile-header', 0.05);
  load();
});
