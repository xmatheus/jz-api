

# API de Pokemons

Esta é uma API que utiliza o design pattern repository para gerenciar pokemons. Você pode criar, atualizar, buscar, listar e até mesmo fazer batalhas entre pokemons!

O beneficio desse design pattern:.


- **Separação de Responsabilidades**: O padrão Repository ajuda a manter a separação de responsabilidades do código, isolando a lógica de acesso a dados do restante da aplicação. Isso torna o código mais organizado e fácil de manter.

- **Abstração do Banco de Dados**: O Repository fornece uma camada de abstração sobre o banco de dados, permitindo que se troque facilmente o sistema de armazenamento subjacente (por exemplo, de um banco de dados SQL para NoSQL) sem afetar o restante da aplicação.

- **Testabilidade Aprimorada**: O uso do Repository simplifica e permite testes de unidade, integração e e2e.

- **Encapsulamento de Consultas Complexas**: Consultas complexas ao banco de dados podem ser encapsuladas no Repository, tornando o código de serviço mais limpo e fácil de entender.

- **Reutilização de Código**

- **Manuteção**


Lembre-se de configurar suas variáveis de ambiente no arquivo `.env` antes de iniciar a aplicação. Certifique-se de que as dependências estejam instaladas, como o Node.js e o Docker Compose.

nodejs utilizado: v16.13.1

docker-compose utilizado: 1.26.2

Exemplo de .env usado:
(crie esse arquivo na raiz do projeto)

```env
PORT=3001
DATABASE_URL="postgresql://matheus:matheus@localhost:5432/pokemon_db?schema=public"
POSTGRES_USER="matheus"
POSTGRES_PASSWORD="matheus"
```

Por comodidade de executar as migrations fora do banco no docker, os envs no docker-compose foram setados, mas caso seja necessário mudar: apenas é necessário importar com ${var}.

## Como Executar a Aplicação

Para executar a aplicação, você pode usar o `Makefile` fornecido.

Qual o motivo do make?

R.: é possível importar o arquivo .env e deixar exposto no shell para uso no docker, etc.

### Iniciar a Aplicação

```bash
npm install
make up
```

Este comando irá construir e iniciar a aplicação.

### Ou Iniciar a Aplicação de Desenvolvimento (Live Reloading)

```bash
make up-dev
```

Este comando irá iniciar a aplicação de desenvolvimento com live reloading, útil durante o desenvolvimento.

### Parar a Aplicação

```bash
make down
```

Este comando irá parar e remover os contêineres da aplicação.

### Ver Logs da Aplicação

```bash
make logs
```

Este comando irá mostrar os logs da aplicação em tempo real.

## testes automatizados

Uma **.env.testing** já for fornecida com todas as variáveis necessárias.

Os testes unitários utilizam uma abstração de banco de dados em memória.
O prima utilizara um schema chamado **e2e_test** para testes e2e no banco.

Como não foi utilizado apis externas/gateways, no lugar do teste de integração foi utilizado o e2e pois já cobre os casos de uso do usuário.

### testes unitários
```bash
npm run test
```

### testes e2e

Obs.: o banco deve estar rodando(**make up** ou **make up-dev**)
```bash
npm run test:e2e
```


## Endpoints

### `POST /pokemons`

Cria um novo pokemon.

#### Request Body

```json
{
  "tipo": "charizard",
  "treinador": "ash"
}
```

- `tipo` (string): O tipo do pokemon (charizard, mewtwo, ou pikachu).
- `treinador` (string): O nome do treinador do pokemon.

### `PUT /pokemons/:id`

Atualiza um pokemon existente pelo ID.

#### Request Params

- `id` (number): O ID do pokemon que deseja atualizar.

#### Request Body

```json
{
  "treinador": "novo_treinador",
  "nivel": 2
}
```

- `treinador` (string): O novo nome do treinador do pokemon (opcional).
- `nivel` (number): O novo nível do pokemon (opcional).

### `GET /pokemons/:id`

Obtém um pokemon existente pelo ID.

#### Request Params

- `id` (number): O ID do pokemon que deseja buscar.

### `DELETE /pokemons/:id`

Exclui um pokemon existente pelo ID.

#### Request Params

- `id` (number): O ID do pokemon que deseja excluir.

### `GET /pokemons`

Lista todos os pokemons cadastrados.

### `POST /battle`

Realiza uma batalha entre dois pokemons. A probabilidade de vitória é determinada pelo nível dos pokemons.

#### Request Body

```json
{
  "id1": 1,
  "id2": 2
}
```

- `id1` (number): O ID do primeiro pokemon na batalha.
- `id2` (number): O ID do segundo pokemon na batalha.