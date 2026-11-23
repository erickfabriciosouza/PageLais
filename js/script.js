// ---------- Menu mobile ----------
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

function fecharMenu() {
  menu.classList.remove('aberto');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Abrir menu');
}

menuBtn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', String(aberto));
  menuBtn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// Fecha ao clicar em um link, ao apertar Esc ou ao clicar fora
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharMenu(); });
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) fecharMenu();
});

// ---------- Sombra no cabeçalho ao rolar ----------
const topo = document.getElementById('topo');
const atualizarTopo = () => topo.classList.toggle('rolado', window.scrollY > 10);
window.addEventListener('scroll', atualizarTopo, { passive: true });
atualizarTopo();

// ---------- Link ativo no menu conforme a seção visível ----------
const linksMenu = [...menu.querySelectorAll('a[href^="#"]')];
const secoes = linksMenu
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observadorSecoes = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    linksMenu.forEach((link) => {
      link.classList.toggle('ativo', link.getAttribute('href') === `#${entrada.target.id}`);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

secoes.forEach((secao) => observadorSecoes.observe(secao));

// ---------- Animação de entrada dos elementos ----------
const elementos = document.querySelectorAll('.revelar');
const observadorRevelar = new IntersectionObserver((entradas, obs) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      obs.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12 });

elementos.forEach((el) => observadorRevelar.observe(el));

// ---------- Galeria de fotos (seção Sobre) ----------
const fotos = [...document.querySelectorAll('.galeria__item')];
const pontos = document.querySelector('.galeria__pontos');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let atual = 0;
let timer;

function mostrarFoto(indice) {
  fotos[atual].classList.remove('ativa');
  pontos.children[atual].setAttribute('aria-selected', 'false');
  atual = (indice + fotos.length) % fotos.length;
  fotos[atual].classList.add('ativa');
  pontos.children[atual].setAttribute('aria-selected', 'true');
}

function iniciarGaleria() {
  if (reduzirMovimento) return;
  clearInterval(timer);
  timer = setInterval(() => mostrarFoto(atual + 1), 5000);
}

if (fotos.length && pontos) {
  // As fotos carregam todas de uma vez quando a galeria aparece, para a troca não piscar
  fotos.forEach((foto) => foto.querySelector('img').setAttribute('loading', 'eager'));

  fotos.forEach((_, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.setAttribute('role', 'tab');
    botao.setAttribute('aria-label', `Foto ${i + 1}`);
    botao.setAttribute('aria-selected', String(i === 0));
    botao.addEventListener('click', () => { mostrarFoto(i); iniciarGaleria(); });
    pontos.appendChild(botao);
  });

  iniciarGaleria();
}

// ---------- FAQ: mantém só uma pergunta aberta por vez ----------
const perguntas = document.querySelectorAll('.faq details');
perguntas.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) perguntas.forEach((outro) => { if (outro !== item) outro.open = false; });
  });
});

// ---------- Ano atual no rodapé ----------
document.getElementById('ano').textContent = new Date().getFullYear();
