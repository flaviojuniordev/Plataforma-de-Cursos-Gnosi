
# Iniciando o Banco de Dados Local

Este documento tem como objetivo fornecer um guia passo a passo para configurar o banco de dados local MySQL e integrá-lo ao seu projeto Spring Boot.

## Pré-requisitos

- MySQL instalado e em execução na sua máquina.
- Projeto Spring Boot com a configuração do banco de dados no arquivo `application.properties`.
- Credenciais de acesso ao MySQL:
  - **Usuário:** `root`
  - **Senha:** `123456`
  - **Hostname:** `127.0.0.1`
  - **Porta:** `3306`

### 1. Criando o Banco de Dados

O primeiro passo é criar o banco de dados que será utilizado pela aplicação. O nome do banco de dados deve ser o mesmo indicado no arquivo `application.properties` do seu projeto Spring Boot.

No terminal MySQL, execute o seguinte comando:

```sql
CREATE DATABASE api_usergnosi;
```

Certifique-se de que o MySQL está rodando no **hostname** `127.0.0.1` (local) e na **porta** `3306`.

### 2. Alterando a Autenticação do Usuário MySQL

Se você estiver enfrentando problemas de autenticação no MySQL, pode ser necessário alterar o método de autenticação do usuário root para `mysql_native_password`. Isso pode ser feito com o comando abaixo:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
```

**Observação:** A senha aqui configurada é `123456`, a mesma usada no arquivo `application.properties`.

### 3. Selecionando o Banco de Dados

Após criar o banco de dados, você deve selecioná-lo para realizar operações nele. Use o comando a seguir para selecionar o banco de dados recém-criado:

```sql
USE api_usergnosi;
```

### 4. Verificando as Tabelas Existentes

Para visualizar todas as tabelas do banco de dados, use o comando:

```sql
SHOW TABLES;
```

Esse comando exibirá todas as tabelas existentes no banco de dados `api_usergnosi`.

### 5. Exibindo as Colunas da Tabela de Usuários

Caso você queira verificar as colunas da tabela `tb_users`, execute o comando:

```sql
SHOW COLUMNS FROM tb_users;
```

Este comando listará todas as colunas da tabela `tb_users`, permitindo que você visualize a estrutura da tabela.

---

Com esses passos e usando as seguintes credenciais:

- **Usuário:** `root`
- **Senha:** `123456`
- **Hostname:** `127.0.0.1`
- **Porta:** `3306`

seu banco de dados local está configurado e pronto para ser usado com sua aplicação Spring Boot.
