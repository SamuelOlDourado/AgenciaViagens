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
