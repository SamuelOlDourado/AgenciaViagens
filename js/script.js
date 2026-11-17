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


//fechar menu mobile ao clicar em um link do menu


const menuNavegacao = document.querySelector('#navPrincipal');

if (menuNavegacao && window.bootstrap) {
    const linksDoMenu = menuNavegacao.querySelectorAll('a');

    linksDoMenu.forEach(function (link) {
        link.addEventListener('click', function () {
            if (menuNavegacao.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(menuNavegacao).hide();
            }
        });
    });
}
const formularioReserva = document.querySelector('form[data-validar]');

if (formularioReserva) {
    const mensagemSucesso = formularioReserva.querySelector('.alert-success');
    const camposObrigatorios = formularioReserva.querySelectorAll('[required]');
    const campoDataReserva = formularioReserva.querySelector('#reserva-data');

    // impede escolher datas passadas no calendário
    campoDataReserva.min = dataDeHoje;

    // Devolve a mensagem de erro do campo, ou '' se ele estiver válido
    function obterErroDoCampo(campo) {
        const valor = campo.value.trim();

        if (campo.id === 'reserva-nome') {
            // precisa de nome e sobrenome
            const quantidadeDePalavras = valor.split(/\s+/).length;
            if (valor === '' || quantidadeDePalavras < 2) {
                return 'Informe seu nome completo (nome e sobrenome).';
            }
        }

        if (campo.id === 'reserva-email') {
            // formato simples: texto@texto.texto
            const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
            if (valor === '') {
                return 'Informe seu e-mail.';
            }
            if (!formatoValido) {
                return 'Informe um e-mail válido, como nome@email.com.';
            }
        }

        if (campo.id === 'reserva-telefone') {
            // conta só os números: DDD + 8 ou 9 dígitos
            const apenasNumeros = valor.replace(/\D/g, '');
            if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
                return 'Informe um telefone válido com DDD.';
            }
        }

        if (campo.id === 'reserva-pessoas') {
            // número inteiro entre o min e o max definidos no HTML
            const quantidade = Number(valor);
            const minimo = Number(campo.min);
            const maximo = Number(campo.max);
            if (valor === '') {
                return 'Informe a quantidade de pessoas.';
            }
            if (!Number.isInteger(quantidade) || quantidade < minimo || quantidade > maximo) {
                return 'Informe um número inteiro entre ' + minimo + ' e ' + maximo + '.';
            }
        }

        if (campo.id === 'reserva-data') {
            if (valor === '') {
                return 'Selecione uma data.';
            }
            if (valor < dataDeHoje) {
                return 'A data não pode ser anterior a hoje.';
            }
        }

        return '';
    }
    // Mostra ou remove o erro (classes do Bootstrap). Devolve true se o campo for válido.
    function validarCampo(campo) {
        const erro = obterErroDoCampo(campo);
        const mensagemDeErro = campo.parentElement.querySelector('.invalid-feedback');

        if (erro !== '') {
            campo.classList.add('is-invalid');
            mensagemDeErro.textContent = erro;
            return false;
        }

        campo.classList.remove('is-invalid');
        return true;
    }

    formularioReserva.addEventListener('submit', function (event) {
        event.preventDefault();
        mostrarElemento(mensagemSucesso, false);

        // valida todos os campos para mostrar todos os erros de uma vez
        let formularioValido = true;
        camposObrigatorios.forEach(function (campo) {
            if (!validarCampo(campo)) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            formularioReserva.querySelector('.is-invalid').focus();
            return;
        }

        // demonstração: não há backend, nada é enviado de verdade
        formularioReserva.reset();
        mostrarElemento(mensagemSucesso, true);
        mensagemSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
     formularioReserva.addEventListener('input', function (event) {
        if (event.target.classList.contains('is-invalid')) {
            validarCampo(event.target);
        }
    });
}


const formularioBusca = document.querySelector('.busca-hero');

if (formularioBusca) {
    const cartoesDestino = document.querySelectorAll('.card-destino');
    const campoBuscaDestino = document.querySelector('#busca-destino');
    const campoBuscaData = document.querySelector('#busca-data');
    const campoBuscaTipo = document.querySelector('#busca-tipo');
    const mensagemBusca = document.querySelector('#mensagem-busca');
    const botoesCategoria = document.querySelectorAll('.filtros-pilula .pilula');
    const contadorDestinos = document.querySelector('#contador-destinos');
    const mensagemSemDestinos = document.querySelector('#mensagem-sem-destinos');
    const botaoVerTodos = document.querySelector('#botao-ver-todos-destinos');

    // filtros atuais (os botões de categoria e a busca funcionam juntos)
    let categoriaSelecionada = 'todos';
    let destinoBuscado = '';
    let tipoBuscado = '';
    let dataBuscada = '';

    campoBuscaData.min = dataDeHoje;

    // "Ecoturismo" reúne natureza e serra; os outros tipos têm categoria própria
    function tipoCombinaComCategorias(tipo, categoriasDoCartao) {
        if (tipo === 'ecoturismo') {
            return categoriasDoCartao.includes('natureza') || categoriasDoCartao.includes('serra');
        }
        return categoriasDoCartao.includes(tipo);
    }

    // O card só aparece se passar por todos os filtros ativos
    function destinoAtendeFiltros(cartao) {
        const categoriasDoCartao = cartao.dataset.categoria.split(' ');

        if (categoriaSelecionada !== 'todos' && !categoriasDoCartao.includes(categoriaSelecionada)) {
            return false;
        }
        if (destinoBuscado !== '' && cartao.dataset.destino !== destinoBuscado) {
            return false;
        }
        if (tipoBuscado !== '' && !tipoCombinaComCategorias(tipoBuscado, categoriasDoCartao)) {
            return false;
        }
        return true;
    }

function atualizarDestinos() {
        let quantidadeEncontrada = 0;

        cartoesDestino.forEach(function (cartao) {
            const deveAparecer = destinoAtendeFiltros(cartao);
            mostrarElemento(cartao.parentElement, deveAparecer);
            if (deveAparecer) {
                quantidadeEncontrada++;
            }
        });

        let textoDoContador = escreverQuantidade(quantidadeEncontrada, 'destino encontrado', 'destinos encontrados');
        // a data é só informativa: não há disponibilidade de viagens para filtrar
        if (dataBuscada !== '') {
            textoDoContador += ' — viagem prevista para ' + formatarData(dataBuscada);
        }
        contadorDestinos.textContent = textoDoContador;
        mostrarElemento(mensagemSemDestinos, quantidadeEncontrada === 0);
    }

    // botões de categoria (Todos, Praia, Natureza...)
    botoesCategoria.forEach(function (botao) {
        botao.addEventListener('click', function () {
            categoriaSelecionada = botao.dataset.categoria;
            ativarBotaoCategoria(botoesCategoria, categoriaSelecionada);
            atualizarDestinos();
        });
    });

formularioBusca.addEventListener('submit', function (event) {
        event.preventDefault();

        if (campoBuscaData.value !== '' && campoBuscaData.value < dataDeHoje) {
            mensagemBusca.textContent = 'Escolha uma data de hoje em diante. Datas passadas não são permitidas.';
            mostrarElemento(mensagemBusca, true);
            campoBuscaData.focus();
            return;
        }

        mostrarElemento(mensagemBusca, false);
        destinoBuscado = campoBuscaDestino.value;
        tipoBuscado = campoBuscaTipo.value;
        dataBuscada = campoBuscaData.value;
        atualizarDestinos();

        // os resultados ficam mais abaixo na página
        document.querySelector('#titulo-destinos').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // data corrigida: esconde o aviso de erro
    campoBuscaData.addEventListener('change', function () {
        if (campoBuscaData.value >= dataDeHoje) {
            mostrarElemento(mensagemBusca, false);
        }
    });

    // botão da mensagem "nenhum destino": limpa a busca e a categoria
    botaoVerTodos.addEventListener('click', function () {
        formularioBusca.reset();
        mostrarElemento(mensagemBusca, false);
        categoriaSelecionada = 'todos';
        destinoBuscado = '';
        tipoBuscado = '';
        dataBuscada = '';
        ativarBotaoCategoria(botoesCategoria, 'todos');
        atualizarDestinos();
    });

    atualizarDestinos();
}

const seletorOrdenacao = document.querySelector('#ordenacao-pacotes');

if (seletorOrdenacao) {
    const caixasDestino = document.querySelectorAll('[data-filtro-destino]');
    const caixasDuracao = document.querySelectorAll('[data-filtro-duracao]');
    const caixasCategoria = document.querySelectorAll('[data-filtro-categoria]');
    const botoesCategoria = document.querySelectorAll('.filtros-pilula .pilula');
    const faixaPreco = document.querySelector('#faixa-preco');
    const valorFaixaPreco = document.querySelector('#valor-faixa-preco');
    const botaoLimparFiltros = document.querySelector('#botao-limpar-filtros');
    const botaoLimparVazio = document.querySelector('#botao-limpar-vazio');
    const contadorPacotes = document.querySelector('#contador-pacotes');
    const mensagemSemPacotes = document.querySelector('#mensagem-sem-pacotes');

    // guarda a ordem original dos cards ("Mais procurados")
    const cartoesOriginais = [];
    document.querySelectorAll('.card-pacote').forEach(function (cartao) {
        cartoesOriginais.push(cartao);
    });
    const listaDePacotes = cartoesOriginais[0].parentElement.parentElement;

    // valores das caixas marcadas, ex.: ['praia', 'cultural']
    function obterValoresMarcados(caixas) {
        const valores = [];
        caixas.forEach(function (caixa) {
            if (caixa.checked) {
                valores.push(caixa.value);
            }
        });
        return valores;
    }

    function atualizarRotuloDePreco() {
        valorFaixaPreco.textContent = 'R$ ' + Number(faixaPreco.value).toLocaleString('pt-BR');
    }

    // sem nenhuma faixa marcada, qualquer duração serve
    function pacoteAtendeDuracao(cartao) {
        const dias = Number(cartao.dataset.duracao);
        let existeFaixaMarcada = false;

        for (let posicao = 0; posicao < caixasDuracao.length; posicao++) {
            const caixa = caixasDuracao[posicao];
            if (caixa.checked) {
                existeFaixaMarcada = true;
                if (dias >= Number(caixa.dataset.diasMin) && dias <= Number(caixa.dataset.diasMax)) {
                    return true;
                }
            }
        }
        return !existeFaixaMarcada;
    }

    // o pacote só aparece se passar por todos os filtros
    function pacoteAtendeFiltros(cartao, destinosMarcados, categoriasMarcadas, precoMaximo) {
        if (destinosMarcados.length > 0 && !destinosMarcados.includes(cartao.dataset.destino)) {
            return false;
        }
        if (categoriasMarcadas.length > 0 && !categoriasMarcadas.includes(cartao.dataset.categoria)) {
            return false;
        }
        if (!pacoteAtendeDuracao(cartao)) {
            return false;
        }
        if (Number(cartao.dataset.preco) > precoMaximo) {
            return false;
        }
        return true;
    }

// comparadores da ordenação (negativo = A vem antes de B)
    function compararMenorPreco(cartaoA, cartaoB) {
        return Number(cartaoA.dataset.preco) - Number(cartaoB.dataset.preco);
    }

    function compararMaiorPreco(cartaoA, cartaoB) {
        return Number(cartaoB.dataset.preco) - Number(cartaoA.dataset.preco);
    }

    // maior nota primeiro; no empate, quem tem mais avaliações
    function compararMelhorAvaliacao(cartaoA, cartaoB) {
        const diferencaDeNota = Number(cartaoB.dataset.avaliacao) - Number(cartaoA.dataset.avaliacao);
        if (diferencaDeNota !== 0) {
            return diferencaDeNota;
        }
        return Number(cartaoB.dataset.avaliacoes) - Number(cartaoA.dataset.avaliacoes);
    }

    // devolve uma cópia dos cards na ordem pedida
    function ordenarCartoes(tipoDeOrdenacao) {
        const cartoes = cartoesOriginais.slice();

        if (tipoDeOrdenacao === 'menor-preco') {
            cartoes.sort(compararMenorPreco);
        }
        if (tipoDeOrdenacao === 'maior-preco') {
            cartoes.sort(compararMaiorPreco);
        }
        if (tipoDeOrdenacao === 'avaliacao') {
            cartoes.sort(compararMelhorAvaliacao);
        }
        return cartoes;
    }

    function atualizarPacotes() {
        const destinosMarcados = obterValoresMarcados(caixasDestino);
        const categoriasMarcadas = obterValoresMarcados(caixasCategoria);
        let precoMaximo = Number(faixaPreco.value);
        let quantidadeEncontrada = 0;

        // no máximo do slider ("R$ 12.000+") não há limite de preço
        if (precoMaximo >= Number(faixaPreco.max)) {
            precoMaximo = Infinity;
        }

        const cartoesOrdenados = ordenarCartoes(seletorOrdenacao.value);

        cartoesOrdenados.forEach(function (cartao) {
            const coluna = cartao.parentElement;
            const deveAparecer = pacoteAtendeFiltros(cartao, destinosMarcados, categoriasMarcadas, precoMaximo);

            // appendChild move a coluna para o fim da lista: assim a ordenação aparece na tela
            listaDePacotes.appendChild(coluna);
            mostrarElemento(coluna, deveAparecer);
            if (deveAparecer) {
                quantidadeEncontrada++;
            }
        });

        contadorPacotes.textContent = escreverQuantidade(quantidadeEncontrada, 'pacote encontrado', 'pacotes encontrados');
        mostrarElemento(mensagemSemPacotes, quantidadeEncontrada === 0);
    }

    // volta ao estado inicial: sem filtros e na ordem original
    function limparFiltros() {
        caixasDestino.forEach(function (caixa) {
            caixa.checked = false;
        });
        caixasDuracao.forEach(function (caixa) {
            caixa.checked = false;
        });
        caixasCategoria.forEach(function (caixa) {
            caixa.checked = false;
        });
        faixaPreco.value = faixaPreco.defaultValue;
        seletorOrdenacao.value = 'procurados';
        atualizarRotuloDePreco();
        ativarBotaoCategoria(botoesCategoria, 'todos');
        atualizarPacotes();
    }

// botão de categoria do topo escolhe a mesma categoria da barra lateral
    botoesCategoria.forEach(function (botao) {
        botao.addEventListener('click', function () {
            const categoria = botao.dataset.categoria;

            caixasCategoria.forEach(function (caixa) {
                caixa.checked = (caixa.value === categoria);
            });
            ativarBotaoCategoria(botoesCategoria, categoria);
            atualizarPacotes();
        });
    });

    // caixas da barra lateral: o botão do topo acompanha a escolha
    caixasCategoria.forEach(function (caixa) {
        caixa.addEventListener('change', function () {
            const categoriasMarcadas = obterValoresMarcados(caixasCategoria);

            if (categoriasMarcadas.length === 1) {
                ativarBotaoCategoria(botoesCategoria, categoriasMarcadas[0]);
            } else {
                ativarBotaoCategoria(botoesCategoria, 'todos');
            }
            atualizarPacotes();
        });
    });

    caixasDestino.forEach(function (caixa) {
        caixa.addEventListener('change', atualizarPacotes);
    });

    caixasDuracao.forEach(function (caixa) {
        caixa.addEventListener('change', atualizarPacotes);
    });

    faixaPreco.addEventListener('input', function () {
        atualizarRotuloDePreco();
        atualizarPacotes();
    });

    seletorOrdenacao.addEventListener('change', atualizarPacotes);
    botaoLimparFiltros.addEventListener('click', limparFiltros);
    botaoLimparVazio.addEventListener('click', limparFiltros);

    atualizarRotuloDePreco();
    atualizarPacotes();
}

const modalGaleria = document.querySelector('#modalGaleria');

if (modalGaleria && window.bootstrap) {
    const imagensDaGaleria = document.querySelectorAll('[data-galeria]');
    const corpoDoModal = modalGaleria.querySelector('.modal-body');
    const imagemAmpliada = modalGaleria.querySelector('img');
    const legendaDaGaleria = modalGaleria.querySelector('.legenda-galeria');
    const botaoAnterior = modalGaleria.querySelector('.botao-galeria-anterior');
    const botaoProximo = modalGaleria.querySelector('.botao-galeria-proximo');
    const botaoVerPrimeiras = document.querySelector('#galeria-primeira');
    const botaoVerUltimas = document.querySelector('#galeria-ultima');
    const modal = bootstrap.Modal.getOrCreateInstance(modalGaleria);

    let posicaoAtual = 0;

    // Mostra no modal a imagem da posição indicada
    function mostrarImagem(posicao) {
        // navegação circular: depois da última volta para a primeira
        if (posicao < 0) {
            posicao = imagensDaGaleria.length - 1;
        }
        if (posicao >= imagensDaGaleria.length) {
            posicao = 0;
        }
        posicaoAtual = posicao;

        const imagem = imagensDaGaleria[posicao];
        const figura = imagem.closest('figure');
        let textoDaLegenda = imagem.alt;

        // a tira de fotos tem figcaption; as demais imagens usam o texto alternativo
        if (figura && figura.querySelector('figcaption')) {
            textoDaLegenda = figura.querySelector('figcaption').textContent;
        }

        imagemAmpliada.src = imagem.src;
        imagemAmpliada.alt = imagem.alt;
        legendaDaGaleria.textContent = (posicao + 1) + ' / ' + imagensDaGaleria.length + ' — ' + textoDaLegenda;
    }

    function abrirGaleria(posicao) {
        mostrarImagem(posicao);
        modal.show();
    }

imagensDaGaleria.forEach(function (imagem, posicao) {
        const elementoClicavel = imagem.closest('button') || imagem;
        elementoClicavel.addEventListener('click', function () {
            abrirGaleria(posicao);
        });
    });

    // botões acima da tira de fotos: abrem a primeira ou a última foto da tira
    botaoVerPrimeiras.addEventListener('click', function () {
        const primeiraDaTira = document.querySelector('.tira-galeria [data-galeria]');
        abrirGaleria(Array.from(imagensDaGaleria).indexOf(primeiraDaTira));
    });

    botaoVerUltimas.addEventListener('click', function () {
        abrirGaleria(imagensDaGaleria.length - 1);
    });

    botaoAnterior.addEventListener('click', function () {
        mostrarImagem(posicaoAtual - 1);
    });

    botaoProximo.addEventListener('click', function () {
        mostrarImagem(posicaoAtual + 1);
    });

corpoDoModal.addEventListener('click', function (event) {
        if (!event.target.closest('img, button')) {
            modal.hide();
        }
    });

    // setas do teclado trocam de imagem enquanto o modal está aberto
    document.addEventListener('keydown', function (event) {
        if (!modalGaleria.classList.contains('show')) {
            return;
        }
        if (event.key === 'ArrowLeft') {
            mostrarImagem(posicaoAtual - 1);
        }
        if (event.key === 'ArrowRight') {
            mostrarImagem(posicaoAtual + 1);
        }
    });
}
