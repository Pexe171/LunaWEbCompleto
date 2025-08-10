function getLikes(){
  return new Set(JSON.parse(localStorage.getItem('likes')||'[]'));
}
export function isLiked(id){
  return getLikes().has(id);
}
export function toggleLike(id){
  const likes = getLikes();
  if(likes.has(id)) likes.delete(id); else likes.add(id);
  localStorage.setItem('likes', JSON.stringify([...likes]));
}
