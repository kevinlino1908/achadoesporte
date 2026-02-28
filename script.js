const botoesFiltro = document.querySelectorAll('.filtro');
const cards = document.querySelectorAll('.card');

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => {
    const categoria = botao.dataset.filter;

    botoesFiltro.forEach((item) => item.classList.remove('ativo'));
    botao.classList.add('ativo');

    cards.forEach((card) => {
      const cardCategoria = card.dataset.category;
      const exibir = categoria === 'all' || cardCategoria === categoria;
      card.style.display = exibir ? 'flex' : 'none';
    });
  });
});
