document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card__media').forEach(media => {
    media.addEventListener('click', () => {
      media.closest('.card').classList.toggle('card--active');
    });
  });
});
