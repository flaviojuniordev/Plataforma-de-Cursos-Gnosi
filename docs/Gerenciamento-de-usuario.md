### 3.3.1 Processo 1 – Gerenciamento de usuário 

O processo descreve o gerenciamento de usuário no site Gnosi. O usuário entra na tela de cadastro, preenche as suas informações, escolhe o tipo de usuário (Professor ou aluno) e confirma cadastro. Após a confirmação, ele é redirecionado para a tela de login, na qual ele insere os dados requisitados e a aplicação valida seu acesso por meio de token. Confirmado o login, o usuário é redirecionado ao seus perfil na plataforma, na qual ele pode editar seus dados, adicionar foto de perfil, dentre outros.

![Modelo BPMN do Processo de gerenciamento de usuário](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-2-ti2-3687100-gnosi/blob/main/docs/images/Gerenciamento%20de%20usu%C3%A1rio%20Diagrama.png)"


### Detalhamento das atividades


**1- Cadastrar usuário**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome           | Caixa de texto  |                |                   |
| Sobrenome       |     Caixa de texto |                |                   |
| Email           | Caixa de Texto   | formato de e-mail |                |
| Senha           | Caixa de Texto   | texto oculto |           |
| Confirmar Senha           | Caixa de Texto   | texto oculto |           |
| Tipo de usuário | Seleção Unica   | professor ou aluno          |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Cadastrar | Usuário cadastrado  | (default/cancel  ) |

---
**2- Realizar login**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Email           | Caixa de Texto   | formato de e-mail |                |
| Senha           | Caixa de Texto   | texto oculto |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Acessar | Entra na home da plataforma  | (default/cancel  ) |


---

**3- Editar dados**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome           | Caixa de texto  |                |                   |
| Sobrenome       |     Caixa de texto |                |                   |
| CPF           | Caixa de Texto   | formato de cpf |                |
| Email           | Caixa de Texto   | formato de e-mail |                |
| Senha           | Caixa de Texto   | texto oculto |           |
| Foto de perfil | Arquivo JPEG   | outros formatos de arquivo |           |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Editar perfil |  Abre campos para atualização   | default/cancel   |
| Salvar |  Salva os dados atualizados   | default/cancel   |
| Cancelar | Cancela as atualizações feitas | default/cancel   |
| Apagar conta | Exclui a conta da plataforma | default/cancel   |
| Sair da conta | Realiza logout da na plataforma | default/cancel   |

