let cardContainer = document.querySelector('.card-container');
let dados = [];

// A função foi renomeada para carregarDados e é chamada imediatamente para carregar os dados assim que a página abre.
async function carregarDados() {
    let resposta = await fetch('data.json');
    dados = await resposta.json();
    renderizarCards(dados);
}

function  buscarJogos() {
    const termoBusca = document.querySelector('.search-container input').value.toLowerCase();
    
    const jogosFiltrados = dados.filter(dado => {
        // Verifica se o termo de busca existe no nome, plataforma, gênero ou tags do jogo.
        const tagsString = dado.Tags.join(' ').toLowerCase(); // Converte o array de tags em uma string
        return dado.Nome.toLowerCase().includes(termoBusca) ||
               dado.Plataforma.toLowerCase().includes(termoBusca) ||
               dado.Gênero.toLowerCase().includes(termoBusca) ||
               tagsString.includes(termoBusca);
    });

    renderizarCards(jogosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ''; // Limpa os cards existentes antes de renderizar os novos
    for (let dado of dados) {   
        let article = document.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
            <h2>${dado.Nome}</h2>
            <p>Plataforma: ${dado.Plataforma}</p>
            <p>Gênero: ${dado.Gênero}</p>
            <p>Descrição: ${dado.Descrição}</p>
            <p>Tags: ${dado.Tags.join(', ')}</p>
            <a href="${dado.Link}" target="_blank">Encontre o jogo</a>    
        `
        cardContainer.appendChild(article);
    }
}

// Inicia o carregamento dos dados ao carregar o script.
carregarDados();