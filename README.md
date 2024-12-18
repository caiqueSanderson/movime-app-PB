# MoviMe

Website desenvolvido em React.js para o gerenciamento e exibição de filmes assistidos. Este projeto foi criado utilizando componentes reutilizáveis, hooks e bibliotecas modernas para React.

## Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## Visão Geral

### Demonstração

![Screenshot do Projeto](link-para-imagem)

### Descrição

O MoviMe é uma aplicação que permite ao usuário gerenciar os filmes já assistidos e visualizar estatísticas baseadas nos dados cadastrados, como tempo total de filmes assistidos e gêneros mais vistos.

---

## Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **NPM** ou **Yarn**
- **Git**

### Passos para Instalação

1. Clone o repositório: 
    ```bash
   git clone https://github.com/caiqueSanderson/pb-no-time.git

2. Navegue até o diretório do projeto:
    ```bash
   cd no-time

3. Instale as dependências:
    ```bash
   npm i

4. Inicie o servidor local:
    ```bash
   npm start

## Uso

1. Execute o código abaixo para rodar o projeto:
    ```bash
   npm run dev

## Funcionalidades

- Listagem de filmes já assistidos.
- Exibição de estatísticas como:
-  Total de horas assistidas.
-  Gêneros mais assistidos.
- Busca de informações detalhadas dos filmes consumindo APIs externas.
- Layout responsivo e moderno.
- Componente de loading enquanto os dados são carregados.

## Estrutura de Pastas

```plaintext
src/
├── components/      # Componentes reutilizáveis da aplicação
│   ├── Menu/         # Menu de navegação
│   ├── Loading/      # Indicador de carregamento
│   ├── CardRated/    # Card para exibição de filmes avaliados
│   ├── Card/         # Componente genérico de card
│   ├── Statistics/   # Componente para exibir estatísticas
│   └── Authentication/ # Gerenciamento de autenticação
│
├── pages/           # Páginas principais
│   ├── Movies/       # Página de filmes avaliados
│   ├── Details/      # Página com detalhes de um filme
│   ├── Home/         # Página inicial
│   └── not-found/    # Página para erros 404
│
├── services/        # Serviços para comunicação com APIs
│   ├── authentication/ # Serviços de autenticação
│   ├── ratedMovies/     # Serviços relacionados aos filmes avaliados
│   ├── genreMovies/     # Serviços de busca de gêneros
│   ├── statistics/      # Serviços para cálculo de estatísticas
│   └── theme/           # Serviços relacionados a temas da aplicação
│
├── App.jsx          # Componente principal da aplicação
├── main.jsx         # Ponto de entrada da aplicação
└── App.css          # Estilos globais
```

## Tecnologias Utilizadas

- React.js: Biblioteca principal para construção da interface.
- JavaScript (ES6): Linguagem de programação utilizada.
- HTML5: Estruturação da página.
- CSS3: Estilização da aplicação.
- React Router Dom: Gerenciamento de rotas.
- Axios: Consumo de APIs.
- React Hooks: Gerenciamento de estado e ciclos de vida.
- Git/GitHub: Controle de versão.

## Contribuição

1. Faça um fork do projeto.

2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature

3. Commit suas mudanças:
    ```bash
   git commit -m "Adiciona minha nova feature"

4. Envie para o repositório:
   ```bash
   git push origin minha-feature

5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato
Se precisar de mais informações, entre em contato:

    Nome: Caique Sanderson
    LinkedIn: [Meu Perfil](https://www.linkedin.com/in/caique-sanderson-de-s%C3%A1-borges-262545237/)
