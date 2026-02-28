const kitsData = [
  {
    id: 1,
    team: 'Flamengo',
    season: '2025',
    kits: [
      { type: 'home', brand: 'Adidas', image: 'https://commons.wikimedia.org/wiki/File:Flamengo_2025_home_kit.jpg' },
      { type: 'away', brand: 'Adidas', image: 'https://commons.wikimedia.org/wiki/File:Flamengo_2025_away_kit.jpg' },
      { type: 'third', brand: 'Adidas', image: 'https://commons.wikimedia.org/wiki/File:Flamengo_2025_third_kit.jpg' }
    ],
    price: { home: 279.9, away: 279.9, third: 299.9 }
  },
  {
    id: 2,
    team: 'Palmeiras',
    season: '2025',
    kits: [
      { type: 'home', brand: 'Puma', image: 'https://commons.wikimedia.org/wiki/File:Palmeiras_2025_home_kit.jpg' },
      { type: 'away', brand: 'Puma', image: 'https://commons.wikimedia.org/wiki/File:Palmeiras_2025_away_kit.jpg' },
      { type: 'third', brand: 'Puma', image: 'https://commons.wikimedia.org/wiki/File:Palmeiras_2025_third_kit.jpg' }
    ],
    price: { home: 279.9, away: 279.9, third: 299.9 }
  },
  {
    id: 3,
    team: 'São Paulo FC',
    season: '2025',
    kits: [
      { type: 'home', brand: 'New Balance', image: 'https://commons.wikimedia.org/wiki/File:São_Paulo_2025_home_kit.jpg' },
      { type: 'away', brand: 'New Balance', image: 'https://commons.wikimedia.org/wiki/File:São_Paulo_2025_away_kit.jpg' },
      { type: 'third', brand: 'New Balance', image: 'https://commons.wikimedia.org/wiki/File:São_Paulo_2025_third_kit.jpg' }
    ],
    price: { home: 269.9, away: 269.9, third: 289.9 }
  },
  {
    id: 4,
    team: 'Santos FC',
    season: '2025',
    kits: [
      { type: 'home', brand: 'Umbro', image: 'https://commons.wikimedia.org/wiki/File:Santos_2025_home_kit.jpg' },
      { type: 'away', brand: 'Umbro', image: 'https://commons.wikimedia.org/wiki/File:Santos_2025_away_kit.jpg' },
      { type: 'third', brand: 'Umbro', image: 'https://commons.wikimedia.org/wiki/File:Santos_2025_third_kit.jpg' }
    ],
    price: { home: 239.9, away: 239.9, third: 259.9 }
  },
  {
    id: 5,
    team: 'Corinthians',
    season: '2025',
    kits: [
      { type: 'home', brand: 'Nike', image: 'https://commons.wikimedia.org/wiki/File:Corinthians_2025_home_kit.jpg' },
      { type: 'away', brand: 'Nike', image: 'https://commons.wikimedia.org/wiki/File:Corinthians_2025_away_kit.jpg' },
      { type: 'third', brand: 'Nike', image: 'https://commons.wikimedia.org/wiki/File:Corinthians_2025_third_kit.jpg' }
    ],
    price: { home: 274.9, away: 274.9, third: 294.9 }
  }
];

const botoesFiltro = document.querySelectorAll('.filtro');
const gridKits = document.querySelector('#kits-grid');

const formatarTipo = (tipo) => tipo.charAt(0).toUpperCase() + tipo.slice(1);
const formatarPreco = (preco) =>
  preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const resolverImagem = (url) => {
  if (!url.includes('/wiki/File:')) return url;
  const nomeArquivo = url.split('/wiki/File:')[1];
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(nomeArquivo)}`;
};

const renderizarCards = () => {
  const cardsHtml = kitsData
    .flatMap((item) =>
      item.kits.map((kit) => {
        const preco = item.price[kit.type];

        return `
          <article class="card" data-type="${kit.type}">
            <img class="card-image" src="${resolverImagem(kit.image)}" alt="Camisa ${formatarTipo(kit.type)} ${item.team} ${item.season}" loading="lazy" />
            <span class="badge">${formatarTipo(kit.type)}</span>
            <h3>${item.team} ${formatarTipo(kit.type)} ${item.season}</h3>
            <p class="descricao">Marca: ${kit.brand}</p>
            <p class="preco">${formatarPreco(preco)}</p>
            <a href="https://www.instagram.com/achadoesporte/" target="_blank" rel="noreferrer">Ver oferta</a>
          </article>
        `;
      })
    )
    .join('');

  gridKits.innerHTML = cardsHtml;
};

const aplicarFiltro = (tipo) => {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const tipoCard = card.dataset.type;
    const exibir = tipo === 'all' || tipoCard === tipo;
    card.style.display = exibir ? 'flex' : 'none';
  });
};

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => {
    const tipo = botao.dataset.filter;

  cards.forEach((card) => {
    const tipoCard = card.dataset.type;
    const exibir = tipo === 'all' || tipoCard === tipo;
    card.style.display = exibir ? 'flex' : 'none';
  });
};

const ativarFiltros = () => {
  botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
      const tipo = botao.dataset.filter;

    aplicarFiltro(tipo);
  });
});

renderizarCards();
