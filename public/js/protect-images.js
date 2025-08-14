export async function signElement(img) {
  const file = img.getAttribute('data-protected-src');
  const res = await fetch(`/api/v1/images/sign?file=${encodeURIComponent(file)}`);
  const data = await res.json();
  img.src = data.url;
}

export function signStaticImages() {
  document.querySelectorAll('img[data-protected-src]').forEach(signElement);
}

document.addEventListener('DOMContentLoaded', signStaticImages);
