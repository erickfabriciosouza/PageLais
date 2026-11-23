# Psicóloga Laís Anias

Site institucional estático (HTML, CSS e JavaScript puro) da psicóloga Laís Anias, CRP 03/19783.

## Estrutura

```
index.html      página única com todas as seções
css/style.css   estilos (variáveis de cor e fonte no topo do arquivo)
js/script.js    menu mobile, link ativo, animações, galeria de fotos e FAQ
img/            fotos otimizadas (WebP com JPG de reserva), favicon e imagem de compartilhamento
```

## Como editar

- Textos marcados com `<!-- EDITAR -->` no `index.html` (Sobre e Experiência) devem ser revisados com as informações reais.
- Cores e fontes ficam nas variáveis `:root` no início do `css/style.css`.
- Telefone e e-mail aparecem nos links `wa.me` e `mailto:` do `index.html`.

## Publicação

O site não tem build nem backend: basta publicar a pasta no GitHub Pages (Settings > Pages > branch `main`, pasta raiz).
