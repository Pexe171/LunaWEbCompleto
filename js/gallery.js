/**
 * Renderiza cards estilo Instagram dentro de um container .gallery
 * @param {Array<{img:string, alt:string, user:string, avatar:string, likes:number, caption:string, overlay?:string}>} posts
 * @param {HTMLElement} root
 */
export function renderGallery(posts, root = document.querySelector('.gallery')) {
  if (!root) return;
  root.innerHTML = posts.map(p => `
    <article class="card">
      <div class="card__top">
        <img class="card__avatar" src="${p.avatar}" alt="Avatar de ${p.user}">
        <span class="card__user">${p.user}</span>
      </div>
      <div class="card__media">
        <img src="${p.img}" alt="${p.alt}">
        <div class="card__overlay" aria-hidden="true">
          <p>${p.overlay ?? ''}</p>
        </div>
      </div>
      <div class="card__actions">
        <div class="actions__left">
          <button class="iconbtn" aria-label="Curtir" title="Curtir">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button class="iconbtn" aria-label="Comentar" title="Comentar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
            </svg>
          </button>
          <button class="iconbtn" aria-label="Compartilhar" title="Compartilhar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.5"/>
            </svg>
          </button>
        </div>
        <div class="actions__right">
          <button class="iconbtn" aria-label="Salvar" title="Salvar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="card__meta">${p.likes} curtidas</div>
      <div class="card__caption"><b>${p.user}</b> ${p.caption}</div>
      <div style="height:10px"></div>
    </article>
  `).join('');

  root.querySelectorAll('.card__media').forEach(media => {
    media.addEventListener('click', () => {
      media.closest('.card').classList.toggle('card--active');
    });
  });
}
