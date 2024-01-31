<h1>API Portfolio</h1>

<h2>📖Descrição</h2>
Este projeto é uma implementação de uma API que permite aos usuários criar e gerenciar seus portfólios de projetos de programação e design.

<h2>🔧Funcionalidades</h2>

<h4>Criação de contas:</h4> Os usuários podem criar contas, fornecendo informações como nome, e-mail, senha e data de nascimento.
<h4>Login:</h4> Os usuários podem fazer login em suas contas usando seu e-mail e senha.
<h4>Editar Contas:</h4> Os usuários podem fazer mudança em suas contas.
<h4>Deletar Conta:</h4> Os usuários podem deletar suas contas com token.
<h4>Visualização de projetos:</h4> Os usuários podem visualizar seus projetos, incluindo informações como título, descrição, tecnologias utilizadas e imagens.
<h4>Criação de projetos:</h4> Os usuários podem criar novos projetos, fornecendo informações como título, descrição, tecnologias utilizadas e imagens.
<h4>Edição de projetos:</h4> Os usuários podem editar seus projetos existentes.
<h4>Deleção de projetos:</h4> Os usuários podem excluir seus projetos existentes.

<h2>📡Tecnologias utilizadas</h2>

Linguagem: Node.js
Banco de dados: MySQL

<h2>⏳Inicialização</h2>

Antes de começar, certifique-se de que você tenha o Node.js instalado em sua máquina. Você pode baixá-lo e instalá-lo a partir do site oficial: https://nodejs.org/en
Abra um terminal (ou linha de comando) no seu computador.

Navegue para o diretório do projeto que você clonou. Você pode usar o comando cd para entrar na pasta do projeto. Por exemplo:
cd caminho/para/o/diretorio/do/projeto
Certifique-se de que o arquivo package.json está presente no diretório do projeto. Este arquivo contém informações sobre as dependências do projeto.

Execute o seguinte comando para instalar as dependências listadas no package.json:

npm install

Isso iniciará o processo de instalação de todas as dependências do projeto a partir do registro do npm. O npm lerá o arquivo package.json e instalará todas as dependências listadas no campo dependencies.

Depois que o comando for executado, todas as dependências do projeto serão baixadas e instaladas na pasta node_modules no diretório do projeto.

Se o projeto tiver um arquivo package-lock.json, o npm também garantirá que as versões exatas das dependências sejam instaladas, o que ajuda a manter a consistência entre ambientes de desenvolvimento.

Para iniciar a API, execute o seguinte comando:

npm run dev

A API estará acessível em: http://localhost:3000

<h2>🌐Rotas da API</h2>

/	GET	Verifica o status da API

/add	POST	Cria uma conta

/login	POST	Faz login em uma conta

/detailUser	GET	Visualiza os detalhes de uma conta

/editUser	PATCH	Edita os detalhes de uma conta

/deleteUser	DELETE	Exclui uma conta

/projects	POST	Cria um projeto

/projects	GET	Visualiza todos os projetos

/projects/:id	GET	Visualiza um projeto específico

/projects/:id	PATCH	Edita um projeto específico

/projects/:id	DELETE	Exclui um projeto específico

<h2>💎Implementações futuras</h2>

Documentação: Melhorar a documentação da API, incluindo exemplos de como usar as rotas.

<h2>🔎Status do projeto</h2>

O projeto está em fase de desenvolvimento, mas já está funcional.

Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue neste repositório ou entre em contato através do email igormsantos1@icloud.com.
