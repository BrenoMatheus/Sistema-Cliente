# Sistema-Cliente

## Descrição

O Sistema-Cliente é uma aplicação web desenvolvida para gerenciar clientes. A aplicação backend é construída com Node.js e TypeScript, utilizando Express para o servidor e Knex para a migração e interação com o banco de dados PostgreSQL. O frontend é desenvolvido com React.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16.x ou superior)
- npm (versão 7.x ou superior) ou yarn (versão 1.22.x ou superior)
- Docker (para rodar o banco de dados PostgreSQL em um container)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/BrenoMatheus/Sistema-Cliente

Entre na pasta do projeto:
cd sistema-cliente

Entre na pasta do backend:
cd ./backend

Instalar as dependencias:
yarn install

Inicie o banco de dados com Docker:
docker-compose up -d

Execute as migrações do banco de dados:
yarn knex:migrate

Execute as migrações do banco de dados:
yarn knex:seeds

Inicie o servidor de desenvolvimento do backend:
yarn start

Entre na pasta do frontend:
cd ./frontend

yarn install
yarn start


Versões das Principais Ferramentas e Dependências

Backend

    Node.js: 16.x
    TypeScript: 5.3.3
    Express: 4.18.2
    Knex: 3.1.0
    PostgreSQL (Docker image): postgres:latest

Frontend

    React: 18.2.0
    React Scripts: 5.0.0
    @mui/material: 5.2.6
    axios: 0.26.0

Desenvolvimento

    ESLint: 8.56.0
    Jest: 29.7.0
    ts-node-dev: 2.0.0

Autor

    Breno Matheus
