# CMS Fest

Este projeto é um CMS (Sistema de Gerenciamento de Conteúdo) para a divulgação de eventos. Ele permite que os organizadores de eventos criem, editem e gerenciem informações sobre os eventos que desejam promover.

## Tecnologias Utilizadas
- [ReactJS](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en)
- [Yup](https://www.npmjs.com/package/yup)
- [Nodemailer](https://www.nodemailer.com/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Tailwindcss](https://tailwindcss.com/)
- [Headlessui](https://headlessui.com/)

## Funcionalidades
- Criação e edição de eventos
- Gerenciamento de informações sobre os eventos
- Visualização e busca de eventos
- Envio de Email utilizando o Nodemailer
- Upload de imagens utilizando AWS

## Instalação
1. Clone este repositório:
  ```
  git clone https://github.com/sararchh/CMS-FEST.git
  ```

2. Navegue até o diretório do projeto:
  ```
  cd cms-fest-monorepo
  ```

3. Instale as dependências do projeto nas pastas do FrontEnd e BackEnd:
  ```
  npm install
  ```

4. Configure as variáveis de ambiente:
  - Renomeie o arquivo `.env.example` para `.env`
  - Preencha as variáveis de ambiente no arquivo `.env` com as informações necessárias

5. Inicie o servidor de desenvolvimento nas pastas do FrontEnd e BackEnd:
  ```
  npm run dev
  ```

6. Abra o navegador e acesse `http://localhost:3002` para visualizar o projeto.