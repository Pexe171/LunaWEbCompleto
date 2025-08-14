// public/js/modules/animations-extended.js
// Este módulo reúne animações utilitárias com anime.js
// Use import { ... } from './modules/animations-extended.js';

export function fadeIn(el, delay = 0) {
  // O que é: entrada suave (opacity + translateY)
  // Por que: dá “vida” a cards/listas sem distrair; ótimo para conteúdo que carrega dinamicamente
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
  // O que é: “pop” ao curtir (escala elástica)
  // Por que: feedback instantâneo e agradável em ações do usuário (ex.: botão de like)
  anime({
    targets: el,
    scale: [1, 1.3, 1],
    duration: 500,
    easing: 'easeOutElastic(1, .5)'
  });
}

export function staggerFadeIn(listSelector, itemSelector) {
  // O que é: “stagger” (cascata) para listas de cards
  // Por que: cria ritmo visual quando vários itens entram ao mesmo tempo
  const items = document.querySelectorAll(`${listSelector} ${itemSelector}`);
  anime({
    targets: items,
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 500,
    delay: anime.stagger(40), // 40ms entre cada item
    easing: 'easeOutQuad'
  });
}

export function rotateOnHover(selector) {
  // O que é: leve rotação ao passar o mouse
  // Por que: dá resposta sutil em ícones e botões sem poluir a UI
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      anime({ targets: el, rotate: [0, 10], duration: 250, easing: 'easeOutQuad' });
    });
    el.addEventListener('mouseleave', () => {
      anime({ targets: el, rotate: 0, duration: 250, easing: 'easeOutQuad' });
    });
  });
}

export function pulseAttention(selector, loop = true) {
  // O que é: “pulsar” suave
  // Por que: chamar atenção para uma ação (ex.: CTA) sem ficar “gritando”
  anime({
    targets: selector,
    scale: [1, 1.05],
    duration: 900,
    direction: 'alternate',
    easing: 'easeInOutQuad',
    loop
  });
}

export function svgDraw(selector) {
  // O que é: efeito “desenhar” em paths de SVG (strokeDashoffset)
  // Por que: estética de galeria/arte combina com traçado sendo revelado
  const paths = document.querySelectorAll(`${selector} path, ${selector} line, ${selector} polyline`);
  paths.forEach(path => {
    const length = path.getTotalLength?.() || 300;
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });
  anime({
    targets: `${selector} path, ${selector} line, ${selector} polyline`,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1200,
    easing: 'easeInOutSine',
    delay: anime.stagger(50)
  });
}

export function colorTransition(selector, props = { color: ['#fff', '#ffd7b3'] }) {
  // O que é: transição de cor (texto/fundo)
  // Por que: bom para estados ativos/selecionados (chips, filtros, etc.)
  anime({
    targets: selector,
    ...props,
    duration: 400,
    easing: 'easeInOutQuad'
  });
}

export function parallaxOnScroll(selector, factor = 0.1) {
  // O que é: parallax vertical simples em scroll
  // Por que: cria profundidade em heros ou cabeçalhos de perfil
  const el = document.querySelector(selector);
  if (!el) return;
  const onScroll = () => {
    const y = window.scrollY * factor;
    el.style.transform = `translateY(${y}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function pageIntro(selectorContainer = 'body', elems = ['.title', '.desc']) {
  // O que é: coreografia de entrada de cabeçalho/metas de página
  // Por que: dá uma apresentação elegante ao entrar numa tela de detalhe
  const targets = elems.map(sel => `${selectorContainer} ${sel}`).join(', ');
  anime({
    targets,
    opacity: [0, 1],
    translateY: [12, 0],
    duration: 600,
    delay: anime.stagger(80),
    easing: 'easeOutQuad'
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
