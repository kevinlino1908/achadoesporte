const DATA_URL = './kits-data.json';

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

const renderizarCards = (kitsData) => {
  const cardsHtml = kitsData
    .flatMap((item) =>
      item.kits.map((kit) => {
        const preco = item.prices[kit.type];

        return `
          <article class="card" data-type="${kit.type}">
            <img class="card-image" src="${resolverImagem(kit.image)}" alt="Camisa ${formatarTipo(kit.type)} ${item.team} ${item.season}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${criarPlaceholderImagem(item.team, kit.type, item.season)}'" />
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
  gridKits.innerHTML = '<p class="erro-catalogo">Não foi possível carregar o catálogo agora. Tente novamente em instantes.</p>';
};

const iniciarCatalogo = async () => {
  try {
    const resposta = await fetch(DATA_URL);
    if (!resposta.ok) throw new Error('Falha no carregamento do JSON');

    const kitsData = await resposta.json();
    renderizarCards(kitsData);
    ativarFiltros();
  } catch (erro) {
    exibirErro();
  }
};

iniciarCatalogo();
