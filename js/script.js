// Data de hoje no formato AAAA-MM-DD (o mesmo do input type="date")
function obterDataDeHoje() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return ano + '-' + mes + '-' + dia;
}


// AAAA-MM-DD -> DD/MM/AAAA
function formatarData(dataIso) {
    const partes = dataIso.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

const dataDeHoje = obterDataDeHoje();


// Mostra ou esconde um elemento com a classe d-none do Bootstrap
function mostrarElemento(elemento, deveMostrar) {
    elemento.classList.toggle('d-none', !deveMostrar);
}



// (1, 'pacote', 'pacotes') -> "1 pacote" | (3, 'pacote', 'pacotes') -> "3 pacotes"
function escreverQuantidade(quantidade, singular, plural) {
    if (quantidade === 1) {
        return quantidade + ' ' + singular;
    }
    return quantidade + ' ' + plural;
}


// Só o botão da categoria escolhida fica com o visual ativo
function ativarBotaoCategoria(botoes, categoria) {
    botoes.forEach(function (botao) {
        const estaAtivo = botao.dataset.categoria === categoria;
        botao.classList.toggle('ativa', estaAtivo);
        botao.setAttribute('aria-pressed', estaAtivo);
    });
}

