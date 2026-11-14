# Descubra Brasil

Site front-end de uma agência de viagens fictícia, a **Descubra Brasil**, focada em roteiros e pacotes pelo Brasil.

## Sobre o projeto

O objetivo é simular o site de uma agência de turismo onde o usuário consegue **encontrar os destinos e os pacotes disponibilizados pela agência** e **fazer a reserva** de um pacote. O projeto é apenas front-end: não existe back-end nem banco de dados, então os dados ficam direto no HTML e o envio da reserva é uma demonstração visual (o formulário é validado, mas nada é enviado de verdade).

O site foi pensado para ser:

- **Responsivo**, funcionando em desktop e celular
- **Semântico e acessível**, com HTML5 semântico, `aria-label`, `alt` nas imagens, navegação por teclado e link de conteúdo principal
- **Interativo**, com busca, filtros, ordenação, galeria de fotos e validação de formulário feita com JavaScript

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| **HTML5** | Estrutura e semântica das páginas |
| **CSS3** | Identidade visual, variáveis CSS, layout e responsividade (`css/style.css`) |
| **JavaScript** | Interatividade e validação (`js/script.js`), sem frameworks |
| **Bootstrap 5.3.3** | Grid, navbar, cards, carrossel, accordion, modal e utilitários |
| **Bootstrap Icons 1.11.3** | Ícones da interface |
| **Google Fonts** | Playfair Display (títulos), Inter (texto) e Sacramento (assinatura) |
| **Git e GitHub** | Versionamento e trabalho colaborativo |

Bootstrap, Bootstrap Icons e as fontes são carregados por CDN, então é preciso internet para o visual completo.

## Estrutura do site

O site tem 5 páginas, todas com o mesmo cabeçalho (navbar), rodapé e os mesmos arquivos de CSS e JS.

| Página | Arquivo | O que faz |
| --- | --- | --- |
| **Início** | `index.html` | Página de apresentação: banner principal, pacotes mais procurados, diferenciais da agência (pagamento facilitado, guia local, suporte e turismo responsável), exploração por categoria (ecoturismo, cultural, praia, aventura e gastronômico), carrossel de depoimentos e chamada final para viajar |
| **Destinos** | `destinos.html` | Lista os destinos com informações para planejar a viagem. Tem busca por destino, data e tipo de viagem, filtro por categoria, contador de resultados e mensagem quando nenhum destino é encontrado |
| **Pacotes** | `pacotes.html` | Catálogo de pacotes de viagem. Tem botões de categoria, filtros laterais (destino, duração, categoria e faixa de preço), ordenação (mais procurados, menor preço, maior preço e melhor avaliação), botão de limpar filtros e contador de resultados |
| **Detalhe do pacote** | `pacote.html` | Página completa de um pacote (exemplo: Bonito Essencial, 5 dias). Mostra galeria de fotos com visualização ampliada, roteiro dia a dia, destaques, o que está incluso e não incluso e o **formulário de reserva** (nome, e-mail, telefone, pacote, número de pessoas, data e observações) |
| **Sobre nós** | `sobre.html` | História da agência, valores, depoimentos de clientes e chamada final |

### Fluxo de uso

1. O usuário entra pelo **Início** e conhece a agência.
2. Em **Destinos**, procura para onde quer ir.
3. Em **Pacotes**, filtra e compara as opções disponíveis.
4. Em **Detalhe do pacote**, vê o roteiro e preenche o formulário de **reserva**.

## O que o JavaScript faz

Todo o JavaScript fica em um único arquivo, `js/script.js`, usado em todas as páginas. Cada bloco só roda se os elementos dele existirem na página.

- **Menu mobile:** fecha o menu ao escolher uma opção
- **Formulário de reserva:** valida os campos, mostra mensagens de erro e limpa o erro quando o usuário corrige
- **Busca e filtros de destinos:** filtra os cards por destino, tipo de viagem e categoria
- **Filtros e ordenação de pacotes:** filtra por destino, duração, categoria e preço máximo, além de ordenar os cards
- **Galeria de imagens:** abre as fotos ampliadas em um modal, com navegação pelos botões e pelas setas do teclado, e fecha clicando fora da imagem

## Organização das pastas

```
AgenciaViagens/
├── index.html           # Página inicial
├── destinos.html        # Página de destinos
├── pacotes.html         # Catálogo de pacotes
├── pacote.html          # Detalhe de um pacote + reserva
├── sobre.html           # Sobre a agência
├── css/
│   └── style.css        # Estilos do site
├── js/
│   └── script.js        # Interatividade e validações
└── img/
    ├── geral/           # Logos e selos (Cadastur) usados em várias páginas
    ├── home/            # Imagens e ícones da página inicial
    ├── destinos/        # Imagens da página de destinos
    ├── pacotes/         # Imagens dos cards da página de pacotes
    ├── pacote-detalhe/  # Galeria e imagens da página de detalhe do pacote
    └── sobre/           # Imagens, ícones e depoimentos da página Sobre nós
```

## Como executar

Não precisa instalar nada.

1. Clone o repositório ou baixe o projeto:
   ```bash
   git clone https://github.com/SamuelOlDourado/AgenciaViagens.git
   ```
2. Abra o arquivo `index.html` no navegador (ou use a extensão Live Server do VS Code).

## Sobre o trabalho

Este projeto é um **trabalho em grupo do segundo semestre do curso de Engenharia de Software**, na disciplina de Design para Web II. O objetivo é **treinar o desenvolvimento front-end**, aplicando na prática HTML, CSS, JavaScript e Bootstrap em um projeto que evolui ao longo do semestre. Todos os dados e a agência são fictícios.

## Grupo

| Integrante | GitHub |
| --- | --- |
| Samuel Dourado | [@SamuelOlDourado](https://github.com/SamuelOlDourado) |
| Bruno Ramos | [@brunootavioramos22-ui](https://github.com/brunootavioramos22-ui) |
| Gabriel Rodrigues | [@gabeeDev7](https://github.com/gabeeDev7) |
| Lucas Augusto | [@lucas-augusto07](https://github.com/lucas-augusto07) |
| Kaique | [@kaiqueMeiraDev](https://github.com/kaiqueMeiraDev) |