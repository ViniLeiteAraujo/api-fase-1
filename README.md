Este é o repositório do **backend** de um sistema de gerenciamento de reservas, permitindo o controle de salas, usuários e agendamentos. A aplicação utiliza uma arquitetura moderna com GraphQL e persistência de dados via Prisma.

## Tecnologias Utilizadas

- **Core**: Node.js & TypeScript
- **API**: Express & Apollo Server (GraphQL)
- **Banco de Dados**: SQLite (Local)
- **ORM**: Prisma (Modelagem e Migrations)
- **Validação**: Zod

## Estrutura do Banco de Dados

O banco de dados é gerenciado pelo **Prisma** e está estruturado para suportar o fluxo de reservas entre usuários e salas.

### Modelos e Relacionamentos

Abaixo, os campos principais e a relação entre as entidades:

- **User**: Armazena informações dos usuários (Clientes/Admins).
    - `id`, `name`, `email`, `password`, `role`.
    - *Relacionamento*: Possui uma lista de `Reservation[]`.
- **Room**: Representa as salas disponíveis para reserva.
    - `id`, `name`, `capacity`.
    - *Relacionamento*: Possui uma lista de `Reservation[]`.
- **Reservation**: Entidade que vincula um `User` a uma `Room`.
    - `id`, `userId`, `roomId`, `date`, `startTime`, `endTime`, `status`.
    - *Relacionamento*: Pertence a um **User** (N-1) e a uma **Room** (N-1).
- **Asset**: Componentes reutilizáveis para fluxos de processamento.
    - `id`, `name`, `description`, `prompt`, `flow`, `type`.

## Como Rodar a Aplicação

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

### 1. Instalar Dependências
Certifique-se de ter o Node.js instalado e execute:
```bash
npm install
```

### 2. Configurar o Banco de Dados
O projeto utiliza SQLite, então não é necessário instalar um servidor de banco de dados separado. Execute os comandos do Prisma para gerar o cliente e rodar as migrações:
```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Iniciar o Servidor
Para rodar a aplicação em modo de desenvolvimento com hot-reload:
```bash
npm run dev
```

O servidor estará disponível por padrão no endereço configurado em seu `src/server.ts`.

## Equipe

Agradecimentos aos desenvolvedores que contribuíram para este projeto, cada um trazendo sua visão técnica para compor a solução:

- **Vinicius Leite**: Atuou na definição dos Schemas do GraphQL e na estruturação dos tipos de dados, garantindo que as consultas e mutações estivessem alinhadas com as necessidades de consumo da API.
- **José André**: Desenvolveu a arquitetura base do servidor Express, implementou os resolvers do GraphQL e a lógica de negócios central, além de configurar as camadas de autenticação e segurança (JWT e bcrypt).
- **Dyogo Araújo**: Responsável pela camada de dados com Prisma ORM, criando e mantendo os modelos de dados, gerindo as migrações do banco de dados.

Desenvolvido como parte de um projeto de teste.
