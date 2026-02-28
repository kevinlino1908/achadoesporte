const DATA_URL = './kits-data.json';
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

const criarPlaceholderImagem = (time, tipo, temporada) => {
  const titulo = `${time} • ${formatarTipo(tipo)} ${temporada}`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='420'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='#111827'/><stop offset='100%' stop-color='#1f2937'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='46%' dominant-baseline='middle' text-anchor='middle' fill='#86efac' font-family='Inter,Arial,sans-serif' font-size='32' font-weight='700'>Camisa indisponível</text><text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' fill='#cbd5e1' font-family='Inter,Arial,sans-serif' font-size='22'>${titulo}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const obterPreco = (item, tipo) => {
  const precoNovo = item?.prices?.[tipo];
  if (Number.isFinite(precoNovo)) return precoNovo;

  const precoLegado = item?.price?.[tipo];
  if (Number.isFinite(precoLegado)) return precoLegado;

  return null;
};

const renderizarCards = (kitsData) => {
  const cardsHtml = kitsData
    .flatMap((item) =>
      item.kits.map((kit) => {
        const preco = obterPreco(item, kit.type);
        const precoLabel = preco !== null ? formatarPreco(preco) : 'Preço indisponível';

        return `
          <article class="card" data-type="${kit.type}">
            <img class="card-image" src="${resolverImagem(kit.image)}" alt="Camisa ${formatarTipo(kit.type)} ${item.team} ${item.season}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${criarPlaceholderImagem(item.team, kit.type, item.season)}'" />
            <span class="badge">${formatarTipo(kit.type)}</span>
            <h3>${item.team} ${formatarTipo(kit.type)} ${item.season}</h3>
            <p class="descricao">Marca: ${kit.brand}</p>
            <p class="preco">${precoLabel}</p>
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
    card.hidden = !exibir;
  });
};

const ativarFiltros = () => {
  botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
      const tipo = botao.dataset.filter;

      botoesFiltro.forEach((item) => item.classList.remove('ativo'));
      botao.classList.add('ativo');

      aplicarFiltro(tipo);
    });
  });
};

const exibirErro = () => {
  gridKits.innerHTML = '<p class="erro-catalogo">Não foi possível carregar o catálogo agora. Verifique se o site está sendo servido por um servidor HTTP e tente novamente.</p>';
};

const iniciarCatalogo = async () => {
  try {
    const resposta = await fetch(DATA_URL);
    if (!resposta.ok) throw new Error('Falha no carregamento do JSON');

    const kitsData = await resposta.json();
    renderizarCards(kitsData);
    ativarFiltros();

    const filtroAtivo = document.querySelector('.filtro.ativo')?.dataset.filter ?? 'all';
    aplicarFiltro(filtroAtivo);
  } catch (erro) {
    exibirErro();
  }
};

iniciarCatalogo();

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
