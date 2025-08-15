import { signElement } from '../protect-images.js';

export function initModal(){
  if(document.querySelector('.modal')) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Fechar">&times;</button>
      <img class="modal-img" alt="">
      <h3 class="modal-title"></h3>
      <p class="modal-artist"></p>
    </div>`;
  document.body.appendChild(modal);
  const close = () => {
    anime({
      targets: modal,
      opacity: [1,0],
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => modal.setAttribute('aria-hidden','true')
    });
  };
  modal.querySelector('.modal-backdrop').addEventListener('click', close);
  modal.querySelector('.modal-close').addEventListener('click', close);
}

export async function openModal(artwork){
  const modal = document.querySelector('.modal');
  if(!modal) return;
  const img = modal.querySelector('.modal-img');
  img.src = artwork.full || artwork.thumb;
  img.alt = artwork.title;
  await signElement(img);
  modal.querySelector('.modal-title').textContent = artwork.title;
  modal.querySelector('.modal-artist').textContent = `por ${artwork.artist}`;
  modal.setAttribute('aria-hidden','false');
  anime({ targets: modal, opacity: [0,1], duration:300, easing:'easeOutQuad' });
  anime({ targets: modal.querySelector('.modal-content'), scale:[0.95,1], opacity:[0,1], duration:300, easing:'easeOutQuad' });
}
