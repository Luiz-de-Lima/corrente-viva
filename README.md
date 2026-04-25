# CorrenteViva

## 1. Apresentação da Ideia

E## 1. Apresentação da Ideia

Esse é o meu projeto. A ideia surgiu a partir do desafio sobre enchentes no Brasil.

Pensei na situação da informação — como ela muda rápido por conta da internet, e como isso pode ser um problema ou uma solução dependendo de como ela é usada. Em situações de enchente, informação desatualizada não ajuda, ela atrapalha. Gera caos ao invés de solução.

Pensando nisso, decidi focar em algo que mantivesse a informação sempre atualizada para quem está procurando um abrigo. A ideia é simples: a pessoa encontra o app e já chega com a informação certa — sem ter que ficar perguntando de abrigo em abrigo se ainda tinha vaga ou não. O sistema faz isso automaticamente, para que quem está em perigo saiba pra onde ir.

## 2. Problema Escolhido

**Caso 1 — Falta de informação sobre abrigos.**

Pessoas afetadas por enchentes não conseguem saber, de forma rápida e confiável, quais abrigos estão disponíveis e se ainda há vagas. Enquanto alguns abrigos estão lotados, outros têm capacidade disponível — mas essa informação não chega a quem precisa. Isso gera deslocamentos desnecessários e aumenta o risco para famílias em situação vulnerável.

## 3. Solução Proposta

O CorrenteViva é um sistema que centraliza e mantém as informações sobre abrigos **vivas e atualizadas em tempo real**.

A solução foi pensada considerando três realidades do cenário de enchente:

**Pessoas afetadas com internet limitada**
A interface foi desenvolvida para ser simples e leve, carregando rápido mesmo em conexões instáveis. Quem precisa de um abrigo acessa a lista e encontra a informação direta — sem cadastro, sem login, sem etapas desnecessárias.

**Voluntários e ONGs acessando as informações**
Qualquer pessoa com acesso ao sistema consegue ver em tempo real quais abrigos estão disponíveis, quantas vagas restam e onde ficam. Isso facilita a coordenação entre voluntários e equipes de apoio sem depender de grupos de WhatsApp ou informações espalhadas.

**Equipes de apoio que precisam se deslocar**
Com o status dos abrigos atualizado em tempo real, equipes conseguem tomar decisões mais rápidas — sabendo para onde encaminhar famílias sem desperdiçar deslocamento para abrigos já lotados.

A solução funciona em duas frentes:

- **Área pública** — qualquer pessoa pode consultar os abrigos disponíveis e realizar o check-in da sua família ao chegar, informando o nome e a quantidade de pessoas. O sistema atualiza as vagas automaticamente e marca o abrigo como lotado quando a capacidade é atingida.

- **Área restrita** — responsáveis cadastrados (defesa civil, ONGs, coordenadores) acessam um painel com login para cadastrar e gerenciar os abrigos.

Dessa forma, a informação tem dono, tem status e tem validade — resolvendo o problema central de dados desatualizados circulando em momentos críticos.


## 4. Estrutura do Sistema

### Front-end

Desenvolvido em **React** com **Vite** e **Tailwind CSS**, com navegação via React Router DOM.

Telas desenvolvidas:
- Lista de abrigos — exibe todos os abrigos com status e vagas em tempo real
- Check-in de família — formulário público para registrar chegada no abrigo
- Login do responsável — autenticação para acesso ao painel
- Painel do responsável — cadastro de novos abrigos

### Back-end

Desenvolvido em **Node.js** com **Express**, organizado em controllers, routes e middlewares.

Rotas da API:
- `POST /responsaveis` — cadastro de responsável
- `POST /auth/login` — login com geração de token JWT
- `GET /abrigos` — listagem pública de abrigos
- `POST /abrigos` — cadastro de abrigo (autenticado)
- `POST /familias/checkin` — check-in de família com atualização automática de vagas

### Banco de Dados

**PostgreSQL** com três tabelas:

- `responsaveis` — armazena os responsáveis pelos abrigos
- `abrigos` — armazena os abrigos com capacidade, vagas e status
- `familias` — registra o check-in de cada família com horário de entrada

## 5. Tecnologias Utilizadas

- React, Vite, Tailwind CSS, React Router DOM
- Node.js, Express, JWT, Bcryptjs
- PostgreSQL

## 6. Como rodar o projeto

### Pré-requisitos
- Node.js
- PostgreSQL
- Yarn

### Backend

```bash
cd corrente-viva
yarn install
```

Configure o arquivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=corrente_viva
JWT_SECRET=corrente_viva_secret
```

Crie o banco e execute a migration em `database/migrations/001_create_tables.sql`.

```bash
yarn dev
```

### Frontend

```bash
cd frontend
yarn install
yarn dev
```

Acesse `http://localhost:5173`

## 7. Autor

Desenvolvido por Luiz de Lima como projeto final do curso vai na web,